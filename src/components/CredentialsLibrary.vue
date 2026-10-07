<script setup>
import { computed, ref, nextTick } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
import resume from "../assets/documents/ismael-blandon-cv.pdf";
import resumeCover from "../assets/documents/cv-cover.svg";
import fullStack from "../assets/documents/full-stack.pdf";
import frontend from "../assets/documents/frontend.pdf";
import foundations from "../assets/documents/fundamentos.pdf";
import diploma from "../assets/documents/diploma-bachiller-publico.pdf";
import fullStackPreview from "../assets/documents/full-stack-preview.jpg";
import frontendPreview from "../assets/documents/frontend-preview.jpg";
import foundationsPreview from "../assets/documents/fundamentos-preview.jpg";
import diplomaPreview from "../assets/documents/diploma-bachiller-publico-preview.jpg";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en).discovery);
const selected = ref(null),
  dialog = ref(null);
const certificates = computed(() =>
  [fullStack, frontend, foundations, diploma].map((file, i) => ({
    file,
    image: [
      fullStackPreview,
      frontendPreview,
      foundationsPreview,
      diplomaPreview,
    ][i],
    title: c.value.certificateTitles[i],
    issuer: c.value.certificateIssuers[i],
    note: c.value.certificateNotes[i],
    filename: [
      "ismael-full-stack.pdf",
      "ismael-frontend-react.pdf",
      "ismael-fundamentos.pdf",
      "ismael-diploma-publico.pdf",
    ][i],
    public: i === 3,
  })),
);
const detail = computed(() =>
  selected.value === null ? null : certificates.value[selected.value],
);
async function preview(i) {
  selected.value = i;
  await nextTick();
  dialog.value.showModal();
}
function close() {
  dialog.value.close();
}
</script>
<template>
  <section id="credentials" class="section credentials-library">
    <div class="section-heading reveal">
      <div>
        <p class="eyebrow">{{ c.credentialsEyebrow }}</p>
        <h2>{{ c.credentialsTitle }}</h2>
      </div>
      <p>{{ c.credentialsIntro }}</p>
    </div>
    <article class="resume-card magic-card reveal" data-tilt>
      <div class="resume-visual">
        <img
          :src="resumeCover"
          :alt="
            isSpanish
              ? 'Portada gráfica del CV de Ismael'
              : 'Graphic cover for Ismael’s CV'
          "
          width="680"
          height="500"
          loading="lazy"
        />
      </div>
      <div class="resume-copy">
        <p class="eyebrow">{{ c.resumeLabel }}</p>
        <h3>{{ c.resumeTitle }}</h3>
        <p>{{ c.resumeText }}</p>
        <span class="document-meta">{{ c.resumeNote }}</span>
        <div class="actions">
          <a
            class="button primary"
            :href="resume"
            target="_blank"
            rel="noopener noreferrer"
            >{{ c.open }} ↗</a
          ><a
            class="button secondary"
            :href="resume"
            download="Ismael-Blandon-CV.pdf"
            >{{ c.download }} ↓</a
          >
        </div>
      </div>
    </article>
    <div class="credentials-grid">
      <article
        v-for="(certificate, i) in certificates"
        :key="certificate.filename"
        class="credential-card magic-card reveal"
        data-tilt
      >
        <div class="credential-inner">
          <button
            class="certificate-preview"
            @click="preview(i)"
            :aria-label="c.preview + ': ' + certificate.title"
          >
            <img
              :src="certificate.image"
              :alt="certificate.title + ' — ' + certificate.issuer"
              loading="lazy"
              decoding="async"
              :width="i === 3 ? 952 : 960"
              :height="i === 3 ? 1348 : 680"
            /><span class="preview-caption"
              >{{ c.preview }} <span aria-hidden="true">↗</span></span
            >
          </button>
          <div class="credential-copy">
            <p class="eyebrow">{{ certificate.issuer }}</p>
            <h3>{{ certificate.title }}</h3>
            <p>{{ certificate.note }}</p>
            <span class="document-meta"
              >{{ certificate.public ? c.publicCopy : c.original }} · PDF</span
            >
            <div class="credential-links">
              <a
                :href="certificate.file"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="c.open + ': ' + certificate.title"
                >{{ c.open }} ↗</a
              ><a
                :href="certificate.file"
                :download="certificate.filename"
                :aria-label="c.download + ': ' + certificate.title"
                >{{ c.download }} ↓</a
              >
            </div>
          </div>
        </div>
      </article>
    </div>
    <dialog
      ref="dialog"
      class="portfolio-dialog certificate-dialog"
      aria-labelledby="certificate-detail-title"
      @click="
        (event) => {
          if (event.target === dialog) close();
        }
      "
      @close="selected = null"
    >
      <template v-if="detail"
        ><div class="dialog-toolbar">
          <span class="eyebrow">{{ detail.issuer }}</span
          ><button class="round-control" :aria-label="c.close" @click="close">
            ×
          </button>
        </div>
        <div class="dialog-body">
          <h2 id="certificate-detail-title">{{ detail.title }}</h2>
          <p>{{ detail.note }}</p>
          <img
            class="certificate-full-preview"
            :src="detail.image"
            :alt="detail.title"
          />
          <p class="pdf-preview-note">{{ c.pdfHint }}</p>
          <div class="actions">
            <a
              class="button primary"
              :href="detail.file"
              target="_blank"
              rel="noopener noreferrer"
              >{{ c.open }} ↗</a
            ><a
              class="button secondary"
              :href="detail.file"
              :download="detail.filename"
              >{{ c.download }} ↓</a
            >
          </div>
        </div></template
      >
    </dialog>
  </section>
</template>
