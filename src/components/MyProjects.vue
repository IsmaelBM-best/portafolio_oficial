<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
import health from "../assets/careflow-preview-960.jpg";
import healthLarge from "../assets/careflow-preview-1600.jpg";
import trivia from "../assets/trivia-preview-960.jpg";
import triviaLarge from "../assets/trivia-preview-1600.jpg";
import pawly from "../assets/pawly-preview-960.jpg";
import pawlyLarge from "../assets/pawly-preview-1600.jpg";
const projects = computed(() => [
  {
    title: c.value.projects.titulo_proyecto_uno,
    description: c.value.projects.descripcion_proyecto_uno,
    image: health,
    srcSet: `${health} 960w, ${healthLarge} 1600w`,
    url: "https://coco-ismael.netlify.app/",
    code: "https://github.com/IsmaelBM-best/coco",
    tag: "Web app · Healthcare",
  },
  {
    title: c.value.projects.titulo_proyecto_tres,
    description: c.value.projects.descripcion_proyecto_tres,
    image: trivia,
    srcSet: `${trivia} 960w, ${triviaLarge} 1600w`,
    url: "https://trivia-ibm.netlify.app/",
    code: "https://github.com/IsmaelBM-best/ismael-trivia",
    tag: "Web app · Interactive UX",
  },
  {
    title: c.value.pawly,
    description: c.value.pawlyDescription,
    image: pawly,
    srcSet: `${pawly} 960w, ${pawlyLarge} 1600w`,
    url: "https://app-pawly.netlify.app/",
    tag: c.value.pawlyTag,
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
        <div class="project-image">
          <img
            :src="project.image"
            :srcset="project.srcSet"
            sizes="(max-width: 760px) 100vw, 50vw"
            :alt="project.title"
            loading="lazy"
            decoding="async"
            width="1600"
            height="800"
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
