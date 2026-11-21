const q = id => document.getElementById(id);
const storeKey = 'after-dark-ratings-v1';
const tokenKey = 'after-dark-tmdb';
let personalCatalog;
const formatMood = {
  espionage:'Espionage', military:'Tactical', power:'Power games', crime:'Crime',
  warm:'Warm and thoughtful', speculative:'Mind-bending', relationships:'Relationships',
  history:'History', action:'Action'
};
const uiGenres = ['Action','Adventure','Biography','Comedy','Crime','Drama','Family','Fantasy','History','Horror',
  'Mystery','Romance','Sci-Fi','Thriller','War','Western'];
let data;
let current;
let lastAvailability;
let accessToken = '';
let state = {history:{},journal:[]};
let storageAvailable = true;
try {
  accessToken = sessionStorage.getItem(tokenKey) || '';
  const prior = JSON.parse(localStorage.getItem(storeKey) || 'null');
  if (Array.isArray(prior)) state.journal = prior.filter(entry=>entry.item?.imdbId && moods[entry.mood]);
} catch { storageAvailable = false; }

function node(tag,text,className) {
  const element = document.createElement(tag);
  if (text != null) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function button(text,callback,className='quiet') {
  const control = node('button',text,className);
  control.type = 'button';
  control.addEventListener('click',callback);
  return control;
}
function link(text,url) {
  const anchor = node('a',text);
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  return anchor;
}
function save() {
  try { localStorage.setItem(storeKey,JSON.stringify(state.journal)); }
  catch { storageAvailable = false; }
}
function chooseMood(value) {
  const choice = node('input');
  choice.type = 'radio';
  choice.name = 'mood';
  choice.value = value;
  choice.required = true;
  choice.addEventListener('change',()=>{
    q('pick-button').disabled = !data || !personalCatalog;
    if (personalCatalog) q('status').textContent = '';
  });
  const label = node('label',null,'mood');
  label.append(choice,node('span',formatMood[value]));
  return label;
}
for (const mood of Object.keys(formatMood)) q('moods').append(chooseMood(mood));
for (const genre of uiGenres) {
  const option = node('option',genre);
  option.value = genre;
  q('genre').append(option);
}

function ratingForm(entry,onSave) {
  const form = node('form',null,'rating');
  const field = node('label','How well did it fit?');
  const selector = node('select');
  selector.required = true;
  selector.setAttribute('aria-label','Fit rating for ' + entry.item.title);
  const blank = node('option','Select a score');
  blank.value = '';
  selector.append(blank);
  for(let score=1;score<=10;score++){
    const option = node('option',score === 1 ? '1 / 10 · Poor fit' : score === 10 ? '10 / 10 · Exactly right' : score + ' / 10');
    option.value = String(score);
    selector.append(option);
  }
  selector.value = entry.rating ? String(entry.rating) : '';
  field.append(selector);
  form.append(field,node('button',entry.rating ? 'Update rating' : 'Save rating','quiet'));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const score = Number(selector.value);
    if (!Number.isInteger(score) || score < 1 || score > 10) return;
    entry.status = 'rated';
    entry.rating = score;
    save();
    onSave(score);
  });
  return form;
}
function drawJournal() {
  q('journal').replaceChildren();
  if (!state.journal.length) q('journal').append(node('p','Your picks will appear here.'));
  for (const entry of [...state.journal].reverse()) {
    const row = node('article',null,'journal-row');
    const content = [formatMood[entry.mood],entry.status === 'seen' ? 'Already seen' : entry.status === 'skip' ?
      'Skipped' : entry.rating ? entry.rating + ' / 10' : 'Unrated'];
    row.append(node('h3',entry.item.title),node('p',content.join(' · '),'small'));
    if (!['seen','skip'].includes(entry.status)) row.append(ratingForm(entry,()=>{
      drawJournal();
      if(current===entry) drawPick();
    }));
    q('journal').append(row);
  }
}
function drawPick() {
  if (!current) return;
  const {item,match,anchors,traits} = current;
  const result = q('result');
  result.hidden = false;
  const title = node('h2',item.title);
  const meta = node('p', [item.year || '',item.type,...item.genres].filter(Boolean).join(' · '),'meta');
  if (item.imdb) meta.append(' · ',link('IMDb ' + item.imdb.toFixed(1),'https://www.imdb.com/title/' + item.imdbId + '/ratings/'));
  result.replaceChildren(title,meta);
  if (item.description || lastAvailability?.overview) result.append(node('p',item.description || lastAvailability.overview,'synopsis'));
  if (item.insight) result.append(node('p',item.insight,'insight'));
  if (anchors.length) result.append(node('p','Character match with ' + anchors.join(' and ') + '.','small'));
  else if (match === 'genre') result.append(node('p','Matched by genre and your ratings. Character fit is unknown.','small'));

  const availability = node('div',null,'watch');
  availability.append(node('h3','Where to watch in India'));
  const options = watchOptions(lastAvailability);
  if (options.length) {
    for (const [label,names] of options) availability.append(node('p',label + ' · ' + names.join(', ')));
  } else {
    availability.append(node('p',lastAvailability ? 'No listing found for India.' :
      accessToken ? 'Availability could not be verified.' : 'Connect TMDb to show streaming services here.'));
  }
  availability.append(link('View availability',lastAvailability?.services?.link &&
    safeWatchLink(lastAvailability.services.link) || 'https://www.justwatch.com/in/search?q=' + encodeURIComponent(item.title)));
  result.append(availability);
  if (!['seen','skip'].includes(current.status)) {
    result.append(ratingForm(current,score=>{
      q('status').textContent = storageAvailable ? 'Saved '+score+'/10. Your next pick will use this.' :
        'Rated '+score+'/10 for this session. Browser storage is unavailable.';
      drawPick();
    }));
    const actions = node('div',null,'pick-actions');
    if (!current.rating) {
      for (const [status,label] of [['seen','Already seen'],['skip','Skip']]) actions.append(button(label,()=>{
        current.status = status;
        save();
        current = null;
        result.hidden = true;
        q('status').textContent = status === 'seen' ? 'Marked as seen.' : 'Skipped.';
      }));
    }
    result.append(actions);
  }
}
function safeWatchLink(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['www.themoviedb.org','www.justwatch.com'].includes(url.hostname) ? url.href : '';
  } catch { return ''; }
}
function setBusy(busy) {
  q('pick-button').disabled = busy || !data || !personalCatalog || !document.querySelector('input[name=mood]:checked');
  for (const control of q('pick-form').querySelectorAll('input,select')) control.disabled = busy;
}
q('pick-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const mood = document.querySelector('input[name=mood]:checked')?.value;
  if (!data || !mood || !personalCatalog) return;
  setBusy(true);
  q('status').textContent = 'Checking titles…';
  try {
    const settings = {mood,format:q('format').value,genre:q('genre').value,minRating:Number(q('min-rating').value),
      maxYear:new Date().getFullYear()};
    const result = await rankAvailable(data,state,settings,accessToken,fetch,
      async entry=>new Response(personalCatalog.file.slice(entry.begin,entry.begin+entry.length)
        .stream().pipeThrough(new DecompressionStream('gzip'))).json(),
      format=>personalCatalog.entries.filter(entry=>format==='all'||entry.format===format));
    if (!result.solution) {
      q('status').textContent = 'No fresh match. Try another genre or rating filter.';
      return;
    }
    const {item,match,anchors,traits} = result.solution;
    current = {item,match,anchors,traits,mood,status:'pending',rating:null,suggestedAt:new Date().toISOString()};
    lastAvailability = result.availability;
    state.journal.push(current);
    save();
    drawPick();
    q('status').textContent = result.error || '';
    q('result').scrollIntoView({block:'nearest',behavior:'smooth'});
  } catch (error) {
    q('status').textContent = error.message || 'The search failed. Try again.';
  } finally { setBusy(false); }
});
q('open-ratings').addEventListener('click',()=>{drawJournal();q('ratings').showModal();});
function showConnection() {
  q('disconnect').hidden = !accessToken;
  q('provider-status').textContent = accessToken ? 'Connected for this tab.' : '';
}
q('open-settings').addEventListener('click',()=>{
  showConnection();
  q('profile-status').textContent = personalCatalog ? 'Catalog and preferences are active on this device.' : 'Load your personal catalog once on this device.';
  q('settings').showModal();
});
q('disconnect').addEventListener('click',()=>{
  accessToken='';
  try { sessionStorage.removeItem(tokenKey); } catch {}
  showConnection();
});
q('provider-form').addEventListener('submit',async event=>{
  event.preventDefault();
  const supplied = q('token').value.trim();
  if (!supplied) return;
  q('provider-status').textContent='Checking connection…';
  const connect = q('provider-form').querySelector('[type=submit]');
  connect.disabled=true;
  try {
    await tmdb('/configuration',{},supplied);
    accessToken = supplied;
    q('token').value='';
    try { sessionStorage.setItem(tokenKey,supplied); } catch {}
    showConnection();
    if (current) {
      try { lastAvailability=await providersFor(current.item,accessToken); } catch { lastAvailability=null; }
      drawPick();
    }
  } catch(error) { q('provider-status').textContent=error.message; }
  finally { connect.disabled=false; }
});
function privateStore(mode, action) {
  return new Promise((resolve,reject)=>{
    const open=indexedDB.open('after-dark-personal',1);
    open.onupgradeneeded=()=>open.result.createObjectStore('files');
    open.onerror=()=>reject(open.error);
    open.onsuccess=()=>{
      const database=open.result;
      const task=database.transaction('files',mode);
      const request=action(task.objectStore('files'));
      task.oncomplete=()=>{database.close();resolve(request.result);};
      task.onerror=()=>{database.close();reject(task.error);};
      task.onabort=()=>{database.close();reject(task.error);};
    };
  });
}
async function readPersonalCatalog(file) {
  if (!file || file.size<14 || file.size>80_000_000) throw new Error('Choose your After Dark personal catalog.');
  const head=await file.slice(0,14).arrayBuffer();
  const decoder=new TextDecoder();
  if(decoder.decode(head.slice(0,10))!=='AFTERDARK\0') throw new Error('Choose your After Dark personal catalog.');
  const length=new DataView(head).getUint32(10);
  if(length<=0||length>4_000_000||14+length>=file.size) throw new Error('This catalog file is incomplete.');
  const meta=JSON.parse(await file.slice(14,14+length).text());
  const profile=meta.profile;
  if(meta.version!==1||!Array.isArray(meta.entries)||!meta.entries.length||
      !profile||!Array.isArray(profile.history)||!Array.isArray(profile.signals)||!profile.knownEnjoyment) {
    throw new Error('This catalog format is unsupported.');
  }
  const entries=meta.entries.map(entry=>({...entry,begin:14+length+entry.offset}));
  if (entries.some(entry=>!['Film','Series'].includes(entry.format)||!Number.isSafeInteger(entry.begin)||
      !Number.isSafeInteger(entry.length)||entry.begin<14+length||entry.length<=0||entry.begin+entry.length>file.size)) {
    throw new Error('This catalog file is incomplete.');
  }
  return {file,entries,profile};
}
function applyCatalog(catalog) {
  personalCatalog=catalog;
  data.history=catalog.profile.history;
  data.signals=catalog.profile.signals;
  data.knownEnjoyment=catalog.profile.knownEnjoyment;
  state.history=Object.fromEntries(Object.keys(data.knownEnjoyment).map(id=>[id,'enjoyed']));
  q('status').textContent='';
  setBusy(false);
}
q('profile-file').addEventListener('change',async event=>{
  const file=event.target.files?.[0];
  if(!data||!file)return;
  try {
    const catalog=await readPersonalCatalog(file);
    applyCatalog(catalog);
    try {
      await privateStore('readwrite',store=>store.put(file,'catalog'));
      q('profile-status').textContent='Catalog and preferences are active on this device.';
    } catch { q('profile-status').textContent='Catalog active until you close this page.'; }
  } catch(error){q('profile-status').textContent=error.message;}
  finally{event.target.value='';}
});
readJson('catalog-data.json').then(async publicData=>{
  data=publicData;
  try{
    const file=await privateStore('readonly',store=>store.get('catalog'));
    if(file) applyCatalog(await readPersonalCatalog(file));
  } catch {}
  if(!personalCatalog) q('status').replaceChildren(button('Load your personal catalog',()=>q('open-settings').click()));
}).catch(error=>q('status').textContent=error.message);
