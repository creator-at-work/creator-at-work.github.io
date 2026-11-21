
const moods = {
  espionage: 'Espionage or covert operations', military: 'Tactical or military',
  power: 'Brilliant characters and power games', crime: 'Crime and investigation',
  warm: 'Warm, grounded and thought-provoking', speculative: 'Mystery or mind-bending science fiction',
  relationships: 'Relationships and drama', history: 'History', action: 'Action and momentum'
};
const moodTags = {
  espionage: ['espionage'], military: ['military'], power: ['power'],
  crime: ['crime','mystery'], warm: ['warm'], speculative: ['speculative','mystery'],
  relationships: ['relationships'], history: ['history'], action: ['action']
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
    if (!Number.isInteger(entry.rating)) continue;
    const signal = (entry.rating - 5.5) / 4.5;
    observe(entry.item || catalog.get(entry.id),signal,entry.mood === mood ? 3.4 : 1.15);
  }
  return f => {
    const [sum,count] = evidence.get(f) || [0,0];
    return sum / (2.8 + count) + 0.17 * (1 - Math.exp(-(exposure.get(f) || 0) / 10));
  };
}
function chooseAll(data,state,mood,format) {
  if (!moodTags[mood]) return [];
  const scoreFeature = learn(data,state,mood);
  const shown = new Set(state.journal.map(entry => entry.id));
  const priorRatings = data.history.filter(i => state.history[i.id] === 'enjoyed' && i.imdb).map(i => i.imdb);
  const center = priorRatings.length ? priorRatings.reduce((a,b)=>a+b,0)/priorRatings.length : 7.5;
  return data.catalog
    .filter(item => !shown.has(item.id) && (format === 'all' || item.type === format))
    .filter(item => moodTags[mood].some(tag => item.tags.includes(tag)))
    .map(item => {
      const groups = ['trait','theme','genre'].map(prefix => features(item).filter(f => f.startsWith(prefix + ':')));
      const average = group => group.length ? group.reduce((sum,f)=>sum+scoreFeature(f),0)/group.length : 0;
      const quality = item.imdb ? 0.045 * (item.imdb - 7) - 0.025 * Math.abs(item.imdb - center) : 0;
      const score = average(groups[0]) * 0.57 + average(groups[1]) * 0.28 + average(groups[2]) * 0.15 + quality;
      const traits = [...(item.traits || [])].sort((a,b)=>scoreFeature('trait:'+b)-scoreFeature('trait:'+a));
      const anchors = data.history.filter(title=>state.history[title.id] === 'enjoyed' && title.traits?.length)
        .map(title=>[title.title, title.traits.filter(trait=>traits.includes(trait)).length])
        .filter(([,overlap])=>overlap >= 2).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([title])=>title);
      return {item,score,traits,anchors};
    }).sort((a,b)=>b.score-a.score || a.item.title.localeCompare(b.item.title));
}

const movieMoodGenres = {
  espionage:['Thriller','Crime','Mystery','Action'], military:['War','Action'],
  power:['Drama','Crime','Thriller'], crime:['Crime','Mystery'],
  warm:['Drama','Comedy','Family'], speculative:['Sci-Fi','Mystery'],
  relationships:['Romance','Drama'], history:['History','Biography','War'], action:['Action','Adventure']
};
const genreIds = {Action:28,Adventure:12,Comedy:35,Crime:80,Drama:18,Family:10751,History:36,
  Mystery:9648,Romance:10749,'Sci-Fi':878,Thriller:53,War:10752,Biography:null};
