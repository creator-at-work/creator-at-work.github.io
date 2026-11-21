'use strict';

const moods={
  any:'Surprise me','slow-living':'Slow living','feel-good':'Feel-good',funny:'Funny',
  tense:'Tense','mind-bending':'Mind-bending','high-energy':'High-energy',scary:'Scary'
};
const focuses={
  espionage:'Espionage',military:'Military & tactics',power:'Power games',
  investigation:'Investigation',relationships:'Relationships',history:'History'
};
const get=id=>document.getElementById(id);
const base='https://after-dark-public-catalogue.jatinbhatt.workers.dev';
const datasets=new Map();
const offers=new Map();
const seen=new Set();
let journal={};
let queue=[];
let filters;
let current;

try{for(const id of JSON.parse(sessionStorage.getItem('after-dark-public-seen') || '[]'))seen.add(id);}catch{}
try{journal=JSON.parse(localStorage.getItem('after-dark-public-journal') || '{}') || {};}catch{}
function store(){
  try{localStorage.setItem('after-dark-public-journal',JSON.stringify(journal));return true;}catch{return false;}
}
const note=(id,value)=>{get(id).textContent=value;};
function element(tag,text,className){
  const node=document.createElement(tag);
  if(text)node.textContent=text;
  if(className)node.className=className;
  return node;
}
function button(text,action){
  const control=element('button',text,'quiet');
  control.type='button';
  control.addEventListener('click',action);
  return control;
}
function titleKey(row){
  return (row[3]==='Film'?'movie/':'tv/')+row[0];
}
function titleDetails(row){
  return [row[2],row[3],row[6].join(', '),'TMDB '+row[4].toFixed(1)].filter(Boolean).join(' · ');
}
function words(value){
  return value.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
}
for(const [id,name] of Object.entries(moods)){
  const label=element('label',null,'mood');
  const input=element('input');
  Object.assign(input,{type:'radio',name:'mood',value:id,checked:id==='any'});
  label.append(input,element('span',name));
  get('moods').append(label);
}
for(const [id,name] of Object.entries(focuses))get('focus').append(new Option(name,id));
for(const genre of ['Action','Action & Adventure','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy','History','Horror','Music','Mystery','Romance','Science Fiction','Sci-Fi & Fantasy','Thriller','War','War & Politics','Western']){
  get('genre').append(new Option(genre,genre));
}
get('industry').addEventListener('change',()=>{
  if(get('industry').value!=='any'){
    get('format').value='Film';
    note('status','The industry filter applies to films.');
  }
});
get('format').addEventListener('change',()=>{
  if(get('format').value!=='Film')get('industry').value='any';
});

function dataset(name){
  if(!datasets.has(name)){
    datasets.set(name,fetch(base+'/'+name).then(response=>{
      if(!response.ok||!response.body)throw new Error('Could not load the catalogue.');
      return new Response(response.body.pipeThrough(new DecompressionStream('gzip'))).json();
    }).catch(error=>{datasets.delete(name);throw error;}));
  }
  return datasets.get(name);
}
const catalogue=()=>dataset('catalogue-v1.part');
function eligible(row,options){
  const [, , ,format,rating,,genres,tags,topics,industry]=row;
  return (options.format==='any'||format===options.format) &&
    (options.mood==='any'||tags.includes(options.mood)) &&
    (options.focus==='any'||topics.includes(options.focus)) &&
    (options.genre==='any'||genres.includes(options.genre)) &&
    (options.industry==='any'||industry===options.industry) &&
    (options.rating==='under-6'?rating>0&&rating<6:rating>=Number(options.rating));
}
function shortlist(rows){
  const top=[];
  const limit=filters.available?8:5;
  const taste=new Map();
  for(const entry of Object.values(journal)){
    if(!entry.rating||!entry.row)continue;
    for(const genre of entry.row[6]){
      const [score,count]=taste.get(genre)||[0,0];
      taste.set(genre,[score+(entry.rating-5.5)/4.5,count+1]);
    }
  }
  const preference=genres=>genres.reduce((sum,genre)=>{
    const [score,count]=taste.get(genre)||[0,0];
    return sum+score/(count+3);
  },0)/Math.max(genres.length,1);
  for(const row of rows){
    const id=titleKey(row);
    const entry=journal[id];
    if(seen.has(id)||entry?.watched||entry?.hidden||entry?.wrong?.includes(filters.mood)||
      filters.checked.has(id)||!eligible(row,filters))continue;
    const weight=row[5]/(row[5]+70);
    const score=row[4]*weight+5.8*(1-weight)+Math.random()*0.8+preference(row[6]);
    if(top.length>=limit&&top.at(-1).score>=score)continue;
    top.push({row,score});
    top.sort((a,b)=>b.score-a.score);
    if(top.length>limit)top.pop();
  }
  return top.map(entry=>entry.row);
}

