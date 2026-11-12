import test from 'node:test';
import assert from 'node:assert/strict';
import {onRequest} from '../functions/api/solicitudes.js';
const valid={nombre:'Prueba técnica',whatsapp:'+570000000000',necesidad:'Solicitud de prueba, no es un cliente real.'};
function request(body=valid,options={}){return new Request('https://ismael-bm.pages.dev/api/solicitudes',{method:'POST',headers:{Origin:'https://ismael-bm.pages.dev','Content-Type':'application/json'},body:JSON.stringify(body),...options});}
test('no public reading, foreign origins, invalid JSON or excessive bodies',async()=>{
 for(const [req,status] of [[new Request('https://ismael-bm.pages.dev/api/solicitudes'),405],[request(valid,{headers:{Origin:'https://other.example'}}),403],[request({}, {body:'not json'}),400],[request({...valid,necesidad:'x'.repeat(13000)}),413],[request({...valid,whatsapp:'abc'}),400],[request({...valid,botcheck:'on'}),400]])assert.equal((await onRequest({request:req,env:{}})).status,status);
});
test('stores privately via bound values; only acknowledges after persistence',async()=>{
 let values;
 const env={SOLICITUDES:{prepare(sql){assert.ok(sql.includes('WHERE'));return {bind(...args){values=args;return {run:async()=>({meta:{changes:1}})}}}}}};
 const response=await onRequest({request:request(),env});assert.equal(response.status,201);assert.deepEqual(await response.json(),{success:true});assert.equal(values[2],valid.nombre);assert.equal(values[3],valid.whatsapp);assert.equal(values[5].length,64);assert.equal(response.headers.get('cache-control'),'no-store');
});
test('rate limits and storage outages do not pretend to save',async()=>{
 assert.equal((await onRequest({request:request(),env:{}})).status,503);
 const env={SOLICITUDES:{prepare(){return{bind(){return{run:async()=>({meta:{changes:0}})}}}}}};
 assert.equal((await onRequest({request:request(),env})).status,429);
});
