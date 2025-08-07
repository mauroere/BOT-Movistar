# Manual de Uso - Emulador BOT WhatsApp B2B Movistar

## 📋 Información General

### ¿Qué es este emulador?
Esta herramienta **emula el BOT de atención WhatsApp** para clientes **B2B únicamente**. Es una herramienta de entrenamiento y guía para asesores en la atención de clientes B2B.

### Función orientativa
Las opciones internas (como clasificación de usuarios) no se muestran al cliente real, sino que sirven para que el asesor seleccione el perfil del usuario final.

---

## 🎯 Cómo usar el emulador

### 1. Acceso al emulador
- Abrir el archivo `index.html` en un navegador web
- La interfaz simula WhatsApp con un panel de CDUs en la parte superior

### 2. Selector de CDUs
- **Ubicación**: Parte superior de la interfaz (desplegable)
- **Función**: Permite seleccionar diferentes flujos de conversación
- **Estado**: Algunos CDUs están deshabilitados (en desarrollo)

### 3. Controles disponibles
- **🗑️ Limpiar Chat**: Borra la conversación actual
- **🔄 Reset Bot**: Reinicia completamente el bot y limpia todo
- **📱 CDUs**: Botones para activar diferentes flujos

---

## 📂 CDUs Disponibles y sus Flujos

### ✅ **CDU Bienvenida** (`welcome`)
**Descripción**: Flujo principal de inicio  
**Estado**: ✅ Operativo  
**Propósito**: Mensaje de bienvenida inicial del bot

---

### ✅ **CDU Facturación** (`facturacion_cuit`)
**Descripción**: Factura con botonera  
**Estado**: ✅ Operativo  
**Flujo**:
1. Consulta de facturas por CUIT
2. Opciones de visualización de facturas
3. Procesos de pago y consultas relacionadas

---

### ✅ **CDU Contratar** (`menu_servicios`)
**Descripción**: Servicios empresariales  
**Estado**: ✅ Operativo  
**Flujo**:
1. Menú de servicios disponibles
2. Información sobre contratación
3. Derivaciones a asesores comerciales

---

### ✅ **CDU Celulares** (`menu_celulares_chips_usuario`)
**Descripción**: Chips, equipos y compras  
**Estado**: ✅ Operativo  
**Flujo**:
1. Consultas sobre equipos móviles
2. Gestión de chips y líneas
3. Procesos de compra de equipos

---

### ✅ **CDU Beneficios** (`menu_beneficios`)
**Descripción**: Club, cursos, ofertas  
**Estado**: ✅ Operativo  
**Flujo**:
1. Información sobre Club Movistar Empresas
2. Cursos y capacitaciones disponibles
3. Ofertas especiales para empresas

---

### ✅ **CDU Plan x Botonera** (`menu_plan_botonera`)
**Descripción**: Planes, consumos, roaming  
**Estado**: ✅ Operativo  
**Flujo**:
1. Consulta de planes contratados
2. Información de consumos
3. Servicios de roaming internacional

---

### ✅ **CDU Factura de esta línea** (`menu_factura_esta_linea`)
**Descripción**: Facturas, pagos, deudas  
**Estado**: ✅ Operativo  
**Flujo**:
1. Consulta de factura específica de la línea
2. Estados de pago y deudas
3. Opciones de pago disponibles

---

### ✅ **CDU Cambio de SIM/eSIM** (`menu_cambio_sim`)
**Descripción**: Chips físicos y eSIM virtual  
**Estado**: ✅ Operativo - **COMPLETAMENTE DESARROLLADO**  

#### **Flujo detallado**:

**🔧 Punto de entrada**: Clasificación de usuario (interno - no visible al cliente)
- 🟪 PyE - Titular/Autorizado
- 🟩 PyE - Usuario  
- 🟨 TyE - Usuario

#### **Segmento PyE Titulares/Autorizados**:
1. **Menú inicial**: Chip físico vs eSIM virtual
   - Opción: "Pedir un chip" 
   - Opción: "Pedir una eSIM"
   - Opción: "Pedir línea nueva"

