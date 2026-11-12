<script setup>
import { ref } from 'vue'
const people = [
  {
    "image": 2,
    "name": "Esteban",
    "role": "Empleado · Arquitecto",
    "title": "Menos malentendidos",
    "quote": "“Ahora tenemos menos malentendidos con nuestros líderes. La organización de las tareas nos ayuda a entender lo mismo y a trabajar con instrucciones más claras.”",
    "rating": 5
  },
  {
    "image": 3,
    "name": "Luisa",
    "role": "Empleada · Arquitecta",
    "title": "Hablamos el mismo idioma",
    "quote": "“Con Ergasia siento que hablamos el mismo idioma con el equipo. Puedo revisar lo que tengo asignado y entender mejor qué esperan de mi trabajo.”",
    "rating": 4.5
  },
  {
    "image": 4,
    "name": "Jimena Blandón Moreno",
    "role": "CEO",
    "title": "Tranquilidad para coordinar",
    "quote": "“Nos da tranquilidad poder consultar en tiempo real en qué está trabajando cada integrante del equipo. Tenemos una visión más clara de la operación y podemos acompañar el trabajo sin interrumpir continuamente para preguntar cómo va.”",
    "rating": 5
  },
  {
    "image": 5,
    "name": "Apolonio Barrios Lara",
    "role": "CTO",
    "title": "Cada persona sabe qué hacer",
    "quote": "“Ya no recibimos constantemente las preguntas de “¿en qué trabajo?” o “¿qué tengo que hacer?”. Con las tareas organizadas en Ergasia, cada persona consulta lo que tiene asignado y sabe por dónde empezar.”",
    "rating": 5
  },
  {
    "image": 6,
    "name": "Mary Martínez",
    "role": "Líder administrativa · Arquitecta",
    "title": "Una jornada más puntual",
    "quote": "“Desde que implementamos Ergasia, dejamos de tener las llegadas tarde que antes afectaban la organización del equipo. Hoy arrancamos la jornada con más orden y claridad.”",
    "rating": 5
  },
  {
    "image": 7,
    "name": "Fernando",
    "role": "Empleado · Arquitecto",
    "title": "Más tiempo para trabajar",
    "quote": "“La organización de Ergasia me facilita el día. Encuentro lo que necesito hacer y dedico menos tiempo a pedir indicaciones y más tiempo a avanzar en mis tareas.”",
    "rating": 5
  }
]
const active = ref(-1)
const toggle = i => { active.value = active.value === i ? -1 : i }
const step = direction => { active.value = active.value < 0 ? (direction > 0 ? 0 : people.length - 1) : (active.value + direction + people.length) % people.length }
</script>

