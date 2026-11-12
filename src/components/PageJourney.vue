<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue';
import MacbookScene from './MacbookScene.vue';
defineProps({es:Boolean});
const state=ref({x:0,y:0,scale:0,angle:0,tilt:0,hue:260,progress:0,opacity:0,spread:0,roll:0,hinge:-.14,behind:false}),reduced=ref(false);
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
let cleanup;
onMounted(()=>{
 let frame=0,points=[],obstacles=[],width=innerWidth,height=innerHeight;const media=matchMedia('(prefers-reduced-motion: reduce)');
 function measure(){
  width=innerWidth;height=innerHeight;
  points=[...document.querySelectorAll('[data-journey]')].map(el=>{const r=el.getBoundingClientRect();return {name:el.dataset.journey,top:r.top+scrollY,bottom:r.bottom+scrollY,x:r.left+r.width/2,width:r.width,height:r.height,angle:Number(el.dataset.angle),hue:Number(el.dataset.hue)};});
  obstacles=[...document.querySelectorAll('.nav, .hero-copy, .hero-proof, .expertise-strip, main .section-heading, main .service-card, main .process-grid, main .software-copy, main .software-features, main .about-panel, main .contact-panel>p, main .contact-panel>h2, main .contact-panel>small, main .actions, #projects, footer')].map(el=>{const r=el.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top+(el.matches(".nav")?0:scrollY),bottom:r.bottom+(el.matches(".nav")?0:scrollY),fixed:el.matches('.nav'),exclusive:el.matches('#projects')};});
 }
 function update(){frame=0;reduced.value=media.matches;if(!points.length)return;
  const scroll=scrollY,center=scroll+height*.52;
  const dock=points.reduce((a,b)=>Math.abs((a.top+a.bottom)/2-center)<Math.abs((b.top+b.bottom)/2-center)?a:b);
  const reading=dock.name==='projects-end',local=clamp((center-dock.top)/dock.height),sway=Math.sin((local-.5)*Math.PI);
  // Each visible segment stays inside its own reserved space; transitions across content are hidden.
  let x=dock.x,y=(dock.top+dock.bottom)/2-scroll,scale=Math.min(dock.width/870,dock.height/600),angle=dock.angle+sway*12,tilt=8,roll=sway*2,hinge=-.14;
  if(reading){x=width/2;y=clamp(height*.53,dock.top-scroll+height*.53,dock.bottom-scroll-height*.47);scale=Math.min((width-40)/740,(height-240)/450,1.65);angle=0;roll=0;hinge=-8*Math.PI/180;}
  const visible=dock.bottom-scroll>120&&dock.top-scroll<height-50;
  const forbidden=obstacles.map(r=>({...r,top:r.fixed?r.top:r.top-scroll,bottom:r.fixed?r.bottom:r.bottom-scroll}));
  const projectsVisible=forbidden.some(r=>r.exclusive&&r.bottom>0&&r.top<height);
  state.value={x,y,scale,angle,tilt,roll,hinge,behind:false,hue:dock.hue,pageProgress:clamp(scroll/(document.documentElement.scrollHeight-height)),progress:reading ? .05 :clamp(scroll/(document.documentElement.scrollHeight-height)),opacity:visible&&!projectsVisible?1:0,forbidden,projectsVisible};
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};const resize=()=>{measure();schedule()};
 measure();update();const observer=new ResizeObserver(resize);observer.observe(document.querySelector('main'));
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize);media.addEventListener('change',resize);
 cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',resize);media.removeEventListener('change',resize)};
});
onBeforeUnmount(()=>cleanup?.());
</script>
<template>
 <div class="page-atmosphere" aria-hidden="true" :style="{'--route-hue':state.hue,'--page-progress':state.pageProgress??0}"><i class="color-stream stream-violet"></i><i class="color-stream stream-cyan"></i><i class="color-stream stream-rose"></i><div class="color-grain"></div></div>
 <MacbookScene :pose="state" :reduced="reduced" />
 <div class="page-scroll-track" aria-hidden="true"><i :style="{transform:`scaleX(${state.pageProgress??0})`}"></i></div>
</template>