2. **Flujo "Pedir un chip"**:
   - Pregunta: Solo chip vs chip + equipo
   - **Solo chip**: Información de tiempos de envío (AMBA 4 días, resto 14 días)
   - **Opciones**: Continuar, pedir en sucursal, volver
   - **Pedir en sucursal**: Info de ubicaciones y requisitos de retiro

3. **Flujo "Pedir una eSIM"**:
   - Información sobre compatibilidad de dispositivos
   - Opción: Mantener número vs nueva línea
   - **Mantener número**: 
     - Validación de línea (esta vs otra del CUIT)
     - Confirmación por email con código QR
     - Opciones finales: gracias, pedir otro, menú

#### **Segmento PyE Usuarios**:
- Información básica sobre chips y eSIM
- Derivación a asesor comercial para gestiones

#### **Segmento TyE Usuarios**:
- Mensaje restrictivo por CUIT
- Información de contacto alternativo
- Cierre sin encuesta

---

### ⏳ **CDUs en Desarrollo**

#### **CDU Soporte** (`soporte_tecnico`)
**Estado**: 🚧 Deshabilitado  
**Descripción**: Próximamente...

#### **CDU Consultas/Reclamos** (`consultas_reclamos`)
**Estado**: 🚧 Deshabilitado  
**Descripción**: En desarrollo

#### **CDU Ayuda Técnica** (`ayuda_tecnica`)
**Estado**: 🚧 Deshabilitado  
**Descripción**: Próximamente...

---

## 🔧 Funcionalidades Técnicas

### Segmentación de Usuarios
El emulador maneja 3 tipos de usuarios empresariales:
- **PyE Titulares/Autorizados**: Acceso completo a gestiones
- **PyE Usuarios**: Acceso limitado, requiere derivación
- **TyE Usuarios**: Restricciones por CUIT empresarial

### Derivaciones Internas
- **AsesorComercialDBEta**: Para gestiones comerciales
- **SolicitudReSimSoloChip2BDialog**: Formularios de chip físico
- **SolicitudDeEsimPyETitular82BDialog**: Formularios de eSIM
- **ChipsvSIM Intent simcard**: Procesos de chips virtuales

### Mensajes Orientativos
Los mensajes marcados con 🔄 indican derivaciones internas que no ve el cliente final, sino que guían al asesor sobre el siguiente paso del proceso.

---

## 📝 Notas para Asesores

### ¿Qué ve el cliente real?
- Solo los mensajes conversacionales del bot
- Las opciones de respuesta disponibles
- NO ve las clasificaciones internas ni derivaciones técnicas

### ¿Qué usa el asesor?
- Los selectores de clasificación de usuario
- Los mensajes de derivación interna
- Las referencias técnicas a otros sistemas

### Mejores Prácticas
1. **Identificar el perfil del cliente** antes de iniciar el flujo
2. **Usar las clasificaciones internas** para seleccionar el camino apropiado
3. **Seguir los mensajes orientativos** para derivaciones correctas
4. **Verificar permisos** especialmente en usuarios TyE

---

## ⚠️ Limitaciones Actuales

1. **CDUs limitados**: Solo algunos están completamente desarrollados
2. **Simulación**: No conecta con sistemas reales de Movistar
3. **Datos de prueba**: Toda la información es simulada
4. **Funcionalidad orientativa**: Designed para training, no para producción

---

## 🆘 Solución de Problemas

### El CDU no se ejecuta
- Verificar que el botón esté habilitado (no en gris)
- Usar el botón "Reset Bot" para reiniciar
- Revisar la consola del navegador (F12) para errores

### La conversación se ve mal
- Usar "Limpiar Chat" para resetear la vista
- Actualizar la página si persisten problemas

### Botones no responden
- Verificar que se haya cargado completamente la página
- Comprobar la conexión de archivos JavaScript

---

*Manual actualizado: Agosto 2025*  
*Versión: 1.0 - CDU Cambio SIM/eSIM Completo*
