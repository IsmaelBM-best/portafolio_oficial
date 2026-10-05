<script setup>
import { computed } from "vue";
import es from "../locales/es.json";
import en from "../locales/en.json";
const props = defineProps({ isSpanish: Boolean });
const c = computed(() => (props.isSpanish ? es : en));
</script>
<template>
    <section>
    <div class="start_container" id="start">
        <div class="introduce_container">
            <div class="introduction_container">
                <div class="title">
                  {{ content.titulo_inicio }}<br>
                  <span><div class="text">{{ content.nombre }}</div></span><br>
                  {{ content.titulo_puesto }}
                </div>
                <div class="description">{{ content.descripcion }}</div>
                <div class="buttons_container">
                    <a href="#contact" class="contact_button">
                        {{ content.boton_contacto }}
                        <img src="./../assets/arrow-down-white.svg" alt="">
                    </a>
                    <a href="#about_me" class="about_button">
                        {{ content.boton_sobre_mi }}
                    </a>
                </div>
                <div class="social_media">
                    {{ content.boton_sigueme }}
                    <div class="images_container">
                        <a href="https://github.com/IsmaelBM-best?tab=repositories" target="_blank">
                            <img src="./../assets/github-brands.svg" alt="">
                        </a>
                        <a href="https://www.linkedin.com/in/ismael-blandon-moreno-944605266/" target="_blank">
                            <img src="./../assets/linkedin-brands.svg" alt="">
                        </a>
                    </div>
                </div>
            </div>
            <div class="my_image_container">
                <img src="./../assets/yop.png" alt="">
            </div>
        </div>
        <div class="mouse_animation">
            <img src="./../assets/computer-mouse-solid.svg" alt="">
            {{ content.desplazate }}
        </div>
    </div>
    <aside class="hero-card">
      <div class="portrait">
        <img
          src="../assets/yop.png"
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
