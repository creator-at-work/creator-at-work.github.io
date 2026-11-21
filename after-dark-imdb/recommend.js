const websiteTravel=typeof afterdarkWebsite!=='undefined';
const travelMode=websiteTravel||(typeof location!=='undefined'&&location.pathname==='/travel/watch');
const appFetch=(path,options)=>websiteTravel?afterdarkWebsite.request(path,options):
  fetch(travelMode?'/travel'+path:path,options);

const moods = {
  any:'Surprise me', 'slow-living':'Slow living', 'feel-good':'Feel-good', funny:'Funny',
  tense:'Tense', 'mind-bending':'Mind-bending', 'high-energy':'High-energy', scary:'Scary'
};
const storyFocus = {
  any:'Any', espionage:'Espionage', military:'Military & tactics', power:'Power games',
  investigation:'Investigation', relationships:'Relationships', history:'History'
};
const journalMoods = {
  ...moods, espionage:'Espionage', military:'Military', power:'Power games', crime:'Crime',
  warm:'Warm, grounded and thought-provoking', speculative:'Mystery or sci-fi',
  relationships:'Relationships', history:'History', action:'Action', manual:'Manual'
};

const features = item => [
  ...Array.from(new Set(item.tags || []), t => 'theme:' + t),
  ...Array.from(new Set(item.traits || []), t => 'trait:' + t),
  ...Array.from(new Set(item.genres || []), g => 'genre:' + g.toLowerCase())
];
function learn(data, state, mood) {
  const exposure = new Map(), evidence = new Map();
  const catalog = new Map(data.catalog.map(item => [item.id,item]));
  const history = new Map(data.history.map(item => [item.id,item]));
  for (const item of data.signals) {
    if (state.history[item.id] === 'other') continue;
    for (const f of features(item)) exposure.set(f, (exposure.get(f) || 0) + item.weight);
  }
  function observe(item, label, influence) {
    if (!item) return;
    for (const f of features(item)) {
      const current = evidence.get(f) || [0,0];
      current[0] += label * influence;
      current[1] += influence;
      evidence.set(f,current);
    }
  }
  for (const [id, response] of Object.entries(state.history)) {
    if (response === 'enjoyed') observe(history.get(id),1,2.4);
    if (response === 'disliked') observe(history.get(id),-1,2.4);
  }
  for (const entry of state.journal) {
    if (entry.status==='watched' && entry.item) {
      for (const f of features(entry.item)) exposure.set(f,(exposure.get(f)||0)+0.9);
    }
    if (!Number.isInteger(entry.rating)) continue;
    const signal = (entry.rating - 5.5) / 4.5;
    observe(entry.item || catalog.get(entry.id),signal,entry.mood === mood ? 3.4 : 1.15);
  }
  return f => {
    const [sum,count] = evidence.get(f) || [0,0];
    return sum / (2.8 + count) + 0.17 * (1 - Math.exp(-(exposure.get(f) || 0) / 10));
  };
}
const normalizeTitle = value => value.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase()
  .replace(/['’]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const imdbKey = value => 'tt' + String(value).padStart(7,'0');
function genresFor(mask, labels) {
  return labels.filter((_,index) => mask & (1 << index));
}
function asCandidate(row, labels) {
  const [ident,title,format,year,mask,score,votes,adult] = row;
  const id = imdbKey(ident);
  return {id,imdbId:id,title,type:format < 2 ? 'Film' : 'Series',year,genres:genresFor(mask,labels),
    imdb:score ? score/10 : null,votes,adult:!!adult,tags:[],source:'imdb'};
}
function matchesRating(rating,filter) {
  if(!filter)return true;
  if(!Number.isFinite(rating)||rating<=0)return false;
  return filter==='under-6' ? rating<6 : rating>=filter;
}
async function readJson(path) {
  const result=await appFetch(path);
  if(!result.ok)throw new Error('Could not load After Dark data.');
  return result.json();
}

async function* catalogueBatches(files,load) {
  const concurrency=4;
  for(let offset=0;offset<files.length;offset+=concurrency){
    yield* await Promise.all(files.slice(offset,offset+concurrency).map(load));
  }
}

async function rankAvailable(data,state,settings,load,filesFor) {
  const {mood,focus,format,genre,minRating,maxYear}=settings;
  const labels=data.indexGenres;
  const genreIndex=labels.indexOf(genre);
  const genreMask=genreIndex<0?0:1<<genreIndex;
  const profiles=new Map(data.catalog.map(item=>[item.imdbId,item]));
  const excluded=new Set();
  for(const item of data.history){
    if(state.history[item.id]!=='other' && item.imdbId)excluded.add(item.imdbId);
  }
  for(const entry of state.journal){
    if(entry.status==='watched')excluded.add(entry.item.imdbId);
  }
  for(const id of state.sessionSeen)excluded.add(id);
  for(const entry of state.titleFeedback){
    if(entry.kind==='hidden'||(mood!=='any'&&entry.kind==='wrong-mood'&&entry.mood===mood)){
      excluded.add(entry.imdbId);
    }
  }
  const previouslyShown=new Set(state.journal.map(entry=>entry.item.imdbId));
  const learnFeature=learn(data,state,mood);
  const genreWeights=labels.map(label=>learnFeature('genre:'+label.toLowerCase()));
  const genreScores=new Map();
  const anchors=data.history.filter(item=>state.history[item.id]==='enjoyed' && item.traits?.length);
  const leaders=[];
  const limit=settings.available?32:12;
  const counts={inFormat:0,mood:0,focus:0,genre:0,rating:0};

  for await(const rows of catalogueBatches(await filesFor(format,settings.industry),load)){
    for(const row of rows){
      const [number,title,kind,year,mask,score,votes,adult]=row;
      if(adult||year>maxYear||(format==='Film'&&kind>=2)||(format==='Series'&&kind<2))continue;
      counts.inFormat++;
      const annotations=settings.annotations?.[number];
      const moodTag=annotations?.mood?.[mood];
      const focusTag=annotations?.focus?.[focus];
      if(mood!=='any'&&!moodTag)continue;
      counts.mood++;
      if(focus!=='any'&&!focusTag)continue;
      counts.focus++;
      if(genreMask&&!(mask&genreMask))continue;
      counts.genre++;
      if(!matchesRating(score?score/10:null,minRating))continue;
      counts.rating++;
      const id=imdbKey(number);
      if(excluded.has(id)||(settings.available&&settings.availabilityChecked?.has(id)))continue;
      let genreScore=genreScores.get(mask);
      if(genreScore===undefined){
        const weights=genreWeights.filter((_,index)=>mask&(1<<index));
        genreScore=weights.reduce((total,value)=>total+value,0)/Math.max(weights.length,1);
        genreScores.set(mask,genreScore);
      }
      const info=profiles.get(id);
      const traits=info?.traits || [];
      const traitScore=traits.reduce((total,trait)=>total+learnFeature('trait:'+trait),0)/Math.max(traits.length,1);
      const confidence=Math.min(1,Math.log1p(votes)/Math.log1p(15000));
      const ratingScore=score ? (score/10-6)*0.10*confidence : -0.20;
      const fit=(moodTag?.[0] || 0)*0.48+(focusTag?.[0] || 0)*0.40;
      const learnedLabels=[moodTag&&mood,focusTag&&focus].filter(Boolean);
      const labelScore=learnedLabels.reduce((total,tag)=>total+learnFeature('theme:'+tag),0);
      const value=fit+genreScore*0.34+traitScore*0.63+labelScore*0.27+ratingScore+
        0.10*confidence-(previouslyShown.has(id)?0.22:0)-(year?0:0.10);
      if(leaders.length>=limit&&value<=leaders.at(-1).score)continue;
      const item={...info,...asCandidate(row,labels),traits,
        tags:[...new Set([...(info?.tags || []),...learnedLabels])]};
      const matches=traits.length?anchors.filter(anchor=>anchor.traits.filter(trait=>traits.includes(trait)).length>=2)
        .slice(0,2).map(anchor=>anchor.title):[];
      leaders.push({solution:{item,anchors:matches},score:value});
      leaders.sort((a,b)=>b.score-a.score);
      if(leaders.length>limit)leaders.pop();
    }
  }
  return {picks:leaders,counts};
}
