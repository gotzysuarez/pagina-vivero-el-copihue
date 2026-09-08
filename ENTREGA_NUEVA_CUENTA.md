# Traspaso del proyecto — Vivero El Copihue

Este documento permite continuar el proyecto desde otra cuenta de ChatGPT/Codex y posteriormente publicarlo en un hosting propio.

## 1. Repositorio de destino

- Repositorio: `gotzysuarez/pagina-vivero-el-copihue`
- Rama principal: `main`
- Proyecto: catálogo web para Vivero El Copihue, Melipilla, Chile.
- Estado visual aprobado: la raíz animada está ubicada al costado derecho del título del catálogo y también aparece de forma ambiental durante el desplazamiento. **No extender el contenedor principal de la raíz a todo el ancho**, porque esa variante fue probada y descartada.

## 2. Objetivo de la página

La página permite que las personas:

1. Vean plantas y sus fotografías.
2. Consulten características, cuidados, luz, riego, temporada y advertencias para mascotas.
3. Filtren y busquen productos.
4. Agreguen una o varias plantas al carrito.
5. Cambien cantidades o eliminen productos.
6. Envíen el pedido completo por WhatsApp.
7. Confirmen por WhatsApp el stock, precio final, despacho o retiro y forma de pago.

La página no procesa pagos en línea. Los precios actuales son referenciales y el stock se confirma por WhatsApp.

## 3. Funciones que deben conservarse

- Diseño oscuro, elegante y relacionado con naturaleza.
- Logo de Vivero El Copihue en la cabecera.
- Navegación adaptable a computador y celular.
- Animaciones de entrada y desplazamiento.
- Indicador dorado de progreso de lectura.
- Raíz con musgo animada en el catálogo.
- Efecto ambiental sutil de la raíz al recorrer la página.
- Bordes dorados sutiles en imágenes y elementos destacados.
- Botón flotante fijo de WhatsApp.
- Catálogo con diez plantas de prueba.
- Filtros por Interior, Exterior, Flores y Huerto.
- Buscador de plantas.
- Ficha detallada de cada planta.
- Carrito de compras local.
- Mensaje automático de pedido enviado a WhatsApp.
- Sección de ubicación mediante Google Maps.
- Pregunta de despacho con el texto aprobado: “Sí, realizamos despachos con un cargo adicional. La cobertura, fecha y valor se coordinan directamente por WhatsApp.”

## 4. Datos actuales del vivero

- Nombre: Vivero El Copihue
- WhatsApp visible: `+56 9 8371 6033`
- Número usado por el enlace: `56983716033`
- Ubicación: `https://maps.app.goo.gl/wjieYd9z7JWRjZmg8`
- Dirección mostrada: `Unnamed Road, Melipilla, Región Metropolitana`
- Horario mostrado: `Lun–sáb · 08:00–12:00 / 14:00–17:30`

Antes de publicar definitivamente, confirmar con el propietario que teléfono, dirección y horarios siguen correctos.

## 5. Tecnología

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

Comandos principales:

```bash
npm install
npm run dev
npm run lint
npm run build
```

El resultado listo para hosting queda dentro de la carpeta `dist`.

## 6. Archivos importantes

- `src/App.tsx`: estructura general, catálogo, animaciones, carrito, WhatsApp y secciones.
- `src/lib/catalog.ts`: productos, precios, descripciones, datos de contacto y ubicación.
- `src/lib/assets.ts`: direcciones de videos e imágenes ambientales.
- `src/index.css`: estilos generales, tipografías y efectos visuales.
- `public/assets/logo-vivero-el-copihue.png`: logo principal.
- `package.json`: dependencias y comandos.

## 7. Recursos externos importantes

Las fotografías de las plantas usan enlaces de Unsplash. La raíz animada y otros recursos provienen actualmente de esta dirección externa:

```text
https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/40green/public
```

El proyecto espera principalmente:

- `/media/hero-motion.webm`
- `/media/hero-motion.mp4`
- `/media/hero-motion-poster.jpg`

No cambiar ni eliminar estas direcciones sin copiar primero los archivos al nuevo hosting. Para una versión definitiva conviene guardar localmente todas las imágenes y videos, evitando depender de servicios externos.

## 8. Instrucción inicial para la nueva cuenta de ChatGPT

Copiar y enviar este mensaje junto con el repositorio:

> Trabaja sobre el repositorio `gotzysuarez/pagina-vivero-el-copihue`, rama `main`. Lee completamente `ENTREGA_NUEVA_CUENTA.md`, revisa el repositorio y ejecuta `npm install`, `npm run lint` y `npm run build`. No modifiques el diseño ni el contenido todavía. Primero comprueba que la página funciona, muéstrame el resultado y entrégame un diagnóstico. Conserva especialmente la raíz animada al costado del título del catálogo, el efecto ambiental durante el scroll, el botón flotante de WhatsApp, los bordes dorados y el carrito que genera el pedido por WhatsApp. No vuelvas a extender el contenedor principal de la raíz a todo el ancho.

## 9. Publicación en un hosting con cPanel

1. Descargar o clonar el repositorio.
2. Abrir una terminal dentro del proyecto.
3. Ejecutar:

```bash
npm install
npm run lint
npm run build
```

4. En cPanel, abrir **Administrador de archivos**.
5. Entrar en `public_html` o en la carpeta asignada al dominio/subdominio.
6. Crear un respaldo de la web anterior antes de reemplazar archivos.
7. Subir **el contenido interior de `dist`**, no la carpeta completa como un nivel adicional.
8. Confirmar que `index.html` quede directamente dentro de `public_html` o de la carpeta pública correspondiente.
9. Abrir el dominio y comprobar navegación, imágenes, animaciones, buscador, fichas, carrito y botón de WhatsApp.

