# 🔧 Selector de CDUs - Guía de Uso

## 📋 ¿Qué es el Selector de CDUs?

El **Selector de CDUs** es una herramienta de desarrollo integrada que permite:
- ✅ **Navegar** entre diferentes CDUs fácilmente
- ✅ **Testear** cada flujo de forma independiente  
- ✅ **Limpiar** el chat para pruebas limpias
- ✅ **Resetear** el bot cuando sea necesario

## 🎯 Cómo Usar el Selector

### 1. **Abrir/Cerrar el Selector**
- Haz clic en **"🔧 Selector de CDUs - Modo Desarrollo"**
- El panel se expandirá/contraerá con animación suave

### 2. **Seleccionar un CDU**
- Haz clic en cualquier botón de CDU disponible:
  - **🏠 CDU Bienvenida**: Flujo principal de inicio
  - **📄 CDU Facturación**: Factura con botonera
  - **🔧 CDU Soporte**: (Próximamente)
  - **🛒 CDU Ventas**: (Próximamente)

### 3. **Herramientas de Desarrollo**
- **🗑️ Limpiar Chat**: Borra todos los mensajes
- **🔄 Reset Bot**: Reinicia el bot completamente

## 💡 Estados Visuales

### ✅ **CDU Activo**
- Fondo verde con degradado
- Texto blanco
- Indica qué CDU está ejecutándose

### ⚫ **CDU Disponible**  
- Fondo blanco
- Hover con efecto verde
- Clickeable y funcional

### 🚫 **CDU No Disponible**
- Opacidad reducida (50%)
- Texto "Próximamente..."
- No clickeable

## 🔄 Flujo de Testing Recomendado

### **Para CDU Bienvenida:**
1. Click en "CDU Bienvenida"
2. Verificar mensaje inicial
3. Probar navegación TOP/Empresas vs Premium
4. Validar todos los sub-flujos

### **Para CDU Facturación:**
1. Click en "CDU Facturación"  
2. Verificar mensaje "Desde acá podés descargar..."
3. Probar todas las opciones de facturación
4. Validar selección de línea CUIT
5. Confirmar navegación "¿Cómo seguimos?"

### **Limpieza entre Tests:**
1. Click en "Limpiar Chat" entre tests
2. Click en "Reset Bot" si hay problemas
3. Seleccionar nuevo CDU

## 🎨 Responsive Design

- **Móvil**: Grid de 1 columna para CDUs
- **Desktop**: Grid de 2 columnas
- **Animaciones**: Transiciones suaves en todos los elementos
- **Accesibilidad**: Botones con focus y hover states

## 🚀 Beneficios para Desarrollo

### **✅ Productividad**
- Testing rápido de múltiples CDUs
- No necesidad de navegación manual
- Reset instantáneo para pruebas limpias

### **✅ Debugging**
- Aislamiento de CDUs para identificar problemas
- Chat limpio para cada test
- Estado visual del CDU activo

### **✅ Demostración**
- Fácil para mostrar diferentes flujos
- Interfaz profesional para stakeholders  
- Navegación intuitiva

## 📦 Próximas Mejoras

- [ ] **Contador de mensajes** por CDU
- [ ] **Tiempo de ejecución** de cada flujo
- [ ] **Historial de navegación** 
- [ ] **Export de conversaciones** para testing
- [ ] **Modo producción** (ocultar selector)

---

**🎯 El Selector de CDUs hace que el testing y desarrollo sea muchísimo más eficiente!**