<template>
  <section id="testimonials" class="testimonials-section container" aria-labelledby="voices-heading">
    <div class="testimonials-content">
      <header class="intro">
        <div><p class="eyebrow">Testimonios · Ingeniarem × Ergasia</p><h2 id="voices-heading">Más claridad.<br><span>Un equipo en sintonía.</span></h2><p>La organización del trabajo, vista desde quienes ejecutan las tareas y quienes coordinan al equipo.</p></div>
        <a class="company-link" href="https://www.instagram.com/ingeniarem/" target="_blank" rel="noopener noreferrer"><img src="/propuestas/ingeniarem/ingeniarem.png" alt="Ingeniarem SAS" width="653" height="326"><span>Conoce a Ingeniarem ↗</span></a>
      </header>
      <div class="voices-toolbar"><span>VOCES DEL EQUIPO <small>Selecciona una historia</small></span><div class="voices-navigation"><button type="button" aria-label="Testimonio anterior" @click="step(-1)">←</button><span>{{ active < 0 ? '06 historias' : String(active + 1).padStart(2, '0') + ' / 06' }}</span><button type="button" aria-label="Testimonio siguiente" @click="step(1)">→</button></div></div>
      <div class="voices-accordion" @keydown.right.prevent="step(1)" @keydown.left.prevent="step(-1)">
        <article v-for="(person, i) in people" :key="person.image" class="voice-slide" :class="{ 'is-open': active === i }">
          <img class="voice-photo" :src="'/propuestas/ingeniarem/portrait-' + person.image + '.webp'" :alt="person.name" width="1086" height="1448" loading="lazy" decoding="async">
          <div class="voice-shade" aria-hidden="true"></div>
          <button class="voice-toggle" type="button" :aria-label="(active === i ? 'Cerrar testimonio de ' : 'Ver testimonio de ') + person.name" :aria-expanded="active === i" :aria-controls="'voice-details-' + i" @click="toggle(i)"><span class="voice-index">{{ String(i + 1).padStart(2, '0') }}</span><span class="voice-compact-name">{{ person.name }}</span><span class="voice-plus" aria-hidden="true"></span></button>
          <div :id="'voice-details-' + i" class="voice-details" :aria-hidden="active !== i" :inert="active !== i">
            <div class="voice-rating" role="img" :aria-label="person.rating + ' de 5 estrellas'"><span v-for="star in 5" :key="star" class="voice-star" aria-hidden="true">★<i :style="{width: Math.min(1, Math.max(0, person.rating - star + 1)) * 100 + '%'}">★</i></span><span>{{ person.rating === 4.5 ? '4,5' : '5' }}/5</span></div>
            <h3>{{ person.title }}</h3><blockquote>{{ person.quote }}</blockquote><div class="voice-person"><strong>{{ person.name }}</strong><span>{{ person.role }}</span><small>Ingeniarem SAS</small></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section{position:relative;isolation:isolate;scroll-margin-top:100px}
