<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
      nameError: '',
      emailError: ''
    }
  },
  methods: {
    sendMessage() {
      this.nameError = ''
      this.emailError = ''

      if (!this.name) {
        this.nameError = "El nombre es obligatorio."
      }
      if (!this.email) {
        this.emailError = "El correo es obligatorio."
      }

      if (this.nameError || this.emailError) {
        return
      }

      const phone = "573007982609"
      const text = `Hola, soy ${this.name} (${this.email}). ${this.message || ''}`
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      window.open(url, "_blank")
    }
  }
}
</script>

<template>
    <div class="contact_me_container" id="contact">
        <div class="titles">
            <div class="title">Contáctame</div>
            <div class="description">¿Tienes un proyecto en mente? Estoy disponible para nuevas oportunidades.</div>
        </div>
        <div class="contact_info_and_form">
            <div class="contact_info">
                <div class="title_and_description">
                    <div class="title">Información de Contacto</div>
                    <div class="description">Estoy interesado en oportunidades y proyectos desafiantes. No dudes en contactarme para llegar a un acuerdo.</div>
                </div>
                <div class="contact_fonts">
                    <div class="contact_font">
                        <div class="img_decoration">
                            <img src="/src/assets/mail-icon.svg" alt="">
                        </div>
                        <div class="font_titles">
                            <div class="title">Email</div>
                            <a class="font" href="mailto:ismaelblandonwork@gmail.com">ismaelblandonwork@gmail.com</a>
                        </div>
                    </div>
                    <div class="contact_font">
                        <div class="img_decoration">
                            <img src="/src/assets/phone-icon.svg" alt="" class="phone_img">
                        </div>
                        <div class="font_titles">
                            <div class="title">Teléfono</div>
                            <a class="font" href="tel:+573007982609">300 798 2609</a>
                        </div>
                    </div>
                    <div class="contact_font">
                        <div class="img_decoration">
                            <img src="/src/assets/location-icon.svg" alt="" class="location_img">
                        </div>
                        <div class="font_titles">
                            <div class="title">Ubicación</div>
                            <a class="font">Bello, Antioquia</a>
                        </div>
                    </div>
                    <div class="follow_links_container">
                        <div class="title_follow">Sigueme en:</div>
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
                    <div class="label">Nombre <span>*</span></div>
                    <div class="input_img">
                        <img src="./../assets/user-icon.svg" alt="">
                        <input type="text" placeholder="Tu nombre" v-model="name">
                    </div>
                    <span v-if="nameError" class="error">{{ nameError }}</span>
                </div>
                <div class="form_input">
                    <div class="label">Email <span>*</span></div>
                    <div class="input_img">
                        <img src="./../assets/send-icon-contact.svg" alt="">
                        <input type="text" placeholder="tu@email.com" v-model="email">
                    </div>
                    <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>
                <div class="form_input">
                    <div class="label">Mensaje</div>
                    <textarea name="" id="" placeholder="Deja un mensaje..." v-model="message"></textarea>
                </div>
                <button class="contact_button" @click="sendMessage">
                    Enviar mensaje
                    <img src="./../assets/paper-plane.svg" alt="">
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './../styles/contact_me.scss';
</style>