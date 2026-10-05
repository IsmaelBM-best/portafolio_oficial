<script setup>
import AboutMe from "./AboutMe.vue";
import SkillsBriefcase from "./SkillsBriefcase.vue";
import StartBriefcase from "./StartBriefcase.vue";
import MyProjects from "./MyProjects.vue";
import ContactMe from "./ContactMe.vue";
import Footer from "./Footer.vue";
defineProps({ isSpanish: Boolean });
</script>
<template>
  <main id="main">
    <StartBriefcase :isSpanish="isSpanish" /><AboutMe
      :isSpanish="isSpanish"
    /><MyProjects :isSpanish="isSpanish" /><SkillsBriefcase
      :isSpanish="isSpanish"
    /><ContactMe :isSpanish="isSpanish" />
  </main>
  <Footer :isSpanish="isSpanish" />
</template>
