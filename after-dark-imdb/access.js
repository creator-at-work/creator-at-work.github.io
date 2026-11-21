const afterdarkWebsite=(()=>{
  const api='https://after-dark.jatinbhatt.workers.dev/travel-web';
  const storageKey='afterdark-website-session';
  const valid=value=>typeof value==='string'&&/^[A-Za-z0-9_-]{43}$/.test(value);
  let token;
  const record=value=>{
    token=value;
    try{
      if(value)sessionStorage.setItem(storageKey,value);
      else sessionStorage.removeItem(storageKey);
    }catch{}
  };
  try{token=sessionStorage.getItem(storageKey);}catch{}
  const savedLink='Open your saved private link to start Afterdark.';
  const status=text=>{document.getElementById('access-status').textContent=text;};
  async function request(path,options){
    const headers=new Headers(options?.headers);
    if(valid(token))headers.set('Authorization','Bearer '+token);
    const endpoint=path==='/auth/logout'?'/logout':path;
    const response=await fetch(api+endpoint,{...options,headers,credentials:'omit',cache:'no-store'});
    if(response.status===401){
      record(null);
      document.getElementById('main').hidden=true;
      document.getElementById('app-nav').hidden=true;
      document.getElementById('access').hidden=false;
      status(savedLink);
    }
    return response;
  }
  async function open(initialize){
    const key=location.hash.slice(1);
    try{
      if(key){
        if(!valid(key)){status('This private link is incomplete.');return;}
        const response=await fetch(api+'/redeem',{
          method:'POST',body:key,credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer'
        });
        if(response.status===401){status('This private link is invalid or expired.');return;}
        if(!response.ok)throw new Error();
        const grant=(await response.json()).token;
        if(!valid(grant))throw new Error();
        record(grant);
        history.replaceState(null,'',location.pathname);
      }
      if(!valid(token)){status(savedLink);return;}
      await initialize();
      document.getElementById('main').hidden=false;
      document.getElementById('app-nav').hidden=false;
      document.getElementById('access').hidden=true;
    }catch{
      status(valid(token)||key?'Could not load Afterdark. Open your saved link again.':savedLink);
    }
  }
  return {open,request,close(){record(null);location.reload();}};
})();
