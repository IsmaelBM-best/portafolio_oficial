<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
import portrait from "../assets/yop.png";
import HeroScene from "./HeroScene.vue";
import resume from "../assets/documents/ismael-blandon-cv.pdf";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
</script>
<template>
  <section id="start" class="hero section">
    <HeroScene />
    <div class="hero-copy reveal">
      <p class="eyebrow availability">{{ c.hero.eyebrow }}</p>
      <p class="hero-role">{{ c.discovery.role }}</p>
      <h1>
        <span>{{ c.discovery.titleA }}</span
        ><span class="hero-accent">{{ c.discovery.titleB }}</span>
      </h1>
      <p class="service-line">{{ c.hero.line }}</p>
      <p class="lead">{{ c.hero.description }}</p>
      <div class="actions">
        <a class="button primary" href="#contact"
          >{{ c.hero.start }} <span aria-hidden="true">↗</span></a
        ><a class="button secondary" href="#projects"
          >{{ c.hero.view }} <span aria-hidden="true">↓</span></a
        >
        <a
          class="cv-shortcut"
          :href="resume"
          target="_blank"
          rel="noopener noreferrer"
          >{{ c.discovery.cv }} <span aria-hidden="true">↗</span></a
        >
      </div>
      <p class="remote">
        <span class="availability-dot" aria-hidden="true"></span
        >{{ c.discovery.available }} · {{ c.hero.location }}
      </p>
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
    <aside class="hero-card reveal" data-tilt>
      <div class="portrait">
        <div class="portrait-mask" aria-hidden="true">
          <img
            :src="portrait"
            alt=""
            width="396"
            height="629"
            class="portrait-body"
          />
        </div>
        <img
          :src="portrait"
          alt="Ismael Blandon Moreno"
          width="396"
          height="629"
          fetchpriority="high"
          class="portrait-popout"
        />
      </div>
      <div class="portrait-info">
        <div class="profile-caption">
          <span>IB / DEVELOPER PROFILE</span
          ><span aria-hidden="true">● ● ●</span>
        </div>
        <span class="eyebrow">FULL-STACK + AI</span>
        <h2>Ismael Blandon Moreno</h2>
        <p>{{ c.hero.note }}</p>
        <a class="profile-discovery" href="#about_me"
          >{{ c.discovery.explore }} <span aria-hidden="true">↗</span></a
        >
      </div>
    </aside>
    <div class="proof-strip reveal">
      <p><strong>04</strong>{{ c.hero.experience }}</p>
      <p><strong>03</strong>{{ c.hero.coco }}</p>
      <p><strong>↗</strong>{{ c.hero.note }}</p>
    </div>
    <a href="#about_me" class="scroll-cue"
      >{{ c.discovery.scroll }} <span aria-hidden="true">↓</span></a
    >
  </section>
</template>
