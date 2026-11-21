function showCastCredits(destination,name,back,credits,render,rating,votes) {
  const ordered=[...credits].sort((first,second)=>
    (rating(second)||0)-(rating(first)||0) || (votes(second)||0)-(votes(first)||0));
  const button=(label,action)=>{
    const control=document.createElement('button');
    control.type='button';
    control.className='quiet';
    control.textContent=label;
    control.addEventListener('click',action);
    return control;
  };
  const heading=document.createElement('h3');
  heading.textContent=name;
  const more=button('Show more',showNext);
  let offset=0;
  function showNext() {
    more.remove();
    const page=ordered.slice(offset,offset+20);
    destination.append(...page.map(render));
    offset+=page.length;
    if(offset<ordered.length)destination.append(more);
  }
  destination.replaceChildren(button('Back to names',back),heading);
  showNext();
}
