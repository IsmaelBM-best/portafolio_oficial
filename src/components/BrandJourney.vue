<script setup>
import {ref,computed,onMounted,onBeforeUnmount} from 'vue';
import DeviceFleet from './DeviceFleet.vue';
import ergasia from '../assets/brands/ergasia.png';
import pawly from '../assets/brands/pawly.png';
import replay from '../assets/brands/replay.png';
import pleon from '../assets/brands/pleon.png';
import trio from '../assets/brands/trio.png';
import '../styles/brand-journey.css';
defineProps({es:Boolean});
const root=ref(null),progress=ref(0),reduced=ref(false),mobile=ref(false);
const brands=[{name:'Ergasia',image:ergasia},{name:'PLEON',image:pleon},{name:'Pawly',image:pawly},{name:'Veltrix',sprite:0},{name:'Nexora',sprite:1},{name:'Replay',image:replay},{name:'CareFlow',word:'CareFlow'},{name:'Ib.Commerce',word:'ib.commerce'},{name:'Ismael Trivia',word:'Trivia'}];
const phase=computed(()=>progress.value<.28?0:progress.value<.73?1:2);
const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)};
function pose(i){
 if(reduced.value)return {};
 const p=progress.value,a=i/9*Math.PI*2-Math.PI/2+p*Math.PI*2;
 const spread=smooth(p/.22),assemble=smooth((p-.70)/.28),m=mobile.value;
 const radius=m?150:490,ry=m?160:205;
 const x=Math.cos(a)*radius*(.55+.45*spread),y=Math.sin(a)*ry;
 const gx=(i%3-1)*(m?104:230),gy=(Math.floor(i/3)-1)*(m?110:145);
 const z=Math.cos(a)*55*(1-assemble),scale=(.48+.14*(Math.cos(a)+1)/2)*(1-assemble)+assemble;
 return {transform:`translate3d(${x*(1-assemble)+gx*assemble}px,${y*(1-assemble)+gy*assemble}px,${z}px) rotateY(${Math.sin(a)*-28*(1-assemble)}deg) rotateZ(${Math.sin(a)*9*(1-assemble)}deg) scale(${scale})`,opacity:m?Math.max(.2,smooth((p-.38)/.3)):1,zIndex:Math.round(z+100),'--brand-depth':(Math.cos(a)+1)/2};
}
let cleanup;
onMounted(()=>{
 const media=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
 const update=()=>{frame=0;reduced.value=media.matches;mobile.value=innerWidth<761;const r=root.value.getBoundingClientRect();progress.value=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));};
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);media.addEventListener('change',schedule);update();
 cleanup=()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);media.removeEventListener('change',schedule)};
});
onBeforeUnmount(()=>cleanup?.());
</script>
<template>
<section ref="root" id="ecosystem" class="brand-journey" :class="{'journey-reduced':reduced}" :style="{'--journey-progress':progress}" aria-labelledby="journey-title">
 <div class="journey-sticky">
  <div class="journey-light" aria-hidden="true"></div><div class="journey-grid" aria-hidden="true"></div>
  <div class="journey-heading container"><p class="eyebrow">{{es?'UN ECOSISTEMA DE IDEAS IMPLEMENTADAS':'AN ECOSYSTEM OF IMPLEMENTED IDEAS'}}</p><h2 id="journey-title">{{es?['Cada idea,','Todo se conecta.','Identidad propia.'][phase]:['Every idea,','Everything connects.','Distinct identities.'][phase]}}<br><span>{{es?['un universo propio.','Nada se queda quieto.','Una misma visión.'][phase]:['its own universe.','Always moving forward.','One shared vision.'][phase]}}</span></h2></div>
  <DeviceFleet :progress="progress" :es="es" />
  <div class="brand-universe" :aria-label="es?'Proyectos y marcas':'Projects and brands'">
   <div class="universe-orbit orbit-one" aria-hidden="true"></div><div class="universe-orbit orbit-two" aria-hidden="true"></div>
   <article v-for="(brand,i) in brands" :key="brand.name" class="brand-satellite" :style="pose(i)">
    <div class="brand-glass"><div class="brand-shine"></div><img v-if="brand.image" :src="brand.image" :alt="brand.name" width="130" height="130" loading="lazy" :class="{'pawly-mark':brand.name==='Pawly','pleon-mark':brand.name==='PLEON'}"><span v-else-if="brand.sprite!==undefined" class="brand-sprite" :style="{backgroundImage:`url(${trio})`,backgroundPosition:brand.sprite===0?'0% center':'50% center'}" role="img" :aria-label="brand.name"></span><span v-else class="brand-wordmark">{{brand.word}}</span></div><span class="brand-name">{{brand.name}}</span>
   </article>
  </div>
  <div class="journey-footer container"><span>{{es?'DESPLÁZATE PARA EXPLORAR':'SCROLL TO EXPLORE'}} <b>↓</b></span><div class="journey-track"><i></i></div><a href="#projects">{{es?'Ver proyectos':'View projects'}} ↗</a></div>
 </div>
</section>
</template>
