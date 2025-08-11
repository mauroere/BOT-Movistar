# Sistema de Estadísticas CDU - WhatsApp Bot

## 📊 Visión General

El Sistema de Estadísticas CDU es un módulo modular que rastrea automáticamente el uso de cada CDU (Customer Decision Unit) en el bot de WhatsApp, proporcionando análisis de uso, favoritos automáticos y rankings de popularidad.

## 🚀 Características Principales

### ✅ Rastreo Automático de Uso
- Registra cada ejecución de CDU automáticamente
- Almacena timestamps de uso para análisis temporal
- Cuenta usos por día, semana y total
- Persistencia en localStorage del navegador

### ⭐ Sistema de Favoritos Automático
- Identifica automáticamente los CDUs más utilizados
- Los top 5 CDUs se marcan como favoritos
- Indicadores visuales en botones (estrella dorada + contador)
- Actualización dinámica basada en uso

### 🏆 Rankings y Análisis
- Ranking completo de todos los CDUs por uso
- Modal interactivo para visualizar estadísticas completas
- Análisis de tendencias de uso
- Estadísticas por día actual vs totales

### 📈 Panel de Control Integrado
- Panel colapsible en la interfaz principal
- Resumen de estadísticas clave en tiempo real
- Acciones rápidas: Ver ranking, Exportar, Reset
- Diseño responsive y no intrusivo

### 💾 Gestión de Datos
- Exportación de estadísticas en formato JSON
- Función de reset para limpiar datos
- Backup automático en localStorage
- Gestión eficiente de memoria

## 🏗️ Arquitectura Modular

### Archivos del Sistema

```
modules/
├── cdu-stats-manager.js    # Lógica principal del sistema
└── cdu-stats-styles.css    # Estilos específicos del sistema
```

### Estructura de Datos

```javascript
// Estructura de datos en localStorage
{
  "cdu_usage_stats": {
    "cdu_id": {
      "count": 25,
      "lastUsed": "2024-01-15T10:30:00Z",
      "firstUsed": "2024-01-01T09:15:00Z"
    }
  }
}
```

## 🔧 Integración

### En `script.js`
```javascript
// Inicialización automática en constructor
initStatsSystem() {
  if (typeof CDUStatsManager !== 'undefined') {
    this.statsManager = new CDUStatsManager();
    this.createStatsPanel();
    this.updateStatsDisplay();
  }
}

// Registro automático en executeFlow()
if (this.statsManager) {
  this.statsManager.recordUsage(flowName);
  setTimeout(() => this.updateStatsDisplay(), 100);
}
```

### En `index.html`
```html
<!-- CSS -->
<link rel="stylesheet" href="modules/cdu-stats-styles.css" />

<!-- JavaScript -->
<script src="modules/cdu-stats-manager.js"></script>
```

## 📱 Interfaz de Usuario

### Panel de Estadísticas
- **Posición**: Encima del chat, colapsible
- **Información mostrada**:
  - Total de usos de todos los CDUs
  - Cantidad de CDUs favoritos
  - Usos del día actual
  - Lista de top 3 CDUs más usados

### Indicadores Visuales
- **Botones Favoritos**: Fondo dorado con borde destacado
- **Indicador de Uso**: Badge con estrella y contador de usos
- **Animaciones**: Glow effect para botones favoritos

### Modal de Ranking
- **Vista completa**: Lista ordenada de todos los CDUs
- **Información detallada**: Posición, nombre, cantidad de usos
- **Top 3 destacado**: Colores especiales para los primeros lugares
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## ⚙️ Configuración

### Parámetros Configurables

```javascript
// En cdu-stats-manager.js
class CDUStatsManager {
  constructor() {
    this.storageKey = 'cdu_usage_stats';     // Clave localStorage
    this.favoritesLimit = 5;                 // Cantidad de favoritos
    this.statsUpdateDelay = 100;             // Delay actualización UI (ms)
  }
}
```

### Umbrales de Favoritos
- **Mínimo de usos**: 2 usos para ser considerado favorito
- **Máximo favoritos**: 5 CDUs simultáneamente
- **Actualización**: Cada vez que se ejecuta un CDU

## 📊 Métricas Disponibles

### Estadísticas Generales
- Total de usos acumulados
- CDUs únicos utilizados
- Promedio de usos por CDU
- Usos del día actual

### Estadísticas por CDU
- Contador de usos individual
- Fecha de primer uso
- Fecha de último uso
- Posición en ranking

### Análisis Temporal
- Usos por día
- Tendencias semanales
- Comparativas período a período

## 🔄 Flujo de Funcionamiento

1. **Usuario ejecuta CDU** → `executeFlow(flowName)`
2. **Sistema registra uso** → `recordUsage(flowName)`
3. **Actualiza localStorage** → Guarda datos persistentes
4. **Recalcula favoritos** → `getFavorites()`
5. **Actualiza UI** → `updateStatsDisplay()`
6. **Aplica indicadores visuales** → `updateCDUButtonsWithStats()`

## 🚀 Beneficios del Sistema

### Para Usuarios (Asesores)
- **Acceso rápido**: CDUs más usados siempre visibles
- **Optimización tiempo**: Menos clics para funciones frecuentes
- **Aprendizaje**: Identifican patrones de uso propios

### Para Administradores
- **Analytics**: Datos precisos de uso de CDUs
- **Optimización**: Identifican CDUs problemáticos o populares
- **Decisiones**: Data-driven para mejoras del bot

### Para Desarrollo
- **Modular**: Fácil de mantener y extender
- **No intrusivo**: No afecta funcionalidad existente
- **Escalable**: Preparado para nuevos CDUs automáticamente

## 🔧 Mantenimiento

### Limpieza de Datos
```javascript
// Reset completo
statsManager.resetStats();

// Export para backup
const data = statsManager.exportStats();
```

### Monitoreo
- Revisar localStorage periódicamente
- Verificar performance con muchos CDUs
- Validar cálculos de ranking

### Extensiones Futuras
- Analytics avanzados (gráficos temporales)
- Exportación a diferentes formatos
- Integración con APIs externas
- Notificaciones de uso

## 📋 Requisitos Técnicos

### Navegador
- localStorage support
- JavaScript ES6+
- CSS Grid/Flexbox support

### Dependencias
- Font Awesome icons
- No bibliotecas externas adicionales

### Compatibilidad
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎯 Casos de Uso

### Asesor Nuevo
1. Comienza usando el bot
2. Sistema aprende sus patrones de uso
3. CDUs frecuentes se destacan automáticamente
4. Mejora su eficiencia progresivamente

### Asesor Experimentado
1. Ve inmediatamente sus CDUs favoritos
2. Accede rápidamente a funciones frecuentes
3. Puede exportar sus estadísticas
4. Ayuda a entrenar nuevos asesores

### Supervisor/Admin
1. Analiza patrones de uso del equipo
2. Identifica CDUs problemáticos
3. Optimiza entrenamiento
4. Toma decisiones basadas en datos

## 🔐 Consideraciones de Privacidad

- **Datos locales**: Todo se almacena en localStorage del navegador
- **No tracking externo**: Sin envío de datos a servidores
- **Control total**: Usuario puede limpiar datos cuando desee
- **Transparente**: Código abierto y auditable
