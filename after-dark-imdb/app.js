const get = id => document.getElementById(id);
const watchLabels = {suggested:'Suggested',opened:'Watch options opened',dismissed:'Skipped',watched:'Watched'};
const state = {history:{},journal:[],titleFeedback:[],sessionSeen:new Set()};
try{
  if(!travelMode)state.sessionSeen=new Set(JSON.parse(sessionStorage.getItem('after-dark-seen') || '[]'));
}catch{}
let data;
let meta;
let current;
let ready;
let searchMeta;
let moodIndex;
let queuedPicks=[];
const shardCache=new Map();
const quickRows=new Map();
let preparedPick;
let prepareTimer;

function element(tag,text,className) {
  const node=document.createElement(tag);
  if(text!==undefined)node.textContent=text;
  if(className)node.className=className;
  return node;
}
function button(text,action) {
  const node=element('button',text,'quiet');
  node.type='button';
  node.addEventListener('click',action);
  return node;
}
function outbound(text,url) {
  const node=element('a',text);
  node.href=url;
  node.target='_blank';
  node.rel='noopener noreferrer';
  return node;
}
function note(id,text) {get(id).textContent=text;}
async function refreshJournal() {
  if(travelMode)return;
  const body=await readJson('/api/journal');
  state.journal=body.entries;
  state.titleFeedback=body.titleFeedback || [];
}
function initialize() {
  ready ??= Promise.all([readJson('/seed.json'),readJson('/catalog/meta.json'),refreshJournal()])
    .then(([seed,manifest])=>{
      data=seed;
      meta=manifest;
      if (manifest.genres) data.indexGenres=manifest.genres;
      const genres=manifest.genres.filter(genre=>!['Adult','Short'].includes(genre));
      for(const genre of genres.sort()){
        const option=element('option',genre);
        option.value=genre;
        get('genre').append(option);
      }
      state.history=Object.fromEntries(Object.keys(seed.knownEnjoyment).map(id=>[id,'enjoyed']));
    }).catch(error=>{ready=null;throw error;});
  return ready;
}
function searchIndex() {
  searchMeta ??= readJson('/catalog/search.json').catch(()=>{
    searchMeta=null;
    throw new Error('The search index could not load. Try again.');
  });
  return searchMeta;
}
async function shardNames(format,industry) {
  if(industry && industry!=='all')return (await searchIndex()).industries[industry];
  return format==='all' ? [...meta.files.Film,...meta.files.Series] : meta.files[format];
}
function quickShardNames(format,industry) {
  if(industry && industry!=='all')return ['quick-'+industry+'.part'];
  return format==='all'?['quick-film.part','quick-series.part']:['quick-'+format.toLowerCase()+'.part'];
}
function fetchShard(name) {
  if(!shardCache.has(name)){
    const load=appFetch('/catalog/'+name).then(response=>{
      if(!response.ok)throw new Error('The catalogue could not load. Try again.');
      return response.blob();
    }).catch(error=>{shardCache.delete(name);throw error;});
    shardCache.set(name,load);
  }
  return shardCache.get(name);
}
async function loadShard(name) {
  const blob=await fetchShard(name);
  return new Response(blob.stream().pipeThrough(new DecompressionStream('gzip'))).json();
}
function loadQuickRows(name) {
  if(!quickRows.has(name)){
    const rows=loadShard(name).catch(error=>{
      quickRows.delete(name);
      shardCache.delete(name);
      throw error;
    });
    quickRows.set(name,rows);
  }
  return quickRows.get(name);
}
async function save(item,mood,status,rating) {
  if(travelMode){
    preparedPick=null;
    const previous=state.journal.find(entry=>entry.item.imdbId===item.imdbId);
    state.journal=state.journal.filter(entry=>entry.item.imdbId!==item.imdbId);
    state.journal.unshift({item,mood,status:previous?.status==='watched'?'watched':status,
      rating:rating??previous?.rating??null,updatedAt:new Date().toISOString()});
    return true;
  }
  const response=await fetch('/api/journal',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({item,mood,status,rating}),keepalive:true});
  if(response.status===409)return false;
  if(!response.ok) {
    const body=await response.json().catch(()=>({}));
    throw new Error(body.error || 'Could not save to your journal.');
  }
  return true;
}
for(const [id,label] of Object.entries(moods)) {
  const field=element('label',undefined,'mood');
  const input=element('input');
  input.type='radio';
  input.name='mood';
  input.value=id;
  input.required=true;
  input.checked=id==='any';
  field.append(input,element('span',label));
  get('moods').append(field);
}
for(const [id,label] of Object.entries(storyFocus)){
  const option=element('option',label);
  option.value=id;
  get('story-focus').append(option);
}
async function loadMoodIndex(){
  moodIndex ??= loadShard('moods.part').then(index=>{
    if(index.schema!==1||!index.titles)throw new Error('The mood index could not load.');
    return index.titles;
  }).catch(error=>{moodIndex=null;shardCache.delete('moods.part');throw error;});
  return moodIndex;
}
function annotationsFor(options) {
  return options.mood==='any'&&options.focus==='any'?null:loadMoodIndex();
}
function pickFilters() {
  const mood=document.querySelector('input[name=mood]:checked')?.value;
  const rating=get('min-rating').value;
  return {mood,focus:get('story-focus').value,format:get('format').value,genre:get('genre').value,
    available:get('available-in-india').checked,industry:get('industry').value,
    minRating:rating==='under-6'?rating:Number(rating),maxYear:new Date().getFullYear()};
}
function preparePick() {
  const options=pickFilters();
  if(!options.mood)return;
  const key=JSON.stringify(options);
  if(preparedPick?.key===key)return;
  const files=quickShardNames(options.format,options.industry);
  const warmed=Promise.all([initialize(),annotationsFor(options),...files.map(loadQuickRows)]);
  const candidates=warmed.then(([,annotations])=>travelMode
    ?rankAvailable(data,state,{...options,annotations},loadQuickRows,quickShardNames)
    :null).catch(()=>null);
  preparedPick={key,candidates};
}
function schedulePickPreparation() {
  clearTimeout(prepareTimer);
  prepareTimer=setTimeout(preparePick,120);
}
async function saveTitleFeedback(item,mood,kind){
  if(travelMode){
    state.titleFeedback.push({imdbId:item.imdbId,mood,kind});
    await save(item,mood,'dismissed');
    return;
  }
  const response=await fetch('/api/title-feedback',{method:'POST',
    headers:{'Content-Type':'application/json'},body:JSON.stringify({imdbId:item.imdbId,mood,kind})});
  if(!response.ok)throw new Error('Could not save your feedback. Try again.');
}
function feedback(item,mood,statusId,onSave,onWatched) {
  const row=element('div',undefined,'rating');
  for(const [label,score] of [['Watched',null],['Liked it',9],['Disliked it',2]]) {
    const control=button(label,async ()=>{
      if(score===null && onWatched){await onWatched();return;}
      for(const child of row.querySelectorAll('button'))child.disabled=true;
      try{
        await save(item,mood,'watched',score);
        note(statusId,score===null?'Marked watched.':'Saved. Future picks will use this feedback.');
        if(onSave){await refreshJournal();onSave();}
      } catch(error){note(statusId,error.message);}
      finally{for(const child of row.querySelectorAll('button'))child.disabled=false;}
    });
    row.append(control);
  }
  return row;
}
async function lookupAvailability(items){
  const response=await appFetch('/api/providers',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({items:items.map(({imdbId,type})=>({imdbId,type}))})});
  if(!response.ok)throw new Error('Availability lookup failed.');
  return (await response.json()).entries;
}
function indiaWatchOptions(item,known) {
  const section=element('div',undefined,'watch');
  const details=element('div');
  details.setAttribute('aria-live','polite');
  section.append(element('h3','Where to watch in India'),details);
  details.append(element('p','Checking India listings…','small'));
  const showStatus=text=>details.replaceChildren(element('p',text,'small'));
  const unavailable=()=>showStatus('India listings unavailable.');
  const lookup=known ? Promise.resolve(known) : lookupAvailability([item]).then(entries=>entries[0]);
  lookup.then(availability=>{
    if(availability.state==='none'||availability.state==='unmatched'){
      showStatus('No platforms found.');
      return;
    }
    if(availability.state!=='listed'){
      unavailable();
      return;
    }
    const platforms=new Map();
    for(const offer of availability.offers){
      const name=offer.type==='addon'?offer.name.split(' · ',1)[0]:offer.name;
      const key=name.toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
      if(key && !platforms.has(key))platforms.set(key,name);
    }
    if(platforms.size)details.replaceChildren(element('p',[...platforms.values()].join(' · ')));
    else showStatus('No platforms found.');
  }).catch(unavailable);
  return section;
}
function showPick(solution,options,availability) {
  const {mood}=options;
  const {item,anchors}=solution;
  current=item;
  state.sessionSeen.add(item.imdbId);
  try{if(!travelMode)sessionStorage.setItem('after-dark-seen',JSON.stringify([...state.sessionSeen]));}catch{}
  const result=get('result');
  const line=element('p',[item.year||'',item.type,...item.genres].filter(Boolean).join(' · '),'meta');
  if(item.imdb)line.append(' · ',outbound('IMDb '+item.imdb.toFixed(1),'https://www.imdb.com/title/'+item.imdbId+'/ratings/'));
  result.replaceChildren(element('h2',item.title),line);
  if(item.description)result.append(element('p',item.description,'synopsis'));
  if(item.insight)result.append(element('p',item.insight,'insight'));
  if(anchors?.length)result.append(element('p','Character match with '+anchors.join(' and ')+'.','small'));
  result.append(indiaWatchOptions(item,availability));
  const actions=element('div',undefined,'pick-actions');
  actions.append(button('Skip',()=>findPick(options,{item,status:'dismissed'})));
  if(mood!=='any')actions.append(button('Wrong mood',()=>findPick(options,{item,kind:'wrong-mood'})));
  actions.append(button('Never suggest again',()=>findPick(options,{item,kind:'hidden'})));
  const status=element('p',undefined,'status');
  status.id='result-status';
  status.setAttribute('role','status');
  result.append(actions,feedback(item,mood,'result-status',undefined,
    ()=>findPick(options,{item,status:'watched'})),status);
  result.hidden=false;
  result.scrollIntoView({block:'nearest'});
}
async function checkAvailablePicks(picks,options){
  note('status','Checking streaming availability in India…');
  const available=[];
  let checked=0;
  let failed=false;
  const remaining=picks.filter(({solution:{item}})=>!options.availabilityChecked.has(item.imdbId));
  for(let offset=0;offset<Math.min(remaining.length,16)&&available.length<5;offset+=8){
    const batch=remaining.slice(offset,offset+8);
    const entries=await lookupAvailability(batch.map(pick=>pick.solution.item));
    const byId=new Map(entries.map(entry=>[entry.imdbId,entry]));
    for(const pick of batch){
      const id=pick.solution.item.imdbId;
      const availability=byId.get(id);
      if(!availability||availability.stale||['unavailable','unconfigured'].includes(availability.state)){
        failed=true;
        continue;
      }
      checked++;
      if(availability.state==='listed')available.push({...pick,availability});
      else options.availabilityChecked.add(id);
    }
    if(!checked&&failed)break;
  }
  if(!available.length)note('status',failed?'Could not verify India listings. Try again or turn off the availability filter.':
    'No verified India listings in the titles checked. Change the filters or turn off availability.');
  return available.slice(0,5);
}
async function findPick(options,previous) {
  const submit=get('pick-button');
  if(submit.disabled || (previous && current!==previous.item))return;

  submit.disabled=true;
  const card=get('result');
  for(const control of card.querySelectorAll('button'))control.disabled=true;
  note('status','');
  const key=JSON.stringify(options);
  options={...options,availabilityChecked:previous?options.availabilityChecked:new Set()};
  try {
    await initialize();
    if(previous){
      if(previous.kind){
        await saveTitleFeedback(previous.item,options.mood,previous.kind);
      }else{
        await save(previous.item,options.mood,previous.status);
      }
      current=null;
      card.hidden=true;
    }else{
      queuedPicks=[];
    }
    let searches=0;
    let quick=!previous;
    while(queuedPicks.length || searches<3){
      if(!queuedPicks.length){
        note('status',previous?'Finding your next pick…':'Finding a title…');
        const [,annotations]=await Promise.all([
          refreshJournal(),
          annotationsFor(options)
        ]);
        const settings={...options,annotations};
        if(quick){
          quick=false;
          const prepared=travelMode&&preparedPick?.key===key?await preparedPick.candidates:null;
          const candidates=prepared??await rankAvailable(data,state,settings,loadQuickRows,quickShardNames).catch(()=>null);
          if(candidates?.picks.length>=5){
            queuedPicks=options.available?await checkAvailablePicks(candidates.picks,options):candidates.picks.slice(0,5);
          }
        }
        if(!queuedPicks.length){
          const {picks,counts}=await rankAvailable(data,state,settings,loadShard,shardNames);
          searches++;
          if(!picks.length){
            const reason=!counts.inFormat?'format or industry':!counts.mood?'mood':!counts.focus?'story focus':
              !counts.genre?'genre':!counts.rating?'IMDb rating':'filters';
            note('status',reason==='filters'?'No more fresh picks. Change a filter or try another mood.':
              'No matches. Try changing the '+reason+'.');
            return;
          }
          queuedPicks=options.available ? await checkAvailablePicks(picks,options) : picks.slice(0,5);
          if(!queuedPicks.length)return;
        }
      }
      const {solution,availability}=queuedPicks[0];
      const saved=await save(solution.item,options.mood,'suggested');
      queuedPicks.shift();
      if(saved){
        note('status','');
        showPick(solution,options,availability);
        return;
      }
    }
    note('status','Your journal was updated elsewhere. Try again.');
  } catch(error){
    note('status',error.message);
  } finally{
    for(const control of card.querySelectorAll('button'))control.disabled=false;
    submit.disabled=false;
  }
}
get('pick-form').addEventListener('submit',event=>{
  event.preventDefault();
  const options=pickFilters();
  if(options.mood)return findPick(options);
});
get('industry').addEventListener('change',()=>{
  if(get('industry').value!=='all')get('format').value='Film';
  note('status',get('industry').value==='all'?'':'The industry filter applies to films.');
});
get('format').addEventListener('change',()=>{
  if(get('format').value!=='Film' && get('industry').value!=='all'){
    get('industry').value='all';
    note('status','The industry filter applies to films.');
  }
});
get('pick-form').addEventListener('change',schedulePickPreparation);
function showJournal() {
  const rows=get('journal-rows');
  rows.replaceChildren();
  if(!state.journal.length)rows.append(element('p','New picks and watches will appear here.'));
  for(const entry of state.journal){
    const row=element('article',undefined,'journal-row');
    const {item,status,rating,mood,updatedAt}=entry;
    row.append(element('h3',item.title),element('p',
      [watchLabels[status],journalMoods[mood],item.type,...(item.genres||[]),
        item.imdb?'IMDb '+item.imdb.toFixed(1):'',rating===null?'':'Your rating '+rating+'/10',
        updatedAt.slice(0,10)].filter(Boolean).join(' · '),'small'));
    row.append(feedback(entry.item,entry.mood,'journal-status',showJournal));
    rows.append(row);
  }
}
get('journal').addEventListener('click',async ()=>{
  get('journal-dialog').showModal();
  try{await initialize();await refreshJournal();showJournal();}
  catch(error){note('journal-status',error.message);}
});
get('log').addEventListener('click',()=>get('log-dialog').showModal());
get('search-by').addEventListener('change',()=>{
  const cast=get('search-by').value==='cast';
  get('query').placeholder=cast?'Actor or actress name':'Title, IMDb ID or link';
});
function titleCard(row) {
  const item=asCandidate(row,data.indexGenres);
  const card=element('article',undefined,'search-row');
  const details=element('p',[item.year||'',item.type,...item.genres].filter(Boolean).join(' · '),'small');
  details.append(' · ',outbound(item.imdb?'IMDb '+item.imdb.toFixed(1):'IMDb',
    'https://www.imdb.com/title/'+item.imdbId+'/'));
  const watch=button('Where to watch in India',()=>watch.replaceWith(indiaWatchOptions(item)));
  card.append(element('h3',item.title),details,watch,feedback(item,'manual','search-status'));
  return card;
}
function titleId(raw) {
  let value=raw;
  try {
    const url=new URL(raw);
    if(url.hostname==='www.imdb.com'||url.hostname==='imdb.com'||url.hostname==='m.imdb.com'){
      value=url.pathname.match(/^\/title\/(tt\d+)(?:\/|$)/i)?.[1] ?? '';
    }
  } catch {}
  return /^tt\d{7,11}$/i.test(value) ? Number(value.slice(2)) : null;
}
async function searchTitles(raw,query,destination) {
  let results=[];
  const imdbId=titleId(raw);
  for(const shard of await shardNames('all')){
    for(const row of await loadShard(shard)){
      if(row[7])continue;
      const title=imdbId?'':normalizeTitle(row[1]);
      const original=!imdbId && row[8] ? normalizeTitle(row[8]) : title;
      const level=imdbId ? (row[0]===imdbId?3:0) :
        title===query||original===query?3:title.startsWith(query)||original.startsWith(query)?2:
        query.length>=3&&(title.includes(query)||original.includes(query))?1:0;
      if(level)results.push({row,level});
    }
    results=results.sort((a,b)=>b.level-a.level||b.row[6]-a.row[6]).slice(0,12);
    if(imdbId&&results.length)break;
  }
  note('search-status',results.length?'':'No title found. Try the IMDb ID.');
  destination.append(...results.map(({row})=>titleCard(row)));
}
async function searchCast(query,destination) {
  const {version,buckets}=await searchIndex();
  const words=query.split(' ');
  const prefix=Array.from(words.find(word=>Array.from(word).length>=2) || '').slice(0,2).join('');
  if(!prefix){note('search-status','Enter at least two letters of a name.');return;}
  const bucket=Array.from(prefix).reduce((hash,char)=>(hash*31+char.codePointAt(0))%buckets,0);
  const names=(await loadShard(version+'/people-'+bucket+'.part'))[prefix] || [];
  const matches=[];
  for(const [id,name,votes] of names){
    const normalized=normalizeTitle(name);
    const tokens=normalized.split(' ');
    if(words.every(word=>tokens.some(token=>token.startsWith(word)))){
      matches.push({id,name,votes,exact:normalized===query});
    }
  }
  matches.sort((a,b)=>Number(b.exact)-Number(a.exact)||b.votes-a.votes||a.name.localeCompare(b.name));
  function showNames() {
    note('search-status',matches.length?'':'No actor or actress found. Try a full name.');
    destination.replaceChildren(...matches.slice(0,12).map(person=>{
      const row=element('div',undefined,'search-row');
      row.append(button(person.name,async event=>{
        const control=event.currentTarget;
        control.disabled=true;
        get('search-form').querySelector('button').disabled=true;
        note('search-status','Loading titles…');
        try{
          const credits=await loadShard(version+'/credits-'+(person.id%buckets)+'.part');
          const titles=credits[person.id] || [];
          note('search-status','');
          showCastCredits(destination,person.name,showNames,titles,titleCard,row=>row[5],row=>row[6]);
        }catch(error){note('search-status',error.message);}
        finally{control.disabled=false;get('search-form').querySelector('button').disabled=false;}
      }));
      return row;
    }));
  }
  showNames();
}
get('search-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const submit=event.currentTarget.querySelector('button');
  if(submit.disabled)return;
  const raw=get('query').value.trim();
  const query=normalizeTitle(raw);
  if(query.length<2)return;
  submit.disabled=true;
  note('search-status','Searching…');
  const destination=get('search-rows');
  destination.replaceChildren();
  try{
    await initialize();
    if(get('search-by').value==='cast')await searchCast(query,destination);
    else await searchTitles(raw,query,destination);
  } catch(error){note('search-status',error.message);}
  finally{submit.disabled=false;}
});
if(websiteTravel){
  afterdarkWebsite.open(()=>initialize().then(preparePick));
}else{
  initialize().then(preparePick).catch(error=>note('status',error.message));
}

