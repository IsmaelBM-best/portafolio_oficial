<script setup>
import { ref, watchEffect } from "vue";
import HeaderBriefcase from "./components/HeaderBriefcase.vue";
import MainBriefcase from "./components/MainBriefcase.vue";
let saved = "en";
try {
  saved = localStorage.getItem("lang") || "en";
} catch {}
const isSpanish = ref(saved === "es");
function setLanguage(lang) {
  isSpanish.value = lang === "es";
  try {
    localStorage.setItem("lang", lang);
  } catch {}
}
watchEffect(() => {
  document.documentElement.lang = isSpanish.value ? "es" : "en";
});
</script>
<template>
  <a class="skip-link" href="#main">{{
    isSpanish ? "Ir al contenido" : "Skip to content"
  }}</a
  ><HeaderBriefcase
    :isSpanish="isSpanish"
    @changeLanguage="setLanguage"
  /><MainBriefcase :isSpanish="isSpanish" />
</template>
