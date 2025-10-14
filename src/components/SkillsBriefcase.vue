<script setup>
import { computed } from 'vue'
import es from '../locales/es.json'
import en from '../locales/en.json'

const props = defineProps({
  isSpanish: Boolean
})

const content = computed(() => props.isSpanish ? es.skills : en.skills)
</script>

<template>
    <div class="skills_container" id="skills">
        <div class="skills_title">
            <div class="title">{{ content.titulo }} <span>{{ content.habilidades }}</span></div>
            <div class="description">{{ content.descripcion }}</div>
        </div>
        <div class="skills_and_tools">
            <div class="skills_box">
                <div class="title">
                    <img src="./../assets/page-icon.svg" alt="">
                    {{ content.frontend }}
                </div>
                <div class="skills_images">
                    <div class="skill"><img src="./../assets/html5-brands.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/css3-alt-brands.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/javascript.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/vue.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/sass-brands.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/react-brands.svg" alt=""></div>
                </div>
            </div>
            <div class="skills_box">
                <div class="title">
                    <img src="./../assets/tool-icon.svg" alt="">
                    {{ content.herramientas }}
                </div>
                <div class="skills_images">
                    <div class="skill"><img src="./../assets/visual-studio-code-logo.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/figma-icon.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/jira-icon.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/git-bash-icon.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/docker-icon.svg" alt=""></div>
                    <div class="skill"><img src="./../assets/postman-icon.svg" alt=""></div>
                    <div class="skill"><img src="/src/assets/pgadmin.svg" alt=""></div>
                    <div class="skill"><img src="/src/assets/github-brands.svg" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/skills_briefcase.scss';
</style>
