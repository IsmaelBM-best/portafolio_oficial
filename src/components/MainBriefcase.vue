<script setup>
import AboutMe from './AboutMe.vue';
import SkillsBriefcase from './SkillsBriefcase.vue';
import StartBriefcase from './StartBriefcase.vue';
import MyProjects from './MyProjects.vue';

</script>

<template>
    <div class="main_principal_container">
        <StartBriefcase />
        <AboutMe />
        <MyProjects />
        <SkillsBriefcase />
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/main_briefcase.scss';
</style>