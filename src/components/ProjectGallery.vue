<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import TechObject from "./TechObject.vue";
import resume from "../assets/documents/ismael-blandon-cv.pdf";
import { orbitFace, shortestTurn, ORBIT_STEP } from "../motion/orbit.mjs";
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
const face = ref(0),
  ring = ref(null),
  stage = ref(null),
  dialog = ref(null),
  selected = ref(null);
const inView = ref(false),
  pageVisible = ref(true),
  reduced = ref(false),
  ready = ref(false),
  hovered = ref(false),
  focused = ref(false),
  manualBusy = ref(false);
let observer,
  timer = 0,
  animation,
  manualTween,
  touchStart = null,
  controller,
  moveId = 0,
  alive = true;
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

const current = computed(() => projects.value[Math.min(face.value, 3)]);
const detail = computed(() =>
  selected.value === null
    ? null
    : {
        ...projects.value[selected.value],
        ...c.value.discovery.projectCases[selected.value],
      },
);
const running = computed(
  () =>
    inView.value &&
    pageVisible.value &&
    ready.value &&
    !reduced.value &&
    !hovered.value &&
    !focused.value &&
    !manualBusy.value &&
    selected.value === null,
);
const instruction = computed(() =>
  props.isSpanish
    ? "Pasa el puntero para detener. Explora con las flechas."
    : "Hover to pause. Explore with the arrows.",
);
function orbitAnimation() {
  if (!animation || animation.playState === "idle")
    animation = ring.value
      ?.getAnimations()
      .find((item) => item.animationName === "project-orbit");
  return animation;
}
function sample() {
  timer = 0;
  if (!running.value) return;
  face.value = orbitFace(orbitAnimation()?.currentTime);
  timer = setTimeout(sample, 100);
}
async function playback() {
  await nextTick();
  if (!alive) return;
  const currentAnimation = orbitAnimation();
  clearTimeout(timer);
  timer = 0;
  if (running.value) {
    currentAnimation?.play();
    sample();
  } else currentAnimation?.pause();
}
function select(index) {
  const from = ring.value ? getComputedStyle(ring.value).transform : "none";
  const matrix = from === "none" ? null : new DOMMatrixReadOnly(from);
  const angle = matrix
    ? (Math.atan2(matrix.m31, matrix.m11) * 180) / Math.PI
    : 0;
  const target = (index + 5) % 5;
  const token = ++moveId;
  manualTween?.cancel();
  manualBusy.value = true;
  face.value = target;
  const currentAnimation = orbitAnimation();
  if (currentAnimation) {
    currentAnimation.pause();
    currentAnimation.currentTime = target * ORBIT_STEP;
  }
  if (reduced.value || !ring.value) {
    manualBusy.value = false;
    return;
  }
  const radius = ring.value.offsetWidth * (145 / 180),
    turn = shortestTurn(angle, -target * 72);
  manualTween = ring.value.animate(
    [
      { transform: from },
      { transform: "translateZ(-" + radius + "px) rotateY(" + turn + "deg)" },
    ],
    {
      duration: Math.max(360, Math.min(720, Math.abs(turn - angle) * 7)),
      easing: "cubic-bezier(.22,.61,.36,1)",
    },
  );
  manualTween.finished
    .catch(() => {})
    .then(() => {
      if (token === moveId) {
        manualBusy.value = false;
        playback();
      }
    });
}
function key(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    select(face.value + (event.key === "ArrowRight" ? 1 : -1));
  }
}
function startTouch(event) {
  if (event.pointerType === "touch") {
    touchStart = { x: event.clientX, y: event.clientY };
    manualBusy.value = true;
  }
}
function endTouch(event) {
  if (event.pointerType !== "touch" || !touchStart) return;
  const dx = event.clientX - touchStart.x,
    dy = event.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
    select(face.value + (dx < 0 ? 1 : -1));
  else manualBusy.value = false;
}
function enter(event) {
  if (event.pointerType !== "touch") hovered.value = true;
}
function leave(event) {
  if (event.pointerType !== "touch") {
    hovered.value = false;
    if (!document.activeElement?.matches(":focus-visible"))
      focused.value = false;
  }
}
function enterFocus(event) {
  focused.value = event.target.matches(":focus-visible");
}
function leaveFocus(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) focused.value = false;
}
async function openDetails() {
  if (face.value > 3) return;
  selected.value = face.value;
  await nextTick();
  dialog.value.showModal();
}
function closeDetails() {
  dialog.value.close();
}
watch(running, playback);
onMounted(async () => {
  controller = new AbortController();
  const signal = controller.signal;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  reduced.value = preference.matches;
  preference.addEventListener(
    "change",
    () => {
      reduced.value = preference.matches;
      animation = null;
      playback();
    },
    { signal },
  );
  document.addEventListener(
    "visibilitychange",
    () => {
      pageVisible.value = !document.hidden;
    },
    { signal },
  );
  observer = new IntersectionObserver(
    (entries) => {
      inView.value = entries[0].isIntersecting;
    },
    { threshold: 0.12 },
  );
  observer.observe(stage.value);
  await Promise.allSettled(
    [...ring.value.querySelectorAll("img")].map((image) => image.decode()),
  );
  ready.value = true;
  playback();
});
onBeforeUnmount(() => {
  alive = false;
  controller?.abort();
  observer?.disconnect();
  clearTimeout(timer);
  moveId++;
  manualTween?.cancel();
});
</script>
<template>
  <section id="projects" class="section projects-gallery orbit-gallery">
    <div class="section-heading reveal">
      <div>
        <p class="eyebrow">{{ c.discovery.projectsEyebrow }}</p>
        <h2>{{ c.discovery.projectsTitle }}</h2>
      </div>
      <p>{{ c.discovery.projectsIntro }}</p>
    </div>
    <p class="orbit-instruction">{{ instruction }}</p>
    <div
      class="orbit-interaction"
      @pointerenter="enter"
      @pointerleave="leave"
      @focusin="enterFocus"
      @focusout="leaveFocus"
    >
      <div class="orbit-layout">
        <div
          ref="stage"
          class="project-orbit-stage"
          tabindex="0"
          :aria-label="
            isSpanish
              ? 'Galería circular 3D de proyectos'
              : 'Circular 3D project gallery'
          "
          @keydown="key"
          @pointerdown="startTouch"
          @pointerup="endTouch"
          @pointercancel="
            touchStart = null;
            manualBusy = false;
          "
        >
          <div class="orbit-floor" aria-hidden="true"></div>
          <div class="project-orbit-mount">
            <div
              ref="ring"
              class="project-orbit-ring"
              :class="{ 'is-paused': !running }"
              :style="{ '--manual-angle': -face * 72 + 'deg' }"
              :data-rotation="running ? 'running' : 'paused'"
              aria-hidden="true"
            >
              <div
                v-for="(project, i) in projects"
                :key="project.url"
                class="project-orbit-face"
                :style="{
                  transform:
                    'rotateY(' + i * 72 + 'deg) translateZ(var(--ring-radius))',
                }"
              >
                <img
                  :src="project.image"
                  :alt="project.title"
                  width="960"
                  height="480"
                  loading="eager"
                  decoding="async"
                />
                <div class="orbit-face-caption">
                  <span>0{{ i + 1 }} / 04</span
                  ><strong>{{ project.title }}</strong>
                </div>
              </div>
              <div
                class="project-orbit-face orbit-idea"
                style="
                  transform: rotateY(288deg) translateZ(var(--ring-radius));
                "
              >
                <TechObject kind="chip" /><strong>{{
                  isSpanish ? "Tu próxima idea." : "Your next idea."
                }}</strong
                ><span>BUILD / CONNECT / LAUNCH</span>
              </div>
            </div>
          </div>
        </div>
        <article class="project-brief" :aria-live="running ? 'off' : 'polite'">
          <Transition name="brief-swap" mode="out-in"
            ><div :key="face" class="brief-content">
              <template v-if="face < 4"
                ><p class="eyebrow">
                  {{ c.discovery.projectCases[face].stack.join(" · ") }}
                </p>
                <h3 id="project-gallery-status">{{ current.title }}</h3>
                <p>{{ current.description }}</p>
                <div class="brief-actions">
                  <button class="button primary" @click="openDetails">
                    {{ c.discovery.projectDetails }} ↗</button
                  ><a
                    :href="current.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="c.discovery.demo + ': ' + current.title"
                    >{{ c.discovery.demo }} ↗</a
                  ><a
                    v-if="current.code"
                    :href="current.code"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="c.discovery.source + ': ' + current.title"
                    >{{ c.discovery.source }} ↗</a
                  >
                </div></template
              >
              <template v-else
                ><p class="eyebrow">NEXT / YOUR IDEA</p>
                <h3 id="project-gallery-status">
                  {{
                    isSpanish
                      ? "Tu próxima idea, hecha realidad."
                      : "Your next idea, made real."
                  }}
                </h3>
                <p>{{ c.hero.description }}</p>
                <div class="brief-actions">
                  <a class="button primary" href="#contact"
                    >{{ c.hero.start }} ↗</a
                  ><a :href="resume" target="_blank" rel="noopener noreferrer"
                    >{{ c.discovery.cv }} ↗</a
                  >
                </div></template
              >
            </div></Transition
          >
        </article>
      </div>
      <div class="gallery-controls">
        <button
          class="round-control"
          :aria-label="c.discovery.previous"
          @click="select(face - 1)"
        >
          ←
        </button>
        <div class="gallery-dots">
          <button
            v-for="(project, i) in projects"
            :key="project.url"
            :aria-label="c.discovery.select + ': ' + project.title"
            :aria-pressed="i === face"
            @click="select(i)"
          >
            <span></span></button
          ><button
            :aria-label="
              isSpanish ? 'Elegir tu próxima idea' : 'Select your next idea'
            "
            :aria-pressed="face === 4"
            @click="select(4)"
          >
            <span></span>
          </button>
        </div>
        <button
          class="round-control"
          :aria-label="c.discovery.next"
          @click="select(face + 1)"
        >
          →</button
        ><span class="orbit-count">{{
          face < 4 ? "0" + (face + 1) + " / 04" : "NEXT"
        }}</span>
      </div>
    </div>
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
