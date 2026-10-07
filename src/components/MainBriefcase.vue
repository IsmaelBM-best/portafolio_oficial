<script setup>
import AboutMe from "./ExperienceJourney.vue";
import SkillsBriefcase from "./SkillsBriefcase.vue";
import StartBriefcase from "./StartBriefcase.vue";
import MyProjects from "./ProjectGallery.vue";
import CredentialsLibrary from "./CredentialsLibrary.vue";
import ContactMe from "./ContactMe.vue";
import Footer from "./Footer.vue";
defineProps({ isSpanish: Boolean });
</script>
<template>
  <main id="main">
    <StartBriefcase :isSpanish="isSpanish" /><AboutMe
      :isSpanish="isSpanish"
    /><MyProjects :isSpanish="isSpanish" /><CredentialsLibrary
      :isSpanish="isSpanish"
    /><SkillsBriefcase :isSpanish="isSpanish" /><ContactMe
      :isSpanish="isSpanish"
    />
  </main>
  <Footer :isSpanish="isSpanish" />
</template>
