# Back office de Vivero El Copihue

El panel se abre en `/admin` y utiliza PHP, sesiones seguras y MySQL. Las credenciales privadas de la base de datos permanecen fuera de `public_html`.

## Instalación en cPanel

1. Crear una base de datos y un usuario MySQL exclusivo para la página.
2. Importar `server/schema.sql` con phpMyAdmin.
3. Copiar `server/vivero-config.example.php` como `/home6/cvi72397/vivero-config.php` y completar allí los datos MySQL.
4. Desde SSH, crear o actualizar el administrador con `php server/create-admin.php CORREO CONTRASEÑA`. La contraseña se convierte inmediatamente en un hash seguro y no se guarda en Git.
5. Ejecutar `npm run build` y publicar el contenido de `dist` dentro de `public_html`, conservando la carpeta `uploads` entre despliegues.

La primera vez que el administrador ingresa con una base vacía, el panel carga automáticamente el catálogo actual, los datos del vivero y las preguntas frecuentes.

## Seguridad

- No subir `vivero-config.php` a Git ni guardarlo dentro de `public_html`.
- Usar HTTPS para que la cookie de sesión viaje cifrada.
- La API limita intentos de inicio de sesión, valida CSRF, verifica tipos de imagen y usa consultas preparadas.
- Las fotografías admitidas son JPG, PNG y WebP de hasta 8 MB.
