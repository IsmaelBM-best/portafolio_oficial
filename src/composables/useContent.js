import { ref, computed } from 'vue'
import es from '../locales/es.json'
import en from '../locales/en.json'

// 🌍 Estado global compartido entre todos los componentes
const currentLang = ref('es') // Idioma por defecto
const content = computed(() => (currentLang.value === 'es' ? es : en))

// 🔁 Función para alternar idioma manualmente
const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'es' ? 'en' : 'es'
  localStorage.setItem('lang', currentLang.value)
}

// 📦 Función para usar en cualquier componente
export function useContent() {
  return {
    content,
    toggleLanguage,
    currentLang
  }
}

// 🧠 Cuando se recarga la página, recupera el idioma guardado
const savedLang = localStorage.getItem('lang')
if (savedLang) {
  currentLang.value = savedLang
}
