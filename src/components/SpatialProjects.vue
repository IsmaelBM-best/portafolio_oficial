<script setup>
import MaterialIcon from './MaterialIcon.vue';
import ProductScene from './ProductScene.vue';
import {computed,ref,onMounted,onBeforeUnmount} from 'vue';
const props=defineProps({projects:Array,es:Boolean});
const turn=ref(0),paused=ref(false),hovered=ref(false),focused=ref(false),visible=ref(false),reduced=ref(false),stage=ref(null),dialog=ref(null),detail=ref(null);
const active=computed(()=>((turn.value%props.projects.length)+props.projects.length)%props.projects.length);
const current=computed(()=>props.projects[active.value]);
const t=(a,b)=>props.es?a:b;
let timer,observer,controller,startX=null;
function select(i){const n=props.projects.length;let d=(i-active.value+n)%n;if(d>n/2)d-=n;turn.value+=d;}
function move(d){turn.value+=d;}
function key(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}
function touchStart(e){if(e.pointerType==='touch')startX=e.clientX}
function touchEnd(e){if(startX!==null){const dx=e.clientX-startX;if(Math.abs(dx)>45)move(dx<0?1:-1);startX=null}}
function open(){detail.value=current.value;dialog.value.showModal()}
onMounted(()=>{controller=new AbortController();const m=matchMedia('(prefers-reduced-motion: reduce)');reduced.value=m.matches;m.addEventListener('change',()=>reduced.value=m.matches,{signal:controller.signal});observer=new IntersectionObserver(([e])=>visible.value=e.isIntersecting,{threshold:.2});observer.observe(stage.value);timer=setInterval(()=>{if(visible.value&&!paused.value&&!hovered.value&&!focused.value&&!reduced.value&&!document.hidden&&!dialog.value.open)move(1)},5200)});
onBeforeUnmount(()=>{clearInterval(timer);observer?.disconnect();controller?.abort()});
</script>
<template>
<div class="spatial-showcase" :style="{'--active-hue':current.hue||245}" @pointerenter="hovered=true" @pointerleave="hovered=false" @focusin="focused=true" @focusout="e=>{if(!e.currentTarget.contains(e.relatedTarget))focused=false}">
 <div class="showcase-status"><span><i></i>{{t('EXPLORA LO QUE CONSTRUIMOS','EXPLORE WHAT WE BUILD')}}</span><button @click="paused=!paused" :aria-pressed="paused" :aria-label="paused?t('Reanudar carrusel','Resume carousel'):t('Pausar carrusel','Pause carousel')"><MaterialIcon :name="paused?'play_arrow':'pause'"/> {{paused?t('Reanudar','Resume'):t('Pausar','Pause')}}</button></div>
 <div ref="stage" class="spatial-stage" tabindex="0" role="region" aria-roledescription="carousel" :aria-label="t('Proyectos en 3D. Usa las flechas o desliza.','3D projects. Use arrow keys or swipe.')" @keydown="key" @pointerdown="touchStart" @pointerup="touchEnd" @pointercancel="startX=null">
  <div class="gallery-atmosphere" aria-hidden="true"><span></span><span></span><span></span></div><div class="spatial-halo" aria-hidden="true"></div><div class="spatial-floor" aria-hidden="true"></div>
  <div class="spatial-mount"><div class="spatial-ring" :style="{'--rotation':(-turn*360/projects.length)+'deg','--depth':1/(2*Math.tan(Math.PI/projects.length))}">
   <button v-for="(p,i) in projects" :key="p.name" class="spatial-face" :class="{selected:i===active}" :style="{'--angle':i*360/projects.length+'deg'}" :tabindex="i===active?0:-1" :aria-hidden="i!==active" :aria-label="t('Ver detalles de ','View details of ')+p.name" @click="open">
    <ProductScene :project="p" :es="es" />
   </button>
  </div></div>
 </div>
 <div class="spatial-controls"><button class="arrow-control" @click="move(-1)" :aria-label="t('Proyecto anterior','Previous project')"><MaterialIcon name="arrow_back"/></button><div class="project-selectors"><button v-for="(p,i) in projects" :key="p.name" :aria-label="t('Seleccionar ','Select ')+p.name" :aria-pressed="i===active" @click="select(i)"><span></span></button></div><button class="arrow-control" @click="move(1)" :aria-label="t('Proyecto siguiente','Next project')"><MaterialIcon name="arrow_forward"/></button><span class="spatial-count">0{{active+1}} / 0{{projects.length}}</span></div>
 <div class="spatial-description" :aria-live="paused||focused?'polite':'off'"><Transition name="project-change" mode="out-in"><div :key="current.name" class="spatial-description-inner"><div><p class="eyebrow">{{current.tags}}</p><h3>{{current.name}}</h3><h4>{{current.title}}</h4></div><div><p>{{current.body}}</p><div class="actions"><button class="button secondary" @click="open">{{t('Explorar proyecto','Explore project')}} <MaterialIcon name="north_east"/></button><a class="text-link" :href="current.url" :target="current.url.startsWith('#')?undefined:'_blank'" rel="noopener noreferrer">{{current.link}} <MaterialIcon name="north_east"/></a></div></div></div></Transition></div>
 <div class="project-index"><button v-for="(p,i) in projects" :key="p.name" :aria-pressed="i===active" @click="select(i)"><span>0{{i+1}}</span>{{p.name}}</button></div>
 <dialog ref="dialog" class="project-modal" @click="e=>{if(e.target===dialog)dialog.close()}"><template v-if="detail"><div class="modal-top"><span>{{detail.type}}</span><button @click="dialog.close()" :aria-label="t('Cerrar proyecto','Close project')"><MaterialIcon name="close"/></button></div><ProductScene :project="detail" :es="es" /><div class="modal-copy"><p class="eyebrow">{{detail.tags}}</p><h3>{{detail.name}}</h3><h4>{{detail.title}}</h4><p>{{detail.body}}</p><a class="button primary" :href="detail.url" :target="detail.url.startsWith('#')?undefined:'_blank'" rel="noopener noreferrer" @click="dialog.close()">{{detail.link}} <MaterialIcon name="north_east"/></a></div></template></dialog>
</div>
</template>
