<script setup>
import code from '@material-design-icons/svg/round/code.svg?raw';
import language from '@material-design-icons/svg/round/language.svg?raw';
import hub from '@material-design-icons/svg/round/hub.svg?raw';
import auto_awesome from '@material-design-icons/svg/round/auto_awesome.svg?raw';
import chat from '@material-design-icons/svg/round/chat.svg?raw';
import arrow_forward from '@material-design-icons/svg/round/arrow_forward.svg?raw';
import arrow_back from '@material-design-icons/svg/round/arrow_back.svg?raw';
import north_east from '@material-design-icons/svg/round/north_east.svg?raw';
import schedule from '@material-design-icons/svg/round/schedule.svg?raw';
import task_alt from '@material-design-icons/svg/round/task_alt.svg?raw';
import forum from '@material-design-icons/svg/round/forum.svg?raw';
import check from '@material-design-icons/svg/round/check.svg?raw';
import menu from '@material-design-icons/svg/round/menu.svg?raw';
import close from '@material-design-icons/svg/round/close.svg?raw';
import pause from '@material-design-icons/svg/round/pause.svg?raw';
import play_arrow from '@material-design-icons/svg/round/play_arrow.svg?raw';
import arrow_downward from '@material-design-icons/svg/round/arrow_downward.svg?raw';
import arrow_upward from '@material-design-icons/svg/round/arrow_upward.svg?raw';
defineProps({name:{type:String,required:true}});
const icons={code,language,hub,auto_awesome,chat,arrow_forward,arrow_back,north_east,schedule,task_alt,forum,check,menu,close,pause,play_arrow,arrow_downward,arrow_upward};
</script>
<template><span class="material-icon" aria-hidden="true" v-html="icons[name]||icons.north_east"></span></template>
<style>.material-icon{display:inline-flex;width:1.25em;height:1.25em;flex-shrink:0;vertical-align:middle}.material-icon svg{width:100%;height:100%;fill:currentColor}</style>