async function listings(ids){
  const missing=ids.filter(id=>!offers.has(id));
  if(missing.length){
    const response=await fetch(base+'/api/providers',{
      method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ids:missing})
    });
    if(!response.ok)throw new Error('India listings unavailable.');
    for(const entry of (await response.json()).entries){
      if(entry.state!=='unavailable'&&entry.state!=='limit')offers.set(entry.id,entry);
    }
  }
  return ids.map(id=>offers.get(id)||{id,state:'unavailable'});
}
function showPlatforms(card,entry){
  const label=entry?.state==='listed'&&entry.platforms?.length?entry.platforms.join(' · '):
    ['none','unmatched'].includes(entry?.state)?'No platforms found.':'India listings unavailable.';
  card.replaceChildren(element('h3','Where to watch in India'),element('p',label));
}
async function watchOptions(row,card){
  card.replaceChildren(element('h3','Where to watch in India'),element('p','Checking India listings…','small'));
  try{showPlatforms(card,(await listings([titleKey(row)]))[0]);}
  catch{showPlatforms(card);}
}

async function fillQueue(rows){
  const candidates=shortlist(rows);
  if(!filters.available||!candidates.length){
    queue=candidates;
    return candidates.length?'':'No more matches. Try changing a filter.';
  }
  note('status','Checking streaming availability in India…');
  const entries=await listings(candidates.map(titleKey));
  const verified=new Map(entries.filter(entry=>entry.state==='listed').map(entry=>[entry.id,entry]));
  for(const entry of entries){
    if(['none','unmatched'].includes(entry.state))filters.checked.add(entry.id);
  }
  queue=candidates.filter(row=>verified.has(titleKey(row))).slice(0,5);
  if(queue.length)return '';
  return entries.some(entry=>entry.state==='unavailable')?'Could not verify India listings. Try without this filter.':
    'No verified India listings in this batch. Try again or change a filter.';
}

function updateJournal(row,change,mood=filters?.mood||'any'){
  const id=titleKey(row);
  journal[id]={...journal[id],row,mood,...change};
  return store();
}
function feedback(row,statusId,advance){
  const controls=element('div',null,'rating');
  for(const [label,rating] of [['Watched',null],['Liked it',9],['Disliked it',2]]){
    controls.append(button(label,()=>{
      const change=rating===null?{watched:true}:{watched:true,rating};
      const saved=updateJournal(row,change,journal[titleKey(row)]?.mood);
      note(statusId,saved?'Saved.':'Saved for this visit only.');
      if(rating===null)advance?.();
    }));
  }
  return controls;
}
async function nextPick(){
  get('submit').disabled=true;
  for(const control of get('result').querySelectorAll('button'))control.disabled=true;
  try{
    const rows=await catalogue();
    const status=queue.length?'':await fillQueue(rows);
    if(!queue.length){
      current=null;
      get('result').hidden=true;
      note('status',status);
      return;
    }
    const row=queue.shift();
    current=row;
    seen.add(titleKey(row));
    try{sessionStorage.setItem('after-dark-public-seen',JSON.stringify([...seen]));}catch{}
    updateJournal(row,{suggested:true,skipped:false});
    note('title',row[1]);
    note('details',titleDetails(row));
    note('result-status','');
    note('status','');
    get('title-info').href='https://www.themoviedb.org/'+titleKey(row);
    get('wrong-mood').hidden=filters.mood==='any';
    get('feedback').replaceChildren(feedback(row,'result-status',nextPick));
    get('result').hidden=false;
    get('result').scrollIntoView({block:'nearest'});
    const card=element('div');
    get('watch').replaceChildren(card);
    void watchOptions(row,card);
  }catch{
    get('result').hidden=true;
    note('status','Could not load a pick. Try again.');
  }finally{
    get('submit').disabled=false;
    for(const control of get('result').querySelectorAll('button'))control.disabled=false;
  }
}
get('pick-form').addEventListener('submit',event=>{
  event.preventDefault();
  filters=Object.fromEntries(['format','focus','genre','industry','rating'].map(id=>[id,get(id).value]));
  filters.mood=document.querySelector('input[name=mood]:checked').value;
  filters.available=get('available').checked;
  filters.checked=new Set();
  queue=[];
  note('status','Finding a pick…');
  void nextPick();
});
get('skip-pick').addEventListener('click',()=>{
  updateJournal(current,{skipped:true});
  void nextPick();
});
get('wrong-mood').addEventListener('click',()=>{
  const wrong=journal[titleKey(current)]?.wrong||[];
  updateJournal(current,{wrong:[...new Set([...wrong,filters.mood])]});
  void nextPick();
});
get('hide-title').addEventListener('click',()=>{
  updateJournal(current,{hidden:true});
  void nextPick();
});

