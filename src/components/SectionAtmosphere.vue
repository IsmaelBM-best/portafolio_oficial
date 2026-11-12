<script setup>
import ergasia from '../assets/brands/ergasia.png';
import pleon from '../assets/brands/pleon.png';
import pawly from '../assets/brands/pawly.png';
import replay from '../assets/brands/replay.png';
import trio from '../assets/brands/trio.png';
defineProps({pair:Number});
const marks=[{src:ergasia},{src:pleon},{src:trio,sprite:0},{src:trio,sprite:1},{src:replay},{src:pawly}];
</script>
<template>
 <div class="section-brand-atmosphere" aria-hidden="true">
  <div v-for="(side,i) in ['left','right']" :key="side" class="ambient-brand" :class="side">
   <span v-if="marks[(pair*2+i)%6].sprite!==undefined" :style="{backgroundImage:`url(${trio})`,backgroundPosition:marks[(pair*2+i)%6].sprite===0?'left center':'center'}"></span>
   <img v-else :src="marks[(pair*2+i)%6].src" alt="" loading="lazy">
  </div>
 </div>
</template>
