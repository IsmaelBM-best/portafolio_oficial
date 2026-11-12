<script setup>
import MaterialIcon from './MaterialIcon.vue';
defineProps({kind:Number});
</script>
<template><span class="liquid-feature-icon material-feature" aria-hidden="true"><MaterialIcon :name="['schedule','task_alt','forum'][kind]"/></span></template>