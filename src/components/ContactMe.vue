<script setup>
import { ref, computed } from 'vue'
import es from '../locales/es.json'
import en from '../locales/en.json'

const props = defineProps({
  isSpanish: Boolean
})

const content = computed(() => props.isSpanish ? es.contact : en.contact)

const name = ref('')
const email = ref('')
const message = ref('')
const nameError = ref('')
const emailError = ref('')

function sendMessage() {
    nameError.value = ''
    emailError.value = ''

    if (!name.value) {
        nameError.value = props.isSpanish ? "El nombre es obligatorio." : "Name is required."
    }
    if (!email.value) {
        emailError.value = props.isSpanish ? "El correo es obligatorio." : "Email is required."
    }

    if (nameError.value || emailError.value) return

    const phone = "573007982609"

    // Texto inicial según idioma
    const greeting = props.isSpanish
        ? `Hola, soy ${name.value} (${email.value}).`
        : `Hi, I'm ${name.value} (${email.value}).`

    // Texto final incluye el mensaje si existe
    const text = `${greeting} ${message.value || ''}`

    // URL de WhatsApp codificada
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

    // Abrir WhatsApp
    window.open(url, "_blank")

}
</script>

<template>
    <div class="contact_me_container" id="contact">
        <div class="titles">
            <div class="title">{{ content.titulo }}</div>
            <div class="description">{{ content.descripcion }}</div>
        </div>
        <div class="contact_info_and_form">
            <div class="contact_info">
                <div class="title_and_description">
                    <div class="title">{{ content.titulo_informacion }}</div>
                    <div class="description">{{ content.descripcion }}</div>
                </div>
                <div class="contact_fonts">
                    <div class="contact_font">
                        <div class="img_decoration">
                            <img src="/src/assets/mail-icon.svg" alt="">
                        </div>
                        <div class="font_titles">
                            <div class="title">{{ content.email }}</div>
                            <a class="font" href="mailto:{{ content.mail }}">{{ content.mail }}</a>
                        </div>
                    </div>
                    <div class="contact_font">
                        <div class="img_decoration">
                            <img src="/src/assets/phone-icon.svg" alt="" class="phone_img">
                        </div>
                        <div class="font_titles">
                            <div class="title">{{ content.telefono }}</div>
                            <a class="font" href="tel:+573007982609">{{ content.numero }}</a>
                        </div>
                    </div>
                    <div class="contact_font">
                        <div class="img_decoration">
                            <img src="/src/assets/location-icon.svg" alt="" class="location_img">
                        </div>
                        <div class="font_titles">
                            <div class="title">{{ content.ubicacion }}</div>
                            <a class="font">{{ content.ciudad }}</a>
                        </div>
                    </div>
                    <div class="follow_links_container">
                        <div class="title_follow">{{ content.sigueme }}</div>
                        <div class="links">
                            <a href="https://github.com/IsmaelBM-best">
                                <img src="/src/assets/github-brands.svg" alt="">
                            </a>
                            <a href="https://www.linkedin.com/in/ismael-blandon-moreno-944605266/">
                                <img src="/src/assets/linkedin-brands.svg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact_form">
                <div class="form_input">
                    <div class="label">{{ content.form_nombre }} <span>*</span></div>
                    <div class="input_img">
                        <img src="./../assets/user-icon.svg" alt="">
                        <input type="text" :placeholder="content.nombre_plceholder" v-model="name">
                    </div>
                    <span v-if="nameError" class="error">{{ nameError }}</span>
                </div>
                <div class="form_input">
                    <div class="label">{{ content.form_email }} <span>*</span></div>
                    <div class="input_img">
                        <img src="./../assets/send-icon-contact.svg" alt="">
                        <input type="text" :placeholder="content.email_placeholder" v-model="email">
                    </div>
                    <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>
                <div class="form_input">
                    <div class="label">{{ content.form_mensaje }}</div>
                    <textarea :placeholder="content.mensaje_placeholder" v-model="message"></textarea>
                </div>
                <button class="contact_button" @click="sendMessage">
                    {{ content.enviar }}
                    <img src="./../assets/paper-plane.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/contact_me.scss';
</style>
