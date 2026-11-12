export const businessNumber = '573007982609';
export const serviceQuestions = {
 es: [
  'Hola, Ismael. Necesito software a la medida para mi empresa. ¿Podemos revisar mis procesos y definir el alcance y una cotización?',
  'Hola, Ismael. Quiero una web o landing page para presentar mi negocio y captar clientes. ¿Qué necesitas para preparar una propuesta?',
  'Hola, Ismael. Quiero conectar mis herramientas y automatizar tareas. ¿Podemos revisar qué integraciones necesita mi negocio?',
  'Hola, Ismael. Ya tengo un producto digital y necesito mejorarlo. ¿Podemos revisar las funcionalidades, errores o mejoras de diseño y cotizar el trabajo?'
 ],
 en: [
  'Hi Ismael, I need custom software for my company. Can we review my workflows and define the scope and a quote?',
  'Hi Ismael, I need a website or landing page to present my business and attract clients. What do you need to prepare a proposal?',
  'Hi Ismael, I want to connect my tools and automate tasks. Can we review the integrations my business needs?',
  'Hi Ismael, I have a digital product that needs improvements. Can we review features, bugs or design changes and get a quote?'
 ]
};
export function whatsappUrl(message) {
 return `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
}
