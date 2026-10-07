<script setup>
import { computed, ref } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
const selectedTools = ref(0);
const tools = computed(() => [
  [
    "HTML",
    "CSS / Sass",
    "JavaScript",
    "Vue.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Git / GitHub",
    "Docker",
    "Postman",
  ],
  [
    "Claude",
    "Copilot",
    "ChatGPT",
    "Codex",
    "Gemini",
    "Grok",
    "Higgsfield",
    "v0",
    "Google Calendar",
    props.isSpanish ? "Correo" : "Email",
  ],
  ["Figma", "Canva", "Visual Studio Code", "Git / GitHub", "Google Calendar"],
]);
function toolKey(event, index) {
  if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  selectedTools.value =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? 2
        : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3;
  event.currentTarget.parentElement
    .querySelectorAll("button")
    [selectedTools.value].focus();
}
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
      <div
        class="tool-selector"
        role="tablist"
        :aria-label="isSpanish ? 'Herramientas por área' : 'Tools by area'"
      >
        <button
          v-for="(group, i) in c.discovery.toolGroups"
          :key="i"
          role="tab"
          :id="'tools-tab-' + i"
          aria-controls="tools-panel"
          :aria-selected="selectedTools === i"
          :tabindex="selectedTools === i ? 0 : -1"
          @click="selectedTools = i"
          @keydown="(event) => toolKey(event, i)"
        >
          {{ group }}
        </button>
      </div>
      <div
        id="tools-panel"
        class="tool-panel"
        role="tabpanel"
        :aria-labelledby="'tools-tab-' + selectedTools"
        tabindex="0"
      >
        <p>{{ c.discovery.toolIntros[selectedTools] }}</p>
        <ul>
          <li v-for="tool in tools[selectedTools]" :key="tool">
            {{ tool }}
          </li>
        </ul>
      </div>
    </div>
    <ol class="process">
      <li v-for="step in c.services.process" :key="step">{{ step }}</li>
    </ol>
  </section>
</template>
