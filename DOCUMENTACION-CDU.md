# 📚 Documentación CDU - Estructura Modular

## 🏗️ Nueva Estructura del Proyecto

```
UI-Whapp/
├── flujos/                          🆕 Nueva carpeta
│   ├── cdu-bienvenida.js           ✅ CDU Bienvenida (completo)
│   ├── cdu-factura-botonera.js     ✅ CDU Factura con Botonera (completo)
│   ├── cdu-contratar-servicios.js  ✅ CDU Contratar Servicios (completo)
│   ├── cdu-celulares-chips.js      ✅ CDU Celulares y Chips (completo)
│   ├── cdu-beneficios.js           ✅ CDU Beneficios (completo)
│   ├── cdu-plan-botonera.js        ✅ CDU Plan x Botonera (completo)
│   ├── cdu-soporte-tecnico.js      🔜 Próximo CDU
│   └── cdu-consultas-reclamos.js   🔜 Próximo CDU
├── index.html                       🔄 Actualizado
├── script.js                        🔄 Actualizado (orchestador)
├── styles.css                       ✅ Intacto
└── README.md                        ✅ Actualizado
```

## 🎯 CDUs Implementados

### ✅ CDU 1: Bienvenida 
- **Archivo**: `flujos/cdu-bienvenida.js`
- **Variable**: `FLUJO_BIENVENIDA_MIRO`
- **Estado**: Completo y funcional ✅
- **Punto de entrada**: `welcome`

### ✅ CDU 2: Factura con Botonera
- **Archivo**: `flujos/cdu-factura-botonera.js`
- **Variable**: `CDU_FACTURA_BOTONERA`
- **Estado**: Completo y listo para testing ✅
- **Punto de entrada**: `facturacion_cuit`

### ✅ CDU 3: Contratar Servicios
- **Archivo**: `flujos/cdu-contratar-servicios.js`
- **Variable**: `CDU_CONTRATAR_SERVICIOS`
- **Estado**: Completo y funcional ✅
- **Punto de entrada**: `menu_servicios`

### ✅ CDU 4: Celulares y Chips
- **Archivo**: `flujos/cdu-celulares-chips.js`
- **Variable**: `CDU_CELULARES_CHIPS`
- **Estado**: Completo con múltiples variantes ✅
- **Puntos de entrada**: `menu_celulares_chips_titular`, `menu_celulares_chips_usuario`, `menu_celulares_chips_top_emp`

### ✅ CDU 5: Beneficios
- **Archivo**: `flujos/cdu-beneficios.js`
- **Variable**: `CDU_BENEFICIOS`
- **Estado**: Completo y funcional ✅
- **Punto de entrada**: `menu_beneficios`

### ✅ CDU 6: Plan x Botonera
- **Archivo**: `flujos/cdu-plan-botonera.js`
- **Variable**: `CDU_PLAN_BOTONERA`
- **Estado**: Completo con múltiples variantes de usuario ✅
- **Puntos de entrada**: `menu_plan_botonera_titular`, `menu_plan_botonera_top_emp`, `menu_plan_botonera_premium_full`, `menu_plan_botonera_premium_consumo`

## 🔧 Cómo Funciona la Nueva Estructura

### 1. **Carga Dinámica de CDUs**
```javascript
// En script.js
async loadCDUs() {
  // Cargar CDU de Bienvenida
  if (typeof FLUJO_BIENVENIDA_MIRO !== 'undefined') {
    Object.assign(this.botFlows, FLUJO_BIENVENIDA_MIRO);
  }
  
  // Cargar CDU de Factura con Botonera
  if (typeof CDU_FACTURA_BOTONERA !== 'undefined') {
    Object.assign(this.botFlows, CDU_FACTURA_BOTONERA);
  }
  
  // Cargar CDU de Contratar Servicios
  if (typeof CDU_CONTRATAR_SERVICIOS !== 'undefined') {
    Object.assign(this.botFlows, CDU_CONTRATAR_SERVICIOS);
  }
  
  // Cargar CDU de Celulares y Chips
  if (typeof CDU_CELULARES_CHIPS !== 'undefined') {
    Object.assign(this.botFlows, CDU_CELULARES_CHIPS);
  }
}
```

