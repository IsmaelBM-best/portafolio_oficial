# Solicitudes privadas

Las solicitudes se guardan en Cloudflare D1, base `portafolio-solicitudes`, tabla `solicitudes`.

Abrir con la cuenta de Cloudflare del propietario:
https://dash.cloudflare.com/59c0228cb5176d24cdcb178d3281ae59/workers/d1/databases/fbcc74c3-ab65-4ea3-a7b9-17bc8e68a066/studio

Seleccionar la tabla `solicitudes` para consultar nombre, WhatsApp, necesidad, fecha y estado. La fecha se guarda en UTC. El estado inicial es `Nueva` y puede editarse desde Studio. No existe un endpoint público para leer solicitudes. No se envían avisos de correo ni mensajes de WhatsApp automáticos.

El formulario usa Pages Functions y D1 del plan gratuito de Cloudflare. Los límites gratuitos son compartidos con los demás proyectos de la cuenta. No se ha activado un plan de pago. Si se agota la cuota o falla el almacenamiento, el formulario muestra un error y conserva los datos del visitante para reintentar.

Validación en servidor, consultas parametrizadas, límite de tamaño, origen propio, campo antispam y límite de cinco solicitudes por origen por hora. No se guarda la IP en texto; el hash rotatorio es solo un control básico de abuso, no reemplaza Turnstile ante un ataque distribuido.

La migración inicial está en `migrations/0001_solicitudes.sql`. El binding `SOLICITUDES` está declarado en `wrangler.jsonc`. No publicar exportaciones de esta base en el repositorio ni en `public/`.
