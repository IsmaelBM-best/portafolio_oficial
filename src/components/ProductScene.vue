<script setup>
import MaterialIcon from './MaterialIcon.vue';
defineProps({project:Object,es:Boolean,hero:Boolean});
</script>
<template>
<div class="product-scene" :class="{'scene-hero':hero}" :style="{'--scene-hue':project.hue||245}">
 <div class="scene-atmosphere" aria-hidden="true"><span class="scene-light light-a"></span><span class="scene-light light-b"></span><span class="scene-light light-c"></span><span class="scene-mesh"></span></div>
 <div class="scene-content"><div class="scene-brand"><strong>{{project.name}}</strong><span>{{es?'DISEÑO + DESARROLLO':'DESIGN + DEVELOPMENT'}}</span></div>
 <div class="scene-heading"><span>{{project.type}}</span><h3>{{hero?(es?'Un equipo.':'One team.'):project.name}}<br><em>{{hero?(es?'El mismo ritmo.':'The same rhythm.'):project.sceneTitle||project.title}}</em></h3></div>
 <div class="scene-device"><div class="device-toolbar"><i></i><i></i><i></i><span>{{hero?(es?'Tu centro de operaciones':'Your operations hub'):project.name}}</span><b><MaterialIcon name="north_east"/></b></div><img :src="project.cover||project.image" :alt="project.name" width="1600" height="800" :fetchpriority="hero?'high':'auto'" decoding="async"></div>
 <div class="scene-footer"><span>{{es?'EXPERIENCIA DIGITAL':'DIGITAL EXPERIENCE'}}</span><span>{{hero?'01 / 08':project.tags}}</span></div></div>
</div>
</template>
