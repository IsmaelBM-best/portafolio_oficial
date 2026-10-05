<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
</script>
<template>
  <footer class="site-footer">
    <a class="brand" href="#start">ib<span>.</span></a>
    <p>© {{ new Date().getFullYear() }} Ismael Blandon Moreno</p>
    <a href="#contact">{{ isSpanish ? "Contáctame" : "Contact me" }} ↗</a>
  </footer>
</template>
