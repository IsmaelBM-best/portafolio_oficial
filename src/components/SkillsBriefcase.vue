<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
</script>
<template>
  <section id="skills" class="section">
    <p class="eyebrow">{{ c.services.eyebrow }}</p>
    <div class="section-heading">
      <h2>{{ c.services.title }}</h2>
      <p>{{ c.services.intro }}</p>
    </div>
    <div class="service-grid">
      <article
        v-for="(service, i) in c.services.items"
        :key="i"
        class="service-card"
      >
        <span class="service-index">0{{ i + 1 }} /</span>
        <h3>{{ service[0] }}</h3>
        <p>{{ service[1] }}</p>
        <a href="#contact">{{ c.hero.start }} ↗</a>
      </article>
    </div>
    <div class="stack">
      <h3>{{ c.services.stack }}</h3>
      <ul>
        <li
          v-for="tool in [
            'HTML',
            'CSS / Sass',
            'JavaScript',
            'Vue.js',
            'React',
            'Node.js',
            'PostgreSQL',
            'Git / GitHub',
            'Postman',
            'Figma',
            'Docker',
            'Claude · AI-assisted development',
          ]"
          :key="tool"
        >
          {{ tool }}
        </li>
      </ul>
    </div>
    <ol class="process">
      <li v-for="step in c.services.process" :key="step">{{ step }}</li>
    </ol>
  </section>
</template>
