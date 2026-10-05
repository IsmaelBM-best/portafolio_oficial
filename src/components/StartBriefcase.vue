<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
</script>
<template>
  <section id="start" class="hero section">
    <div class="hero-copy">
      <p class="eyebrow availability">{{ c.hero.eyebrow }}</p>
      <h1>{{ c.hero.title }}</h1>
      <p class="service-line">{{ c.hero.line }}</p>
      <p class="lead">{{ c.hero.description }}</p>
      <div class="actions">
        <a class="button primary" href="#contact"
          >{{ c.hero.start }} <span aria-hidden="true">↗</span></a
        ><a class="button secondary" href="#projects"
          >{{ c.hero.view }} <span aria-hidden="true">↓</span></a
        >
      </div>
      <p class="remote">{{ c.hero.location }}</p>
      <div class="social-links">
        <a
          href="https://github.com/IsmaelBM-best"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub ↗</a
        ><a
          href="https://www.linkedin.com/in/ismael-blandon-moreno-944605266/"
          target="_blank"
          rel="noopener noreferrer"
          >LinkedIn ↗</a
        >
      </div>
    </div>
    <aside class="hero-card">
      <div class="portrait">
        <img
          src="../assets/me_transparent.webp"
          alt="Ismael Blandon Moreno"
          width="360"
          height="420"
          fetchpriority="high"
        />
      </div>
      <div class="portrait-info">
        <span class="eyebrow">FULL-STACK + AI</span>
        <h2>Ismael Blandon Moreno</h2>
        <p>{{ c.hero.note }}</p>
      </div>
    </aside>
    <div class="proof-strip">
      <p><strong>04</strong>{{ c.hero.experience }}</p>
      <p><strong>03</strong>{{ c.hero.coco }}</p>
      <p><strong>↗</strong>{{ c.hero.note }}</p>
    </div>
  </section>
</template>
