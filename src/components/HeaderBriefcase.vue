<script setup>
import { ref, computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const emit = defineEmits(["changeLanguage"]);
const open = ref(false);
const c = computed(() => (props.isSpanish ? es : en));
const ids = ["start", "about_me", "projects", "skills", "contact"];
</script>
<template>
  <header class="site-header">
    <a class="brand" href="#start" aria-label="Ismael Blandon Moreno home"
      >ib<span>.</span></a
    >
    <nav
      aria-label="Main navigation"
      :class="{ open }"
      id="navigation"
      @keydown.esc="open = false"
    >
      <a
        v-for="(label, i) in c.nav"
        :key="ids[i]"
        :href="'#' + ids[i]"
        @click="open = false"
        >{{ label }}</a
      >
    </nav>
    <div class="header-actions">
      <button
        class="language"
        :aria-label="isSpanish ? 'Switch to English' : 'Cambiar a español'"
        @click="emit('changeLanguage', isSpanish ? 'en' : 'es')"
      >
        {{ isSpanish ? "EN" : "ES" }}</button
      ><button
        class="menu-toggle"
        :aria-expanded="open"
        aria-controls="navigation"
        :aria-label="isSpanish ? 'Menú' : 'Menu'"
        @click="open = !open"
      >
        {{ open ? "×" : "☰" }}
      </button>
    </div>
  </header>
</template>
