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

  // ❌ NO → Línea no activa - Identificar tipo de suspensión
  factura_error_linea_inactiva: {
    messages: [
      "🔍 **Analizando estado de la línea...**\n\nEl sistema está identificando el tipo de suspensión y segmento...",
    ],
    options: [
      {
        text: "Suspensión Total (deuda) - Premium y Emprendedores",
        action: "suspension_total_premium_emprendedores",
      },
      {
        text: "Suspensión Total (deuda) - TOP EMP",
        action: "suspension_total_top_emp",
      },
      {
        text: "Suspensión Otra (robo, fraude, etc) - Premium y Emprendedores",
        action: "suspension_otra_premium_emprendedores",
      },
      {
        text: "Suspensión Otra (robo, fraude, etc) - TOP EMP",
        action: "suspension_otra_top_emp",
      },
      { text: "Volver", action: "factura_paso2_linea_activa" },
    ],
  },

  // 🟡 SUSPENSIÓN TOTAL (DEUDA) - PREMIUM Y EMPRENDEDORES
  suspension_total_premium_emprendedores: {
    messages: [
      "Veo que **tu línea está suspendida** porque tenés una deuda pendiente. 😔\n\nSi no abonás en los próximos días, se dará de baja.\n\n¿Cómo te puedo ayudar?",
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      {
        text: "Consultar otra línea",
        action: "factura_consultar_otra_linea_cuit",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🟡 SUSPENSIÓN TOTAL (DEUDA) - TOP EMP
  suspension_total_top_emp: {
    messages: [
      "Veo que **tu línea está suspendida** porque tenés una deuda pendiente. 😔\n\nContactate con la persona titular y apoderada de tu empresa para rehabilitarla.",
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      {
        text: "Consultar otra línea",
        action: "factura_consultar_otra_linea_cuit",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🟠 SUSPENSIÓN OTRA (ROBO, FRAUDE, ETC) - PREMIUM Y EMPRENDEDORES
  suspension_otra_premium_emprendedores: {
    messages: [
      "Veo que **tu línea está suspendida**. 😔\n\nContactate con atención comercial si querés rehabilitarla.\n\n¿Cómo te puedo ayudar?",
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      {
        text: "Consultar otra línea",
        action: "factura_consultar_otra_linea_cuit",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🟠 SUSPENSIÓN OTRA (ROBO, FRAUDE, ETC) - TOP EMP
  suspension_otra_top_emp: {
    messages: [
      "Veo que **tu línea está suspendida**. 😔\n\nContactate con la persona titular y apoderada de tu empresa para rehabilitarla.",
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      {
        text: "Consultar otra línea",
        action: "factura_consultar_otra_linea_cuit",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
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
      "� **Analizando segmento y tipo de cliente...**\n\nEl sistema está identificando automáticamente tu perfil...",
    ],
    options: [
      {
        text: "Premium y Emprendedores - Cliente Móvil",
        action: "premium_emprendedores_cliente_movil",
      },
      { text: "Otras opciones", action: "factura_opciones_genericas" },
      {
        text: "TOP y EMP - Mayoristas/CANJE PUBLICITARIO",
        action: "top_emp_mayoristas_canje",
      },
      { text: "DEMO / USO INTERNO", action: "demo_uso_interno" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🔵 PREMIUM Y EMPRENDEDORES - CLIENTE MÓVIL
  premium_emprendedores_cliente_movil: {
    messages: [
      "La última factura de esta cuenta es de $12,450.00, con vencimiento el 25 de julio de 2025.\n\nPodés pagarla con tarjeta de crédito o débito desde la web de Movistar. 💳 http://movi.is/HXEn\n\nTe comparto el PDF para que conozcas el detalle. Puede demorar unos segundos ⏳\n\n(entrega PDF)",
    ],
    options: [
      { text: "Ver opciones", action: "premium_emprendedores_ver_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 🔄 VER OPCIONES - División TITULAR/USUARIO
  premium_emprendedores_ver_opciones: {
    messages: ["� **Validación de Perfil**\n\n¿Quién está escribiendo?"],
    options: [
      { text: "TITULAR", action: "premium_emprendedores_titular_opciones" },
      { text: "USUARIO", action: "premium_emprendedores_usuario_opciones" },
      { text: "Volver", action: "premium_emprendedores_cliente_movil" },
    ],
  },

  // 👤 TITULAR - Opciones completas
  premium_emprendedores_titular_opciones: {
    messages: ["📋 **Opciones para Titular**\n\nElegí una opción:"],
    options: [
      { text: "Eso es todo, gracias", action: "premium_titular_fin" },
      {
        text: "Facturas Anteriores",
        action: "premium_titular_facturas_anteriores",
      },
      { text: "Factura de otra línea", action: "premium_titular_otra_linea" },
      { text: "Medios de pago", action: "premium_titular_medios_pago" },
      { text: "Facturas digital", action: "premium_titular_facturas_digital" },
      { text: "Reclamo de Facturación", action: "premium_titular_reclamo" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 👥 USUARIO - Opciones limitadas
  premium_emprendedores_usuario_opciones: {
    messages: ["📋 **Opciones para Usuario**\n\nElegí una opción:"],
    options: [
      { text: "Eso es todo, gracias", action: "premium_usuario_fin" },
      {
        text: "Facturas Anteriores",
        action: "premium_usuario_facturas_anteriores",
      },
      { text: "Factura de otra línea", action: "premium_usuario_otra_linea" },
      { text: "Medios de pago", action: "premium_usuario_medios_pago" },
      { text: "Reclamo de Facturación", action: "premium_usuario_reclamo" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 📋 OPCIONES GENÉRICAS (flujo anterior)
  factura_opciones_genericas: {
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

  //=== ESTADOS FINALES PARA TITULAR ===//

  // ✅ TITULAR - Eso es todo, gracias
  premium_titular_fin: {
    messages: ["✅ **¡Perfecto!**\n\n¡Que tengas buen día! 😊"],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // 📂 TITULAR - Facturas Anteriores
  premium_titular_facturas_anteriores: {
    messages: [
      "📂 **Facturas Anteriores**\n\n📅 **Últimos 6 meses:**\n• Junio 2025 - $11,890.00 ✅ Pagada\n• Mayo 2025 - $12,100.00 ✅ Pagada\n• Abril 2025 - $11,750.00 ✅ Pagada\n• Marzo 2025 - $12,300.00 ✅ Pagada\n• Febrero 2025 - $11,950.00 ✅ Pagada\n• Enero 2025 - $12,200.00 ✅ Pagada",
    ],
    options: [
      { text: "Descargar todas", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 📱 TITULAR - Factura de otra línea
  premium_titular_otra_linea: {
    messages: [
      "📱 **Factura de Otra Línea**\n\n🔍 Para consultar otra línea de tu CUIT necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos",
    ],
    options: [
      { text: "Contactar soporte", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 💳 TITULAR - Medios de pago
  premium_titular_medios_pago: {
    messages: [
      "💳 **Medios de Pago**\n\n💰 **Formas de pago disponibles:**\n• Débito automático\n• Transferencia bancaria\n• Tarjeta de crédito/débito\n• Pago Fácil\n• RapiPago",
    ],
    options: [
      { text: "Configurar débito automático", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 📧 TITULAR - Facturas digital
  premium_titular_facturas_digital: {
    messages: [
      "📧 **Facturas Digital**\n\n📬 **Configuración actual:**\n• Envío por email: Activado\n• Dirección: empresa@ejemplo.com\n• Formato: PDF\n\n🌱 Contribuís al cuidado del medio ambiente",
    ],
    options: [
      { text: "Cambiar configuración", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 📣 TITULAR - Reclamo de Facturación
  premium_titular_reclamo: {
    messages: [
      "📣 **Reclamo de Facturación**\n\n📝 **Tipos de reclamo:**\n• Cobro indebido\n• Error en consumos\n• Problema con fechas\n• Método de pago",
    ],
    options: [
      { text: "Iniciar reclamo", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  //=== ESTADOS FINALES PARA USUARIO ===//

  // ✅ USUARIO - Eso es todo, gracias
  premium_usuario_fin: {
    messages: ["✅ **¡Perfecto!**\n\n¡Que tengas buen día! 😊"],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // 📂 USUARIO - Facturas Anteriores
  premium_usuario_facturas_anteriores: {
    messages: [
      "📂 **Facturas Anteriores**\n\n📅 **Últimos 6 meses:**\n• Junio 2025 - $11,890.00 ✅ Pagada\n• Mayo 2025 - $12,100.00 ✅ Pagada\n• Abril 2025 - $11,750.00 ✅ Pagada\n• Marzo 2025 - $12,300.00 ✅ Pagada\n• Febrero 2025 - $11,950.00 ✅ Pagada\n• Enero 2025 - $12,200.00 ✅ Pagada",
    ],
    options: [
      { text: "Descargar todas", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 📱 USUARIO - Factura de otra línea
  premium_usuario_otra_linea: {
    messages: [
      "📱 **Factura de Otra Línea**\n\n🔍 Para consultar otra línea de tu CUIT necesitás proporcionar:\n• Número de línea\n• Autorización del titular\n• Validación de permisos",
    ],
    options: [
      { text: "Contactar soporte", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 💳 USUARIO - Medios de pago
  premium_usuario_medios_pago: {
    messages: [
      "💳 **Medios de Pago**\n\n💰 **Formas de pago disponibles:**\n• Débito automático\n• Transferencia bancaria\n• Tarjeta de crédito/débito\n• Pago Fácil\n• RapiPago",
    ],
    options: [
      { text: "Ver información", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // 📣 USUARIO - Reclamo de Facturación
  premium_usuario_reclamo: {
    messages: [
      "📣 **Reclamo de Facturación**\n\n📝 **Tipos de reclamo:**\n• Cobro indebido\n• Error en consumos\n• Problema con fechas\n• Método de pago",
    ],
    options: [
      { text: "Iniciar reclamo", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
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

  //=== FLUJOS VDN POOL NO Y HORARIO COMERCIAL ===//

  // VDN Pool NO - Flujo de validación y derivación
  factura_vdn_pool_no: {
    messages: [
      "🔍 **Validación VDN Pool**\n\nEl sistema está verificando el estado del VDN Pool...",
    ],
    options: [
      {
        text: "Dentro de horario comercial",
        action: "factura_dentro_horario_comercial",
      },
      {
        text: "Fuera de horario comercial",
        action: "factura_fuera_horario_comercial",
      },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Dentro de horario comercial - NO
  factura_dentro_horario_comercial: {
    messages: [
      "🕐 **Horario Comercial Activo**\n\nEstás dentro del horario comercial pero el VDN Pool no está disponible.\n\n¿Cómo querés continuar?",
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_derivar_asesor_comercial" },
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Callback programado", action: "factura_callback_programado" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Fuera de horario comercial
  factura_fuera_horario_comercial: {
    messages: [
      "🌙 **Fuera de Horario Comercial**\n\n📅 **Horarios de atención:**\n• Lunes a Viernes: 8:00 a 20:00\n• Sábados: 9:00 a 17:00\n• Domingos: Cerrado\n\n¿Qué querés hacer?",
    ],
    options: [
      { text: "Callback para mañana", action: "factura_callback_manana" },
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Dejar mensaje", action: "factura_dejar_mensaje" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Derivar a asesor comercial
  factura_derivar_asesor_comercial: {
    messages: [
      "👨‍💼 **Conectando con Asesor Comercial**\n\n🔄 Te estoy derivando con un asesor especializado en facturación empresarial.\n\n⏱️ Tiempo estimado de espera: 3-5 minutos\n\n📞 También podés llamar directamente al:\n• **611** desde tu Movistar\n• **0800-555-611** desde cualquier teléfono",
    ],
    options: [
      { text: "Esperar en línea", action: "factura_esperar_asesor" },
      { text: "Callback en 10 min", action: "factura_callback_10min" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Callback programado
  factura_callback_programado: {
    messages: [
      "📞 **Callback Programado**\n\n¿Cuándo querés que te llamemos?\n\n📅 **Horarios disponibles hoy:**\n• En 15 minutos\n• En 30 minutos\n• En 1 hora\n• En 2 horas",
    ],
    options: [
      { text: "En 15 minutos", action: "factura_callback_confirmado" },
      { text: "En 30 minutos", action: "factura_callback_confirmado" },
      { text: "En 1 hora", action: "factura_callback_confirmado" },
      { text: "En 2 horas", action: "factura_callback_confirmado" },
      { text: "Volver", action: "factura_dentro_horario_comercial" },
    ],
  },

  // Callback para mañana
  factura_callback_manana: {
    messages: [
      "📞 **Callback para Mañana**\n\n📅 **Horarios disponibles mañana:**\n• 9:00 AM\n• 11:00 AM\n• 2:00 PM\n• 4:00 PM\n• 6:00 PM",
    ],
    options: [
      { text: "9:00 AM", action: "factura_callback_confirmado" },
      { text: "11:00 AM", action: "factura_callback_confirmado" },
      { text: "2:00 PM", action: "factura_callback_confirmado" },
      { text: "4:00 PM", action: "factura_callback_confirmado" },
      { text: "6:00 PM", action: "factura_callback_confirmado" },
      { text: "Volver", action: "factura_fuera_horario_comercial" },
    ],
  },

  // Dejar mensaje
  factura_dejar_mensaje: {
    messages: [
      "📝 **Dejar Mensaje**\n\n¿Qué tipo de consulta querés dejar registrada?\n\n📋 **Opciones disponibles:**\n• Consulta de facturación\n• Problema con pagos\n• Reclamo técnico\n• Consulta general",
    ],
    options: [
      { text: "Consulta de facturación", action: "factura_mensaje_registrado" },
      { text: "Problema con pagos", action: "factura_mensaje_registrado" },
      { text: "Reclamo técnico", action: "factura_mensaje_registrado" },
      { text: "Consulta general", action: "factura_mensaje_registrado" },
      { text: "Volver", action: "factura_fuera_horario_comercial" },
    ],
  },

  // Esperar asesor
  factura_esperar_asesor: {
    messages: [
      "⏳ **En Cola de Espera**\n\n🔄 Te estamos conectando con el próximo asesor disponible.\n\n📊 **Tu posición en cola:** 3\n⏱️ **Tiempo estimado:** 2-4 minutos\n\n💡 **Mientras esperás, podés:**",
    ],
    options: [
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Ver últimas facturas", action: "factura_opciones_completas" },
      { text: "Cambiar a callback", action: "factura_callback_10min" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Callback en 10 minutos
  factura_callback_10min: {
    messages: [
      "📞 **Callback Confirmado**\n\n✅ **Te vamos a llamar en 10 minutos**\n\n📱 **Al número:** [número de línea actual]\n👨‍💼 **Asesor:** Especialista en facturación empresarial\n📋 **Tema:** Consulta de facturación\n\n¿Está todo correcto?",
    ],
    options: [
      { text: "Confirmar callback", action: "factura_callback_confirmado" },
      { text: "Cambiar horario", action: "factura_callback_programado" },
      { text: "Cancelar callback", action: "factura_derivar_asesor_comercial" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Callback confirmado
  factura_callback_confirmado: {
    messages: [
      "✅ **Callback Confirmado**\n\n📞 **Te vamos a llamar en el horario acordado**\n\n📱 Asegurate de tener tu teléfono disponible\n👨‍💼 Un asesor especializado se va a comunicar con vos\n📋 Vas a recibir un SMS de confirmación\n\n🔔 **Recordatorio:** Te llegará una notificación 5 minutos antes",
    ],
    options: [
      { text: "Entendido", action: "factura_callback_final" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Mensaje registrado
  factura_mensaje_registrado: {
    messages: [
      "📝 **Mensaje Registrado**\n\n✅ **Tu consulta fue registrada exitosamente**\n\n📋 **Número de caso:** #FAC-2025-0001\n📅 **Fecha:** 5 de agosto de 2025\n⏱️ **Respuesta estimada:** 24-48 horas\n\n📧 **Vas a recibir actualizaciones por:**\n• SMS al número de esta línea\n• Email (si está configurado)",
    ],
    options: [
      { text: "Entendido", action: "factura_mensaje_final" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Callback final
  factura_callback_final: {
    messages: [
      "🎯 **Todo Listo**\n\n¡Que tengas buen día! Un asesor se va a comunicar con vos en el horario acordado.\n\n💡 **Tip:** Mantené cerca los datos de tu cuenta para agilizar la consulta.",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  //=== FLUJOS TOP Y EMP - MAYORISTAS/CANJE PUBLICITARIO ===//

  // TOP y EMP - Mayoristas/CANJE PUBLICITARIO
  top_emp_mayoristas_canje: {
    messages: [
      "Veo que la línea desde la que me escribís está registrada con DNI 😬\n\nSi necesitás tu factura, hay una atención exclusiva para vos en esta cuenta de WhatsApp 👉 http://mov.is/s3SF\n\n¿Te puedo ayudar con algo más?",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  //=== FLUJOS DEMO / USO INTERNO ===//

  // DEMO / USO INTERNO
  demo_uso_interno: {
    messages: ["🔧 **DEMO / USO INTERNO**\n\n¿Cómo querés continuar?"],
    options: [
      { text: "FIN", action: "demo_fin" },
      { text: "NO DERIVAR", action: "demo_no_derivar" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // DEMO - FIN
  demo_fin: {
    messages: [
      "✅ **Demo Finalizada**\n\n¡Gracias por usar el sistema de demostración!",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },

  // DEMO - NO DERIVAR
  demo_no_derivar: {
    messages: [
      "🚫 **No Derivar**\n\nEl flujo se mantiene en el sistema actual sin derivación.",
    ],
    options: [{ text: "Menú principal", action: "menu_principal" }],
  },
};

// En lugar de module.exports (Node.js), asignar al objeto global
if (typeof window !== 'undefined') {
  window.cduFacturaEstaLinea = cduFacturaEstaLinea;
}
