const reply = (status, data) => Response.json(data, {status, headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});

// There is deliberately no public read endpoint. Requests are viewed in Cloudflare D1 Studio.
export async function onRequest({request, env}) {
  if (request.method !== 'POST') return reply(405, {success:false});
  const url = new URL(request.url);
  if (request.headers.get('Origin') !== url.origin) return reply(403, {success:false});
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply(415,{success:false});
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400,{success:false});
    let bytes=0, chunks=[];
    while (true) {
      const {value,done}=await reader.read(); if(done)break;
      bytes+=value.byteLength;
      if(bytes>12000){await reader.cancel();return reply(413,{success:false});}
      chunks.push(value);
    }
    const buffer=new Uint8Array(bytes);let offset=0;
    for(const chunk of chunks){buffer.set(chunk,offset);offset+=chunk.byteLength;}
    let data;
    try { data=JSON.parse(new TextDecoder().decode(buffer)); } catch { return reply(400,{success:false}); }
    if(!data || typeof data!=='object')return reply(400,{success:false});
    if(data.botcheck)return reply(400,{success:false});
    const {nombre,whatsapp,necesidad}=data;
    if(typeof nombre!=='string'||typeof whatsapp!=='string'||typeof necesidad!=='string')return reply(400,{success:false});
    if(nombre.trim().length<2||nombre.length>100||necesidad.trim().length<10||necesidad.length>2000||!/^\+?[0-9 ()-]{7,25}$/.test(whatsapp)||whatsapp.replace(/\D/g,'').length<7)return reply(400,{success:false});
    if(!env.SOLICITUDES)return reply(503,{success:false});
    const now=new Date();
    const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${now.toISOString().slice(0,10)}:${request.headers.get('CF-Connecting-IP')||'local'}`));
    const hash=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
    // Atomic insert plus rate guard. No raw IP, request body, or contact details are logged.
    const result=await env.SOLICITUDES.prepare(`INSERT INTO solicitudes (id,fecha,nombre,whatsapp,necesidad,origen_hash)
      SELECT ?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM solicitudes WHERE origen_hash=? AND fecha>?)<5`)
      .bind(crypto.randomUUID(),now.toISOString(),nombre.trim(),whatsapp.trim(),necesidad.trim(),hash,hash,new Date(now.getTime()-3600000).toISOString()).run();
    if(!result.meta.changes)return reply(429,{success:false});
    return reply(201,{success:true});
  } catch { return reply(503,{success:false}); }
}
