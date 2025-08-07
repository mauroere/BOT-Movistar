# Guía de Estandarización - Mensajes de Asesor vs Cliente

## 🎯 Objetivo
Establecer una convención clara para diferenciar entre:
- **Mensajes que ve el ASESOR** (panel interno)
- **Mensajes que ve el CLIENTE** (conversación real del bot)

---

## 👤 Formato para Mensajes de Asesor (Pantalla Interna)

### ✅ **Formato Recomendado:**

```javascript
messages: [
  "👤 **[PANEL ASESOR]** - [Nombre del CDU]\n\n🎯 **[ACCIÓN REQUERIDA]**\n\n[Descripción de la acción] (esta selección NO la ve el cliente)"
]
```

### 📋 **Ejemplos de Implementación:**

#### **1. Clasificación de Usuario:**
```javascript
"👤 **[PANEL ASESOR]** - CDU Cambio de SIM/eSIM\n\n🎯 **SELECCIONAR PERFIL DEL CLIENTE:**\n\nClasificar el tipo de usuario para aplicar el flujo correspondiente (esta selección NO la ve el cliente)"
```

#### **2. Derivación Interna:**
```javascript
"👤 **[PANEL ASESOR]** - Derivación Requerida\n\n🎯 **DIRIGIR A:**\n\nEl cliente debe ser derivado al sistema [NombreSistema] (el cliente verá un mensaje de espera)"
```

#### **3. Validación de Datos:**
```javascript
"👤 **[PANEL ASESOR]** - Validación de Cliente\n\n🎯 **VERIFICAR INFORMACIÓN:**\n\nConfirmar los datos del cliente antes de continuar (validación interna)"
```

---

## 💬 Formato para Mensajes del Cliente (Conversación Real)

### ✅ **Formato Normal:**
```javascript
messages: [
  "¡Hola! Te puedo ayudar con [servicio]. [Explicación para el cliente] 😊"
]
```

### 📋 **Ejemplos:**
```javascript
"Puedo ayudarte a pedir tu nuevo chip físico o eSIM virtual manteniendo tu número. 👌\n\n👆 La eSIM es un chip virtual que se activa escaneando un código QR."
```

---

## 🔧 Elementos Visuales Estandarizados

### **Para Mensajes de Asesor:**
- **Icono principal:** 👤 (persona)
- **Badge:** `**[PANEL ASESOR]**`
- **Acción:** 🎯 `**[ACCIÓN EN MAYÚSCULAS]**`
- **Recordatorio:** `(esta selección NO la ve el cliente)`
- **Colores de botones:** Tonos corporativos diferenciados

### **Para Opciones de Asesor:**
```javascript
options: [
  { text: "👔 PyE - Titular/Autorizado", action: "..." },    // Ejecutivo
  { text: "👥 PyE - Usuario", action: "..." },              // Usuario múltiple  
  { text: "🏢 TyE - Usuario", action: "..." },              // Empresa/Org
  { text: "⬅️ Volver al selector", action: "..." },        // Navegación
]
```

### **Para Mensajes del Cliente:**
- **Sin badges especiales**
- **Iconos contextuales:** 😊 👌 👆 📱 ⏰
- **Lenguaje natural y amigable**

---

## 📝 Implementación por CDU

### **1. CDU Cambio de SIM/eSIM** ✅ **ACTUALIZADO**
```javascript
// ✅ ANTES (confuso):
"🔧 [ASESOR] Clasificación de Usuario"

// ✅ DESPUÉS (claro):
"👤 **[PANEL ASESOR]** - CDU Cambio de SIM/eSIM\n\n🎯 **SELECCIONAR PERFIL DEL CLIENTE:**\n\nClasificar el tipo de usuario para aplicar el flujo correspondiente (esta selección NO la ve el cliente)"
```

### **2. CDU Facturación** 🔄 **PENDIENTE**
```javascript
// Aplicar formato:
"👤 **[PANEL ASESOR]** - CDU Facturación\n\n🎯 **SELECCIONAR TIPO DE CONSULTA:**\n\nElegir el tipo de facturación que necesita el cliente (selección interna)"
```

### **3. CDU Bienvenida** 🔄 **REVISAR**
- Verificar si tiene mensajes internos
- Aplicar formato si corresponde

---

## 🎨 Estilos CSS Sugeridos

### **Para destacar mensajes de asesor:**
```css
.message.asesor-panel {
    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
    border-left: 4px solid #fbbf24;
    color: white;
    font-weight: 500;
}

.message.asesor-panel .badge {
    background: rgba(251, 191, 36, 0.2);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
}

.asesor-options {
    background: #f8fafc;
    border: 2px dashed #cbd5e1;
    border-radius: 8px;
}
```

---

## ✅ Lista de Verificación para Estandarización

### **Cada CDU debe revisar:**
- [ ] Mensajes de clasificación de usuario usan formato `👤 **[PANEL ASESOR]**`
- [ ] Incluye aclaración `(esta selección NO la ve el cliente)`
- [ ] Usa iconos estandarizados para tipos de usuario
- [ ] Diferencia clara entre mensajes internos y del cliente
- [ ] Botones de navegación con iconos apropiados

### **Prioridad de implementación:**
1. **Alta:** CDU Cambio de SIM/eSIM ✅ **COMPLETADO**
2. **Media:** CDU Facturación, CDU Plan x Botonera
3. **Baja:** CDUs en desarrollo

---

## 🔄 Plan de Implementación

### **Fase 1: Estandarización Visual** (Inmediata)
- Actualizar mensajes de asesor existentes
- Implementar iconografía consistente
- Agregar recordatorios de visibilidad

### **Fase 2: Mejoras de UX** (Siguiente iteración)
- Estilos CSS específicos para panel de asesor
- Animaciones de transición entre modos
- Indicadores visuales de "modo asesor" vs "cliente"

### **Fase 3: Documentación** (Continua)
- Actualizar manual de usuario
- Crear guía de desarrollo para nuevos CDUs
- Training para asesores sobre las diferencias

---

*Guía creada: Agosto 2025*  
*Responsable: Desarrollo UI WhatsApp B2B*
