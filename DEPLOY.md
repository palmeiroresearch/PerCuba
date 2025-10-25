# 🚀 Guía Rápida de Despliegue

## Archivos Incluidos

✅ `index.html` - Aplicación principal
✅ `service-worker.js` - Para funcionalidad offline
✅ `manifest.json` - Configuración de la PWA
✅ `percentiles-cubanos.json` - Base de datos de percentiles
✅ `generar-iconos.html` - Generador de iconos
✅ `README.md` - Documentación completa
✅ `DEPLOY.md` - Este archivo

## Pasos para Desplegar

### 1️⃣ Generar Iconos

1. Abre `generar-iconos.html` en tu navegador
2. Haz clic en "Descargar icon-192.png"
3. Haz clic en "Descargar icon-512.png"
4. Guarda ambos archivos en el mismo directorio que los demás archivos

### 2️⃣ Opción A: GitHub Pages (Recomendado)

```bash
# Crear repositorio
git init
git add .
git commit -m "Calculadora de Percentiles Pediátricos Cubanos"

# Crear repositorio en GitHub y conectarlo
git remote add origin https://github.com/TU-USUARIO/percentiles-cubanos.git
git branch -M main
git push -u origin main

# En GitHub:
# Settings → Pages → Source: main branch → Save
```

Tu app estará en: `https://TU-USUARIO.github.io/percentiles-cubanos/`

### 2️⃣ Opción B: Netlify (Más Rápido)

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta con todos los archivos
3. ¡Listo! Tu app estará online en segundos

### 2️⃣ Opción C: Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### 2️⃣ Opción D: Servidor Propio

1. Sube todos los archivos a tu servidor web
2. Asegúrate de que el servidor sirva archivos con HTTPS
3. Configura los headers apropiados para PWA

## 3️⃣ Probar Localmente

### Con Python:
```bash
python -m http.server 8000
```

### Con Node.js:
```bash
npx http-server -p 8000
```

### Con PHP:
```bash
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 4️⃣ Verificar que Funciona

### Checklist:
- [ ] La aplicación se carga correctamente
- [ ] Puedes calcular percentiles
- [ ] Los resultados se muestran con gráficos
- [ ] Funciona en modo offline (desconecta internet y recarga)
- [ ] Se puede instalar como PWA (ícono + en la barra de direcciones)
- [ ] Los iconos se muestran correctamente

## 5️⃣ Configurar HTTPS (Importante para PWA)

### GitHub Pages: ✅ HTTPS automático
### Netlify: ✅ HTTPS automático
### Vercel: ✅ HTTPS automático

### Servidor propio:
Usa Let's Encrypt (gratis):
```bash
sudo certbot --nginx -d tudominio.com
```

## 🔧 Solución de Problemas

### La app no se instala como PWA:
- ✅ Verifica que estés usando HTTPS
- ✅ Verifica que manifest.json se cargue correctamente
- ✅ Verifica que los iconos existan
- ✅ Abre DevTools → Application → Manifest

### No funciona offline:
- ✅ Verifica que service-worker.js se registre correctamente
- ✅ Abre DevTools → Application → Service Workers
- ✅ Prueba con "Update on reload" desactivado

### Los percentiles no se calculan:
- ✅ Verifica que percentiles-cubanos.json se cargue
- ✅ Abre DevTools → Console para ver errores
- ✅ Verifica que todos los archivos estén en la misma carpeta

## 📱 Compartir con Colegas

Una vez desplegado, solo comparte el link. Ellos pueden:
1. Abrir el link en su navegador
2. Instalar la app desde el menú del navegador
3. Usar la app como aplicación nativa (incluso offline)

## 🎯 URLs de Ejemplo

Si despliegas en GitHub Pages:
```
https://TU-USUARIO.github.io/percentiles-cubanos/
```

Si despliegas en Netlify:
```
https://percentiles-cubanos.netlify.app
```

## 💡 Tips Adicionales

### Para hospitales/clínicas:
- Puedes alojar en tu servidor interno
- No requiere conexión a internet para funcionar
- Ideal para zonas rurales o con conexión limitada

### Para uso personal:
- Instálala en tu teléfono
- Úsala en consulta como herramienta rápida
- Comparte el link con otros residentes

### Para docencia:
- Excelente herramienta para enseñar percentiles
- Los estudiantes pueden instalarla en sus dispositivos
- Visualización clara para explicar conceptos

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que todos los archivos estén presentes
3. Asegúrate de usar un servidor web (no abrir el HTML directamente)
4. Verifica que tengas HTTPS habilitado

---

**¡Listo! Tu calculadora de percentiles está lista para ayudarte en consulta 🏥**
