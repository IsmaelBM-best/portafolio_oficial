<script setup>
import TechObject from "./TechObject.vue";
defineProps({ variant: { type: String, default: "hero" } });
</script>
<template>
  <div
    class="tech-scene"
    :class="'tech-scene--' + variant"
    :data-tech-scene="variant"
    aria-hidden="true"
  >
    <svg class="tech-circuit-plane" viewBox="0 0 600 600" fill="none">
      <path
        d="M0 150h180l60 60h160l70-70h130M30 460h140l80-80h140l80 80h130M150 0v110l60 60v100l-90 90v240M470 0v80l-80 80v190l100 100v150"
      />
      <g>
        <circle cx="240" cy="210" r="8" />
        <circle cx="390" cy="350" r="7" />
        <circle cx="170" cy="460" r="5" />
      </g>
      <path
        class="tech-signal"
        d="M0 150h180l60 60h160l70-70h130M30 460h140l80-80h140l80 80h130"
      />
    </svg>
    <div
      v-for="kind in ['phone', 'keyboard', 'mouse', 'chip']"
      :key="kind"
      class="tech-device"
      :class="'tech-device--' + kind"
      :data-tech-object="kind"
    >
      <TechObject :kind="kind" />
    </div>
    <div class="tech-scan-lines"></div>
  </div>
</template>
