import test from 'node:test';
import assert from 'node:assert/strict';
import {whatsappUrl, serviceQuestions} from '../src/lib/whatsapp.js';
test('all service links preserve their distinct question and business destination',()=>{
 for(const language of ['es','en']){
  assert.equal(new Set(serviceQuestions[language]).size,4);
  for(const message of serviceQuestions[language]){
   const url=new URL(whatsappUrl(message));
   assert.equal(url.hostname,'wa.me');
   assert.equal(url.pathname,'/573007982609');
   assert.equal(url.searchParams.get('text'),message);
  }
 }
});
