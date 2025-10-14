<script setup>
import { defineProps } from 'vue'
import es from '../locales/es.json'
import en from '../locales/en.json'

// Recibe el idioma desde App.vue
const props = defineProps({
  isSpanish: Boolean
})
</script>

<template>
  <div class="about_me_container" id="about_me">
    <div class="title_and_description">
      <div class="title">{{ props.isSpanish ? es.about_me.titulo : en.about_me.titulo }} <span>{{ props.isSpanish ? es.about_me.mi : en.about_me.mi }}</span></div>
      <div class="description">{{ props.isSpanish ? es.about_me.descripcion_uno : en.about_me.descripcion_uno }}</div>
    </div>

    <div class="about_me_content">
      <div class="history_container">
        <img src="./../assets/my_history_img.png" alt="">
        <div class="history_text">
          <div class="title">{{ props.isSpanish ? es.about_me.titulo_dos : en.about_me.titulo_dos }}</div>
          <div class="description" v-html="props.isSpanish ? es.about_me.descripcion_dos : en.about_me.descripcion_dos"></div>
        </div>
      </div>

      <div class="professional_experience">
        <div class="title">{{ props.isSpanish ? es.about_me.titulo_experiencia : en.about_me.titulo_experiencia }}</div>
        <div class="experience_container">
          <div class="experience">
            <div class="figure_container">
              <div class="figure"></div>
            </div>
            <div class="experience_presentation">
              <div class="title">{{ props.isSpanish ? es.about_me.titutlo_desarrollador_uno : en.about_me.titutlo_desarrollador_uno }}</div>
              <div class="company_and_date">
                <a href="https://www.linkedin.com/company/coco-tecnologias/posts/?feedView=all" target="_blank">
                  {{ props.isSpanish ? es.about_me.empresa_anchor : en.about_me.empresa_anchor }}
                </a> • {{ props.isSpanish ? es.about_me.fecha_uno : en.about_me.fecha_uno }}
              </div>
              <div class="description">{{ props.isSpanish ? es.about_me.descripcion_empresa : en.about_me.descripcion_empresa }}</div>
            </div>
          </div>

          <div class="experience">
            <div class="figure_container">
              <div class="figure"></div>
            </div>
            <div class="experience_presentation">
              <div class="title">{{ props.isSpanish ? es.about_me.titutlo_desarrollador_dos : en.about_me.titutlo_desarrollador_dos }}</div>
              <div class="company_and_date">
                <a href="https://www.linkedin.com/school/academlo/posts/?feedView=all" target="_blank">
                  {{ props.isSpanish ? es.about_me.estudio_anchor : en.about_me.estudio_anchor }}
                </a> • {{ props.isSpanish ? es.about_me.fecha_dos : en.about_me.fecha_dos }}
              </div>
              <div class="description">{{ props.isSpanish ? es.about_me.descripcion_estudio : en.about_me.descripcion_estudio }}</div>
            </div>
          </div>
        </div>

        <a :href="props.isSpanish ? '/src/pdf/CV_oficial.pdf' : '/src/pdf/cv_english.pdf'" target="_blank" class="cv_link">
          {{ props.isSpanish ? es.about_me.cv_url : en.about_me.cv_url }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../styles/about_me.scss';
</style>
