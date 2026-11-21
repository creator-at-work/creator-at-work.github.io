const afterdarkWebsite=(()=>{
  const api='https://after-dark.jatinbhatt.workers.dev/after-dark-imdb';
  return {
    catalogueURL:api+'/catalog/',
    request(path,options){
      return fetch(api+path,{...options,credentials:'omit'});
    },
    open(initialize){
      if(location.hash.length===44 && /^#[A-Za-z0-9_-]{43}$/.test(location.hash)){
        history.replaceState(null,'',location.pathname);
      }
      initialize().catch(error=>{
        document.getElementById('status').textContent=error.message;
      });
    },
    close(){
      location.reload();
    }
  };
})();