get('sign-out').addEventListener('click',async()=>{
  if(websiteTravel){afterdarkWebsite.close();return;}
  try{
    const response=await appFetch('/auth/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
    if(!response.ok)throw new Error('Could not sign out. Try again.');
    location.replace(travelMode?'/travel':'/login');
  }catch(error){note('status',error.message);}
});


if(travelMode){
  document.title='Afterdark';
  get('brand-name').textContent='Afterdark';
  get('brand').href=websiteTravel?'./':'/travel/watch';
  get('sign-out').textContent=websiteTravel?'Clear session':'Close travel session';
  get('travel-journal-note').hidden=false;
}else{
  get('travel-controls').hidden=false;
  const create=get('create-travel-link');
  const revoke=get('revoke-travel-link');
  const output=get('travel-link-output');
  const field=get('travel-link-value');
  function displayTravelStatus(value){
    revoke.hidden=!value.active;
    create.textContent=value.active?'Replace travel link':'Create travel link';
    note('travel-link-status',value.active?'Link expires '+new Date(value.expiresAt).toLocaleDateString()+
      '. Replacing or revoking it closes existing travel sessions.':'');
  }
  async function manageTravelLink(method){
    create.disabled=true;
    revoke.disabled=true;
    try{
      if(method!=='GET'){
        output.hidden=true;
        field.value='';
      }
      const response=await fetch('/api/travel-link',{method});
      if(!response.ok)throw new Error();
      const data=await response.json();
      displayTravelStatus(data);
      if(data.url){
        field.value=data.url;
        output.hidden=false;
      }
    }catch{
      note('travel-link-status','Could not update the travel link. Try again.');
    }finally{
      create.disabled=false;
      revoke.disabled=false;
    }
  }
  get('journal').addEventListener('click',()=>void manageTravelLink('GET'));
  create.addEventListener('click',()=>void manageTravelLink('POST'));
  revoke.addEventListener('click',()=>void manageTravelLink('DELETE'));
  get('copy-travel-link').addEventListener('click',async ()=>{
    try{
      await navigator.clipboard.writeText(field.value);
      note('travel-link-status','Copied. Save this private link before you travel.');
    }catch{field.select();}
  });
}
