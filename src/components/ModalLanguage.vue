<script setup>
const props = defineProps({ isSpanish: Boolean })
const emit = defineEmits(['changeLanguage'])

function chooseLanguage(lang) {
  emit('changeLanguage', lang)
}
</script>

<template>
  <div class="modal_language_container">
    <div class="modal_language">
      <div class="titles">
        <div class="title">Language</div>
        <div class="description">Choose your language / Elige tu idioma</div>
      </div>
      <div class="buttons_container">
        <button class="language_button" @click="chooseLanguage('en')">
          English
          <img src="./../assets/estados-unidos.png" alt="EN" />
        </button>
        <button class="language_button" @click="chooseLanguage('es')">
          Español
          <img src="./../assets/bandera-de-mexico.png" alt="ES" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../styles/modal_language.scss';
</style>