get('open-journal').addEventListener('click',()=>{
  const rows=get('journal-rows');
  rows.replaceChildren();
  for(const entry of Object.values(journal).reverse()){
    if(!entry.row)continue;
    const card=element('article',null,'journal-row');
    const status=entry.watched?'Watched':entry.hidden?'Hidden':entry.skipped?'Skipped':'Suggested';
    card.append(element('h3',entry.row[1]),element('p',
      [status,moods[entry.mood],entry.rating&&entry.rating+'/10'].filter(Boolean).join(' · '),'small'),
      feedback(entry.row,'journal-status'));
    rows.append(card);
  }
  if(!rows.children.length)rows.append(element('p','Your watch journal is empty.'));
  note('journal-status','');
  get('journal-dialog').showModal();
});
get('open-search').addEventListener('click',()=>get('search-dialog').showModal());
function resultCard(row,source){
  const card=element('article',null,'search-row');
  const access=button('Where to watch in India',()=>{
    const watch=element('div',null,'watch');
    access.replaceWith(watch);
    void watchOptions(row,watch);
  });
  card.append(element('h3',row[1]),element('p',titleDetails(row),'small'),access,feedback(row,'search-status'));
  if(source?.startsWith('https://www.tvmaze.com/')){
    const credit=element('a','TVmaze','small');
    credit.href=source;
    card.append(credit);
  }
  return card;
}
async function tvmaze(path){
  const response=await fetch('https://api.tvmaze.com'+path,{signal:AbortSignal.timeout(5000)});
  if(response.status===404)return null;
  if(!response.ok)throw new Error('TV search unavailable.');
  return response.json();
}
function seriesMatch(show,rows){
  if(!show?.premiered||!show.name)return;
  const year=Number(show.premiered.slice(0,4));
  const name=words(show.name);
  const matches=rows.filter(row=>row[3]==='Series'&&row[2]===year&&words(row[1])===name);
  if(matches.length===1)return matches[0];
}
async function searchCast(query,rows,destination){
  const [filmResult,tvResult]=await Promise.allSettled([
    dataset('cast-search-v1.part'),tvmaze('/search/people?q='+encodeURIComponent(query))
  ]);
  if(filmResult.status==='rejected'&&tvResult.status==='rejected')throw new Error('Cast search unavailable.');
  const people=new Map();
  const films=(filmResult.value||[]).filter(([name])=>words(name).includes(query)).sort((a,b)=>
    Number(words(b[0])===query)-Number(words(a[0])===query)||b[1].length-a[1].length).slice(0,12);
  for(const [name,titles] of films){
    const key=words(name);
    const entry=people.get(key)||{name,titles:[],tv:[]};
    entry.titles.push(...titles);
    people.set(key,entry);
  }
  for(const {person} of (tvResult.value||[]).slice(0,8)){
    const key=words(person.name);
    const entry=people.get(key)||{name:person.name,titles:[],tv:[]};
    entry.tv.push(person.id);
    people.set(key,entry);
  }
  for(const {name,titles,tv} of [...people.values()].sort((a,b)=>
    Number(words(b.name)===query)-Number(words(a.name)===query)).slice(0,12)){
    destination.append(button(name,async ()=>{
      note('search-status','Loading credits…');
      const ids=new Set(titles);
      const films=rows.filter(row=>row[3]==='Film'&&ids.has(row[0])).map(row=>[row,null]);
      const results=await Promise.allSettled(tv.slice(0,3).map(id=>tvmaze('/people/'+id+'/castcredits?embed=show')));
      const series=new Map();
      for(const result of results){
        for(const credit of result.value||[]){
          const show=credit._embedded?.show;
          const row=seriesMatch(show,rows);
          if(row)series.set(row[0],[row,show.url]);
        }
      }
      const credits=[...films,...series.values()].sort((a,b)=>b[0][5]-a[0][5]);
      destination.replaceChildren(element('h3',name),...credits.slice(0,60).map(([row,source])=>resultCard(row,source)));
      note('search-status',credits.length?'':'No credits found in the catalogue.');
    }));
  }
}
async function searchTitles(raw,rows,destination){
  const match=raw.match(/^(?:https?:\/\/(?:www\.|m\.)?imdb\.com\/title\/)?(tt\d{7,11})(?:[/?#].*)?$/i);
  const id=match?(await dataset('movie-search-v1.part'))[match[1].toLowerCase()]:undefined;
  if(match&&!id){
    const show=await tvmaze('/lookup/shows?imdb='+match[1].toLowerCase());
    const row=seriesMatch(show,rows);
    if(row)destination.append(resultCard(row,show.url));
    return;
  }
  const query=words(raw);
  const picks=[];
  for(const row of rows){
    const name=match?'':words(row[1]);
    const rank=match?(row[3]==='Film'&&row[0]===id?3:0):name===query?3:name.startsWith(query)?2:name.includes(query)?1:0;
    if(rank)picks.push({row,rank});
  }
  picks.sort((a,b)=>b.rank-a.rank||b.row[5]-a.row[5]);
  destination.append(...picks.slice(0,12).map(({row})=>resultCard(row)));
}
get('search-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const control=event.currentTarget.querySelector('button');
  control.disabled=true;
  const destination=get('search-rows');
  destination.replaceChildren();
  note('search-status','Searching…');
  try{
    const raw=get('query').value.trim();
    const query=words(raw);
    if(query.length<2){note('search-status','Enter at least two characters.');return;}
    const rows=await catalogue();
    if(get('search-by').value==='cast')await searchCast(query,rows,destination);
    else await searchTitles(raw,rows,destination);
    note('search-status',destination.children.length?'':'No matches found.');
  }catch{
    note('search-status','Search is temporarily unavailable.');
  }finally{control.disabled=false;}
});
