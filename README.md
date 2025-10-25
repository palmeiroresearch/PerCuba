# 📊 Calculadora de Percentiles Pediátricos Cubanos

Aplicación web progresiva (PWA) para calcular percentiles antropométricos pediátricos basados en las tablas de crecimiento cubanas.

## 🎯 Características

- ✅ Cálculo de percentiles de peso para la edad
- ✅ Cálculo de percentiles de talla para la edad
- ✅ Cálculo de percentiles de circunferencia cefálica
- ✅ Cálculo de IMC (Índice de Masa Corporal)
- ✅ Cálculo de peso para la talla
- ✅ Interpretación automática de resultados
- ✅ Funciona completamente offline
- ✅ Diseño responsive para móviles y tablets
- ✅ Basado en estándares cubanos de crecimiento

## 📱 Instalación como PWA

### En Android (Chrome):
1. Abre la aplicación en Chrome
2. Toca el menú (⋮) y selecciona "Agregar a pantalla de inicio"
3. Confirma la instalación

### En iOS (Safari):
1. Abre la aplicación en Safari
2. Toca el botón de compartir (⬆️)
3. Selecciona "Agregar a pantalla de inicio"
4. Confirma la instalación

### En Desktop (Chrome/Edge):
1. Haz clic en el ícono de instalación (+) en la barra de direcciones
2. Confirma la instalación
3. La app se abrirá en su propia ventana

## 🏥 Uso Clínico

### Datos requeridos:
- **Sexo del paciente**: Masculino o Femenino
- **Edad**: En meses (0-24) o años (0-19)
- **Medidas**: Al menos una de las siguientes:
  - Peso (kg)
  - Talla (cm)
  - Circunferencia cefálica (cm)

### Interpretación de resultados:

#### Percentiles:
- **< P3**: Bajo peso/talla para la edad - Requiere evaluación
- **P3 - P10**: Por debajo del promedio - Seguimiento recomendado
- **P10 - P90**: Rango normal
- **P90 - P97**: Por encima del promedio - Seguimiento recomendado
- **> P97**: Sobrepeso/talla elevada - Requiere evaluación

#### IMC (para mayores de 2 años):
- **< P3**: Desnutrición
- **P3 - P85**: Peso normal
- **P85 - P95**: Sobrepeso
- **> P95**: Obesidad

## 📊 Tablas de Referencia

Las tablas utilizadas provienen de los estudios de crecimiento realizados en Cuba y están diferenciadas por:

- **Sexo**: Masculino y Femenino
- **Edad**: 
  - Meses: 1-24 meses
  - Años: 0.1-19 años
- **Parámetros medidos**:
  - Peso
  - Talla (supina < 2 años, estatura ≥ 2 años)
  - Circunferencia cefálica
  - IMC
  - Peso para talla

## 💻 Tecnologías Utilizadas

- HTML5
- CSS3 (con diseño responsive)
- JavaScript (Vanilla)
- Service Worker (para funcionalidad offline)
- PWA (Progressive Web App)

## 📁 Estructura de Archivos

```
percentiles-cubanos-pwa/
├── index.html                  # Interfaz principal
├── service-worker.js           # Service Worker para offline
├── manifest.json               # Manifiesto de la PWA
├── percentiles-cubanos.json    # Base de datos de percentiles
├── icon-192.png               # Ícono 192x192
├── icon-512.png               # Ícono 512x512
└── README.md                  # Este archivo
```

## 🔄 Actualización de Datos

Para actualizar las tablas de percentiles:

1. Edita el archivo `percentiles-cubanos.json`
2. Actualiza la versión en `service-worker.js` (variable `CACHE_VERSION`)
3. Los usuarios obtendrán automáticamente la nueva versión

## ⚠️ Advertencias Importantes

- Esta herramienta es para **uso clínico y educativo**
- Siempre corrobore los resultados con su criterio médico
- Los percentiles son orientativos y deben interpretarse en contexto clínico
- No sustituye la evaluación médica completa del paciente

## 🎓 Para Estudiantes y Residentes

Esta aplicación está diseñada específicamente para:
- Estudiantes de medicina en práctica preprofesional
- Residentes de pediatría
- Médicos generales en atención primaria
- Pediatras en consulta

### Ventajas para uso en consulta:
- ✅ Cálculo rápido sin necesidad de tablas físicas
- ✅ Funciona sin internet (ideal para consultorios rurales)
- ✅ Resultados visuales fáciles de explicar a los padres
- ✅ Interpretación automática para apoyo diagnóstico

## 🚀 Despliegue

### GitHub Pages:
```bash
# Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/percentiles-cubanos.git
git push -u origin main

# Activar GitHub Pages en Settings → Pages
```

### Netlify/Vercel:
1. Conecta tu repositorio
2. Los archivos se desplegarán automáticamente

### Servidor local:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx http-server -p 8000

# Luego abre: http://localhost:8000
```

## 📱 Capturas de Pantalla

*[Agregar capturas cuando esté desplegada]*

## 📝 Licencia

Uso libre para fines educativos y clínicos.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

Para reportar errores o sugerencias, abre un issue en el repositorio.

---

**Desarrollado para la práctica clínica pediátrica en Cuba 🇨🇺**
