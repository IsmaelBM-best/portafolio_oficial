<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
import resume from "../assets/documents/ismael-blandon-cv.pdf";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en).discovery);
</script>
<template>
  <section id="about_me" class="section experience-journey">
    <div class="journey-sticky reveal">
      <p class="eyebrow">{{ c.aboutEyebrow }}</p>
      <h2>{{ c.aboutTitle }}</h2>
      <p class="lead">{{ c.aboutLead }}</p>
      <p>{{ c.aboutPrompt }}</p>
      <div class="journey-index" aria-hidden="true">
        <span>BUILD</span><i></i><span>LISTEN</span><i></i><span>CONNECT</span>
      </div>
      <a
        class="text-link"
        :href="resume"
        target="_blank"
        rel="noopener noreferrer"
        >{{ c.storyCv }} ↗</a
      >
    </div>
    <div class="journey-chapters">
      <article
        v-for="(chapter, i) in c.chapters"
        :key="i"
        class="journey-chapter reveal"
      >
        <span class="chapter-number" aria-hidden="true">0{{ i + 1 }}</span>
        <div class="chapter-content">
          <p class="eyebrow">{{ chapter.label }}</p>
          <h3>{{ chapter.title }}</h3>
          <p class="chapter-company">{{ chapter.company }}</p>
          <p>{{ chapter.text }}</p>
          <details class="experience-detail">
            <summary>
              {{ chapter.detailTitle }} <span aria-hidden="true">+</span>
            </summary>
            <p>{{ chapter.detail }}</p>
          </details>
        </div>
      </article>
      <a class="journey-next" href="#projects"
        ><span>{{ c.storyLink }}</span
        ><span aria-hidden="true">↓</span></a
      >
    </div>
  </section>
</template>
