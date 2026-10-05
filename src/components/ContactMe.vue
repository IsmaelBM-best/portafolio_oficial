<script setup>
import { ref, computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
defineOptions({ name: "ContactMe" });
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
const name = ref(""),
  email = ref(""),
  message = ref(""),
  opened = ref(false);
function sendMessage() {
  const greeting = props.isSpanish ? "Hola, soy" : "Hi, I'm";
  const text =
    greeting +
    " " +
    name.value.trim() +
    " (" +
    email.value.trim() +
    "). " +
    message.value.trim();
  window.open(
    "https://wa.me/573007982609?text=" + encodeURIComponent(text),
    "_blank",
    "noopener,noreferrer",
  );
  opened.value = true;
}
</script>
<template>
  <section id="contact" class="section contact-section">
    <div class="contact-copy">
      <p class="eyebrow">{{ c.contactNew.eyebrow }}</p>
      <h2>{{ c.contactNew.title }}</h2>
      <p class="lead">{{ c.contactNew.intro }}</p>
      <a class="email-link" :href="'mailto:' + c.contact.mail"
        >{{ c.contact.mail }} ↗</a
      >
      <p>{{ c.hero.location }}</p>
      <a href="tel:+573007982609">+57 300 798 2609</a>
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
    <form class="contact-form" @submit.prevent="sendMessage">
      <label for="name">{{ c.contact.form_nombre }} *</label
      ><input
        id="name"
        name="name"
        v-model="name"
        :placeholder="c.contact.nombre_plceholder"
        autocomplete="name"
        required
        maxlength="120"
        pattern=".*\S.*"
      /><label for="email">{{ c.contact.form_email }} *</label
      ><input
        id="email"
        name="email"
        type="email"
        v-model="email"
        :placeholder="c.contact.email_placeholder"
        autocomplete="email"
        required
        maxlength="254"
      /><label for="message">{{ c.contactNew.message }} *</label
      ><textarea
        id="message"
        name="message"
        v-model="message"
        :placeholder="c.contactNew.placeholder"
        required
        minlength="10"
        maxlength="4000"
        rows="5"
      ></textarea>
      <p class="form-note">{{ c.contactNew.note }}</p>
      <button class="button primary" type="submit">
        {{ c.contactNew.send }} ↗
      </button>
      <p v-if="opened" role="status">{{ c.contactNew.ready }}</p>
    </form>
  </section>
</template>
