# GeoNight

Aplicación desarrollada para la GeoNight organizada en colaboración con la Asociación Española de Geografía (AGE).

# Localization

Locations are stored in folder specified in config.json (`localePath`).

Add data-i18n="UNIQUE-ID".

## Update translations

1. Run the following command: `npm run update:po`
2. Go to https://poeditor.com/projects/import?id=594851
3. And upload locale/en-us/translation.po
4. Add the translations
5. Download each language (except english)
6. Move to the right folder
7. Convert po files to i18n: `npm run i18n`

## Change UI language

Use `?lng=es`

# Terra Incógnita: Tareas pendientes

- [x] Embeber las pistas del juego
- [x] Calcular el tiempo en responder
- [x] Requerir un Login de usuario y guardar tiempo y respuestas de cada un@
- [x] Añadir las respuestas reales
- [x] Descativar localizaciones ya respondidas
- [x] Calcular error con respecto a la localización seleccioonada
- [x] Añadir preguntar final
- [x] Parar reloj, gracias y volver a la web
- [x] Guardar respuestas ya enviadas
- [x] Comprobar el estado de la aplicación al cargar (si ya se ha terminado no dejar jugar más)
- [x] Pedir nombres de los miembros del equipo al principio
- [x] Enviar respuestas al servidor
- [x] Cambiar pregunta final -> Abierta y comparar similitud con respuestas válidas
- [x] Actualizar vídeos de pistas
- [ ] Mejorar UI:
  - [x] Arreglar Tamaño iframe
  - [x] Añadir links a imágenes para ver en grande
  - [x] Añadir animación al poner ratón sobre la pista
- [x] Mejorar instrucciones del principio (añadir screenshot de la interfaz)
- [x] Cambiar datos de auth0 con datos de Terra Incógnita
- [x] UI: Flip al hacer clic
- [x] Acumulado no se muestra nada más registrate
- [x] Descargar las respuestas
- [x] Añadir zoom a imagen
- [ ] Añadir [catch a applyEdits](https://developers.arcgis.com/javascript/latest/sample-code/editing-applyedits/) por si falla al guardar
- [ ] TOS

Wishlist:

- [ ] Refactorizar código JS
- [ ] Pasar a Web Components (¿con Jorge del Casar?)
- [ ] [Limpiar CSS](https://www.keycdn.com/blog/remove-unused-css) (o rehacerlo ¿[con NucliWeb](https://twitter.com/nucliweb)?)
- [ ] Grabar vídeo explicando cómo compartir con audio
- [ ] [Borrar cookies](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies/remove) para evitar [error 403 auth0](https://youtu.be/U_KdvBMzsTk)
- [ ] Mostrar el menú de navegación de pistas por pasos y arriba // o añadir instrucciones al principio
- [ ] Restringir para que sólo la app pueda ver las respuesta
- [ ] Mostrar el leaderboard al final
- [ ] Hacer responsive
- [ ] Mejorar diseño para resolución de 1024x768
- [ ] UI: Añadir flechas de navegación entre pistas
- [ ] Comprobar si se ha guardado bien el resultado (comprobar si falla)
- [x] Lista con la gente que ha participado
