<script setup>
import { ref } from 'vue'
import ModalLanguage from './components/ModalLanguage.vue'
import HeaderBriefcase from './components/HeaderBriefcase.vue'
import MainBriefcase from './components/MainBriefcase.vue'

// Estado global del idioma: true = español, false = inglés
const isSpanish = ref(true)

// Estado para mostrar/ocultar el modal
const showModal = ref(true)

// Función para cambiar idioma (recibida desde el modal o header)
function setLanguage(lang) {
  isSpanish.value = lang === 'es'
  // Si el cambio viene del modal, cerramos el modal
  showModal.value = false
}
</script>

<template>
  <div class="components_container">
    <!-- Modal para seleccionar idioma inicialmente -->
    <ModalLanguage 
      v-if="showModal"
      :isSpanish="isSpanish" 
      @changeLanguage="setLanguage" 
    />

    <!-- Header recibe el estado y puede cambiarlo -->
    <HeaderBriefcase :isSpanish="isSpanish" @changeLanguage="setLanguage" />

    <!-- Main también recibe el estado para mostrar el idioma correcto -->
    <MainBriefcase :isSpanish="isSpanish" />
  </div>
</template>

<style lang="scss">
@import './styles/app.scss';
</style>
