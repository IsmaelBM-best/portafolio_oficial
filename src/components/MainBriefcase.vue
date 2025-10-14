<script setup>
import AboutMe from './AboutMe.vue'
import SkillsBriefcase from './SkillsBriefcase.vue'
import StartBriefcase from './StartBriefcase.vue'
import MyProjects from './MyProjects.vue'
import ContactMe from './ContactMe.vue'
import Footer from './Footer.vue'

const props = defineProps({ isSpanish: Boolean })
</script>

<template>
  <div class="main_principal_container">
    <StartBriefcase :isSpanish="props.isSpanish" />
    <AboutMe :isSpanish="props.isSpanish" />
    <MyProjects :isSpanish="props.isSpanish" />
    <SkillsBriefcase :isSpanish="props.isSpanish" />
    <ContactMe :isSpanish="props.isSpanish" />
    <Footer :isSpanish="props.isSpanish" />
  </div>
</template>

<style lang="scss" scoped>
@import './../styles/main_briefcase.scss';
</style>