.intro{display:grid;grid-template-columns:1fr 220px;align-items:center;gap:50px}.intro h2{font-size:clamp(38px,5vw,70px);line-height:1.05;letter-spacing:-.045em;margin:18px 0}.intro h2 span{color:#d7d8ff}.intro p{max-width:650px;color:#e2e6ef;font-size:15px}.company-link{display:grid;gap:12px;text-decoration:none;text-align:center;color:#edf5ff;font-size:12px}.company-link img{width:100%;height:auto;border-radius:20px}.voices-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:22px 0}.voices-toolbar>span{font-size:10px;letter-spacing:.15em}.voices-toolbar small{display:block;letter-spacing:0;font-size:12px;margin-top:6px;color:#dee2ed}.voices-navigation{display:flex;gap:14px;align-items:center;font-size:11px}.voices-navigation button{width:42px;height:42px;border-radius:50%;border:1px solid #ffffff4d;background:linear-gradient(135deg,#d0ddff25,#8972d333);color:white;font-size:20px;cursor:pointer;transition:background .2s,transform .2s}.voices-navigation button:hover{background:#b6c5ff45;transform:translateY(-2px)}
.voices-accordion{display:flex;height:720px;gap:8px;isolation:isolate}.voice-slide{position:relative;flex:1 1 0;min-width:0;overflow:hidden;border-radius:25px;background:#515963;border:1px solid #d7e2ff45;transition:flex .8s cubic-bezier(.4,0,.2,1);contain:layout paint}.voice-slide.is-open{flex:4.5 1 0}.voice-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 20%;filter:grayscale(1);transition:filter .8s cubic-bezier(.4,0,.2,1)}.voice-slide:hover .voice-photo,.voice-slide.is-open .voice-photo{filter:grayscale(0)}.voice-slide.is-open .voice-photo{height:54%;object-fit:cover;object-position:50% 27%}.voice-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 28%,#262c3b33 45%,#272d3dd9 76%,#272d3df7)}.is-open .voice-shade{background:linear-gradient(180deg,transparent 23%,#31374700 32%,#313747 54%,#292f40 100%)}.voice-toggle{position:absolute;inset:0;z-index:3;border:0;background:none;color:white;cursor:pointer;text-align:left}.voice-index{position:absolute;top:24px;left:20px;font-size:16px;font-weight:400;color:#fff9}.voice-compact-name{position:absolute;bottom:100px;left:32px;transform:rotate(-90deg);transform-origin:left bottom;white-space:nowrap;font-size:17px;font-weight:600;transition:opacity .3s,transform .8s cubic-bezier(.4,0,.2,1)}.is-open .voice-compact-name{opacity:0;transform:rotate(0)}.voice-plus{position:absolute;bottom:24px;right:22px;width:32px;height:32px;border-radius:50%;border:1px solid #c8d7ff99;background:#c1ceff1a}.voice-plus:before,.voice-plus:after{content:'';position:absolute;background:#dfdfff;left:9px;top:14px;width:12px;height:2px;transition:transform .4s,opacity .4s}.voice-plus:after{transform:rotate(90deg)}.is-open .voice-plus:after{transform:rotate(0);opacity:0}
.voice-details{position:absolute;left:26px;right:26px;bottom:70px;color:#f8faff;opacity:0;transform:translateY(30px);transition:opacity .3s,transform .6s cubic-bezier(.4,0,.2,1);pointer-events:none}.is-open .voice-details{opacity:1;transform:translateY(0);transition-delay:.3s}.voice-details h3{font-size:clamp(22px,2vw,29px);line-height:1.1;letter-spacing:-.035em;margin:14px 0}.voice-details blockquote{margin:0;font-size:14px;line-height:1.65;color:#e5e8f1;font-style:normal}.voice-person{display:grid;gap:3px;margin-top:20px}.voice-person strong{font-size:15px;line-height:1.3}.voice-person span{font-size:12px;color:#d0d8f5}.voice-person small{font-size:10px;color:#b5c0d8}.voice-rating{display:flex;align-items:center;gap:3px}.voice-rating>span:last-child{margin-left:8px;font-size:11px;color:#ffe3a6}.voice-star{position:relative;color:#ffffff30;font-size:20px;line-height:1}.voice-star i{position:absolute;inset:0 auto 0 0;overflow:hidden;font-style:normal;color:#f2d48d}.voice-toggle:focus-visible{outline:3px solid #bcdfff;outline-offset:-5px;border-radius:24px}.voices-navigation button:focus-visible,.company-link:focus-visible{outline:2px solid #d6d0ff;outline-offset:4px}
@media(max-width:1000px) and (min-width:701px){.voices-accordion{height:760px;gap:5px}.voice-slide.is-open{flex:7 1 0}.voice-compact-name{left:22px;font-size:14px}.voice-plus{right:9px}.voice-details{left:22px;right:22px}}
@media(max-width:700px){.intro{grid-template-columns:1fr;gap:22px}.company-link{width:170px}.voices-accordion{flex-direction:column;height:auto;gap:8px}.voice-slide{flex:none;height:76px;min-height:76px;transition:height .8s cubic-bezier(.4,0,.2,1)}.voice-slide.is-open{flex:none;height:720px}.voice-photo{object-position:50% 32%}.voice-slide.is-open .voice-photo{height:365px;object-position:50% 23%}.voice-compact-name{transform:none;left:50px;bottom:27px;font-size:14px;max-width:calc(100% - 110px);overflow:hidden;text-overflow:ellipsis}.voice-index{top:27px;left:16px;font-size:12px}.voice-plus{right:15px;bottom:21px}.voice-shade{background:linear-gradient(90deg,#252d43bd,#252d4360)}.is-open .voice-shade{background:linear-gradient(180deg,transparent 20%,#31374700 35%,#313747 50%,#292f40 100%)}.voice-details{left:24px;right:24px;bottom:65px}.voice-details blockquote{font-size:14px}.voices-toolbar>span{font-size:9px}.voices-navigation{gap:8px}.voices-navigation button{width:36px;height:36px}.voice-details h3{font-size:25px}}
@media(prefers-reduced-motion:reduce){.voice-slide,.voice-photo,.voice-details,.voice-compact-name,.voice-plus:after,.voice-plus:before{transition:none!important}}
</style>
