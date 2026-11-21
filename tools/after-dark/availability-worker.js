const origins=new Set(['https://jatinbhatt.me','https://www.jatinbhatt.me','https://creator-at-work.github.io']);

export default {
  async fetch(request,env){
    if(new URL(request.url).pathname!=='/api/providers')return env.ASSETS.fetch(request);
    const origin=request.headers.get('Origin');
    if(!origins.has(origin))return new Response(null,{status:403});
    const headers={
      'Access-Control-Allow-Origin':origin,
      'Access-Control-Allow-Methods':'POST, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type',
      'Cache-Control':'no-store',
      Vary:'Origin'
    };
    if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
    if(request.method!=='POST')return new Response(null,{status:405,headers});
    let ids;
    try{
      const body=await request.text();
      if(body.length>400)return new Response(null,{status:413,headers});
      ids=JSON.parse(body).ids;
      if(!Array.isArray(ids)||!ids.length||ids.length>8||ids.some(id=>
        typeof id!=='string'||!/^(movie|tv)\/[1-9]\d{0,8}$/.test(id)))throw new Error();
    }catch{
      return Response.json({error:'Invalid title list.'},{status:400,headers});
    }
    try{
      const entries=await env.STREAMING.availability([...new Set(ids)]);
      return Response.json({entries},{headers});
    }catch{
      return Response.json({error:'India listings unavailable.'},{status:503,headers});
    }
  }
};
