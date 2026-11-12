import test from 'node:test';
import assert from 'node:assert/strict';
import {clearanceOpacity} from '../src/three/layout-safety.js';
const model={left:100,right:500,top:100,bottom:400};
test('model is hidden when overlapping a copy or button',()=>{
 assert.equal(clearanceOpacity(model,[{left:450,right:600,top:250,bottom:300}]),0);
});
test('model fades before contact and remains visible in reserved space',()=>{
 assert.equal(clearanceOpacity(model,[{left:524,right:600,top:250,bottom:300}]),.5);
 assert.equal(clearanceOpacity(model,[{left:548,right:600,top:250,bottom:300}]),1);
 assert.equal(clearanceOpacity(model,[]),1);
});
