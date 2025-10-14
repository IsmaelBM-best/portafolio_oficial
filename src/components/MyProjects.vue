<script setup>
const props = defineProps({
  isSpanish: Boolean
})

// Importamos los archivos de traducción
import es from '../locales/es.json'
import en from '../locales/en.json'

import { computed } from 'vue'

// Computed para obtener el contenido según el idioma
const content = computed(() => props.isSpanish ? es.projects : en.projects)
</script>

<template>
    <div class="projects_container" id="projects">
        <div class="titles">
            <div class="title">{{ content.titulo }} <span>{{ content.proyectos }}</span></div>
            <div class="description">{{ content.trabajos }}</div>
        </div>

        <div class="projects_cards">
            <!-- Proyecto 1 -->
            <div class="project_card">
                <div class="img_container coco">
                    <img src="./../assets/health.png" alt="">
                </div>
                <div class="info_project">
                    <div class="title">{{ content.titulo_proyecto_uno }}</div>
                    <div class="description">{{ content.descripcion_proyecto_uno }}</div>
                </div>
                <div class="buttons">
                    <a href="https://coco-ismael.netlify.app/" target="_blank" class="demo_button">
                        <img src="./../assets/eye-icon.svg" alt="">
                        {{ content.ver }}
                    </a>
                    <a href="https://github.com/IsmaelBM-best/coco" target="_blank" class="code_button">
                        <img src="./../assets/github-icon.svg" alt="">
                        {{ content.codigo }}
                    </a>
                </div>
            </div>

            <!-- Proyecto 2 -->
            <div class="project_card">
                <div class="img_container marvel">
                    <img src="./../assets/heros.png" alt="">
                </div>
                <div class="info_project">
                    <div class="title">{{ content.titulo_proyecto_dos }}</div>
                    <div class="description">{{ content.descripcion_proyecto_dos }}</div>
                </div>
                <div class="buttons">
                    <a href="https://marvel-ibm.netlify.app/" target="_blank" class="demo_button">
                        <img src="./../assets/eye-icon.svg" alt="">
                        {{ content.ver }}
                    </a>
                    <a href="https://github.com/IsmaelBM-best/marvel-ibm" target="_blank" class="code_button">
                        <img src="./../assets/github-icon.svg" alt="">
                        {{ content.codigo }}
                    </a>
                </div>
            </div>

            <!-- Proyecto 3 -->
            <div class="project_card">
                <div class="img_container trivia">
                    <img src="./../assets/trivia.png" alt="">
                </div>
                <div class="info_project">
                    <div class="title">{{ content.titulo_proyecto_tres }}</div>
                    <div class="description">{{ content.descripcion_proyecto_tres }}</div>
                </div>
                <div class="buttons">
                    <a href="https://trivia-ibm.netlify.app/" target="_blank" class="demo_button">
                        <img src="./../assets/eye-icon.svg" alt="">
                        {{ content.ver }}
                    </a>
                    <a href="https://github.com/IsmaelBM-best/ismael-trivia" target="_blank" class="code_button">
                        <img src="./../assets/github-icon.svg" alt="">
                        {{ content.codigo }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/my_projects.scss';
</style>
