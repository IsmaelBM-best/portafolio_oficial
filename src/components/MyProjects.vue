<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
import health from "../assets/health.webp";
import marvel from "../assets/heros.webp";
import trivia from "../assets/trivia.webp";
import pawly from "../assets/pawly-dev-icon.png";
const projects = computed(() => [
  {
    title: c.value.projects.titulo_proyecto_uno,
    description: c.value.projects.descripcion_proyecto_uno,
    image: health,
    url: "https://coco-ismael.netlify.app/",
    code: "https://github.com/IsmaelBM-best/coco",
    tag: "Web app · Healthcare",
  },
  {
    title: c.value.projects.titulo_proyecto_dos,
    description: c.value.projects.descripcion_proyecto_dos,
    image: marvel,
    url: "https://marvel-ibm.netlify.app/",
    code: "https://github.com/IsmaelBM-best/marvel-ibm",
    tag: "React · API",
  },
  {
    title: c.value.projects.titulo_proyecto_tres,
    description: c.value.projects.descripcion_proyecto_tres,
    image: trivia,
    url: "https://trivia-ibm.netlify.app/",
    code: "https://github.com/IsmaelBM-best/ismael-trivia",
    tag: "Web app · Interactive UX",
  },
  {
    title: c.value.pawly,
    description: c.value.pawlyDescription,
    image: pawly,
    url: "https://app-pawly.netlify.app/",
    tag: c.value.pawlyTag,
    pawly: true,
  },
]);
</script>
<template>
  <section id="projects" class="section">
    <p class="eyebrow">
      02 / {{ isSpanish ? "PROYECTOS SELECCIONADOS" : "SELECTED WORK" }}
    </p>
    <div class="section-heading">
      <h2>
        {{
          isSpanish
            ? "Ideas convertidas en productos."
            : "Ideas turned into products."
        }}
      </h2>
      <p>{{ c.projectIntro }}</p>
    </div>
    <div class="project-grid">
      <article
        v-for="(project, i) in projects"
        :key="project.url"
        class="project-card"
      >
        <div class="project-image" :class="{ pawly: project.pawly }">
          <img
            :src="project.image"
            :alt="project.title"
            loading="lazy"
            decoding="async"
            width="640"
            height="400"
          /><span class="project-number">0{{ i + 1 }}</span>
        </div>
        <div class="project-body">
          <p class="eyebrow">{{ project.tag }}</p>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-links">
            <a
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="c.projects.ver + ' ' + project.title"
              >{{ c.projects.ver }} ↗</a
            ><a
              v-if="project.code"
              :href="project.code"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="c.projects.codigo + ' ' + project.title"
              >{{ c.projects.codigo }} ↗</a
            >
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
