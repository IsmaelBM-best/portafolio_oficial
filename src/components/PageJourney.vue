<script setup>
import {ref,computed,onMounted,onBeforeUnmount} from 'vue';
import MacbookScene from './MacbookScene.vue';
import ergasia from '../assets/brands/ergasia.png';
import pawly from '../assets/brands/pawly.png';
import replay from '../assets/brands/replay.png';
import pleon from '../assets/brands/pleon.png';
import trio from '../assets/brands/trio.png';
defineProps({es:Boolean});
const state=ref({x:0,y:0,scale:0,angle:0,tilt:0,hue:260,progress:0,opacity:0,spread:0,roll:0,hinge:-.14,behind:false}),reduced=ref(false);
const logos=[{name:'Ergasia',src:ergasia},{name:'PLEON',src:pleon},{name:'Pawly',src:pawly},{name:'Veltrix',sprite:0},{name:'Nexora',sprite:1},{name:'Replay',src:replay}];
const camera=computed(()=>({transform:`translate3d(${state.value.x}px,${state.value.y}px,0) scale(${state.value.scale}) rotateX(${state.value.tilt}deg) rotateY(${state.value.angle}deg) rotateZ(${state.value.angle*.13}deg)`,opacity:state.value.opacity}));
function logoStyle(i){const p=state.value.progress,a=i/6*Math.PI*2+p*2.6;return {transform:`translate3d(${Math.cos(a)*(420+state.value.spread*90)}px,${Math.sin(a)*220}px,${Math.sin(a)*65}px) rotateZ(${-state.value.angle*.13}deg) rotateY(${-state.value.angle}deg)`, '--logo-color':[260,275,32,200,315,350][i]};}
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t;
let cleanup;
onMounted(()=>{
 let frame=0,points=[],obstacles=[],width=innerWidth,height=innerHeight;const media=matchMedia('(prefers-reduced-motion: reduce)');
 function measure(){width=innerWidth;height=innerHeight;points=[...document.querySelectorAll('[data-journey]')].map(el=>{const r=el.getBoundingClientRect();return {at:r.top+scrollY+r.height/2-height*.5,x:r.left+r.width/2,y:r.top+scrollY+r.height/2,scale:Math.min(r.width/(width<761?800:680),r.height/450),angle:Number(el.dataset.angle),hue:Number(el.dataset.hue),name:el.dataset.journey}});obstacles=[...document.querySelectorAll('main h1,main h2,main h3,main p:not(.eyebrow),main .actions,main .spatial-stage,main .portrait-wrap,main .software-features')].map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top+scrollY,bottom:r.bottom+scrollY}});}
 function update(){frame=0;reduced.value=media.matches;if(!points.length)return;const mobile=width<761,scroll=scrollY;
 let index=points.findIndex(p=>p.at>scroll);if(index<0)index=points.length;const a=points[Math.max(0,index-1)],b=points[Math.min(points.length-1,index)],t=a===b?0:clamp((scroll-a.at)/(b.at-a.at)),e=t*t*t*(t*(t*6-15)+10),travel=Math.pow(Math.sin(Math.PI*t),2);
 let x=mix(a.x,b.x,e),y=height*.5-travel*height*.08,scale=mix(a.scale,b.scale,e)*(1+travel*.10),opacity=1;
 if(scroll<points[0].at)y=points[0].y-scroll;
 if(scroll>points.at(-1).at)y=points.at(-1).y-scroll;
 if(mobile){const nearest=Math.abs(a.at-scroll)<Math.abs(b.at-scroll)?a:b;const relativeY=nearest.y-scroll,focus=clamp(Math.min((relativeY-100)/100,(height-100-relativeY)/100));x=mix(width-48,(width-15)/2,focus);y=clamp(relativeY,140,height-100);scale=mix(.10,nearest.scale,focus);opacity=mix(.22,1,focus);}
 let behind=false;
 {const overlaps=(cx,cy,sc)=>obstacles.some(r=>r.right>cx-340*sc&&r.left<cx+340*sc&&r.bottom-scroll>cy-215*sc&&r.top-scroll<cy+230*sc);if(overlaps(x,y,scale)){behind=true;opacity *= mobile ? .30 : .42;}}
 state.value={x,y,scale,angle:mix(a.angle,b.angle,e)*1.45+travel*46*(b.x>a.x?1:-1),tilt:8+travel*18,roll:mix(a.angle,b.angle,e)*-.17+travel*7,hinge:-.13-travel*.28,behind,hue:mix(a.hue,b.hue,e),progress:clamp(scroll/(document.documentElement.scrollHeight-height)),opacity,spread:travel};
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};const resize=()=>{measure();schedule()};
 measure();update();const observer=new ResizeObserver(resize);observer.observe(document.querySelector('main'));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize);media.addEventListener('change',resize);
 cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',resize);media.removeEventListener('change',resize)};
});
onBeforeUnmount(()=>cleanup?.());
</script>
<template>
 <div class="page-atmosphere" aria-hidden="true" :style="{'--route-hue':state.hue,'--page-progress':state.progress}"><i class="color-stream stream-violet"></i><i class="color-stream stream-cyan"></i><i class="color-stream stream-rose"></i><div class="color-grain"></div></div>
 <MacbookScene :pose="state" :reduced="reduced" />
 <div class="page-journey" :class="{'page-journey-reduced':reduced}" aria-hidden="true" :style="{'--route-hue':state.hue}">
  <div class="journey-camera" :style="camera"><div class="camera-light"></div><div class="travel-logos"><div v-for="(logo,i) in logos" :key="logo.name" class="travel-logo" :style="logoStyle(i)"><img v-if="logo.src" :src="logo.src" alt="" width="90" height="90" :class="{'logo-pawly':logo.name==='Pawly'}"><span v-else class="travel-sprite" :style="{backgroundImage:`url(${trio})`,backgroundPosition:logo.sprite===0?'left center':'center'}"></span><small>{{logo.name}}</small></div></div></div>
 </div>
 <div class="page-scroll-track" aria-hidden="true"><i :style="{transform:`scaleX(${state.progress})`}"></i></div>
</template>
