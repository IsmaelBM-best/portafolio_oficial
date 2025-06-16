<script setup>
import { ref } from 'vue';

let show_deploy_options = ref(false);

function toggleDeployOptions() {
    show_deploy_options.value = !show_deploy_options.value;
}
</script>

<template>
    <div class="header_container">
        <div class="name_and_icon">
            <div class="icon_container">
                <img src="./../assets/code-icon.svg" alt="">
            </div>
            <div class="name">Portafolio</div>
        </div>
        <div class="options_header">
            <a href="#start" class="option">Inicio</a>
            <a href="#about_me" class="option">Sobre mí</a>
            <a href="#projects" class="option">Proyectos</a>
            <a href="#skills" class="option">Habilidades</a>
            <a href="#contact" class="option">Contacto</a>
        </div>
        <a href="" class="contact_me">
            Contáctame
            <img src="./../assets/send-contact.svg" alt="">
        </a>
        <div class="deploy_container">
            <button class="drop_button" @click="toggleDeployOptions()">
                <img src="./../assets/menu-icon.svg" alt="">
            </button>
            <div class="deploy_options" v-if="show_deploy_options">
                <a href="#start" class="option" @click="toggleDeployOptions()">Inicio</a>
                <a href="#about_me" class="option" @click="toggleDeployOptions()">Sobre mí</a>
                <a href="#projects" class="option" @click="toggleDeployOptions()">Proyectos</a>
                <a href="#skills" class="option" @click="toggleDeployOptions()">Habilidades</a>
                <a href="#contact" class="option" @click="toggleDeployOptions()">Contacto</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/header_briefcase.scss';
</style>