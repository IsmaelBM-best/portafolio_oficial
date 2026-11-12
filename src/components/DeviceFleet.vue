<script setup>
import supervision from '../assets/ergasia-supervision.webp';
import access from '../assets/ergasia-acceso.webp';
import mobile from '../assets/brands/ergasia-mobile.jpg';
import workday from '../assets/brands/ergasia-workday.jpg';
import frame from '../assets/brands/laptop-frame.png';
const screens={laptop:supervision,monitor:access,tablet:workday,phone:mobile};
import '../styles/device-fleet.css';
defineProps({progress:{type:Number,default:0},es:Boolean});
</script>
<template>
<div class="device-fleet" :style="{'--device-progress':progress,'--device-exit':Math.min(1,Math.max(0,(progress-.50)/.20))}" role="img" :aria-label="es?'Ergasia en portátil, monitor, tablet y teléfono. Escena tridimensional.':'Ergasia on laptop, monitor, tablet and phone. Three-dimensional scene.'">
 <div class="device-shadow"></div>
 <div v-for="kind in ['monitor','laptop','tablet','phone']" :key="kind" class="fleet-device" :class="'device-'+kind">
  <template v-if="kind==='laptop'"><div class="photo-laptop"><img class="laptop-frame-photo" :src="frame" alt="" width="554" height="554"><img class="laptop-real-screen" :src="screens[kind]" :alt="es?'Ergasia: supervisión en vivo':'Ergasia: live team overview'" width="1600" height="900" loading="lazy"></div></template>
  <template v-else><div class="device-display"><div class="device-camera"></div><div class="device-screen"><img class="device-real-screen" :src="screens[kind]" :alt="es?'Pantalla real de Ergasia':'Actual Ergasia screen'" loading="lazy"></div></div><div class="device-stand"></div></template>
 </div>
</div>
</template>
