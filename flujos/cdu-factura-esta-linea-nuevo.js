// CDU: Factura de esta línea (Versión completa paso a paso)
// Flujo B2B: PASO 1 → PASO 2 → PASO 3 → PASO 4 → PASO 5 → OPCIONES FACTURACIÓN
// Flujo B2C/No cliente: División automática por ANI → Segmentación por Premium/TOP → Derivación según DNI

const cduFacturaEstaLinea = {
  // 🟨 PASO 1 — ¿El ANI de origen pertenece a B2B?
  menu_factura_esta_linea: {
    messages: [
      "📄 **Factura de esta línea**\n\n¿El ANI de origen pertenece a B2B (cliente empresa)?",
    ],
    options: [
      { text: "Es empresa", action: "factura_paso2_linea_activa" },
      { text: "No es B2B", action: "factura_error_no_empresa" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // ❌ NO → Sistema divide automáticamente en B2C / No cliente
  factura_error_no_empresa: {
    messages: [
      "🔍 **Analizando ANI de origen...**\n\nEl sistema está identificando automáticamente tu tipo de línea...",
    ],
    options: [
      {
        text: "B2C - Premium y Emprendedores",
        action: "factura_b2c_premium_emprendedores",
      },
      { text: "B2C - TOP EMP", action: "factura_b2c_top_emp" },
      {
        text: "No cliente - Premium y Emprendedores",
        action: "factura_no_cliente_premium_emprendedores",
      },
      { text: "No cliente - TOP EMP", action: "factura_no_cliente_top_emp" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🔹 FLUJO B2C - PREMIUM Y EMPRENDEDORES
  factura_b2c_premium_emprendedores: {
    messages: [
      "Veo que la línea desde la que me escribís está registrada con DNI 😬\n\nSi necesitás tu factura, hay una atención exclusiva para vos en esta cuenta de WhatsApp 👉 http://mov.is/s3SF\n\n¿Querés consultar por otra línea Movistar Empresas de tu CUIT?",
    ],
    options: [
      {
        text: "Consultar otra línea",
        action: "factura_consultar_otra_linea_cuit",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🔹 FLUJO B2C - TOP EMP
  factura_b2c_top_emp: {
    messages: [
      "Veo que la línea desde la que me escribís está registrada con DNI 😬\n\nSi necesitás tu factura, hay una atención exclusiva para vos en esta cuenta de WhatsApp 👉 http://mov.is/s3SF\n\n¿Te puedo ayudar con algo más?",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // 🔹 FLUJO NO CLIENTE - PREMIUM Y EMPRENDEDORES
  factura_no_cliente_premium_emprendedores: {
    messages: [
      "Veo que la línea desde la que me escribís está registrada con DNI 😬\n\n¿Querés consultar por otra línea Movistar Empresas de tu CUIT?",
    ],
    options: [
      {
        text: "Consultar otra línea",
        action: "factura_consultar_otra_linea_cuit",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🔹 FLUJO NO CLIENTE - TOP EMP
  factura_no_cliente_top_emp: {
    messages: [
      "Veo que la línea desde la que me escribís pertenece a otra empresa 😬",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // CONSULTAR OTRA LÍNEA DEL CUIT
  factura_consultar_otra_linea_cuit: {
    messages: [
      "📋 **Consultar Otra Línea del CUIT**\n\n🔍 Para consultar otra línea de tu CUIT necesitás proporcionar:\n\n• Número de línea a consultar\n• Validación de permisos\n• Autorización del titular\n\n¿Cómo querés continuar?",
    ],
    options: [
      { text: "Contactar con asesor", action: "factura_contactar_asesor" },
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // CONTACTAR CON ASESOR
  factura_contactar_asesor: {
    messages: [
      "📞 **Contactar con Asesor**\n\n🔄 Te estoy conectando con un asesor especializado para ayudarte con la consulta de otra línea.\n\n📱 También podés llamar al:\n• **611** desde tu Movistar\n• **0800-555-611** desde cualquier teléfono",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // USAR MI MOVISTAR
  factura_usar_mi_movistar: {
    messages: [
      "📱 **Mi Movistar**\n\nPodés gestionar todas las líneas de tu CUIT desde:\n\n🌐 **Web:** https://on.movistar.com.ar/autogestion\n📱 **App:** Descargá Mi Movistar desde tu tienda de apps\n\n💡 **Tip:** Iniciá sesión con el CUIT para ver todas las líneas asociadas.",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // 🧭 PASO 2 — ¿La línea está activa?
  factura_paso2_linea_activa: {
    messages: ["🔍 **Verificación de Estado**\n\n¿La línea está activa?"],
    options: [
      { text: "Línea activa", action: "factura_paso3_fija_movil" },
      { text: "Línea inactiva", action: "factura_error_linea_inactiva" },
      { text: "Volver", action: "menu_factura_esta_linea" },
    ],
  },

  // ❌ NO → Línea no activa
  factura_error_linea_inactiva: {
    messages: [
      "❌ **Línea No Activa**\n\nTu línea no se encuentra activa actualmente.\n\nSi necesitás acceder a tus facturas, contactate con el titular o apoderado de la cuenta.",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // 🧭 PASO 3 — ¿La línea es fija o móvil?
  factura_paso3_fija_movil: {
    messages: ["📱 **Tipo de Línea**\n\n¿La línea es fija o móvil?"],
    options: [
      { text: "Móvil", action: "factura_paso4_cuit_dni" },
      { text: "Fija", action: "factura_linea_fija_opciones" },
      { text: "Volver", action: "factura_paso2_linea_activa" },
    ],
  },

  // 📦 ALTERNATIVA — LÍNEA FIJA
  factura_linea_fija_opciones: {
    messages: [
      "📞 **Línea Fija - Opciones de Consulta**\n\nElegí el tipo de consulta que necesitás:",
    ],
    options: [
      {
        text: "Consulta última factura",
        action: "factura_fija_ultima_factura",
      },
      {
        text: "Consulta facturas anteriores",
        action: "factura_fija_facturas_anteriores",
      },
      {
        text: "Reclamo técnico-facturación",
        action: "factura_fija_reclamo_tecnico",
      },
      { text: "Volver", action: "factura_paso3_fija_movil" },
    ],
  },

  // 🧭 PASO 4 — ¿La línea es bajo CUIT o DNI? (solo para móvil)
  factura_paso4_cuit_dni: {
    messages: ["🏢 **Tipo de Cuenta**\n\n¿La línea es bajo CUIT o DNI?"],
    options: [
      { text: "CUIT - Empresa", action: "factura_paso5_titular_usuario" },
      { text: "DNI - B2C", action: "factura_error_solo_cuit" },
      { text: "Volver", action: "factura_paso3_fija_movil" },
    ],
  },

  // 🔘 DNI → Solo CUIT permitido
  factura_error_solo_cuit: {
    messages: [
      "❌ **Solo Líneas bajo CUIT**\n\nEste canal solo permite consultas de facturación para líneas bajo CUIT.\n\nSi la línea es B2C (DNI), usá este canal: [https://mov.is/s3SF]",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // 🧭 PASO 5 — ¿Quién está escribiendo?
  factura_paso5_titular_usuario: {
    messages: ["👥 **Identificación**\n\n¿Quién está escribiendo?"],
    options: [
      { text: "TITULAR", action: "factura_opciones_completas" },
      { text: "USUARIO", action: "factura_validar_acceso_usuario" },
      { text: "Volver", action: "factura_paso4_cuit_dni" },
    ],
  },

  // Validar acceso para USUARIO
  factura_validar_acceso_usuario: {
    messages: [
      "🔍 **Validación de Acceso**\n\n¿La línea tiene acceso a la facturación?",
    ],
    options: [
      { text: "Con acceso", action: "factura_opciones_completas" },
      { text: "Sin acceso", action: "factura_error_sin_acceso" },
      { text: "Volver", action: "factura_paso5_titular_usuario" },
    ],
  },

  // ❌ Usuario sin acceso
  factura_error_sin_acceso: {
    messages: [
      "❌ **Sin Acceso a Facturas**\n\nTu línea no está habilitada para ver facturas.\n\nPor favor, contactá al apoderado o titular de tu empresa.",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // ✅ OPCIONES DE FACTURACIÓN (para Titular o Usuario con acceso)
  factura_opciones_completas: {
    messages: [
      "📄 **Opciones de Facturación**\n\nDesde acá podés descargar tus últimas 6 facturas, consultar sobre pagos, deudas o reclamar por alguna factura.\n\nElegí una opción y te ayudo: 👇",
    ],
    options: [
      { text: "Última factura", action: "factura_seleccionar_linea_ultima" },
      {
        text: "Facturas anteriores",
        action: "factura_seleccionar_linea_anteriores",
      },
      { text: "Deuda", action: "factura_seleccionar_linea_deuda" },
      { text: "Pagos", action: "factura_seleccionar_linea_pagos" },
      {
        text: "Reclamo de facturación",
        action: "factura_seleccionar_linea_reclamo",
      },
      { text: "Nuevas tarifas", action: "factura_seleccionar_linea_tarifas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  //=== SELECCIÓN DE LÍNEA PARA CADA OPCIÓN ===//

  // Última factura - Selección de línea
  factura_seleccionar_linea_ultima: {
    messages: [
      "📄 **Última Factura**\n\n¿Sobre qué línea del CUIT querés consultar?",
    ],
    options: [
      { text: "Esta línea", action: "factura_ultima_esta_linea" },
      { text: "Otra línea del CUIT", action: "factura_ultima_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Facturas anteriores - Selección de línea
  factura_seleccionar_linea_anteriores: {
    messages: [
      "📂 **Facturas Anteriores**\n\n¿Sobre qué línea del CUIT querés consultar?",
    ],
    options: [
      { text: "Esta línea", action: "factura_anteriores_esta_linea" },
      { text: "Otra línea del CUIT", action: "factura_anteriores_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Deuda - Selección de línea
  factura_seleccionar_linea_deuda: {
    messages: [
      "💰 **Consulta de Deuda**\n\n¿Sobre qué línea del CUIT querés consultar?",
    ],
    options: [
      { text: "Esta línea", action: "factura_deuda_esta_linea" },
      { text: "Otra línea del CUIT", action: "factura_deuda_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Pagos - Selección de línea
  factura_seleccionar_linea_pagos: {
    messages: [
      "💳 **Consulta de Pagos**\n\n¿Sobre qué línea del CUIT querés consultar?",
    ],
    options: [
      { text: "Esta línea", action: "factura_pagos_esta_linea" },
      { text: "Otra línea del CUIT", action: "factura_pagos_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Reclamo - Selección de línea
  factura_seleccionar_linea_reclamo: {
    messages: [
      "📣 **Reclamo de Facturación**\n\n¿Sobre qué línea del CUIT querés consultar?",
    ],
    options: [
      { text: "Esta línea", action: "factura_reclamo_esta_linea" },
      { text: "Otra línea del CUIT", action: "factura_reclamo_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Tarifas - Selección de línea
  factura_seleccionar_linea_tarifas: {
    messages: [
      "📈 **Nuevas Tarifas**\n\n¿Sobre qué línea del CUIT querés consultar?",
    ],
    options: [
      { text: "Esta línea", action: "factura_tarifas_esta_linea" },
      { text: "Otra línea del CUIT", action: "factura_tarifas_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  //=== OPCIONES PARA LÍNEA FIJA ===//

  factura_fija_ultima_factura: {
    messages: [
      "📄 **Última Factura - Línea Fija**\n\n📋 **Factura del período actual:**\n• Fecha de emisión: 15/07/2025\n• Fecha de vencimiento: 25/07/2025\n• Importe: $8,750.00\n• Estado: Pendiente\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Descargar PDF", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_linea_fija_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_fija_facturas_anteriores: {
    messages: [
      "📂 **Facturas Anteriores - Línea Fija**\n\n📅 **Últimos 6 meses:**\n• Junio 2025 - $8,200.00 ✅ Pagada\n• Mayo 2025 - $8,450.00 ✅ Pagada\n• Abril 2025 - $8,100.00 ✅ Pagada\n• Marzo 2025 - $8,300.00 ✅ Pagada\n• Febrero 2025 - $8,150.00 ✅ Pagada\n• Enero 2025 - $8,400.00 ✅ Pagada\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Descargar todas", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_linea_fija_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_fija_reclamo_tecnico: {
    messages: [
      "⚠️ **Reclamo Técnico-Facturación**\n\n¿Querés hacer un reclamo técnico o consultar una factura?",
    ],
    options: [
      { text: "Reclamo técnico", action: "derivar_reclamo_tecnico" },
      { text: "Factura", action: "factura_linea_fija_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  //=== FUNCIONES FINALES PARA "ESTA LÍNEA" ===//

  factura_ultima_esta_linea: {
    messages: [
      "📄 **Última Factura - Esta Línea**\n\n📋 **Factura del período actual:**\n• Fecha de emisión: 15/07/2025\n• Fecha de vencimiento: 25/07/2025\n• Importe: $12,450.00\n• Estado: Pendiente\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Descargar PDF", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_anteriores_esta_linea: {
    messages: [
      "📂 **Facturas Anteriores - Esta Línea**\n\n📅 **Últimos 6 meses:**\n• Junio 2025 - $11,890.00 ✅ Pagada\n• Mayo 2025 - $12,100.00 ✅ Pagada\n• Abril 2025 - $11,750.00 ✅ Pagada\n• Marzo 2025 - $12,300.00 ✅ Pagada\n• Febrero 2025 - $11,950.00 ✅ Pagada\n• Enero 2025 - $12,200.00 ✅ Pagada\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Descargar todas", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_deuda_esta_linea: {
    messages: [
      "💰 **Deuda - Esta Línea**\n\n💰 **Estado actual:**\n🔴 **Deuda pendiente:**\n• Factura Julio 2025: $12,450.00\n• Vencimiento: 25/07/2025\n\n📊 **Total a pagar: $12,450.00**\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Pagar ahora", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_pagos_esta_linea: {
    messages: [
      "💳 **Pagos - Esta Línea**\n\n✅ **Últimos pagos:**\n• 15/06/2025 - $11,890.00 - Débito automático\n• 14/05/2025 - $12,100.00 - Transferencia\n• 13/04/2025 - $11,750.00 - Débito automático\n• 15/03/2025 - $12,300.00 - Pago Fácil\n• 14/02/2025 - $11,950.00 - Débito automático\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Descargar comprobantes", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_reclamo_esta_linea: {
    messages: [
      "📣 **Reclamo de Facturación - Esta Línea**\n\n📝 **Tipos de reclamo:**\n• Cobro indebido\n• Error en consumos\n• Problema con fechas\n• Método de pago\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Iniciar reclamo", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_tarifas_esta_linea: {
    messages: [
      "📈 **Nuevas Tarifas - Esta Línea**\n\n📋 **Plan actual:** Premium 15GB\n💰 **Costo mensual:** $12,450.00\n📅 **Última actualización:** Julio 2025\n\n📊 **Promociones disponibles**\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Ver promociones", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  //=== FUNCIONES PARA "OTRA LÍNEA DEL CUIT" ===//

  factura_ultima_otra_linea: {
    messages: [
      "📄 **Última Factura - Otra Línea del CUIT**\n\n🔍 Para consultar otra línea necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_anteriores_otra_linea: {
    messages: [
      "📂 **Facturas Anteriores - Otra Línea del CUIT**\n\n🔍 Para consultar otra línea necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_deuda_otra_linea: {
    messages: [
      "💰 **Deuda - Otra Línea del CUIT**\n\n🔍 Para consultar otra línea necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_pagos_otra_linea: {
    messages: [
      "💳 **Pagos - Otra Línea del CUIT**\n\n🔍 Para consultar otra línea necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_reclamo_otra_linea: {
    messages: [
      "📣 **Reclamo - Otra Línea del CUIT**\n\n🔍 Para hacer un reclamo sobre otra línea necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  factura_tarifas_otra_linea: {
    messages: [
      "📈 **Tarifas - Otra Línea del CUIT**\n\n🔍 Para consultar tarifas de otra línea necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos\n\n¿Cómo seguimos? 👇",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  //=== MENSAJES FINALES Y DERIVACIONES ===//

  // ✅ MENSAJE FINAL
  factura_mensaje_final: {
    messages: ["✅ **Proceso Completado**\n\n¿Cómo seguimos? 👇"],
    options: [
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Derivación a reclamo técnico
  derivar_reclamo_tecnico: {
    messages: [
      "🔧 **Derivando a Reclamo Técnico**\n\nTe estoy conectando con el área técnica para resolver tu consulta.\n\n📞 También podés llamar al 611 desde tu Movistar o al 0800-555-611.",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },
};
