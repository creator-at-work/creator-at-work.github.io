importScripts('recommend.js?v=9');

const indexes=new Map();
const moodIndexes=new Map();
const ratings=['under-6',6,7,7.5,8];
let database;
let annotations;

function cacheDatabase() {
  database ??= new Promise(resolve=>{
    try{
      const request=indexedDB.open('afterdark-catalogue-index',1);
      request.onupgradeneeded=()=>request.result.createObjectStore('shards');
      request.onsuccess=()=>resolve(request.result);
      request.onerror=request.onblocked=()=>resolve(null);
    }catch{resolve(null);}
  });
  return database;
}

async function cachedShard(key,value) {
  const db=await cacheDatabase();
  if(!db)return;
  return new Promise(resolve=>{
    try{
      const transaction=db.transaction('shards',value?'readwrite':'readonly');
      const store=transaction.objectStore('shards');
      const request=value?store.put(value,key):store.get(key);
      transaction.oncomplete=()=>resolve(request.result);
      transaction.onerror=transaction.onabort=()=>resolve(undefined);
    }catch{resolve(undefined);}
  });
}

async function readShard(base,name) {
  const response=await fetch(new URL(name,base),{credentials:'same-origin'});
  if(!response.ok)throw new Error('The catalogue could not load. Try again.');
  const blob=await response.blob();
  return new Response(blob.stream().pipeThrough(new DecompressionStream('gzip'))).json();
}

function buildIndex(rows,genreCount) {
  const genres=Array.from({length:genreCount},()=>[]);
  const rating=Object.fromEntries(ratings.map(value=>[value,[]]));
  for(let position=0;position<rows.length;position++){
    const row=rows[position];
    for(let mask=row[4];mask;mask&=mask-1){
      const bit=31-Math.clz32(mask&-mask);
      genres[bit].push(position);
    }
    if(row[5]){
      for(const value of ratings){
        if(matchesRating(row[5]/10,value))rating[value].push(position);
      }
    }
  }
  return {rows,genres:genres.map(list=>Uint32Array.from(list)),
    rating:Object.fromEntries(Object.entries(rating).map(([value,list])=>[value,Uint32Array.from(list)]))};
}

function loadIndex(base,name,genreCount) {
  const key=base+name+':'+genreCount;
  if(!indexes.has(key)){
    const loading=(async()=>{
      const cached=await cachedShard(key);
      if(cached)return cached;
      const index=buildIndex(await readShard(base,name),genreCount);
      await cachedShard(key,index);
      return index;
    })().catch(error=>{indexes.delete(key);throw error;});
    indexes.set(key,loading);
  }
  return indexes.get(key);
}

function loadAnnotations(base) {
  annotations ??= readShard(base,'moods.part').then(index=>{
    if(index.schema!==1||!index.titles)throw new Error('The mood index could not load.');
    return index.titles;
  }).catch(error=>{annotations=null;throw error;});
  return annotations;
}

function moodPostings(index,annotations) {
  if(!moodIndexes.has(index)){
    const tags={mood:{},focus:{}};
    for(let position=0;position<index.rows.length;position++){
      const title=annotations[index.rows[position][0]];
      if(!title)continue;
      for(const group of ['mood','focus']){
        for(const name of Object.keys(title[group]||{})){
          (tags[group][name] ??= []).push(position);
        }
      }
    }
    moodIndexes.set(index,tags);
  }
  return moodIndexes.get(index);
}

function* indexedRows(index,settings,genre) {
  const lists=[index.genres[genre],index.rating[settings.minRating]];
  if(settings.annotations){
    const tags=moodPostings(index,settings.annotations);
    if(settings.mood!=='any')lists.push(tags.mood[settings.mood]??[]);
    if(settings.focus!=='any')lists.push(tags.focus[settings.focus]??[]);
  }
  // Every match is in the smallest selected list. The ranker checks the remaining filters.
  const shortest=lists.reduce((best,list)=>list&&(!best||list.length<best.length)?list:best,null);
  if(shortest){
    for(const position of shortest)yield index.rows[position];
  }else{
    yield* index.rows;
  }
}

async function search({base,files,data,state,settings,warmOnly}) {
  const genreCount=data.indexGenres.length;
  const load=name=>loadIndex(base,name,genreCount);
  const genre=data.indexGenres.indexOf(settings.genre);
  settings.annotations=settings.mood==='any'&&settings.focus==='any'?null:await loadAnnotations(base);
  if(warmOnly){
    for await(const index of catalogueBatches(files,load)){
      if(settings.annotations)moodPostings(index,settings.annotations);
    }
    return;
  }
  const filesFor=()=>files;
  const ranked=await rankAvailable(data,state,settings,async name=>indexedRows(await load(name),settings,genre),filesFor);
  if(ranked.picks.length)return ranked;
  // Preserve the existing no-match diagnosis only when the indexed search returns no picks.
  return rankAvailable(data,state,settings,async name=>(await load(name)).rows,filesFor);
}

self.onmessage=async({data:message})=>{
  try{
    const result=await search(message);
    self.postMessage({id:message.id,result});
  }catch(error){
    self.postMessage({id:message.id,error:error.message});
  }
};
