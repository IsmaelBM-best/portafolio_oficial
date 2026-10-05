<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
</script>
<template>
  <section id="about_me" class="section">
    <p class="eyebrow">{{ c.about.eyebrow }}</p>
    <div class="about-grid">
      <div>
        <h2>{{ c.about.title }}</h2>
        <p class="lead">{{ c.about.intro }}</p>
        <p>{{ c.about.body }}</p>
        <p class="remote">{{ c.about.remote }}</p>
      </div>
      <div class="experience-panel">
        <h3>{{ c.about.experience }}</h3>
        <article>
          <span class="eyebrow">COCO TECNOLOGÍAS</span>
          <p>{{ c.about.coco }}</p>
          <a
            href="https://www.linkedin.com/company/coco-tecnologias/"
            target="_blank"
            rel="noopener noreferrer"
            >Coco Tecnologías ↗</a
          >
        </article>
        <article>
          <span class="eyebrow">ACADEMLO</span>
          <p>{{ c.about.academlo }}</p>
          <a
            href="https://www.linkedin.com/school/academlo/"
            target="_blank"
            rel="noopener noreferrer"
            >Academlo ↗</a
          >
        </article>
      </div>
    </div>
  </section>
</template>
