const code=location.hash.slice(1);
if(/^[A-Za-z0-9_-]{43}$/.test(code)){
  history.replaceState(null,'',location.pathname);
  location.replace('https://after-dark.jatinbhatt.workers.dev/travel#'+code);
}
