<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue';
import logo from '../assets/brands/ergasia.png';
import '../styles/ergasia-experience.css';
defineProps({es:Boolean});
const phase=ref(0),paused=ref(false),root=ref(null);let timer,observer,media,visible=false;
function next(){phase.value=(phase.value+1)%3}
function stop(){clearInterval(timer);timer=undefined}
function play(){stop();if(visible&&!paused.value&&!media?.matches&&!document.hidden)timer=setInterval(next,3800)}
function toggle(){paused.value=!paused.value;paused.value?stop():play()}
function visibility(){document.hidden?stop():play()}
onMounted(()=>{media=matchMedia('(prefers-reduced-motion: reduce)');observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;visible?play():stop()});observer.observe(root.value);document.addEventListener('visibilitychange',visibility);media.addEventListener('change',play)});
onBeforeUnmount(()=>{stop();observer?.disconnect();document.removeEventListener('visibilitychange',visibility);media?.removeEventListener('change',play)});
</script>
<template>
<div ref="root" class="ergasia-experience" :class="'experience-phase-'+phase">
 <div class="experience-header"><span>ERGASIA <i> / </i> {{es?'EN MOVIMIENTO':'IN MOTION'}}</span><button @click="toggle" :aria-label="es?(paused?'Reanudar animación':'Pausar animación'):(paused?'Resume animation':'Pause animation')">{{paused?'▶':'Ⅱ'}}</button></div>
 <div class="experience-space" :class="{'experience-paused':paused}">
  <div class="experience-aura"></div><div class="experience-orbit orbit-a"></div><div class="experience-orbit orbit-b"></div><div class="experience-orbit orbit-c"></div>
  <svg class="experience-connections" viewBox="0 0 560 510" aria-hidden="true"><defs><linearGradient id="connection-light"><stop stop-color="#bca9ff"/><stop offset="1" stop-color="#81d7ff"/></linearGradient></defs><path d="M280 255C180 255 190 110 110 110M280 255C400 255 370 165 470 165M280 255C320 330 190 390 110 390"/><circle r="4"><animateMotion dur="3s" repeatCount="indefinite" path="M110 110C190 110 180 255 280 255"/></circle><circle r="4"><animateMotion dur="3.5s" repeatCount="indefinite" path="M280 255C400 255 370 165 470 165"/></circle><circle r="4"><animateMotion dur="4s" repeatCount="indefinite" path="M280 255C320 330 190 390 110 390"/></circle></svg>
  <div class="ergasia-core"><div class="core-glass"><img :src="logo" alt="Ergasia" width="200" height="200"></div><span>Ergasia</span><small>{{es?'TU EQUIPO, CONECTADO':'YOUR TEAM, CONNECTED'}}</small></div>
  <div class="experience-module module-time" :class="{active:phase===0}"><div class="module-kicker"><i></i>{{es?'JORNADA':'WORK SESSION'}}<span>01</span></div><div class="module-timer">08<span>:</span>42<span>:</span>16</div><div class="time-bars"><i v-for="n in 14" :key="n" :style="{'--bar':n}"></i></div><small>{{es?'Cada jornada, en su lugar.':'Every workday, in place.'}}</small></div>
  <div class="experience-module module-tasks" :class="{active:phase===1}"><div class="module-kicker"><i></i>{{es?'TAREAS':'TASKS'}}<span>02</span></div><div class="task-line"><b>✓</b><span>{{es?'Diseño aprobado':'Design approved'}}</span></div><div class="task-line"><b>✓</b><span>{{es?'Equipo coordinado':'Team coordinated'}}</span></div><div class="task-line pending"><b>↗</b><span>{{es?'Próxima entrega':'Next delivery'}}</span></div><div class="module-progress"><i></i></div></div>
  <div class="experience-module module-chat" :class="{active:phase===2}"><div class="module-kicker"><i></i>{{es?'CONVERSACIONES':'CONVERSATIONS'}}<span>03</span></div><div class="chat-bubble">{{es?'Todo listo para continuar.':'Ready to move forward.'}} <span>✓✓</span></div><div class="chat-typing"><i></i><i></i><i></i></div></div>
 </div>
 <div class="experience-bottom"><div class="experience-copy"><span>0{{phase+1}} / 03</span><strong>{{es?['Tiempo que se organiza.','Trabajo que avanza.','Personas que se conectan.'][phase]:['Time, organized.','Work, moving forward.','People, connected.'][phase]}}</strong></div><div class="experience-steps"><button v-for="(name,i) in (es?['Jornadas','Tareas','Equipo']:['Sessions','Tasks','Team'])" :key="i" :aria-pressed="phase===i" @click="phase=i;play()">{{name}}</button></div><a href="https://ergasia.pages.dev/" target="_blank" rel="noopener noreferrer">{{es?'Explorar Ergasia':'Explore Ergasia'}} ↗</a><small>{{es?'Visualización conceptual del producto':'Conceptual product visualization'}}</small></div>
</div>
</template>
