# 📝 Changelog - Calculadora de Percentiles Pediátricos Cubanos

## Versión 1.1.0 (Octubre 2025)

### ✨ Nuevas Funcionalidades

#### 1. **Peso para la Talla**
- ✅ Agregado cálculo completo de peso para talla
- ✅ Utiliza tablas diferenciadas:
  - **Supina**: Para tallas < 85 cm (menores de ~2 años)
  - **Estatura**: Para tallas ≥ 85 cm (mayores de ~2 años)
- ✅ Interpretaciones específicas:
  - < P3: Desnutrición aguda severa
  - P3-P10: Desnutrición aguda
  - P10-P90: Nutrición adecuada
  - P90-P97: Riesgo de sobrepeso
  - > P97: Sobrepeso/Obesidad

#### 2. **Disclaimer IMC en Menores de 5 Años**
- ✅ Advertencia automática cuando se calcula IMC en pacientes < 5 años
- ✅ Recomienda priorizar peso para talla en este grupo etario
- ✅ Enfatiza importancia de evaluación clínica completa

### 🔄 Mejoras en la Interfaz

#### 3. **Nuevo Formato de Presentación de Percentiles**
- ✅ **Primero**: Rango de percentil en grande (Ej: P50-P75)
- ✅ **Debajo**: Percentil exacto calculado en texto pequeño (Ej: Percentil exacto: 63.2)
- ✅ Más fácil de interpretar rápidamente en consulta

**Antes:**
```
Percentil 63.2
```

**Ahora:**
```
P50 - P75
Percentil exacto: 63.2
```

### 📊 Rangos de Percentiles Mostrados

- **< P3**: Valores muy bajos
- **P3 - P10**: Por debajo del promedio
- **P10 - P25**: Límite inferior normal
- **P25 - P50**: Normal-medio bajo
- **P50 - P75**: Normal-medio alto
- **P75 - P90**: Límite superior normal
- **P90 - P97**: Por encima del promedio
- **> P97**: Valores muy altos

### 🎯 Mejoras en la Experiencia de Usuario

1. **Info Box Actualizado**
   - Lista clara de todos los cálculos disponibles
   - Información sobre cuándo usar cada indicador

2. **Interpretaciones Mejoradas**
   - Más específicas para peso para talla
   - Diferenciadas según el indicador

3. **Disclaimers Contextuales**
   - Aparecen solo cuando son relevantes
   - Integrados en las tarjetas de resultados

### 🔧 Mejoras Técnicas

1. **Función `getPercentileRange()`**
   - Determina automáticamente el rango del percentil
   - Retorna string formateado (Ej: "P50 - P75")

2. **Función `findPesoParaTallaData()`**
   - Busca datos en tablas de peso para talla
   - Selecciona automáticamente entre supina/estatura

3. **Actualización de `createResultCard()`**
   - Acepta parámetro opcional de disclaimer
   - Nuevo formato de visualización
   - Mejor organización visual

### 📱 Casos de Uso Clínicos

#### Ejemplo 1: Lactante de 8 meses
**Input:**
- Sexo: Masculino
- Edad: 8 meses
- Peso: 7.5 kg
- Talla: 68 cm

**Output esperado:**
- Peso para edad: P25-P50
- Talla para edad: P25-P50
- **Peso para talla: P10-P25** (nuevo)
- IMC: (se calcula pero con disclaimer)

#### Ejemplo 2: Preescolar de 4 años
**Input:**
- Sexo: Femenino
- Edad: 4 años
- Peso: 16 kg
- Talla: 100 cm

**Output esperado:**
- Peso para edad: P50-P75
- Talla para edad: P50
- **Peso para talla: P50-P75** (nuevo)
- IMC: Con ⚠️ disclaimer sobre < 5 años

#### Ejemplo 3: Escolar de 10 años
**Input:**
- Sexo: Masculino
- Edad: 10 años
- Peso: 40 kg
- Talla: 140 cm

**Output esperado:**
- Peso para edad: P75-P90
- Talla para edad: P50-P75
- **Peso para talla: P90-P97** (nuevo - alerta de sobrepeso)
- IMC: Sin disclaimer (edad apropiada)

### ⚕️ Importancia Clínica de los Cambios

#### Peso para Talla
- **Indicador clave** de estado nutricional agudo
- **Independiente de la edad**: útil cuando la edad es incierta
- **Detecta desnutrición aguda**: más sensible que peso para edad
- **Útil en emergencias**: evaluación rápida del estado nutricional

#### Disclaimer IMC < 5 años
- **Basado en evidencia**: IMC menos confiable en preescolares
- **Previene interpretaciones erróneas**: evita sobre/infradiagnóstico
- **Guía práctica clínica**: recuerda usar indicadores apropiados

#### Formato de Percentiles
- **Comunicación con padres**: más fácil de explicar
- **Decisiones rápidas**: identificación inmediata del rango
- **Registro clínico**: formato estándar para historia clínica

### 🔄 Compatibilidad

- ✅ Mantiene compatibilidad con versión anterior
- ✅ Datos de percentiles sin cambios
- ✅ Service Worker actualizado (v1.1.0)
- ✅ Funciona offline como antes

### 📚 Documentación Actualizada

- README.md: Actualizado con nueva funcionalidad
- DEPLOY.md: Sin cambios necesarios
- CHECKLIST.md: Nuevos items de verificación

---

## Versión 1.0.0 (Octubre 2025)

### Lanzamiento Inicial
- ✅ Cálculo de peso para edad
- ✅ Cálculo de talla para edad
- ✅ Cálculo de circunferencia cefálica
- ✅ Cálculo de IMC
- ✅ Funcionalidad offline completa
- ✅ PWA instalable
- ✅ Diseño responsive

---

## 🚀 Próximas Mejoras (Roadmap)

### v1.2.0 (Planificado)
- [ ] Gráficos de curvas de crecimiento
- [ ] Historial de mediciones por paciente
- [ ] Exportar resultados a PDF
- [ ] Modo oscuro

### v1.3.0 (Planificado)
- [ ] Calculadora de velocidad de crecimiento
- [ ] Índice de Waterlow
- [ ] Índice de McLaren
- [ ] Comparación con estándares OMS

---

**Actualizado:** Octubre 2025  
**Versión actual:** 1.1.0  
**Mantenido por:** Equipo de desarrollo médico
