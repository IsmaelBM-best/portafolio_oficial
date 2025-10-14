<script setup>
const props = defineProps({ isSpanish: Boolean })
</script>

<template>
  <div class="footer_container">
    <div class="title_and_description">
      <div class="title">
        <img src="./../assets/code-icon.svg" alt="">
        {{ props.isSpanish ? 'Portafolio' : 'Portfolio' }}
      </div>
      <div class="description">
        {{ props.isSpanish 
          ? 'Creando experiencias digitales atractivas y funcionales con las últimas tecnologías web.' 
          : 'Creating engaging and functional digital experiences using the latest web technologies.' }}
      </div>
    </div>
    <div class="text_footer">
      {{ props.isSpanish 
        ? '© 2025 Ismael Blandón. Todos los derechos reservados.' 
        : '© 2025 Ismael Blandón. All rights reserved.' }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../styles/footer.scss';
</style>
