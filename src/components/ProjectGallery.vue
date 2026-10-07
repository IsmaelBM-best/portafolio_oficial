<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
import health from "../assets/careflow-preview-960.jpg";
import healthLarge from "../assets/careflow-preview-1600.jpg";
import trivia from "../assets/trivia-preview-960.jpg";
import triviaLarge from "../assets/trivia-preview-1600.jpg";
import pawly from "../assets/pawly-preview-960.jpg";
import pawlyLarge from "../assets/pawly-preview-1600.jpg";
import commerce from "../assets/commerce-preview-960.jpg";
import commerceLarge from "../assets/commerce-preview-1600.jpg";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
const active = ref(0),
  stage = ref(null),
  dialog = ref(null),
  selected = ref(null);
let sizeObserver,
  touchStart = null;
const projects = computed(() => [
  {
    title: c.value.projects.commerceTitle,
    description: c.value.projects.commerceDescription,
    image: commerce,
    large: commerceLarge,
    url: "https://academlo-e-comerce.netlify.app/",
    code: "https://github.com/IsmaelBM-best/E-commerceG23",
    tag: "ECOMMERCE / DASHBOARD",
  },
  {
    title: c.value.projects.titulo_proyecto_uno,
    description: c.value.projects.descripcion_proyecto_uno,
    image: health,
    large: healthLarge,
    url: "https://coco-ismael.netlify.app/",
    code: "https://github.com/IsmaelBM-best/coco",
    tag: "HEALTHCARE / SCHEDULING",
  },
  {
    title: c.value.projects.titulo_proyecto_tres,
    description: c.value.projects.descripcion_proyecto_tres,
    image: trivia,
    large: triviaLarge,
    url: "https://trivia-ibm.netlify.app/",
    code: "https://github.com/IsmaelBM-best/ismael-trivia",
    tag: "MINIGAME / INTERACTIVE UX",
  },
  {
    title: c.value.pawly,
    description: c.value.pawlyDescription,
    image: pawly,
    large: pawlyLarge,
    url: "https://app-pawly.netlify.app/",
    tag: "ANDROID / SOCIAL APP",
  },
]);
const detail = computed(() =>
  selected.value === null
    ? null
    : {
        ...projects.value[selected.value],
        ...c.value.discovery.projectCases[selected.value],
      },
);
function offset(i) {
  let d = i - active.value;
  if (d > 2) d -= 4;
  if (d < -2) d += 4;
  return d;
}
function cardStyle(i) {
  const d = offset(i);
  return {
    "--card-offset": d,
    "--card-distance": Math.abs(d),
    zIndex: 4 - Math.abs(d),
    visibility: Math.abs(d) > 1 ? "hidden" : "visible",
  };
}
function select(index) {
  active.value = (index + projects.value.length) % projects.value.length;
}
function key(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    select(active.value + (event.key === "ArrowRight" ? 1 : -1));
  }
}
function startTouch(event) {
  if (event.pointerType === "touch")
    touchStart = { x: event.clientX, y: event.clientY };
}
function endTouch(event) {
  if (event.pointerType !== "touch" || !touchStart) return;
  const dx = event.clientX - touchStart.x,
    dy = event.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5)
    select(active.value + (dx < 0 ? 1 : -1));
}
async function openDetails() {
  selected.value = active.value;
  await nextTick();
  dialog.value.showModal();
}
function closeDetails() {
  dialog.value.close();
}
function measure() {
  const card = stage.value?.querySelector('[data-active="true"]');
  if (card)
    stage.value.style.setProperty(
      "--stage-height",
      Math.ceil(card.offsetHeight + 48) + "px",
    );
}
watch([active, () => props.isSpanish], async () => {
  await nextTick();
  measure();
});
onMounted(() => {
  sizeObserver = new ResizeObserver(measure);
  stage.value
    .querySelectorAll(".gallery-card")
    .forEach((card) => sizeObserver.observe(card));
  measure();
});
onBeforeUnmount(() => sizeObserver?.disconnect());
</script>
<template>
  <section id="projects" class="section projects-gallery">
    <div class="section-heading reveal">
      <div>
        <p class="eyebrow">{{ c.discovery.projectsEyebrow }}</p>
        <h2>{{ c.discovery.projectsTitle }}</h2>
      </div>
      <p>{{ c.discovery.projectsIntro }}</p>
    </div>
    <div class="gallery-topline reveal">
      <p>{{ c.discovery.keyboard }}</p>
      <span class="gallery-count"
        ><b>0{{ active + 1 }}</b> / 04</span
      >
    </div>
    <div
      ref="stage"
      class="project-stage reveal"
      tabindex="0"
      :aria-label="
        isSpanish
          ? 'Galería interactiva de proyectos'
          : 'Interactive project gallery'
      "
      @keydown="key"
      @pointerdown="startTouch"
      @pointerup="endTouch"
      @pointercancel="touchStart = null"
    >
      <div class="gallery-floor" aria-hidden="true"></div>
      <article
        v-for="(project, i) in projects"
        :key="project.url"
        class="gallery-card"
        :style="cardStyle(i)"
        :data-active="i === active"
        :aria-hidden="i !== active"
        :inert="i !== active"
      >
        <div class="gallery-card-inner">
          <div class="project-image" data-tilt>
            <img
              :src="project.image"
              :srcset="project.image + ' 960w, ' + project.large + ' 1600w'"
              sizes="(max-width: 760px) 90vw, 65vw"
              :alt="project.title"
              width="1600"
              height="800"
              loading="lazy"
              decoding="async"
            /><span class="gallery-project-tag">{{ project.tag }}</span
            ><span class="gallery-project-number">0{{ i + 1 }} / 04</span>
          </div>
          <div class="project-body">
            <p class="eyebrow">
              {{ c.discovery.projectCases[i].stack.join(" · ") }}
            </p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="gallery-actions">
              <button class="button primary" @click="openDetails">
                {{ c.discovery.projectDetails }}
                <span aria-hidden="true">↗</span></button
              ><a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="c.discovery.demo + ': ' + project.title"
                >{{ c.discovery.demo }} ↗</a
              ><a
                v-if="project.code"
                :href="project.code"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="c.discovery.source + ': ' + project.title"
                >{{ c.discovery.source }} ↗</a
              >
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="gallery-controls">
      <button
        class="round-control"
        :aria-label="c.discovery.previous"
        @click="select(active - 1)"
        aria-controls="project-gallery-status"
      >
        ←
      </button>
      <div class="gallery-dots">
        <button
          v-for="(project, i) in projects"
          :key="project.url"
          :aria-label="c.discovery.select + ': ' + project.title"
          :aria-pressed="i === active"
          @click="select(i)"
        >
          <span></span>
        </button>
      </div>
      <button
        class="round-control"
        :aria-label="c.discovery.next"
        @click="select(active + 1)"
        aria-controls="project-gallery-status"
      >
        →
      </button>
    </div>
    <p
      id="project-gallery-status"
      class="gallery-status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ projects[active].title }}
    </p>
    <dialog
      ref="dialog"
      class="portfolio-dialog project-dialog"
      @click="
        (event) => {
          if (event.target === dialog) closeDetails();
        }
      "
      @close="selected = null"
      aria-labelledby="project-detail-title"
    >
      <template v-if="detail"
        ><div class="dialog-toolbar">
          <span class="eyebrow">{{ c.discovery.projectDetails }}</span
          ><button
            class="round-control"
            @click="closeDetails"
            :aria-label="c.discovery.close"
          >
            ×
          </button>
        </div>
        <img
          class="dialog-project-image"
          :src="detail.large"
          :alt="detail.title"
        />
        <div class="dialog-body">
          <h2 id="project-detail-title">{{ detail.title }}</h2>
          <div class="detail-stack">
            <span v-for="tool in detail.stack" :key="tool">{{ tool }}</span>
          </div>
          <div class="case-grid">
            <div>
              <h3>{{ c.discovery.projectChallenge }}</h3>
              <p>{{ detail.idea }}</p>
            </div>
            <div>
              <h3>{{ c.discovery.projectFocus }}</h3>
              <p>{{ detail.focus }}</p>
            </div>
          </div>
          <h3>{{ c.discovery.projectFeatures }}</h3>
          <ul class="case-features">
            <li v-for="feature in detail.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <div class="actions">
            <a
              class="button primary"
              :href="detail.url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ c.discovery.demo }} ↗</a
            ><a
              v-if="detail.code"
              class="button secondary"
              :href="detail.code"
              target="_blank"
              rel="noopener noreferrer"
              >{{ c.discovery.source }} ↗</a
            >
          </div>
        </div></template
      >
    </dialog>
  </section>
</template>
