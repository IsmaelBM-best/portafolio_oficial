<script setup>
import { ref } from 'vue'
import es from '../locales/es.json'
import en from '../locales/en.json'

// Props desde App.vue
const props = defineProps({ isSpanish: Boolean })

// Emit para notificar cambio de idioma
const emit = defineEmits(['changeLanguage'])

// Estado menú móvil
const show_deploy_options = ref(false)
function toggleDeployOptions() { show_deploy_options.value = !show_deploy_options.value }
</script>

<template>
  <div class="header_container">
    <!-- Logo y nombre -->
    <div class="name_and_icon">
      <div class="icon_container">
        <img src="./../assets/code-icon.svg" alt="icon" />
      </div>
      <div class="name">Portafolio</div>
    </div>

    <!-- Opciones del header -->
    <div class="options_header">
      <a href="#start" class="option">{{ props.isSpanish ? es.header.inicio : en.header.home }}</a>
      <a href="#about_me" class="option">{{ props.isSpanish ? es.header.sobre_mi : en.header.about }}</a>
      <a href="#projects" class="option">{{ props.isSpanish ? es.header.proyectos : en.header.projects }}</a>
      <a href="#skills" class="option">{{ props.isSpanish ? es.header.habilidades : en.header.skills }}</a>
      <a href="#contact" class="option">{{ props.isSpanish ? es.header.contacto : en.header.contact }}</a>
    </div>

    <!-- Botón cambiar idioma -->
    <button class="change_language" @click="emit('changeLanguage', props.isSpanish ? 'en' : 'es')">
      <img src="./../assets/estados-unidos.png" alt="EN" />
      <div>/</div>
      <img src="./../assets/bandera-de-mexico.png" alt="ES" />
    </button>

    <!-- Menú móvil -->
    <div class="deploy_container">
      <button class="drop_button" @click="toggleDeployOptions">
        <img src="./../assets/menu-icon.svg" alt="menu" />
      </button>

      <div class="deploy_options" v-if="show_deploy_options">
        <button class="change_language" @click="emit('changeLanguage', props.isSpanish ? 'en' : 'es')">
          <img src="./../assets/estados-unidos.png" alt="EN" />
          <div>/</div>
          <img src="./../assets/bandera-de-mexico.png" alt="ES" />
        </button>

        <a href="#start" class="option" @click="toggleDeployOptions">
          {{ props.isSpanish ? es.header.inicio : en.header.home }}
        </a>
        <a href="#about_me" class="option" @click="toggleDeployOptions">
          {{ props.isSpanish ? es.header.sobre_mi : en.header.about }}
        </a>
        <a href="#projects" class="option" @click="toggleDeployOptions">
          {{ props.isSpanish ? es.header.proyectos : en.header.projects }}
        </a>
        <a href="#skills" class="option" @click="toggleDeployOptions">
          {{ props.isSpanish ? es.header.habilidades : en.header.skills }}
        </a>
        <a href="#contact" class="option" @click="toggleDeployOptions">
          {{ props.isSpanish ? es.header.contacto : en.header.contact }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../styles/header_briefcase.scss';
</style>
