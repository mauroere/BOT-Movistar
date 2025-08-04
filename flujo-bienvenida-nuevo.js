// CASO DE USO DE BIENVENIDA - BASADO EN DIAGRAMA EXACTO "NUEVO BOT 2025.jpg"
// Implementación completa del flujo según el diagrama MIRO del usuario

// ========================================
// FLUJO DE BIENVENIDA SEGÚN DIAGRAMA ESPECÍFICO MIRO
// ========================================

const FLUJO_BIENVENIDA_MIRO = {
  // Mensaje inicial de bienvenida (según diagrama exacto)
  welcome: {
    messages: [
      "¡Hola! Te doy la bienvenida a mi canal de atención de *Movistar Empresas*. 🤖",
      "Por consultas sobre facturación, trámites o compra de packs, contactate con la persona autorizada o titular de tu empresa. 📋",
    ],
    options: [
      { text: "TOP / Empresas", action: "top_empresas" },
      { text: "Premium y Emprendedores", action: "premium_emprendedores" },
    ],
  },

  // ========================================
  // RAMA: TOP / EMPRESAS
  // ========================================
  top_empresas: {
    messages: [
      "Perfecto, sos cliente TOP / Empresas.",
      "Para poder brindarte la mejor atención, necesito que me digas si sos:",
    ],
    options: [
      { text: "TITULAR", action: "top_titular" },
      { text: "USUARIO", action: "top_usuario" },
      { text: "🔙 Volver al menú principal", action: "welcome" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - TITULAR
  // ========================================
  top_titular: {
    messages: [
      "Perfecto, sos TITULAR de la cuenta TOP / Empresas.",
      "¿En qué horario necesitás atención?",
    ],
    options: [
      {
        text: "Dentro de horario de atención",
        action: "top_titular_dentro_horario",
      },
      {
        text: "Fuera de horario de atención",
        action: "top_titular_fuera_horario",
      },
      { text: "🔙 Volver", action: "top_empresas" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - TITULAR DENTRO DE HORARIO
  // ========================================
  top_titular_dentro_horario: {
    messages: [
      "Por favor, aguardame un momento y te transfiero con tu representante comercial. 😊",
    ],
    options: [
      { text: "👤 Conectar con Asesor", action: "conectar_asesor_titular" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - TITULAR FUERA DE HORARIO
  // ========================================
  top_titular_fuera_horario: {
    messages: [
      "¡Hola! 🤖",
      "Nuestro equipo comercial no está disponible los feriados, pero puedo ayudarte con estos temas:",
      "• Para denunciar el robo o pérdida de tu equipo, escribí **Robo**.",
      "• Si necesitás asistencia técnica, escribí **Técnica**.",
      "",
      "Si querés preguntar por *otro tema*, comunicate con tu representante a partir del próximo día hábil o consultá la app Mi Movistar: mov.is/iLEjx",
    ],
    options: [], // Sin opciones - fin del flujo
  },

  // ========================================
  // TOP EMPRESAS - USUARIO
  // ========================================
  top_usuario: {
    messages: [
      "¡Hola! Te doy la bienvenida a mi canal de atención de *Movistar Empresas*. 🤖",
      "Por consultas sobre facturación, trámites o compra de packs, contactate con la persona autorizada o titular de tu empresa. 📋",
      "• Desde acá, te puedo ayudar con estos temas:",
    ],
    options: [
      { text: "Consulta de Facturación", action: "top_usuario_facturacion" },
      { text: "Gestión Comercial", action: "top_usuario_comercial" },
      { text: "Soporte Técnico", action: "top_usuario_soporte" },
      { text: "Ver más opciones", action: "top_usuario_segundo_menu" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - USUARIO - SEGUNDO MENSAJE
  // ========================================
  top_usuario_segundo_menu: {
    messages: ["También podés consultar detalles de tu plan y consumos:"],
    options: [
      { text: "Mi plan", action: "top_usuario_mi_plan" },
      { text: "Consumo de datos", action: "top_usuario_consumo_datos" },
      { text: "Roaming", action: "top_usuario_roaming" },
      { text: "🔙 Volver", action: "top_usuario" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - USUARIO - SUBFLUJOS
  // ========================================
  top_usuario_facturacion: {
    messages: [
      "Seleccionaste Consulta de Facturación para usuarios TOP/Empresas.",
      "¿En qué puedo ayudarte con tu facturación?",
    ],
    options: [
      { text: "Ver mi última factura", action: "top_usuario_ver_factura" },
      { text: "Estado de cuenta", action: "top_usuario_estado_cuenta" },
      { text: "Medios de pago", action: "top_usuario_medios_pago" },
      { text: "🔙 Volver", action: "top_usuario" },
    ],
  },

  top_usuario_comercial: {
    messages: [
      "Seleccionaste Gestión Comercial para usuarios TOP/Empresas.",
      "¿Qué gestión comercial necesitás realizar?",
    ],
    options: [
      {
        text: "Consultar servicios",
        action: "top_usuario_consultar_servicios",
      },
      { text: "Modificar plan", action: "top_usuario_modificar_plan" },
      { text: "Agregar servicios", action: "top_usuario_agregar_servicios" },
      { text: "🔙 Volver", action: "top_usuario" },
    ],
  },

  top_usuario_soporte: {
    messages: [
      "Seleccionaste Soporte Técnico para usuarios TOP/Empresas.",
      "¿Qué tipo de soporte técnico necesitás?",
    ],
    options: [
      { text: "Problemas de conectividad", action: "top_usuario_conectividad" },
      { text: "Configuración de equipos", action: "top_usuario_configuracion" },
      { text: "Reportar falla", action: "top_usuario_reportar_falla" },
      { text: "🔙 Volver", action: "top_usuario" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - USUARIO - OPCIONES FINALES
  // ========================================
  top_usuario_mi_plan: {
    messages: [
      "📋 **Mi Plan TOP/Empresas**",
      "Información de tu plan empresarial:",
      "",
      "• Plan: TOP Empresarial Premium",
      "• Velocidad: 1GB simétrico",
      "• Líneas móviles: 50 incluidas",
      "• Cloud storage: 1TB empresarial",
      "• Soporte: 24/7 prioritario",
      "",
      "Para cambios en tu plan, contactá a tu ejecutivo de cuenta.",
    ],
    options: [], // Sin opciones - fin del flujo
  },

  top_usuario_consumo_datos: {
    messages: [
      "📊 **Consumo de Datos TOP/Empresas**",
      "Resumen de consumo actual:",
      "",
      "🌐 **Internet Empresarial:**",
      "• Consumo del mes: 850GB de 1TB",
      "• Disponible: 174GB restantes",
      "• Renovación: 15/08/2024",
      "",
      "📱 **Datos Móviles Corporativos:**",
      "• Pool compartido: 2.5TB de 3TB",
      "• Líneas activas: 50/50",
      "• Promedio por línea: 50GB",
    ],
    options: [], // Sin opciones - fin del flujo
  },

  top_usuario_roaming: {
    messages: [
      "🌍 **Roaming TOP/Empresas**",
      "Información de roaming corporativo:",
      "",
      "✅ **Roaming Habilitado Globalmente**",
      "• Cobertura: 195 países",
      "• Tarifa corporativa: Incluida",
      "• Data roaming: Ilimitado",
      "• Llamadas: Tarifas preferenciales",
      "",
      "📱 **Consumo Actual:**",
      "• Este mes: 45GB utilizados",
      "• Países visitados: 3",
      "• Costo adicional: $0 (incluido)",
    ],
    options: [], // Sin opciones - fin del flujo
  },

  // ========================================
  // RAMA: PREMIUM Y EMPRENDEDORES
  // ========================================
  premium_emprendedores: {
    messages: [
      "Perfecto, sos cliente Premium y Emprendedores.",
      "Para poder brindarte la mejor atención, necesito que me digas:",
    ],
    options: [
      { text: "Pool", action: "premium_pool" },
      { text: "Personalizado", action: "premium_personalizado" },
    ],
  },

  // ========================================
  // MENÚ "VER OPCIONES" - SEGÚN DIAGRAMA MIRO
  // ========================================
  ver_opciones_menu: {
    messages: [
      "¡Perfecto! Elegí Ver opciones y te ayudo a encontrar lo que buscás.",
      "¿Con qué te puedo ayudar hoy?",
    ],
    options: [
      { text: "Hablar con asesoría", action: "hablar_asesoria" },
      { text: "Facturas y pagos", action: "facturas_pagos" },
      { text: "Plan, datos y roaming", action: "plan_datos_roaming" },
      { text: "Ayuda técnica", action: "ayuda_tecnica" },
      { text: "Contratar servicios", action: "contratar_servicios" },
      { text: "Consultas y reclamos", action: "consultas_reclamos" },
      { text: "Más opciones", action: "mas_opciones" },
      { text: "🔙 Volver", action: "premium_emprendedores" },
    ],
  },

  // ========================================
  // IMPLEMENTACIÓN DEL MENÚ "VER OPCIONES"
  // ========================================

  // HABLAR CON ASESORÍA
  hablar_asesoria: {
    messages: [
      "Por favor, aguardame un momento y te transfiero con un representante Comercial 😊",
      "",
      "Lú a Vi 21 a 9 y SÁB 9 a 13",
      "DOM | FER",
      "",
      "*Nuestro equipo comercial no está disponible* en este momento. 🕒",
      "",
      "Podés volver a comunicarte los días hábiles de *lunes a viernes de 9 a 18 h.*",
      "",
      "Mientras tanto, puedo ayudarte con estos temas:",
    ],
    options: [
      { text: "Facturas y pagos", action: "facturas_pagos" },
      { text: "Plan, datos y roaming", action: "plan_datos_roaming" },
      { text: "Ayuda técnica", action: "ayuda_tecnica" },
      { text: "Contratar servicios", action: "contratar_servicios" },
      { text: "Consultas y reclamos", action: "consultas_reclamos" },
      { text: "Más opciones", action: "mas_opciones" },
      { text: "🔙 Volver al menú principal", action: "ver_opciones_menu" },
    ],
  },

  // FACTURAS Y PAGOS
  facturas_pagos: {
    messages: [
      "📄 **Facturas y Pagos**",
      "¿Qué necesitás hacer con tu facturación?",
    ],
    options: [
      { text: "Ver mi última factura", action: "ver_ultima_factura" },
      { text: "Consultar estado de cuenta", action: "estado_cuenta" },
      { text: "Medios de pago", action: "medios_pago" },
      { text: "Realizar un pago", action: "realizar_pago" },
      { text: "Reclamo de facturación", action: "reclamo_facturacion" },
      { text: "🔙 Volver", action: "ver_opciones_menu" },
    ],
  },

  // PLAN, DATOS Y ROAMING
  plan_datos_roaming: {
    messages: [
      "📱 **Plan, Datos y Roaming**",
      "¿Qué información necesitás sobre tu plan?",
    ],
    options: [
      { text: "Consultar mi plan actual", action: "consultar_plan" },
      { text: "Ver consumo de datos", action: "consumo_datos" },
      { text: "Agregar o quitar datos", action: "modificar_datos" },
      { text: "Información de roaming", action: "info_roaming" },
      { text: "Cambiar de plan", action: "cambiar_plan" },
      { text: "🔙 Volver", action: "ver_opciones_menu" },
    ],
  },

  // AYUDA TÉCNICA
  ayuda_tecnica: {
    messages: [
      "🔧 **Ayuda Técnica**",
      "¿Qué problema técnico necesitás resolver?",
    ],
    options: [
      { text: "Problemas de conexión", action: "problemas_conexion" },
      { text: "Configuración de equipos", action: "config_equipos" },
      { text: "Lentitud en internet", action: "lentitud_internet" },
      { text: "Problemas con llamadas", action: "problemas_llamadas" },
      {
        text: "Soporte técnico especializado",
        action: "soporte_especializado",
      },
      { text: "🔙 Volver", action: "ver_opciones_menu" },
    ],
  },

  // CONTRATAR SERVICIOS
  contratar_servicios: {
    messages: [
      "📦 **Contratar Servicios**",
      "¿Qué servicio te interesa contratar?",
    ],
    options: [
      { text: "Nuevas líneas móviles", action: "contratar_lineas" },
      { text: "Internet empresarial", action: "contratar_internet" },
      { text: "Servicios cloud", action: "contratar_cloud" },
      { text: "Paquetes empresariales", action: "contratar_paquetes" },
      { text: "Servicios adicionales", action: "contratar_adicionales" },
      { text: "🔙 Volver", action: "ver_opciones_menu" },
    ],
  },

  // CONSULTAS Y RECLAMOS
  consultas_reclamos: {
    messages: ["❓ **Consultas y Reclamos**", "¿En qué te puedo ayudar?"],
    options: [
      { text: "Hacer una consulta general", action: "consulta_general" },
      { text: "Presentar un reclamo", action: "presentar_reclamo" },
      { text: "Seguimiento de reclamo", action: "seguimiento_reclamo" },
      { text: "Consulta sobre servicios", action: "consulta_servicios" },
      { text: "Información de cuenta", action: "info_cuenta" },
      { text: "🔙 Volver", action: "ver_opciones_menu" },
    ],
  },

  // MÁS OPCIONES
  mas_opciones: {
    messages: ["⚙️ **Más Opciones**", "Otras opciones disponibles:"],
    options: [
      { text: "Portabilidad numérica", action: "portabilidad" },
      { text: "Baja de servicios", action: "baja_servicios" },
      { text: "Información de cobertura", action: "info_cobertura" },
      { text: "Sucursales y horarios", action: "sucursales_horarios" },
      { text: "Contacto ejecutivo de cuenta", action: "contacto_ejecutivo" },
      { text: "🔙 Volver", action: "ver_opciones_menu" },
    ],
  },

  // PREMIUM - POOL
  premium_pool: {
    messages: [
      "¡Hola! Soy tu asistente virtual de Movistar Empresas. Estoy siempre acá para ayudarte con tus consultas. 🤖",
      "Decime, ¿por qué servicio querés consultar?",
    ],
    options: [
      { text: "Línea móvil", action: "pool_linea_movil" },
      { text: "Línea fija / Internet", action: "pool_linea_fija_internet" },
      { text: "🔙 Volver", action: "premium_emprendedores" },
    ],
  },

  // PREMIUM - PERSONALIZADO
  premium_personalizado: {
    messages: [
      "Perfecto, sos cliente Premium y Emprendedores Personalizado.",
      "Para poder brindarte la mejor atención, necesito que me digas si sos:",
    ],
    options: [
      { text: "TITULAR", action: "personalizado_titular" },
      { text: "USUARIO", action: "personalizado_usuario" },
      { text: "🔙 Volver", action: "premium_emprendedores" },
    ],
  },

  // ========================================
  // POOL - LÍNEA MÓVIL
  // ========================================
  pool_linea_movil: {
    messages: [
      "¡Perfecto! Elegí Ver opciones y te ayudo a encontrar lo que buscás. 👇",
      "Ver opciones",
    ],
    options: [
      { text: "Hablar con asesoría", action: "pool_movil_hablar_asesoria" },
      { text: "Facturas y pagos", action: "pool_movil_facturas_pagos" },
      {
        text: "Plan, datos y roaming",
        action: "pool_movil_plan_datos_roaming",
      },
      { text: "Ayuda técnica", action: "pool_movil_ayuda_tecnica" },
      { text: "Contratar servicios", action: "pool_movil_contratar_servicios" },
      { text: "Celulares y chips", action: "pool_movil_celulares_chips" },
      { text: "Más opciones", action: "pool_movil_mas_opciones" },
      { text: "🔙 Volver", action: "premium_pool" },
    ],
  },

  // POOL - LÍNEA FIJA / INTERNET
  pool_linea_fija_internet: {
    messages: [
      "¡Perfecto! Elegí Ver opciones y te ayudo a encontrar lo que buscás. 👇",
      "Ver opciones",
    ],
    options: [
      { text: "Hablar con asesoría", action: "pool_fija_hablar_asesoria" },
      { text: "Facturas y pagos", action: "pool_fija_facturas_pagos" },
      { text: "Ayuda técnica", action: "pool_fija_ayuda_tecnica" },
      { text: "Cambio de titularidad", action: "pool_fija_cambio_titularidad" },
      { text: "Contratar servicios", action: "pool_fija_contratar_servicios" },
      { text: "Baja", action: "pool_fija_baja" },
      { text: "🔙 Volver", action: "premium_pool" },
    ],
  },

  // ========================================
  // ========================================
  // PERSONALIZADO - TITULAR
  // ========================================
  personalizado_titular: {
    messages: [
      "¡Hola! Soy tu asistente virtual de Movistar Empresas. Estoy siempre acá para ayudarte con tus consultas. 🤖",
      "Tocá en Ver opciones para conocer todos los temas en los que te puedo asistir. 👇",
      "Ver opciones",
    ],
    options: [
      {
        text: "Hablar con asesor/a",
        action: "personalizado_titular_hablar_asesor",
      },
      {
        text: "Facturas y pagos",
        action: "personalizado_titular_facturas_pagos",
      },
      {
        text: "Plan, datos y roaming",
        action: "personalizado_titular_plan_datos_roaming",
      },
      { text: "Ayuda técnica", action: "personalizado_titular_ayuda_tecnica" },
      {
        text: "Contratar servicios",
        action: "personalizado_titular_contratar_servicios",
      },
      {
        text: "Celulares y chips",
        action: "personalizado_titular_celulares_chips",
      },
      { text: "Más opciones", action: "personalizado_titular_mas_opciones" },
      { text: "🔙 Volver", action: "premium_personalizado" },
    ],
  },

  // ========================================
  // PERSONALIZADO TITULAR - HABLAR CON ASESOR
  // ========================================
  personalizado_titular_hablar_asesor: {
    messages: [
      "Por favor, aguardame un momento y te transfiero con un representante Comercial. 😊",
    ],
    options: [
      {
        text: "Dentro de horario (LU-VI 9-18)",
        action: "personalizado_titular_dentro_horario",
      },
      {
        text: "Fuera de horario",
        action: "personalizado_titular_fuera_horario",
      },
    ],
  },

  // PERSONALIZADO TITULAR - DENTRO DE HORARIO
  personalizado_titular_dentro_horario: {
    messages: [
      "Conectando con asesor comercial...",
      "Un representante comercial te atenderá en breve. 😊",
    ],
    options: [
      {
        text: "👤 Conectar con Asesor Comercial",
        action: "conectar_asesor_comercial_personalizado",
      },
    ],
  },

  // PERSONALIZADO TITULAR - FUERA DE HORARIO
  personalizado_titular_fuera_horario: {
    messages: [
      "Nuestro equipo comercial no está disponible en este momento. 🕒",
      "Podés volver a comunicarte los días hábiles,",
      "de lunes a viernes de 9 a 18 h.",
      "",
      "Mientras tanto, se ofrece ayuda automática con estos temas:",
    ],
    options: [
      {
        text: "Facturas y pagos",
        action: "personalizado_titular_facturas_pagos",
      },
      {
        text: "Plan, datos y roaming",
        action: "personalizado_titular_plan_datos_roaming",
      },
      { text: "Ayuda técnica", action: "personalizado_titular_ayuda_tecnica" },
      {
        text: "Robo o pérdida de equipo",
        action: "personalizado_titular_robo_perdida",
      },
      { text: "Menú principal", action: "personalizado_titular" },
    ],
  },

  // ========================================
  // PERSONALIZADO TITULAR - OPCIONES ADICIONALES
  // ========================================
  personalizado_titular_facturas_pagos: {
    messages: [
      "📄 **Facturas y Pagos - Personalizado**",
      "¿Qué necesitás hacer con tu facturación?",
    ],
    options: [
      { text: "Ver mi última factura", action: "ver_ultima_factura" },
      { text: "Consultar estado de cuenta", action: "estado_cuenta" },
      { text: "Medios de pago", action: "medios_pago" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  personalizado_titular_plan_datos_roaming: {
    messages: [
      "📱 **Plan, Datos y Roaming - Personalizado**",
      "¿Qué información necesitás sobre tu plan?",
    ],
    options: [
      { text: "Consultar mi plan actual", action: "consultar_plan" },
      { text: "Ver consumo de datos", action: "consumo_datos" },
      { text: "Información de roaming", action: "info_roaming" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  personalizado_titular_ayuda_tecnica: {
    messages: [
      "🔧 **Ayuda Técnica - Personalizado**",
      "¿Qué problema técnico necesitás resolver?",
    ],
    options: [
      { text: "Problemas de conexión", action: "problemas_conexion" },
      { text: "Configuración de equipos", action: "config_equipos" },
      { text: "Lentitud en internet", action: "lentitud_internet" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  personalizado_titular_contratar_servicios: {
    messages: [
      "📦 **Contratar Servicios - Personalizado**",
      "¿Qué servicio te interesa contratar?",
    ],
    options: [
      { text: "Nuevas líneas móviles", action: "contratar_lineas" },
      { text: "Internet empresarial", action: "contratar_internet" },
      { text: "Servicios cloud", action: "contratar_cloud" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  personalizado_titular_celulares_chips: {
    messages: [
      "📱 **Celulares y Chips - Personalizado**",
      "¿Qué necesitás con celulares y chips?",
    ],
    options: [
      { text: "Comprar celulares", action: "comprar_celulares" },
      { text: "Solicitar chips", action: "solicitar_chips" },
      { text: "Cambio de equipo", action: "cambio_equipo" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  personalizado_titular_mas_opciones: {
    messages: [
      "⚙️ **Más Opciones - Personalizado**",
      "Otras opciones disponibles:",
    ],
    options: [
      { text: "Portabilidad numérica", action: "portabilidad" },
      { text: "Baja de servicios", action: "baja_servicios" },
      { text: "Información de cobertura", action: "info_cobertura" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  personalizado_titular_robo_perdida: {
    messages: [
      "🚨 **Robo o Pérdida de Equipo - Personalizado**",
      "Lamentamos lo ocurrido. Para proceder:",
      "",
      "📋 **Necesitamos:**",
      "• Número de línea afectada",
      "• Fecha y hora del incidente",
      "• Denuncia policial (si corresponde)",
      "",
      "🔒 **Bloquearemos la línea inmediatamente**",
    ],
    options: [
      { text: "Confirmar bloqueo", action: "confirmar_bloqueo_personalizado" },
      { text: "Más información", action: "info_robo_personalizado" },
      { text: "🔙 Volver", action: "personalizado_titular" },
    ],
  },

  // ========================================
  // PERSONALIZADO - USUARIO
  // ========================================
  personalizado_usuario: {
    messages: [
      "¡Hola! Soy tu asistente virtual de Movistar Empresas. 🤖",
      "Tocá en Ver opciones para conocer todos los temas en los que te puedo asistir. 👇",
      "Ver opciones",
    ],
    options: [
      {
        text: "Facturas y pagos 📄",
        action: "personalizado_usuario_facturas_pagos",
      },
      {
        text: "Plan, datos y roaming 🌐",
        action: "personalizado_usuario_plan_datos_roaming",
      },
      {
        text: "Celulares y chips 📱",
        action: "personalizado_usuario_celulares_chips",
      },
      {
        text: "Ayuda técnica 🛠",
        action: "personalizado_usuario_ayuda_tecnica",
      },
      {
        text: "Contratar servicios 🛍",
        action: "personalizado_usuario_contratar_servicios",
      },
      { text: "Beneficios 🎁", action: "personalizado_usuario_beneficios" },
      {
        text: "Robo o pérdida de equipo",
        action: "personalizado_usuario_robo_perdida",
      },
      { text: "Baja", action: "personalizado_usuario_baja" },
      { text: "Más opciones", action: "personalizado_usuario_mas_opciones" },
      { text: "🔙 Volver", action: "premium_personalizado" },
    ],
  },

  // ========================================
  // PERSONALIZADO USUARIO - OPCIONES
  // ========================================
  personalizado_usuario_facturas_pagos: {
    messages: [
      "📄 **Facturas y Pagos - Usuario Personalizado**",
      "¿Qué necesitás hacer con tu facturación?",
    ],
    options: [
      { text: "Ver mi última factura", action: "ver_ultima_factura" },
      { text: "Consultar estado de cuenta", action: "estado_cuenta" },
      { text: "Medios de pago", action: "medios_pago" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_plan_datos_roaming: {
    messages: [
      "🌐 **Plan, Datos y Roaming - Usuario Personalizado**",
      "¿Qué información necesitás sobre tu plan?",
    ],
    options: [
      { text: "Consultar mi plan actual", action: "consultar_plan" },
      { text: "Ver consumo de datos", action: "consumo_datos" },
      { text: "Información de roaming", action: "info_roaming" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_celulares_chips: {
    messages: [
      "📱 **Celulares y Chips - Usuario Personalizado**",
      "¿Qué necesitás con celulares y chips?",
    ],
    options: [
      { text: "Comprar celulares", action: "comprar_celulares" },
      { text: "Solicitar chips", action: "solicitar_chips" },
      { text: "Cambio de equipo", action: "cambio_equipo" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_ayuda_tecnica: {
    messages: [
      "🛠 **Ayuda Técnica - Usuario Personalizado**",
      "¿Qué problema técnico necesitás resolver?",
    ],
    options: [
      { text: "Problemas de conexión", action: "problemas_conexion" },
      { text: "Configuración de equipos", action: "config_equipos" },
      { text: "Lentitud en internet", action: "lentitud_internet" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_contratar_servicios: {
    messages: [
      "🛍 **Contratar Servicios - Usuario Personalizado**",
      "¿Qué servicio te interesa contratar?",
    ],
    options: [
      { text: "Nuevas líneas móviles", action: "contratar_lineas" },
      { text: "Internet empresarial", action: "contratar_internet" },
      { text: "Servicios cloud", action: "contratar_cloud" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_beneficios: {
    messages: [
      "🎁 **Beneficios - Usuario Personalizado**",
      "Estos son tus beneficios disponibles:",
      "",
      "✅ **Beneficios Activos:**",
      "• Descuento 15% en equipos",
      "• Roaming internacional incluido",
      "• Soporte técnico prioritario",
      "• Cloud storage 500GB gratis",
      "",
      "🎯 **Promociones vigentes:**",
      "• 50% descuento primer mes nuevas líneas",
      "• Upgrade gratuito de velocidad",
    ],
    options: [
      {
        text: "Ver todos los beneficios",
        action: "todos_beneficios_personalizado",
      },
      {
        text: "Activar promociones",
        action: "activar_promociones_personalizado",
      },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_robo_perdida: {
    messages: [
      "🚨 **Robo o Pérdida de Equipo - Usuario Personalizado**",
      "Lamentamos lo ocurrido. Para proceder:",
      "",
      "📋 **Necesitamos:**",
      "• Número de línea afectada",
      "• Fecha y hora del incidente",
      "• Denuncia policial (si corresponde)",
      "",
      "🔒 **Bloquearemos la línea inmediatamente**",
    ],
    options: [
      {
        text: "Confirmar bloqueo",
        action: "confirmar_bloqueo_usuario_personalizado",
      },
      { text: "Más información", action: "info_robo_usuario_personalizado" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_baja: {
    messages: [
      "❌ **Baja de Servicios - Usuario Personalizado**",
      "Para proceder con la baja de servicios:",
      "",
      "📞 **Contacto requerido:**",
      "Comunicarse con Retenciones al 0800-555-BAJA",
      "",
      "🕒 **Horarios de atención:**",
      "Lunes a Viernes de 8:00 a 20:00 hs",
      "",
      "📋 **Documentación necesaria:**",
      "• DNI del titular",
      "• Último comprobante de pago",
    ],
    options: [
      { text: "Motivos de baja", action: "motivos_baja_personalizado" },
      { text: "Información adicional", action: "info_baja_personalizado" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  personalizado_usuario_mas_opciones: {
    messages: [
      "⚙️ **Más Opciones - Usuario Personalizado**",
      "Otras opciones disponibles:",
    ],
    options: [
      { text: "Portabilidad numérica", action: "portabilidad" },
      { text: "Información de cobertura", action: "info_cobertura" },
      { text: "Sucursales y horarios", action: "sucursales_horarios" },
      { text: "🔙 Volver", action: "personalizado_usuario" },
    ],
  },

  // ========================================
  // PERSONALIZADO - LÍNEA MÓVIL
  // ========================================
  personalizado_linea_movil: {
    messages: [
      "Seleccionaste Línea móvil personalizada.",
      "¿Qué necesitás hacer con tus líneas móviles personalizadas?",
    ],
    options: [
      {
        text: "Consulta de Facturación",
        action: "personalizado_movil_facturacion",
      },
      { text: "Gestión Comercial", action: "personalizado_movil_comercial" },
      { text: "Soporte Técnico", action: "personalizado_movil_soporte" },
      { text: "Consultas Generales", action: "personalizado_movil_consultas" },
      { text: "🔙 Volver", action: "premium_personalizado" },
    ],
  },

  // PERSONALIZADO - LÍNEA FIJA / INTERNET
  personalizado_linea_fija_internet: {
    messages: [
      "Seleccionaste Línea fija / Internet personalizada.",
      "¿Qué necesitás hacer con tus servicios fijos o de internet personalizados?",
    ],
    options: [
      {
        text: "Consulta de Facturación",
        action: "personalizado_fija_facturacion",
      },
      { text: "Gestión Comercial", action: "personalizado_fija_comercial" },
      { text: "Soporte Técnico", action: "personalizado_fija_soporte" },
      { text: "Consultas Generales", action: "personalizado_fija_consultas" },
      { text: "🔙 Volver", action: "premium_personalizado" },
    ],
  },

  // ========================================
  // TOP EMPRESAS - SUBFLUJOS
  // ========================================
  top_robo: {
    messages: [
      "🚨 **Denuncia de Robo o Pérdida - TOP Empresas**",
      "Lamentamos lo ocurrido. Para proceder con la denuncia:",
      "",
      "📋 **Información necesaria:**",
      "• Número de línea afectada",
      "• Fecha y hora aproximada del incidente",
      "• Número de denuncia policial (si corresponde)",
      "",
      "🔒 **Acciones inmediatas:**",
      "• Bloqueo preventivo de la línea",
      "• Suspensión de servicios de datos",
      "• Generación de reporte interno",
      "",
      "Un especialista TOP se comunicará contigo en las próximas 2 horas para completar el proceso.",
    ],
    options: [
      { text: "Confirmar denuncia", action: "top_robo_confirmacion" },
      { text: "Más información", action: "top_robo_info" },
      { text: "🔙 Volver", action: "top_empresas" },
    ],
  },

  top_tecnica: {
    messages: [
      "🔧 **Asistencia Técnica TOP Empresas**",
      "¿Qué tipo de asistencia técnica necesitás?",
    ],
    options: [
      { text: "Falla de conectividad", action: "top_falla_conectividad" },
      { text: "Problema con equipos", action: "top_problema_equipos" },
      { text: "Configuración de servicios", action: "top_config_servicios" },
      { text: "Soporte crítico 24/7", action: "top_soporte_critico" },
      { text: "🔙 Volver", action: "top_empresas" },
    ],
  },

  top_consulta_facturacion: {
    messages: [
      "Consulta de Facturación TOP / Empresas.",
      "¿Qué información necesitás sobre tu facturación?",
    ],
    options: [
      { text: "Ver última factura", action: "top_ver_factura" },
      { text: "Estado de cuenta", action: "top_estado_cuenta" },
      { text: "Medios de pago", action: "top_medios_pago" },
      { text: "Reclamos de facturación", action: "top_reclamos_facturacion" },
      { text: "🔙 Volver", action: "top_empresas" },
    ],
  },

  top_gestion_comercial: {
    messages: [
      "Gestión Comercial TOP / Empresas.",
      "¿Qué gestión comercial necesitás realizar?",
    ],
    options: [
      { text: "Ampliar servicios", action: "top_ampliar_servicios" },
      { text: "Nuevos productos", action: "top_nuevos_productos" },
      { text: "Modificar servicios", action: "top_modificar_servicios" },
      { text: "Contacto ejecutivo", action: "top_contacto_ejecutivo" },
      { text: "🔙 Volver", action: "top_empresas" },
    ],
  },

  top_soporte_tecnico: {
    messages: [
      "Soporte Técnico TOP / Empresas.",
      "¿Qué tipo de soporte técnico necesitás?",
    ],
    options: [
      { text: "Falla de servicio", action: "top_falla_servicio" },
      { text: "Configuración", action: "top_configuracion" },
      { text: "Mantenimiento", action: "top_mantenimiento" },
      { text: "Soporte crítico", action: "top_soporte_critico" },
      { text: "🔙 Volver", action: "top_empresas" },
    ],
  },
};

// ========================================
// RESPUESTAS ESPECÍFICAS DEL FLUJO
// ========================================

const RESPUESTAS_BIENVENIDA = {
  // ========================================
  // RESPUESTAS PARA MENÚ "VER OPCIONES"
  // ========================================

  // Facturas y Pagos
  ver_ultima_factura:
    "📄 Tu última factura del período 01-31/07/2024 por $45,230.50. Vencimiento: 15/08/2024. ¿Querés que te la envíe por email?",
  estado_cuenta:
    "📊 Estado de cuenta actual: ✅ Al día. Servicios activos: Internet 100MB, 15 líneas móviles. Próximo vencimiento: 15/08/2024.",
  medios_pago:
    "💳 Medios de pago disponibles: Débito automático, tarjeta de crédito, transferencia bancaria, RapiPago. ¿Querés configurar débito automático?",
  realizar_pago:
    "💰 Para realizar un pago podés: 1) Débito automático, 2) Transferencia a CBU 1234567890123456789012, 3) RapiPago con código 123456789.",
  reclamo_facturacion:
    "⚠️ Reclamo de facturación registrado. Ticket #REC-FACT-240815. Un especialista te contactará en 24-48 horas para revisar tu caso.",

  // Plan, Datos y Roaming
  consultar_plan:
    "📱 Tu plan actual: Premium Empresarial 100GB con 15 líneas incluidas. Velocidad: 100MB. Llamadas ilimitadas incluidas.",
  consumo_datos:
    "📊 Consumo actual: 180GB de 200GB disponibles (90% utilizado). Renovación: 15/08/2024. ¿Querés agregar más datos?",
  modificar_datos:
    "📈 Paquetes de datos adicionales: +50GB por $8,500 | +100GB por $15,000 | Ilimitado por $25,000. Activación inmediata.",
  info_roaming:
    "🌍 Roaming disponible en 195 países. Pack América: $15,000/mes. Pack Europa: $22,000/mes. Pack Mundial: $35,000/mes.",
  cambiar_plan:
    "🔄 Planes disponibles para tu empresa: Básico ($28,000), Avanzado ($45,000), Premium ($65,000). ¿Te interesa alguno en particular?",

  // Ayuda Técnica
  problemas_conexion:
    "🌐 Verificando tu conexión... Detectamos posible interferencia. Reiniciá tu router y esperá 2 minutos. Si persiste, enviamos técnico.",
  config_equipos:
    "⚙️ Configuración de equipos: 1) Router: IP 192.168.1.1, 2) WiFi: Movistar_Empresa_123, 3) Manual enviado por email.",
  lentitud_internet:
    "🐌 Test de velocidad recomendado: movistar.com/speedtest. Si es menor a 80MB, programamos visita técnica sin costo.",
  problemas_llamadas:
    "📞 Problemas de llamadas registrados. Optimización de red aplicada. Si continúa, cambio de SIM gratis en sucursal.",
  soporte_especializado:
    "🔧 Derivando a soporte técnico especializado. Un ingeniero te contactará en 2-4 horas para análisis detallado.",

  // Contratar Servicios
  contratar_lineas:
    "📱 Líneas móviles disponibles: Plan Empresarial desde $4,800/línea. Portabilidad gratis. ¿Cuántas líneas necesitás?",
  contratar_internet:
    "🌐 Internet empresarial: 50MB ($18,900), 100MB ($28,500), 200MB ($45,000). Instalación gratuita para empresas.",
  contratar_cloud:
    "☁️ Servicios cloud: Backup automático, Office 365, hosting web desde $12,000/mes. ¿Qué solución necesitás?",
  contratar_paquetes:
    "📦 Paquetes empresariales completos: Internet + Móviles + Cloud desde $38,900/mes. Te contacto con un especialista.",
  contratar_adicionales:
    "➕ Servicios adicionales: Email corporativo, centralita virtual, monitoreo 24/7. ¿Cuál te interesa?",

  // Consultas y Reclamos
  consulta_general:
    "❓ Para consultas generales estoy acá para ayudarte. También podés llamar al 0800-555-MOVI (6684) las 24 horas.",
  presentar_reclamo:
    "📝 Reclamo registrado. Ticket #REC-GEN-240815. Tiempo de resolución: 72 horas hábiles. Te mantendremos informado por SMS.",
  seguimiento_reclamo:
    "🔍 Para seguimiento de reclamos necesito tu número de ticket. También podés consultar en mimovistar.com sección 'Mis Reclamos'.",
  consulta_servicios:
    "ℹ️ Información sobre servicios disponible 24/7. ¿Sobre qué servicio específico necesitás información?",
  info_cuenta:
    "👤 Información de cuenta: Empresa registrada, 15 servicios activos, ejecutivo asignado: Juan Pérez (interno 1234).",

  // Más Opciones
  portabilidad:
    "🔄 Portabilidad numérica: Proceso gratuito, demora 1-3 días hábiles. Necesitás: DNI, última factura, autorización de titular.",
  cambio_titularidad:
    "👤 Cambio de titularidad: Proceso requiere documentación del titular actual y nuevo titular. Tiempo: 5-7 días hábiles. Te derivo con un especialista.",
  baja_servicios:
    "❌ Para baja de servicios necesitás comunicarte con Retenciones al 0800-555-BAJA. Horario: Lú-Vi 8-20hs.",
  info_cobertura:
    "📡 Cobertura disponible en tu zona: 4G+ 98%, 5G 45%, Fibra óptica disponible. ¿Querés verificar una dirección específica?",
  sucursales_horarios:
    "🏢 Sucursal más cercana: Av. Corrientes 1234, CABA. Horario: Lú-Vi 9-18hs, Sáb 9-13hs. Tel: (011) 4000-1234.",
  contacto_ejecutivo:
    "👨‍💼 Tu ejecutivo de cuenta Juan Pérez te contactará en las próximas 2 horas al número registrado.",

  // Respuestas originales para TOP/Empresas - Facturación
  top_ver_factura:
    "📄 Accediendo a tu última factura TOP/Empresas. Factura Nº 2024-08-001234 por $125,430.50. Vencimiento: 15/08/2024.",
  top_estado_cuenta:
    "📊 Estado de cuenta TOP/Empresas: Saldo al día. Servicios activos: Internet 1GB, 50 líneas móviles, Cloud empresarial.",
  top_medios_pago:
    "💳 Medios de pago disponibles para clientes TOP: Débito automático, transferencia, cheques. Descuentos especiales aplicables.",
  top_reclamos:
    "⚠️ Generando ticket de reclamo prioritario TOP/Empresas. Ref: #REC-TOP-240815. Un especialista te contactará en 30 minutos.",

  // Respuestas para TOP/Empresas - Soporte
  top_falla_servicio:
    "🚨 Falla de servicio TOP registrada. Ticket crítico #INC-TOP-240815. SLA: Resolución en 2 horas. NOC notificado.",
  top_configuracion:
    "⚙️ Soporte especializado TOP para configuración. Te derivo con ingeniero senior. Contacto inmediato.",
  top_mantenimiento:
    "🔧 Mantenimientos programados TOP: Ventana 02:00-05:00 AM. Próximo: 20/08/2024. Notificación 48hs antes.",
  top_soporte_critico:
    "🆘 SOPORTE CRÍTICO TOP activado. Escalamiento inmediato a NOC. Ingeniero de guardia contactará en 10 minutos.",

  // Respuestas para TOP/Empresas - Servicios
  top_internet_dedicado:
    "🌐 Internet dedicado TOP: Velocidades 500MB-10GB. Fibra óptica redundante. SLA 99.95%. Soporte 24/7.",
  top_cloud:
    "☁️ Soluciones cloud TOP: AWS/Azure integrado, backup automático, disaster recovery, monitoreo 24/7.",
  top_conectividad:
    "🔗 Conectividad TOP: MPLS, SD-WAN, VPN sitio-a-sitio, enlaces backup, QoS garantizado.",
  top_gestionados:
    "🛠️ Servicios gestionados TOP: NOC dedicado, monitoreo proactivo, mantenimiento preventivo, reportería ejecutiva.",

  // Respuestas para TOP/Empresas - Comercial
  top_ampliar_servicios:
    "📈 Ampliación de servicios TOP. Te contacto con tu Account Manager dedicado para análisis personalizado.",
  top_nuevos_productos:
    "🆕 Productos TOP disponibles: 5G empresarial, IoT, ciberseguridad avanzada, analytics. Consulta especializada.",
  top_renovacion:
    "📋 Renovación TOP: Condiciones preferenciales, descuentos por lealtad. Tu ejecutivo te contactará hoy.",
  top_ejecutivo:
    "👨‍💼 Contactando a tu ejecutivo de cuenta TOP dedicado. Atención personalizada en 15 minutos.",

  // Respuestas para Premium/Emprendedores - Facturación
  premium_ver_factura:
    "📄 Tu última factura Premium: $45,230.50. Período: 01-31/07/2024. Descarga disponible en Mi Movistar.",
  premium_estado_cuenta:
    "📊 Estado Premium: Al día. Servicios: Internet 100MB, 15 líneas móviles, Cloud 500GB. Próximo vto: 15/08.",
  premium_medios_pago:
    "💳 Medios de pago Premium: Débito automático, tarjeta, transferencia, RapiPago. Descuento 5% débito automático.",
  premium_consultas_fact:
    "❓ Consultas de facturación Premium. ¿Sobre qué concepto necesitas información? Un especialista te ayudará.",

  // Respuestas para Premium/Emprendedores - Soporte
  premium_conexion:
    "🌐 Problemas de conexión Premium registrados. Ticket #INC-PREM-240815. Solución estimada: 4 horas.",
  premium_config_servicios:
    "⚙️ Configuración de servicios Premium. Te guío paso a paso o derivo con técnico especializado.",
  premium_consultas_tec:
    "🔧 Consultas técnicas Premium. Chat técnico disponible o llamada programada según tu preferencia.",
  premium_reportar_falla:
    "⚠️ Falla reportada Premium. Ticket #FALL-PREM-240815. Seguimiento por SMS y email.",

  // Respuestas para Premium/Emprendedores - Servicios
  premium_planes_internet:
    "🌐 Planes internet Premium: 50MB, 100MB, 200MB. Fibra óptica. Instalación gratuita emprendedores.",
  premium_moviles:
    "📱 Servicios móviles Premium: Planes desde 10GB. Roaming incluido. Descuentos corporativos disponibles.",
  premium_digitales:
    "💻 Soluciones digitales Premium: Office 365, Google Workspace, backup cloud, hosting web.",
  premium_planes_emprendedores:
    "🚀 Planes emprendedores: Internet + móvil + digital desde $25.000. Kit gratuito primeros 3 meses.",

  // Respuestas para Premium/Emprendedores - Comercial
  premium_contratar:
    "📝 Contratación Premium: Te contacto con ejecutivo comercial para cotización personalizada.",
  premium_cambiar_plan:
    "🔄 Cambio de plan Premium: Análisis de uso y recomendación del mejor plan para tu negocio.",
  premium_promociones:
    "🎉 Promociones Premium vigentes: 50% desc. primer mes, instalación gratis, equipos sin costo.",
  premium_asesoramiento:
    "💡 Asesoramiento Premium: Consultoría gratuita para optimizar tus servicios de telecomunicaciones.",

  // ========================================
  // RESPUESTAS FINALES E2E - ACCIONES CONCRETAS
  // ========================================

  // TOP EMPRESAS - Respuestas finales de Facturación
  top_enviar_factura_email:
    "📧 ¡Listo! Tu factura TOP se envió a tu email corporativo registrado. Llegará en 5 minutos. Ticket: #EMAIL-TOP-240815",
  top_enviar_factura_sms:
    "📱 Enlace de descarga enviado por SMS al número registrado. Válido por 24 horas. Ref: #SMS-TOP-240815",
  top_descargar_factura:
    "💻 Preparando descarga de PDF... ⬇️ DESCARGA INICIADA. Factura TOP Nº 2024-08-001234.pdf (2.1 MB)",
  top_especialista_facturacion:
    "📞 Conectando con especialista en facturación TOP... Tu ejecutivo Juan Pérez te llamará en 10 minutos al número registrado.",

  top_consumos_detallados:
    "📊 CONSUMOS DETALLADOS TOP:\n🌐 Internet: 8.2TB de 10TB\n📱 Móviles: 2,840 min de 5,000\n☁️ Cloud: 145GB de 500GB\n📞 Fijos: 1,200 min",
  top_proyeccion_factura:
    "💰 PROYECCIÓN PRÓXIMA FACTURA:\nBasado en uso actual: $128,450\nPromedio últimos 3 meses: $125,680\nFecha estimada: 15/09/2024",
  top_historico_consumos:
    "📈 HISTÓRICO ÚLTIMOS 6 MESES:\nEnero: $122,300 | Febrero: $119,800\nMarzo: $125,600 | Abril: $124,200\nMayo: $126,100 | Junio: $125,430",
  top_resumen_ejecutivo:
    "🔄 Generando resumen ejecutivo TOP... Será enviado a gerencia@tuempresa.com en 15 minutos. Incluye: tendencias, optimizaciones y recomendaciones.",

  top_agregar_medio_pago:
    "➕ Enviando formulario seguro para nuevo medio de pago TOP a tu email. Link válido 48hs. Certificación PCI DSS.",
  top_modificar_debito:
    "✏️ Modificación de débito automático TOP programada. Cambios efectivos próximo período. Confirmación por email en 2 horas.",
  top_ver_metodos_pago:
    "📋 MÉTODOS DE PAGO ACTIVOS:\n💳 Cuenta corriente BBVA **1234 (Principal)\n🏦 Transferencia automática (Backup)\n📄 Cuenta corporativa Santander **5678",
  top_pago_corporativo:
    "💳 Configurando pago corporativo TOP con condiciones especiales. Account Manager te contactará para configuración avanzada.",

  top_reclamo_importe:
    "💰 RECLAMO IMPORTE TOP registrado. Ticket crítico #REC-IMP-TOP-240815. Auditoría inmediata. Resolución SLA: 24 horas.",
  top_reclamo_servicios:
    "📋 RECLAMO SERVICIOS TOP registrado. Ref: #REC-SERV-240815. Revisión técnica y comercial. Te contactamos en 2 horas.",
  top_reclamo_fechas:
    "📅 RECLAMO FECHAS TOP registrado. Ticket: #REC-FECHA-240815. Ajuste automático próxima factura si procede.",
  top_auditoria_cuenta:
    "🔍 AUDITORÍA COMPLETA TOP iniciada. Especialista asignado: María González. Informe completo en 48 horas vía email seguro.",

  // TOP EMPRESAS - Respuestas finales de Soporte
  top_sin_conectividad:
    "🌐 FALLA CRÍTICA registrada. NOC TOP activado. Ticket: #CONEX-TOP-240815. Ingeniero en sitio dispatch: 30 minutos. SLA: 2 horas.",
  top_velocidad_reducida:
    "📶 DEGRADACIÓN DE VELOCIDAD TOP detectada. Diagnóstico automático iniciado. Optimización en curso. Monitoreo 24h activo.",
  top_problemas_voz:
    "📞 PROBLEMAS VOZ TOP escalado. Ingeniero de telefonía asignado. Análisis de calidad en curso. Update cada 30 min.",
  top_falla_cloud:
    "☁️ FALLA CLOUD TOP reportada. Escalamiento inmediato a AWS/Azure. Backup automático activado. Recovery time: <1 hora.",

  top_config_red:
    "🖥️ Configuración de equipos de red TOP programada. Ingeniero senior en sitio mañana 9 AM. Configuración remota disponible YA.",
  top_config_moviles:
    "📱 Configuración masiva de dispositivos TOP. MDM corporativo listo. 50 dispositivos configurados remotamente en 2 horas.",
  top_config_cloud:
    "☁️ Configuración servicios cloud TOP con especialista certificado. Sesión dedicada programada para hoy 15:00 hs.",
  top_config_seguridad:
    "🔐 Configuración seguridad TOP con expert en ciberseguridad. Firewall, VPN y políticas. Sesión crítica HOY.",

  // TOP EMPRESAS - Respuestas finales de Servicios
  top_aumentar_velocidad:
    "⚡ UPGRADE VELOCIDAD TOP: Disponible upgrade inmediato 1GB→5GB. Implementación sin corte. Costo: $45,000/mes adicionales.",
  top_redundancia:
    "🔄 REDUNDANCIA TOP: Enlaces backup disponibles. Fibra óptica redundante + 4G backup. SLA 99.99%. Implementación: 48hs.",
  top_monitoreo_real:
    "📊 MONITOREO 24/7 TOP activo. Dashboard ejecutivo en tiempo real. Alertas proactivas. Portal: monitor.movistar-top.com",
  top_cotizar_upgrade:
    "💰 COTIZACIÓN UPGRADE TOP generada. Account Manager te enviará propuesta personalizada en 2 horas. Condiciones preferenciales aplicadas.",

  top_backup_cloud:
    "💾 BACKUP CLOUD TOP: RPO 15 min, RTO 30 min. 99.99% disponibilidad. Disaster Recovery geográfico incluido.",
  top_migracion_cloud:
    "🏢 MIGRACIÓN CLOUD TOP con zero downtime. Plan de migración personalizado. Project Manager asignado: Carlos Ruiz.",
  top_seguridad_cloud:
    "🔐 SEGURIDAD CLOUD TOP: Certificaciones ISO 27001, SOC 2. Encryption end-to-end. Compliance GDPR incluido.",
  top_escalabilidad_cloud:
    "📈 AUTO-SCALING TOP configurado. Recursos dinámicos según demanda. Optimización de costos automática 24/7.",

  // TOP EMPRESAS - Respuestas finales de Comercial
  top_mas_ancho_banda:
    "📈 AMPLIACIÓN ANCHO DE BANDA TOP: De 1GB a 5GB disponible YA. Upgrade sin corte. Account Manager confirma en 1 hora.",
  top_mas_lineas:
    "📱 AMPLIACIÓN LÍNEAS TOP: +20 líneas corporativas disponibles. Activación en 24hs. Descuento por volumen aplicado.",
  top_nuevas_sucursales:
    "🏢 NUEVAS SUCURSALES TOP: Infraestructura para 5 nuevas locaciones. Project Manager asignado. Cronograma en 48hs.",
  top_mas_cloud:
    "☁️ AMPLIACIÓN CLOUD TOP: Storage ilimitado, más instancias. Scaling automático. Propuesta executive en 24hs.",

  top_5g_empresarial:
    "📡 5G EMPRESARIAL TOP disponible en tu zona. Velocidades hasta 1Gbps móvil. Beta testing disponible. Priority network.",
  top_iot_conectividad:
    "🔌 IoT CONNECTIVITY TOP: 10,000 dispositivos IoT incluidos. Dashboard centralizado. Gestión remota total.",
  top_ciberseguridad:
    "🛡️ CIBERSEGURIDAD TOP: SOC 24/7, threat intelligence, incident response. Consultoría gratuita con expert.",
  top_business_intelligence:
    "📊 BUSINESS INTELLIGENCE TOP: Analytics avanzado, dashboards ejecutivos, machine learning. Consultoría included.",

  // PREMIUM EMPRENDEDORES - Respuestas finales de Facturación
  premium_enviar_factura_email:
    "📧 Factura Premium enviada a tu email en 5 minutos. Formato PDF descargable. Ref: #EMAIL-PREM-240815",
  premium_descargar_movil:
    "📱 Link de descarga enviado por SMS. Válido 48 horas. Factura optimizada para móvil. Ref: #MOV-PREM-240815",
  premium_explicar_conceptos:
    "💬 Te explico cada concepto de tu factura Premium:\n📞 Abono básico: $15,200\n📱 Excedentes: $8,430\n🌐 Internet: $18,600\n☁️ Servicios cloud: $3,000",
  premium_contactar_soporte:
    "📞 Te contacto con soporte Premium. Especialista Laura Martinez te llamará en 20 minutos para ayudarte.",

  premium_detalle_consumos:
    "📊 DETALLE CONSUMOS PREMIUM:\n🌐 Internet: 180GB de 200GB\n📱 Llamadas: 840 min de 1000\n📧 Email: 15GB de 50GB\n☁️ Storage: 320GB de 500GB",
  premium_proximo_vencimiento:
    "💰 PRÓXIMO VENCIMIENTO: 15/08/2024\nImporte estimado: $47,100\nDías restantes: 3 días\n💡 Tip: Activa débito automático y ahorra 5%",
  premium_tendencia_uso:
    "📈 TENDENCIA ÚLTIMOS 3 MESES:\nPromedio mensual: $45,500\nPico de uso: Abril ($52,200)\nTendencia: Estable ✅",
  premium_actualizar_datos:
    "🔄 Actualizando datos de cuenta Premium... Información sincronizada. Cambios reflejados en próxima factura.",

  // PREMIUM EMPRENDEDORES - Respuestas finales de Soporte
  premium_sin_internet:
    "🌐 FALLA INTERNET Premium registrada. Ticket: #INT-PREM-240815. Técnico en ruta. ETA: 2-4 horas. Update por SMS.",
  premium_lentitud:
    "🐌 LENTITUD reportada Premium. Diagnóstico remoto en curso... Optimización aplicada. Test de velocidad: movistar.com/speedtest",
  premium_problemas_wifi:
    "📶 WIFI Premium: Enviando configuración optimizada por SMS. Si persiste, técnico en 24-48hs. Autodiagnóstico disponible.",
  premium_llamadas_cortadas:
    "📞 LLAMADAS Premium: Optimización de red aplicada. Si continúa, cambio de SIM gratis en sucursal más cercana.",

  premium_config_email:
    "📧 EMAIL CORPORATIVO Premium: Configuración step-by-step enviada por email. Soporte técnico disponible 8-20hs.",
  premium_config_lineas:
    "📱 LÍNEAS Premium: Configuración masiva disponible. Portal autogestión: mimovistar.com/premium. Video-tutorial incluido.",
  premium_config_portal:
    "🌐 PORTAL WEB Premium: Credenciales y guía enviadas por email. Hosting incluido 12 meses. Soporte 8-20hs.",
  premium_config_almacenamiento:
    "☁️ CLOUD STORAGE Premium: 500GB configurados. Sync automático activado. App móvil: Movistar Cloud Premium.",

  // PREMIUM EMPRENDEDORES - Respuestas finales de Servicios
  premium_oficina_pequena:
    "🏠 PLAN OFICINA PEQUEÑA: 100MB + 5 líneas + Cloud 200GB = $28,900/mes. Instalación gratis. ¿Te interesa?",
  premium_oficina_mediana:
    "🏢 PLAN OFICINA MEDIANA: 200MB + 15 líneas + Cloud 500GB = $45,600/mes. Kit emprendedor incluido.",
  premium_startups:
    "🚀 PLAN STARTUPS: 50MB + 10 líneas + Cloud ilimitado = $35,200/mes. 3 meses 50% descuento!",
  premium_plan_escalable:
    "📈 PLAN ESCALABLE: Crece con tu negocio. Desde $18,900 hasta $65,000. Sin permanencia. Flexible total.",

  premium_lineas_nuevas:
    "📱 LÍNEAS NUEVAS Premium: Activación en 2 horas. Portabilidad gratis. SIM entrega inmediata en sucursal.",
  premium_aumentar_datos:
    "⬆️ DATOS Premium: Upgrade inmediato disponible. 10GB→25GB por $8,500 adicionales. Activación YA.",
  premium_roaming:
    "🌍 ROAMING Premium: 195 países incluidos. Tarifas preferenciales. Pack viajero desde $15,000/mes.",
  premium_plan_familiar:
    "👥 PLAN FAMILIAR EMPRESARIAL: 5 líneas compartidas + beneficios. Desde $32,400/mes. Gestión centralizada.",

  // PREMIUM EMPRENDEDORES - Respuestas finales de Comercial
  premium_pack_completo:
    "📦 PACK EMPRENDEDOR COMPLETO: Internet 100MB + 10 líneas + Cloud + Email = $38,900/mes. 🎁 Kit gratis!",
  premium_solo_internet:
    "🌐 SOLO INTERNET Premium: Planes desde $18,900 (50MB) hasta $35,600 (200MB). Instalación gratis emprendedores.",
  premium_solo_moviles:
    "📱 SOLO MÓVILES Premium: Desde 5 líneas $22,400/mes. Ilimitado empresarial $4,800/línea. Sin permanencia.",
  premium_servicios_digitales:
    "☁️ SERVICIOS DIGITALES Premium: Cloud + Email + Web + Backup = $12,900/mes. Todo en uno para emprendedores.",

  premium_upgrade_plan:
    "⬆️ UPGRADE Premium: Plan superior disponible. Más velocidad y beneficios. Migración sin costos. Activo en 24hs.",
  premium_downgrade_plan:
    "⬇️ DOWNGRADE Premium: Plan ajustado a tu presupuesto. Mantienes servicios esenciales. Cambio en próximo período.",
  premium_cambiar_tipo:
    "🔄 CAMBIO TIPO PLAN Premium: Análisis de uso completado. Te recomiendo Plan Híbrido. Ahorro: 15% mensual.",
  premium_agregar_servicios:
    "➕ SERVICIOS ADICIONALES Premium: Cloud storage, líneas extra, hosting disponibles. Configuración inmediata.",
};

// ========================================
// FUNCIÓN PARA LIMPIAR FLUJOS ANTERIORES Y CARGAR EL NUEVO
// ========================================
function limpiarYCargarFlujoBienvenida() {
  // Limpiar flujos anteriores
  if (window.whatsappBot && window.whatsappBot.botFlows) {
    // Mantener solo la estructura base, eliminar flujos personalizados
    window.whatsappBot.botFlows = {};
  }

  // Cargar el nuevo flujo de bienvenida
  Object.keys(FLUJO_BIENVENIDA_MIRO).forEach((flowName) => {
    if (window.addMiroFlow) {
      window.addMiroFlow(flowName, FLUJO_BIENVENIDA_MIRO[flowName]);
    }
  });

  console.log("✅ Flujo de bienvenida NUEVO BOT 2025 cargado");
  console.log("🗑️ Flujos anteriores eliminados");
  console.log(
    `📊 Nuevo flujo con ${Object.keys(FLUJO_BIENVENIDA_MIRO).length} pasos`
  );
}

// ========================================
// INTEGRACIÓN CON EL BOT PRINCIPAL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Hacer las respuestas disponibles globalmente
    window.RESPUESTAS_BIENVENIDA = RESPUESTAS_BIENVENIDA;

    // Limpiar y cargar el nuevo flujo
    limpiarYCargarFlujoBienvenida();

    // Extender respuestas automáticas
    if (window.whatsappBot) {
      const originalProcessAction = window.whatsappBot.processAction;
      window.whatsappBot.processAction = function (action) {
        if (RESPUESTAS_BIENVENIDA[action]) {
          const typingIndicator = this.addTypingIndicator();
          setTimeout(() => {
            this.removeTypingIndicator(typingIndicator);
            this.addMessage(RESPUESTAS_BIENVENIDA[action], "received");

            // Después de respuestas automáticas, volver al flujo correspondiente
            if (action.includes("top_")) {
              if (
                action.includes("facturacion") ||
                action.includes("ver_factura") ||
                action.includes("estado_cuenta") ||
                action.includes("medios_pago") ||
                action.includes("reclamos")
              ) {
                setTimeout(() => this.executeFlow("top_facturacion"), 3000);
              } else if (
                action.includes("soporte") ||
                action.includes("falla") ||
                action.includes("configuracion") ||
                action.includes("mantenimiento") ||
                action.includes("critico")
              ) {
                setTimeout(() => this.executeFlow("top_soporte"), 3000);
              } else if (
                action.includes("servicios") ||
                action.includes("internet") ||
                action.includes("cloud") ||
                action.includes("conectividad") ||
                action.includes("gestionados")
              ) {
                setTimeout(() => this.executeFlow("top_servicios"), 3000);
              } else if (
                action.includes("comercial") ||
                action.includes("ampliar") ||
                action.includes("nuevos") ||
                action.includes("renovacion") ||
                action.includes("ejecutivo")
              ) {
                setTimeout(() => this.executeFlow("top_comercial"), 3000);
              }
            } else if (action.includes("premium_")) {
              if (
                action.includes("facturacion") ||
                action.includes("ver_factura") ||
                action.includes("estado_cuenta") ||
                action.includes("medios_pago") ||
                action.includes("consultas_fact")
              ) {
                setTimeout(() => this.executeFlow("premium_facturacion"), 3000);
              } else if (
                action.includes("soporte") ||
                action.includes("conexion") ||
                action.includes("config") ||
                action.includes("consultas_tec") ||
                action.includes("reportar_falla")
              ) {
                setTimeout(() => this.executeFlow("premium_soporte"), 3000);
              } else if (
                action.includes("servicios") ||
                action.includes("planes") ||
                action.includes("moviles") ||
                action.includes("digitales") ||
                action.includes("emprendedores")
              ) {
                setTimeout(() => this.executeFlow("premium_servicios"), 3000);
              } else if (
                action.includes("comercial") ||
                action.includes("contratar") ||
                action.includes("cambiar") ||
                action.includes("promociones") ||
                action.includes("asesoramiento")
              ) {
                setTimeout(() => this.executeFlow("premium_comercial"), 3000);
              }
            }
          }, 1500);
        } else {
          originalProcessAction.call(this, action);
        }
      };
    }

    console.log("🎯 Bot configurado con flujo NUEVO BOT 2025 completo");
  }, 1500);
});

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================
window.reiniciarFlujoBienvenida = function () {
  if (window.whatsappBot) {
    window.whatsappBot.executeFlow("welcome");
  }
};

window.testearFlujo = function (nombreFlujo) {
  if (FLUJO_BIENVENIDA_MIRO[nombreFlujo]) {
    window.testFlow(nombreFlujo);
  } else {
    console.log("❌ Flujo no encontrado:", nombreFlujo);
    console.log("📋 Flujos disponibles:", Object.keys(FLUJO_BIENVENIDA_MIRO));
  }
};

// Funciones específicas para testing
window.testTOP = function () {
  if (window.whatsappBot) {
    window.whatsappBot.executeFlow("top_empresas");
  }
};

window.testPremium = function () {
  if (window.whatsappBot) {
    window.whatsappBot.executeFlow("premium_emprendedores");
  }
};

// Export para uso modular
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    FLUJO_BIENVENIDA_MIRO,
    RESPUESTAS_BIENVENIDA,
    limpiarYCargarFlujoBienvenida,
  };
}
