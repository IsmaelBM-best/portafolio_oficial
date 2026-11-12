<script setup>
import {ref} from 'vue';
const props=defineProps({es:Boolean});
const busy=ref(false),status=ref(''),failed=ref(false);
const t=(es,en)=>props.es?es:en;
async function send(event){
 if(busy.value)return;
 const form=event.target;if(!form.reportValidity())return;
 busy.value=true;status.value='';failed.value=false;
 const data=Object.fromEntries(new FormData(form));
 try{
  const response=await fetch('https://formsubmit.co/ajax/ismaelblandonwork@gmail.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({...data,_subject:'Solicitud de proyecto · Portafolio Ismael',_url:location.href,_template:'table'}),signal:AbortSignal.timeout(20000)});
  const result=await response.json();if(!response.ok||!(result.success===true||result.success==='true'))throw Error('send');
  status.value=t('Solicitud registrada. Te contactaremos por WhatsApp.','Request submitted. We will contact you on WhatsApp.');form.reset();
 }catch{failed.value=true;status.value=t('No pudimos registrar la solicitud. Tus datos siguen aquí; vuelve a intentarlo o escríbenos por WhatsApp.','We could not submit your request. Your details are still here; try again or contact us on WhatsApp.');}
 finally{busy.value=false;}
}
</script>
<template>
 <form class="inquiry-form glass" @submit.prevent="send" :aria-busy="busy">
  <h3>{{t('Cuéntanos qué necesitas','Tell us what you need')}}</h3>
  <label>{{t('Tu nombre','Your name')}}<input name="nombre" autocomplete="name" required maxlength="100"></label>
  <label>WhatsApp<input name="whatsapp" type="tel" autocomplete="tel" placeholder="+57 300 123 4567" pattern="[+0-9 ()\-]{7,25}" required maxlength="25"></label>
  <label>{{t('¿Qué necesitas?','What do you need?')}}<textarea name="necesidad" rows="3" required minlength="10" maxlength="2000" :placeholder="t('Cuéntanos brevemente tu idea o el problema que quieres resolver.','Briefly describe your idea or the problem you want to solve.')"></textarea></label>
  <input class="form-honey" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
  <small>{{t('Usaremos estos datos para responder a tu solicitud. El formulario se procesa mediante FormSubmit.','We will use these details to respond to your request. FormSubmit processes this form.')}}</small>
  <button class="button primary" type="submit" :disabled="busy">{{busy?t('Enviando…','Sending…'):t('Enviar solicitud','Send request')}}</button>
  <p role="status" :class="{'form-error':failed}">{{status}}</p>
 </form>
</template>
<style>
.inquiry-form{position:relative;z-index:6;padding:30px;border-radius:24px;display:grid;gap:18px;margin-top:35px;max-width:600px}.inquiry-form label{display:grid;gap:8px;font-size:13px}.inquiry-form input,.inquiry-form textarea{font:inherit;color:#fff;background:#30384460;border:1px solid #cbd6ef55;padding:13px;border-radius:11px;width:100%}.inquiry-form textarea{resize:vertical}.inquiry-form :is(input,textarea):focus{outline:2px solid #c4b2ff;outline-offset:2px}.inquiry-form ::placeholder{color:#c8cbd6}.inquiry-form small{font-size:11px;line-height:1.6}.inquiry-form button:disabled{opacity:.65;cursor:wait}.inquiry-form .form-honey{display:none}.inquiry-form p{font-size:13px}.form-error{color:#ffd2d2}@media(max-width:760px){.inquiry-form{padding:22px}}
</style>