Si se utilizarán rutas internas en el futuro, podría ser necesario configurar redirección hacia `index.html`. La versión actual funciona principalmente como una página única con secciones.

## 10. ChatGPT Sites y nueva cuenta

El archivo `.openai/hosting.json` contiene un `project_id` asociado a la publicación temporal de la cuenta anterior. Ese identificador no debe reutilizarse para crear una publicación desde otra cuenta sin acceso al proyecto original.

Si la nueva cuenta publicará mediante ChatGPT Sites, debe vincular el repositorio y crear o seleccionar su propio proyecto de Sites. Si se publicará directamente en cPanel, el archivo `.openai/hosting.json` no interviene en el funcionamiento de la web generada.

## 11. Validación antes de producción

- Revisar la página en computador y celular.
- Confirmar que no exista desplazamiento horizontal accidental.
- Verificar que todas las imágenes carguen.
- Comprobar que la animación respete la preferencia de movimiento reducido.
- Agregar varias plantas al carrito y cambiar sus cantidades.
- Abrir WhatsApp y revisar que el mensaje incluya productos, cantidades y total referencial.
- Confirmar número de WhatsApp, dirección, horario y valores.
- Confirmar que se indique que el despacho tiene cargo adicional.
- Confirmar que el stock y precio final se coordinan por WhatsApp.

## 12. Regla de seguridad para futuros cambios

Antes de realizar modificaciones visuales importantes:

1. Crear una rama nueva.
2. Guardar la versión aprobada.
3. Mostrar una prueba antes de reemplazar producción.
4. No alterar otras secciones cuando el cambio solicitado sea puntual.
5. Mantener siempre una forma rápida de volver a la versión anterior.

## 13. Trabajo futuro con Codex, GitHub y SSH

Cuando Codex esté disponible en la nueva cuenta, se utilizará como asistente principal para editar, revisar y publicar la página.

El flujo recomendado será:

```text
Codex → GitHub → SSH/cPanel → página publicada
```

### Responsabilidad de cada componente

- **Codex:** revisa el proyecto, modifica el código, ejecuta las comprobaciones y prepara cada versión.
- **GitHub:** mantiene la copia principal del proyecto, el historial y las versiones recuperables.
- **SSH/cPanel:** permite instalar, compilar y publicar la versión aprobada en el hosting.
- **`public_html`:** contiene solamente el resultado compilado que ve el público.

No se debe utilizar `public_html` como única copia del proyecto. Todo cambio definitivo debe quedar guardado primero en GitHub.

### Organización recomendada en el hosting

Mantener dos ubicaciones separadas:

```text
/home/USUARIO/repositorios/vivero-copihue
/home/USUARIO/public_html
```

- La carpeta `repositorios/vivero-copihue` contendrá el código fuente clonado desde GitHub.
- La carpeta `public_html` contendrá solamente el contenido generado dentro de `dist`.

Las rutas son ejemplos. Antes de publicar, Codex debe identificar y confirmar las rutas reales del hosting.

### Publicación mediante SSH

Una publicación habitual podrá realizarse con:

```bash
cd /home/USUARIO/repositorios/vivero-copihue
git pull origin main
npm ci
npm run lint
npm run build
rsync -av dist/ /home/USUARIO/public_html/
```

No utilizar `rsync --delete` hasta verificar cuidadosamente la carpeta de destino y crear un respaldo. Esa opción puede eliminar archivos del hosting que no estén presentes en `dist`.

### Acceso SSH seguro

- No entregar a Codex la contraseña principal de cPanel en una conversación.
- Crear una clave SSH exclusiva para el proyecto.
- Autorizar solamente la clave pública en cPanel.
- Utilizar un usuario sin privilegios de administrador o `root` siempre que sea posible.
- Limitar el acceso a las carpetas necesarias si el proveedor lo permite.
- No guardar claves privadas, contraseñas ni tokens dentro del repositorio.
- Revocar o reemplazar la clave si deja de ser necesaria o existe sospecha de exposición.

Una conexión pública de lectura a GitHub no concede permiso para escribir. La nueva cuenta de ChatGPT/Codex debe tener instalada y autorizada la integración de GitHub sobre `gotzysuarez/pagina-vivero-el-copihue` con permisos de lectura y escritura.

### Instrucción para Codex al comenzar

Copiar y enviar:

> Trabaja sobre el repositorio `gotzysuarez/pagina-vivero-el-copihue`, rama `main`. Lee completamente `ENTREGA_NUEVA_CUENTA.md` antes de realizar cambios. GitHub es la fuente principal y SSH/cPanel se utiliza para compilar, publicar y mantener la página. Antes de cada modificación, revisa el estado actual y crea un punto recuperable. Trabaja en una rama separada, ejecuta `npm run lint` y `npm run build`, muestra el resultado y espera mi aprobación antes de integrar el cambio en `main` o publicarlo. Nunca edites solamente `public_html` sin guardar también el cambio del código fuente en GitHub. Antes de copiar archivos a producción, respalda el directorio público actual y confirma la ruta exacta de destino.

### Secuencia recomendada para cada cambio

1. Codex lee este documento y revisa el repositorio.
2. Crea una rama para el cambio solicitado.
3. Aplica únicamente la modificación solicitada.
4. Ejecuta las validaciones técnicas.
5. Muestra o describe el resultado de prueba.
6. Espera la aprobación del propietario.
7. Integra el cambio aprobado en `main`.
8. Se conecta mediante SSH y respalda la versión publicada.
9. Compila y copia el contenido de `dist` al directorio público.
10. Comprueba el dominio público en computador y celular.
11. Si algo falla, restaura la versión anterior y conserva la evidencia del error.
