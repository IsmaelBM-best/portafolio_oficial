<script setup>
defineProps({ isSpanish: Boolean });
const chapters = [
  ["start", "01", "Home", "Inicio"],
  ["about_me", "02", "Experience", "Experiencia"],
  ["projects", "03", "Projects", "Proyectos"],
  ["credentials", "04", "Credentials", "Credenciales"],
  ["skills", "05", "Services", "Servicios"],
  ["contact", "06", "Contact", "Contacto"],
];
</script>
<template>
  <div class="reading-progress" aria-hidden="true"></div>
  <div class="ambient-field" aria-hidden="true"><span></span><span></span></div>
  <nav
    class="chapter-rail"
    :aria-label="isSpanish ? 'Explorar el portafolio' : 'Explore the portfolio'"
  >
    <a
      v-for="chapter in chapters"
      :key="chapter[0]"
      :href="'#' + chapter[0]"
      :data-section-link="chapter[0]"
      :aria-label="isSpanish ? chapter[3] : chapter[2]"
      ><span>{{ chapter[1] }}</span
      ><i></i><em>{{ isSpanish ? chapter[3] : chapter[2] }}</em></a
    >
  </nav>
</template>