### 2. **Inicialización en index.html**
```html
<script src="flujos/cdu-bienvenida.js"></script>
<script src="flujos/cdu-factura-botonera.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const bot = new WhatsAppBot();
    bot.loadCDUs(); // Cargar todos los CDUs
    window.bot = bot;
  });
</script>
```

### 3. **Nuevas Acciones en script.js**
Agregadas todas las acciones del CDU Factura con Botonera:
- `facturacion_cuit`
- `seleccion_linea_cuit`  
- `ver_ultima_factura`
- `ver_facturas_anteriores`
- `consultar_deuda`
- `consultar_pagos`
- `reclamo_facturacion`
- `ver_tarifas`
- Y todas las sub-acciones...

## 📝 Template para Nuevos CDUs

### Estructura de Archivo CDU
```javascript
// ========================================
// CDU: [NOMBRE DEL CDU]
// ========================================

const CDU_NOMBRE_DESCRIPTIVO = {
  // Flujo principal
  nombre_flujo_principal: {
    messages: [
      "Mensaje 1",
      "Mensaje 2"
    ],
    options: [
      { text: "Opción 1", action: "accion_1" },
      { text: "Opción 2", action: "accion_2" },
      { text: "🔙 Volver", action: "flujo_anterior" },
    ],
  },
  
  // Sub-flujos...
  accion_1: {
    messages: ["Respuesta para acción 1"],
    options: [
      { text: "Continuar", action: "siguiente_paso" },
    ],
  }
};

// Exportar para uso en sistema principal
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CDU_NOMBRE_DESCRIPTIVO;
}
```

## 🚀 Cómo Agregar un Nuevo CDU

### Paso 1: Crear archivo CDU
```bash
# Crear nuevo archivo en carpeta flujos/
flujos/cdu-nombre-nuevo.js
```

### Paso 2: Definir la estructura
```javascript
const CDU_NOMBRE_NUEVO = {
  // Definir todos los flujos según template
};
```

### Paso 3: Actualizar index.html
```html
<script src="flujos/cdu-nombre-nuevo.js"></script>
```

### Paso 4: Actualizar script.js - método loadCDUs()
```javascript
// Cargar CDU Nuevo
if (typeof CDU_NOMBRE_NUEVO !== 'undefined') {
  Object.assign(this.botFlows, CDU_NOMBRE_NUEVO);
}
```

### Paso 5: Actualizar script.js - método processAction()
```javascript
// Agregar casos para las nuevas acciones
case "nueva_accion":
  this.executeFlow("nueva_accion");
  break;
```

## 🎯 Ventajas de la Nueva Estructura

### ✅ **Modularidad**
- Cada CDU en su propio archivo
- Fácil mantenimiento y edición
- Código organizado y limpio

### ✅ **Escalabilidad**  
- Agregar nuevos CDUs sin tocar código existente
- Sistema de carga automático
- Estructura consistente

### ✅ **Debugging**
- Fácil identificación de problemas por CDU
- Console logs para tracking de CDUs cargados
- Estructura predecible

### ✅ **Colaboración**
- Múltiples desarrolladores pueden trabajar en CDUs diferentes
- Menos conflictos de merge
- Documentación clara por CDU

## 🔍 Testing del CDU Factura con Botonera

### Flujo de Testing Recomendado:
1. **Iniciar bot** → Debe mostrar bienvenida
2. **Navegar a facturación** → Probar acceso desde menú principal  
3. **Probar opciones principales**:
   - Última factura
   - Facturas anteriores
   - Deuda
   - Pagos
   - Reclamo de facturación
   - Nuevas tarifas
4. **Probar selección de línea**:
   - Esta línea
   - Otra línea del CUIT
5. **Probar navegación**:
   - Botones "Volver"
   - Menú principal
   - Continuidad de flujos

## 📋 Próximos CDUs Planificados

1. **CDU Soporte Técnico** 🔜
2. **CDU Ventas y Comercial** 🔜  
3. **CDU Reclamos** 🔜
4. **CDU Gestión de Cuenta** 🔜

---

**¡La nueva estructura modular está lista para escalar! 🚀**
