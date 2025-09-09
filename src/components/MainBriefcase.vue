<script setup>
import AboutMe from './AboutMe.vue';
import SkillsBriefcase from './SkillsBriefcase.vue';
import StartBriefcase from './StartBriefcase.vue';
import MyProjects from './MyProjects.vue';
import ContactMe from './ContactMe.vue';
import Footer from './Footer.vue';
</script>

<template>
    <div class="main_principal_container">
        <StartBriefcase />
        <AboutMe />
        <MyProjects />
        <SkillsBriefcase />
        <ContactMe />
        <Footer />
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/main_briefcase.scss';
</style>