const tvIds = {...genreIds,Action:10759,Adventure:10759,'Sci-Fi':10765,War:10768};
const nicheKeywords = {
  espionage:['spy','espionage','intelligence agency'],
  military:['military','special forces','combat'],
  power:['politics','political corruption','power struggle'],
  warm:['friendship','found family','small town']
};
const normalizeTitle = value => value.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase()
  .replace(/['’]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const imdbKey = value => 'tt' + String(value).padStart(7,'0');
const tmdbRoot = 'https://api.themoviedb.org/3';
function genresFor(mask, labels) {
  return labels.filter((_,index) => mask & (1 << index));
}
function asCandidate(row, labels) {
  const [ident,title,format,year,mask,score,votes,adult] = row;
  const id = imdbKey(ident);
  return {id,imdbId:id,title,type:format < 2 ? 'Film' : 'Series',year,genres:genresFor(mask,labels),
    imdb:score ? score/10 : null,votes,adult:!!adult,tags:[],source:'imdb'};
}
function imdbShortlist(data, rows, state, options) {
  const {mood,format,genre,minRating,maxYear,adult=false}=options;
  const labels = data.indexGenres;
  const allowed = movieMoodGenres[mood];
  const genreIndex = labels.indexOf(genre);
  const req = genreIndex < 0 ? 0 : 1 << genreIndex;
  const mask = allowed.reduce((n,g)=>n|(1<<labels.indexOf(g)),0);
  const existing = new Set(data.catalog.map(i=>i.imdbId));
  const watched = new Set(data.history.filter(i=>state.history[i.id] !== 'other').map(i=>i.imdbId).filter(Boolean));
  const shown = new Set(state.journal.flatMap(entry=>[entry.id,entry.item?.imdbId].filter(Boolean)));
  const seenNames = new Set(data.history.filter(i=>state.history[i.id] !== 'other').map(i=>normalizeTitle(i.title)));
  for (const entry of state.journal) {
    if (entry.item) seenNames.add(normalizeTitle(entry.item.title));
  }
  const featureScore = learn(data,state,mood);
  const profiles = labels.map(label=>featureScore('genre:'+label.toLowerCase()));
  const samples = data.history.filter(i=>state.history[i.id]==='enjoyed' && i.imdb).map(i=>i.imdb);
  const center = samples.length ? samples.reduce((a,b)=>a+b,0)/samples.length : 7.5;
  const allowedKinds = format === 'Film' ? [0,1] : format === 'Series' ? [2,3] : [0,1,2,3];
  const scoredMasks = new Map();
  const leaders = [];
  const limit = 32;
  for (const row of rows) {
    const [id,title,kind,year,genres,score,votes,explicit,original] = row;
    if (!allowedKinds.includes(kind) || year > maxYear || (!adult && explicit) || !(genres & mask) ||
        (req && !(genres & req)) || (minRating && score < Math.round(minRating*10))) continue;
    let genreFit = scoredMasks.get(genres);
    if (genreFit === undefined) {
      const indices = labels.map((_,index)=>index).filter(index=>genres & (1<<index));
      const overlap = indices.filter(index=>allowed.includes(labels[index])).length;
      genreFit = 0.24 * profiles[indices[0]] + 0.68 * indices.reduce((n,i)=>n+profiles[i],0)/indices.length +
        0.09 * overlap + ((mood === 'warm' || mood === 'relationships') && (genres & (1<<labels.indexOf('Thriller'))) ? -0.08 : 0);
      scoredMasks.set(genres,genreFit);
    }
    const rating = score ? score/10 : null;
    const confidence = Math.min(1,Math.log1p(votes)/Math.log1p(15000));
    const value = genreFit + (rating ? confidence * (0.07*(rating-7) - 0.055*Math.abs(rating-center)) : -0.24) -
      (year ? 0 : 0.13);
    if (leaders.length >= limit && value <= leaders.at(-1).score) continue;
    const key = imdbKey(id);
    if (existing.has(key) || watched.has(key) || shown.has(key) ||
        seenNames.has(normalizeTitle(title)) || (original && seenNames.has(normalizeTitle(original)))) continue;
    leaders.push({row,score:value});
    leaders.sort((a,b)=>b.score-a.score);
    if (leaders.length>limit) leaders.pop();
  }
  return leaders.map(({row,score})=>({item:asCandidate(row,labels),score,traits:[],anchors:[],match:'genre'}));
}
function characterShortlist(data,state,options) {
  const filtered=data.catalog.filter(item=>
    (options.genre==='all' || item.genres?.includes(options.genre)) &&
    (!options.minRating || item.imdb>=options.minRating));
  return chooseAll({...data,catalog:filtered},state,options.mood,options.format)
    .map(solution=>({...solution,score:solution.score+0.62,match:'character'}));
}
async function tmdb(path,params,token,request=fetch) {
  const url = new URL(tmdbRoot + path);
  for (const [key,value] of Object.entries(params)) if (value) url.searchParams.set(key,value);
  const response = await request(url,{headers:{Authorization:'Bearer '+token,accept:'application/json'},
    signal:AbortSignal.timeout(8500)});
  if (!response.ok) throw new Error(response.status === 401 ? 'TMDb rejected the access token.' :
    response.status === 429 ? 'The availability service is busy. Try again shortly.' :
    'The availability service returned HTTP ' + response.status + '.');
  return response.json();
}
async function providersFor(item,token,request=fetch) {
  const kind = item.type === 'Series' ? 'tv' : 'movie';
  const match = await tmdb('/find/'+item.imdbId,{external_source:'imdb_id'},token,request);
  const found = match[kind+'_results']?.[0];
  if (!found) return {services:[],source:'unmatched'};
  const data = await tmdb('/'+kind+'/'+found.id+'/watch/providers',{},token,request);
  return {services:data.results?.IN || {},source:'tmdb',overview:found.overview || ''};
}
function watchOptions(result) {
  const group = result?.services || {};
  return [['Subscription','flatrate'],['Free','free'],['With ads','ads'],['Rent','rent'],['Buy','buy']]
    .map(([label,key])=>[label,[...new Set((group[key] || []).map(provider=>provider.provider_name))]])
    .filter(([,names])=>names.length>0);
}
async function discoverImdbIds(mood,format,genre,token,request=fetch) {
  if (!nicheKeywords[mood]) return [];
  const search = await Promise.allSettled(nicheKeywords[mood].map(query=>
    tmdb('/search/keyword',{query},token,request).then(list=>list.results?.find(item=>item.name.toLowerCase()===query)?.id)));
  const keywords = search.filter(value=>value.status==='fulfilled' && value.value).map(value=>value.value);
  if (!keywords.length) return [];
  const kinds = format==='Film' ? ['movie'] : format==='Series' ? ['tv'] : ['movie','tv'];
  const pool = await Promise.allSettled(kinds.map(kind=>{
    const key=(kind==='movie' ? genreIds : tvIds)[genre];
    return tmdb('/discover/'+kind,{with_keywords:keywords.join('|'),with_genres:key,sort_by:'popularity.desc',
      watch_region:'IN',with_watch_monetization_types:'flatrate|free|ads|rent|buy'},token,request)
      .then(data=>(data.results || []).slice(0,5).map(item=>({kind,id:item.id,overview:item.overview || ''})));
  }));
  const results = await Promise.allSettled(pool.filter(result=>result.status==='fulfilled').flatMap(result=>result.value)
    .map(async item=>{
      const details = await tmdb('/'+item.kind+'/'+item.id+'/external_ids',{},token,request);
      return details.imdb_id ? {...item,imdbId:details.imdb_id} : null;
    }));
  return results.filter(result=>result.status==='fulfilled' && result.value).map(result=>result.value);
}

async function readJson(path) {
  const result = await fetch(path);
  if (!result.ok) throw new Error('Could not load the recommendation profile.');
  return result.json();
}

async function rankAvailable(data,state,settings,token,request,load,filesFor) {
  const fresh = token ? await discoverImdbIds(settings.mood,settings.format,settings.genre,token,request).catch(()=>[]) : [];
  const freshById=new Map(fresh.map(item=>[Number(item.imdbId.slice(2)),item]));
  const matched=[];
  let broad=[];
  const files=await filesFor(settings.format);
  // Each shard is decoded and released before loading another. The browser only keeps the leading results.
  for (const filename of files) {
    const rows=await load(filename);
    broad.push(...imdbShortlist(data,rows,state,settings));
    broad.sort((a,b)=>b.score-a.score);
    broad.length=Math.min(broad.length,32);
    if (freshById.size) {
      for (const row of rows) {
        if (freshById.has(row[0])) {
          matched.push([row,freshById.get(row[0])]);
          freshById.delete(row[0]);
        }
      }
    }
  }
  const candidates=[...characterShortlist(data,state,settings),...broad].sort((a,b)=>b.score-a.score);
  if (!token) return {solution:candidates[0],availability:null};
  const watched = new Set(data.history.map(item=>item.imdbId).filter(Boolean));
  const shown = new Set(state.journal.map(entry=>entry.item?.imdbId).filter(Boolean));
  const learnFeature = learn(data,state,settings.mood);
  for (const [row,candidate] of matched) {
    if (watched.has(candidate.imdbId) || shown.has(candidate.imdbId)) continue;
    const item=asCandidate(row,data.indexGenres);
    if (item.adult || item.year>settings.maxYear || (settings.minRating && !(item.imdb>=settings.minRating)) ||
        (settings.genre!=='all' && !item.genres.includes(settings.genre)) ||
        (settings.format!=='all' && item.type!==settings.format)) continue;
    const genreFit=item.genres.reduce((sum,genre)=>sum+learnFeature('genre:'+genre.toLowerCase()),0) / Math.max(1,item.genres.length);
    const score=0.62+(item.imdb||0)/25+genreFit*0.65;
    const enhanced={...item,description:candidate.overview,tags:[settings.mood]};
    candidates.push({item:enhanced,score,traits:[],anchors:[],match:'keyword'});
  }
  candidates.sort((a,b)=>b.score-a.score);
  const used=new Set();
  const shortlist=candidates.filter(result=>{
    if (used.has(result.item.imdbId)) return false;
    used.add(result.item.imdbId);return true;
  }).slice(0,8);
  if (!shortlist.length) return {solution:null,availability:null};
  const results=await Promise.allSettled(shortlist.map(async solution=>
    ({solution,availability:await providersFor(solution.item,token,request)})));
  const available=results.find(result=>result.status==='fulfilled' && watchOptions(result.value.availability).length);
  if (available) return available.value;
  if (results[0]?.status==='fulfilled') return results[0].value;
  return {solution:shortlist[0],availability:null,error:results[0]?.reason?.message || 'Availability check failed.'};
}
