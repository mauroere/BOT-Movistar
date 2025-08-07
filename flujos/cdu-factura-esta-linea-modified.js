// CDU: Factura de esta lÃ­nea (VersiÃ³n completa paso a paso)
// Flujo B2B: PASO 1 â†’ PASO 2 â†’ PASO 3 â†’ PASO 4 â†’ PASO 5 â†’ OPCIONES FACTURACIÃ“N
// Flujo B2C/No cliente: DivisiÃ³n automÃ¡tica por ANI â†’ SegmentaciÃ³n por Premium/TOP â†’ DerivaciÃ³n segÃºn DNI

const cduFacturaEstaLinea = {
  // ðŸŸ¨ PASO 1 â€” Â¿El ANI de origen pertenece a B2B?
  menu_factura_esta_linea: {
    messages: [
      "ðŸ“„ **Factura de esta lÃ­nea**\n\nÂ¿El ANI de origen pertenece a B2B (cliente empresa)?",
    ],
    options: [
      { text: "Es empresa", action: "factura_paso2_linea_activa" },
      { text: "No es B2B", action: "factura_error_no_empresa" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // âŒ NO â†’ Sistema divide automÃ¡ticamente en B2C / No cliente
  factura_error_no_empresa: {
    messages: [
      "ðŸ” **Analizando ANI de origen...**\n\nEl sistema estÃ¡ identificando automÃ¡ticamente tu tipo de lÃ­nea..."
    ],
    options: [
      { text: "B2C - Premium y Emprendedores", action: "factura_b2c_premium_emprendedores" },
      { text: "B2C - TOP EMP", action: "factura_b2c_top_emp" },
      { text: "No cliente - Premium y Emprendedores", action: "factura_no_cliente_premium_emprendedores" },
      { text: "No cliente - TOP EMP", action: "factura_no_cliente_top_emp" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ”¹ FLUJO B2C - PREMIUM Y EMPRENDEDORES
  factura_b2c_premium_emprendedores: {
    messages: [
      "Veo que la lÃ­nea desde la que me escribÃ­s estÃ¡ registrada con DNI ðŸ˜¬\n\nSi necesitÃ¡s tu factura, hay una atenciÃ³n exclusiva para vos en esta cuenta de WhatsApp ðŸ‘‰ http://mov.is/s3SF\n\nÂ¿QuerÃ©s consultar por otra lÃ­nea Movistar Empresas de tu CUIT?"
    ],
    options: [
      { text: "Consultar otra lÃ­nea", action: "factura_consultar_otra_linea_cuit" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ”¹ FLUJO B2C - TOP EMP  
  factura_b2c_top_emp: {
    messages: [
      "Veo que la lÃ­nea desde la que me escribÃ­s estÃ¡ registrada con DNI ðŸ˜¬\n\nSi necesitÃ¡s tu factura, hay una atenciÃ³n exclusiva para vos en esta cuenta de WhatsApp ðŸ‘‰ http://mov.is/s3SF\n\nÂ¿Te puedo ayudar con algo mÃ¡s?"
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ”¹ FLUJO NO CLIENTE - PREMIUM Y EMPRENDEDORES
  factura_no_cliente_premium_emprendedores: {
    messages: [
      "Veo que la lÃ­nea desde la que me escribÃ­s estÃ¡ registrada con DNI ðŸ˜¬\n\nÂ¿QuerÃ©s consultar por otra lÃ­nea Movistar Empresas de tu CUIT?"
    ],
    options: [
      { text: "Consultar otra lÃ­nea", action: "factura_consultar_otra_linea_cuit" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ”¹ FLUJO NO CLIENTE - TOP EMP
  factura_no_cliente_top_emp: {
    messages: [
      "Veo que la lÃ­nea desde la que me escribÃ­s pertenece a otra empresa ðŸ˜¬"
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // CONSULTAR OTRA LÃNEA DEL CUIT
  factura_consultar_otra_linea_cuit: {
    messages: [
      "ðŸ“‹ **Consultar Otra LÃ­nea del CUIT**\n\nðŸ” Para consultar otra lÃ­nea de tu CUIT necesitÃ¡s proporcionar:\n\nâ€¢ NÃºmero de lÃ­nea a consultar\nâ€¢ ValidaciÃ³n de permisos\nâ€¢ AutorizaciÃ³n del titular\n\nÂ¿CÃ³mo querÃ©s continuar?"
    ],
    options: [
      { text: "Contactar con asesor", action: "factura_contactar_asesor" },
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // CONTACTAR CON ASESOR
  factura_contactar_asesor: {
    messages: [
      "ðŸ“ž **Contactar con Asesor**\n\nðŸ”„ Te estoy conectando con un asesor especializado para ayudarte con la consulta de otra lÃ­nea.\n\nðŸ“± TambiÃ©n podÃ©s llamar al:\nâ€¢ **611** desde tu Movistar\nâ€¢ **0800-555-611** desde cualquier telÃ©fono"
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // USAR MI MOVISTAR
  factura_usar_mi_movistar: {
    messages: [
      "ðŸ“± **Mi Movistar**\n\nPodÃ©s gestionar todas las lÃ­neas de tu CUIT desde:\n\nðŸŒ **Web:** https://on.movistar.com.ar/autogestion\nðŸ“± **App:** DescargÃ¡ Mi Movistar desde tu tienda de apps\n\nðŸ’¡ **Tip:** IniciÃ¡ sesiÃ³n con el CUIT para ver todas las lÃ­neas asociadas."
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ§­ PASO 2 â€” Â¿La lÃ­nea estÃ¡ activa?
  factura_paso2_linea_activa: {
    messages: ["ðŸ” **VerificaciÃ³n de Estado**\n\nÂ¿La lÃ­nea estÃ¡ activa?"],
    options: [
      { text: "LÃ­nea activa", action: "factura_paso3_fija_movil" },
      { text: "LÃ­nea inactiva", action: "factura_error_linea_inactiva" },
      { text: "Volver", action: "menu_factura_esta_linea" },
    ],
  },

  // âŒ NO â†’ LÃ­nea no activa - Identificar tipo de suspensiÃ³n
  factura_error_linea_inactiva: {
    messages: [
      "ðŸ” **Analizando estado de la lÃ­nea...**\n\nEl sistema estÃ¡ identificando el tipo de suspensiÃ³n y segmento..."
    ],
    options: [
      { text: "SuspensiÃ³n Total (deuda) - Premium y Emprendedores", action: "suspension_total_premium_emprendedores" },
      { text: "SuspensiÃ³n Total (deuda) - TOP EMP", action: "suspension_total_top_emp" },
      { text: "SuspensiÃ³n Otra (robo, fraude, etc) - Premium y Emprendedores", action: "suspension_otra_premium_emprendedores" },
      { text: "SuspensiÃ³n Otra (robo, fraude, etc) - TOP EMP", action: "suspension_otra_top_emp" },
      { text: "Volver", action: "factura_paso2_linea_activa" },
    ],
  },

  // ðŸŸ¡ SUSPENSIÃ“N TOTAL (DEUDA) - PREMIUM Y EMPRENDEDORES
  suspension_total_premium_emprendedores: {
    messages: [
      "Veo que **tu lÃ­nea estÃ¡ suspendida** porque tenÃ©s una deuda pendiente. ðŸ˜”\n\nSi no abonÃ¡s en los prÃ³ximos dÃ­as, se darÃ¡ de baja.\n\nÂ¿CÃ³mo te puedo ayudar?"
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      { text: "Consultar otra lÃ­nea", action: "factura_consultar_otra_linea_cuit" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸŸ¡ SUSPENSIÃ“N TOTAL (DEUDA) - TOP EMP
  suspension_total_top_emp: {
    messages: [
      "Veo que **tu lÃ­nea estÃ¡ suspendida** porque tenÃ©s una deuda pendiente. ðŸ˜”\n\nContactate con la persona titular y apoderada de tu empresa para rehabilitarla."
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      { text: "Consultar otra lÃ­nea", action: "factura_consultar_otra_linea_cuit" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸŸ  SUSPENSIÃ“N OTRA (ROBO, FRAUDE, ETC) - PREMIUM Y EMPRENDEDORES
  suspension_otra_premium_emprendedores: {
    messages: [
      "Veo que **tu lÃ­nea estÃ¡ suspendida**. ðŸ˜”\n\nContactate con atenciÃ³n comercial si querÃ©s rehabilitarla.\n\nÂ¿CÃ³mo te puedo ayudar?"
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      { text: "Consultar otra lÃ­nea", action: "factura_consultar_otra_linea_cuit" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸŸ  SUSPENSIÃ“N OTRA (ROBO, FRAUDE, ETC) - TOP EMP
  suspension_otra_top_emp: {
    messages: [
      "Veo que **tu lÃ­nea estÃ¡ suspendida**. ðŸ˜”\n\nContactate con la persona titular y apoderada de tu empresa para rehabilitarla."
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_contactar_asesor" },
      { text: "Consultar otra lÃ­nea", action: "factura_consultar_otra_linea_cuit" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ§­ PASO 3 â€” Â¿La lÃ­nea es fija o mÃ³vil?
  factura_paso3_fija_movil: {
    messages: ["ðŸ“± **Tipo de LÃ­nea**\n\nÂ¿La lÃ­nea es fija o mÃ³vil?"],
    options: [
      { text: "MÃ³vil", action: "factura_paso4_cuit_dni" },
      { text: "Fija", action: "factura_linea_fija_opciones" },
      { text: "Volver", action: "factura_paso2_linea_activa" },
    ],
  },

  // ðŸ“¦ ALTERNATIVA â€” LÃNEA FIJA
  factura_linea_fija_opciones: {
    messages: [
      "ðŸ“ž **LÃ­nea Fija - Opciones de Consulta**\n\nElegÃ­ el tipo de consulta que necesitÃ¡s:",
    ],
    options: [
      { text: "Consulta Ãºltima factura", action: "factura_fija_ultima_factura" },
      { text: "Consulta facturas anteriores", action: "factura_fija_facturas_anteriores" },
      { text: "Reclamo tÃ©cnico-facturaciÃ³n", action: "factura_fija_reclamo_tecnico" },
      { text: "Volver", action: "factura_paso3_fija_movil" },
    ],
  },

  // ðŸ§­ PASO 4 â€” Â¿La lÃ­nea es bajo CUIT o DNI? (solo para mÃ³vil)
  factura_paso4_cuit_dni: {
    messages: ["ðŸ¢ **Tipo de Cuenta**\n\nÂ¿La lÃ­nea es bajo CUIT o DNI?"],
    options: [
      { text: "CUIT - Empresa", action: "factura_paso5_titular_usuario" },
      { text: "DNI - B2C", action: "factura_error_solo_cuit" },
      { text: "Volver", action: "factura_paso3_fija_movil" },
    ],
  },

  // ðŸ”˜ DNI â†’ Solo CUIT permitido
  factura_error_solo_cuit: {
    messages: [
      "âŒ **Solo LÃ­neas bajo CUIT**\n\nEste canal solo permite consultas de facturaciÃ³n para lÃ­neas bajo CUIT.\n\nSi la lÃ­nea es B2C (DNI), usÃ¡ este canal: [https://mov.is/s3SF]",
    ],
    options: [{ text: "MenÃº principal", action: "menu_principal" }],
  },

  // ðŸ§­ PASO 5 â€” Â¿QuiÃ©n estÃ¡ escribiendo?
  factura_paso5_titular_usuario: {
    messages: ["ðŸ‘¥ **IdentificaciÃ³n**\n\nÂ¿QuiÃ©n estÃ¡ escribiendo?"],
    options: [
      { text: "TITULAR", action: "factura_opciones_completas" },
      { text: "USUARIO", action: "factura_validar_acceso_usuario" },
      { text: "Volver", action: "factura_paso4_cuit_dni" },
    ],
  },

  // Validar acceso para USUARIO
  factura_validar_acceso_usuario: {
    messages: [
      "ðŸ” **ValidaciÃ³n de Acceso**\n\nÂ¿La lÃ­nea tiene acceso a la facturaciÃ³n?",
    ],
    options: [
      { text: "Con acceso", action: "factura_opciones_completas" },
      { text: "Sin acceso", action: "factura_error_sin_acceso" },
      { text: "Volver", action: "factura_paso5_titular_usuario" },
    ],
  },

  // âŒ Usuario sin acceso
  factura_error_sin_acceso: {
    messages: [
      "âŒ **Sin Acceso a Facturas**\n\nTu lÃ­nea no estÃ¡ habilitada para ver facturas.\n\nPor favor, contactÃ¡ al apoderado o titular de tu empresa.",
    ],
    options: [{ text: "MenÃº principal", action: "menu_principal" }],
  },

  // âœ… OPCIONES DE FACTURACIÃ“N (para Titular o Usuario con acceso)
  factura_opciones_completas: {
    messages: [
      "ï¿½ **Analizando segmento y tipo de cliente...**\n\nEl sistema estÃ¡ identificando automÃ¡ticamente tu perfil..."
    ],
    options: [
      { text: "VDN Pool NO", action: "factura_vdn_pool_no" },
      { text: "Otras opciones", action: "factura_opciones_genericas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ”µ PREMIUM Y EMPRENDEDORES - CLIENTE MÃ“VIL
  premium_emprendedores_cliente_movil: {
    messages: [
      "La Ãºltima factura de esta cuenta es de $12,450.00, con vencimiento el 25 de julio de 2025.\n\nPodÃ©s pagarla con tarjeta de crÃ©dito o dÃ©bito desde la web de Movistar. ðŸ’³ http://movi.is/HXEn\n\nTe comparto el PDF para que conozcas el detalle. Puede demorar unos segundos â³\n\n(entrega PDF)"
    ],
    options: [
      { text: "Ver opciones", action: "premium_emprendedores_ver_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ”„ VER OPCIONES - DivisiÃ³n TITULAR/USUARIO
  premium_emprendedores_ver_opciones: {
    messages: [
      "ï¿½ **ValidaciÃ³n de Perfil**\n\nÂ¿QuiÃ©n estÃ¡ escribiendo?"
    ],
    options: [
      { text: "TITULAR", action: "premium_emprendedores_titular_opciones" },
      { text: "USUARIO", action: "premium_emprendedores_usuario_opciones" },
      { text: "Volver", action: "premium_emprendedores_cliente_movil" },
    ],
  },

  // ðŸ‘¤ TITULAR - Opciones completas
  premium_emprendedores_titular_opciones: {
    messages: [
      "ðŸ“‹ **Opciones para Titular**\n\nElegÃ­ una opciÃ³n:"
    ],
    options: [
      { text: "Eso es todo, gracias", action: "premium_titular_fin" },
      { text: "Facturas Anteriores", action: "premium_titular_facturas_anteriores" },
      { text: "Factura de otra lÃ­nea", action: "premium_titular_otra_linea" },
      { text: "Medios de pago", action: "premium_titular_medios_pago" },
      { text: "Facturas digital", action: "premium_titular_facturas_digital" },
      { text: "Reclamo de FacturaciÃ³n", action: "premium_titular_reclamo" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ‘¥ USUARIO - Opciones limitadas
  premium_emprendedores_usuario_opciones: {
    messages: [
      "ðŸ“‹ **Opciones para Usuario**\n\nElegÃ­ una opciÃ³n:"
    ],
    options: [
      { text: "Eso es todo, gracias", action: "premium_usuario_fin" },
      { text: "Facturas Anteriores", action: "premium_usuario_facturas_anteriores" },
      { text: "Factura de otra lÃ­nea", action: "premium_usuario_otra_linea" },
      { text: "Medios de pago", action: "premium_usuario_medios_pago" },
      { text: "Reclamo de FacturaciÃ³n", action: "premium_usuario_reclamo" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“‹ OPCIONES GENÃ‰RICAS (flujo anterior)
  factura_opciones_genericas: {
    messages: [
      "ðŸ“„ **Opciones de FacturaciÃ³n**\n\nDesde acÃ¡ podÃ©s descargar tus Ãºltimas 6 facturas, consultar sobre pagos, deudas o reclamar por alguna factura.\n\nElegÃ­ una opciÃ³n y te ayudo: ðŸ‘‡",
    ],
    options: [
      { text: "Ãšltima factura", action: "factura_seleccionar_linea_ultima" },
      { text: "Facturas anteriores", action: "factura_seleccionar_linea_anteriores" },
      { text: "Deuda", action: "factura_seleccionar_linea_deuda" },
      { text: "Pagos", action: "factura_seleccionar_linea_pagos" },
      { text: "Reclamo de facturaciÃ³n", action: "factura_seleccionar_linea_reclamo" },
      { text: "Nuevas tarifas", action: "factura_seleccionar_linea_tarifas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== ESTADOS FINALES PARA TITULAR ===//

  // âœ… TITULAR - Eso es todo, gracias
  premium_titular_fin: {
    messages: [
      "âœ… **Â¡Perfecto!**\n\nÂ¡Que tengas buen dÃ­a! ðŸ˜Š"
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“‚ TITULAR - Facturas Anteriores
  premium_titular_facturas_anteriores: {
    messages: [
      "ðŸ“‚ **Facturas Anteriores**\n\nðŸ“… **Ãšltimos 6 meses:**\nâ€¢ Junio 2025 - $11,890.00 âœ… Pagada\nâ€¢ Mayo 2025 - $12,100.00 âœ… Pagada\nâ€¢ Abril 2025 - $11,750.00 âœ… Pagada\nâ€¢ Marzo 2025 - $12,300.00 âœ… Pagada\nâ€¢ Febrero 2025 - $11,950.00 âœ… Pagada\nâ€¢ Enero 2025 - $12,200.00 âœ… Pagada"
    ],
    options: [
      { text: "Descargar todas", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“± TITULAR - Factura de otra lÃ­nea
  premium_titular_otra_linea: {
    messages: [
      "ðŸ“± **Factura de Otra LÃ­nea**\n\nðŸ” Para consultar otra lÃ­nea de tu CUIT necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos"
    ],
    options: [
      { text: "Contactar soporte", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ’³ TITULAR - Medios de pago
  premium_titular_medios_pago: {
    messages: [
      "ðŸ’³ **Medios de Pago**\n\nðŸ’° **Formas de pago disponibles:**\nâ€¢ DÃ©bito automÃ¡tico\nâ€¢ Transferencia bancaria\nâ€¢ Tarjeta de crÃ©dito/dÃ©bito\nâ€¢ Pago FÃ¡cil\nâ€¢ RapiPago"
    ],
    options: [
      { text: "Configurar dÃ©bito automÃ¡tico", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“§ TITULAR - Facturas digital
  premium_titular_facturas_digital: {
    messages: [
      "ðŸ“§ **Facturas Digital**\n\nðŸ“¬ **ConfiguraciÃ³n actual:**\nâ€¢ EnvÃ­o por email: Activado\nâ€¢ DirecciÃ³n: empresa@ejemplo.com\nâ€¢ Formato: PDF\n\nðŸŒ± ContribuÃ­s al cuidado del medio ambiente"
    ],
    options: [
      { text: "Cambiar configuraciÃ³n", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“£ TITULAR - Reclamo de FacturaciÃ³n
  premium_titular_reclamo: {
    messages: [
      "ðŸ“£ **Reclamo de FacturaciÃ³n**\n\nðŸ“ **Tipos de reclamo:**\nâ€¢ Cobro indebido\nâ€¢ Error en consumos\nâ€¢ Problema con fechas\nâ€¢ MÃ©todo de pago"
    ],
    options: [
      { text: "Iniciar reclamo", action: "premium_titular_fin" },
      { text: "Volver", action: "premium_emprendedores_titular_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== ESTADOS FINALES PARA USUARIO ===//

  // âœ… USUARIO - Eso es todo, gracias
  premium_usuario_fin: {
    messages: [
      "âœ… **Â¡Perfecto!**\n\nÂ¡Que tengas buen dÃ­a! ðŸ˜Š"
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“‚ USUARIO - Facturas Anteriores
  premium_usuario_facturas_anteriores: {
    messages: [
      "ðŸ“‚ **Facturas Anteriores**\n\nðŸ“… **Ãšltimos 6 meses:**\nâ€¢ Junio 2025 - $11,890.00 âœ… Pagada\nâ€¢ Mayo 2025 - $12,100.00 âœ… Pagada\nâ€¢ Abril 2025 - $11,750.00 âœ… Pagada\nâ€¢ Marzo 2025 - $12,300.00 âœ… Pagada\nâ€¢ Febrero 2025 - $11,950.00 âœ… Pagada\nâ€¢ Enero 2025 - $12,200.00 âœ… Pagada"
    ],
    options: [
      { text: "Descargar todas", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“± USUARIO - Factura de otra lÃ­nea
  premium_usuario_otra_linea: {
    messages: [
      "ðŸ“± **Factura de Otra LÃ­nea**\n\nðŸ” Para consultar otra lÃ­nea de tu CUIT necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos"
    ],
    options: [
      { text: "Contactar soporte", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ’³ USUARIO - Medios de pago
  premium_usuario_medios_pago: {
    messages: [
      "ðŸ’³ **Medios de Pago**\n\nðŸ’° **Formas de pago disponibles:**\nâ€¢ DÃ©bito automÃ¡tico\nâ€¢ Transferencia bancaria\nâ€¢ Tarjeta de crÃ©dito/dÃ©bito\nâ€¢ Pago FÃ¡cil\nâ€¢ RapiPago"
    ],
    options: [
      { text: "Ver informaciÃ³n", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // ðŸ“£ USUARIO - Reclamo de FacturaciÃ³n
  premium_usuario_reclamo: {
    messages: [
      "ðŸ“£ **Reclamo de FacturaciÃ³n**\n\nðŸ“ **Tipos de reclamo:**\nâ€¢ Cobro indebido\nâ€¢ Error en consumos\nâ€¢ Problema con fechas\nâ€¢ MÃ©todo de pago"
    ],
    options: [
      { text: "Iniciar reclamo", action: "premium_usuario_fin" },
      { text: "Volver", action: "premium_emprendedores_usuario_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== SELECCIÃ“N DE LÃNEA PARA CADA OPCIÃ“N ===//

  // Ãšltima factura - SelecciÃ³n de lÃ­nea
  factura_seleccionar_linea_ultima: {
    messages: [
      "ðŸ“„ **Ãšltima Factura**\n\nÂ¿Sobre quÃ© lÃ­nea del CUIT querÃ©s consultar?",
    ],
    options: [
      { text: "Esta lÃ­nea", action: "factura_ultima_esta_linea" },
      { text: "Otra lÃ­nea del CUIT", action: "factura_ultima_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Facturas anteriores - SelecciÃ³n de lÃ­nea
  factura_seleccionar_linea_anteriores: {
    messages: [
      "ðŸ“‚ **Facturas Anteriores**\n\nÂ¿Sobre quÃ© lÃ­nea del CUIT querÃ©s consultar?",
    ],
    options: [
      { text: "Esta lÃ­nea", action: "factura_anteriores_esta_linea" },
      { text: "Otra lÃ­nea del CUIT", action: "factura_anteriores_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Deuda - SelecciÃ³n de lÃ­nea
  factura_seleccionar_linea_deuda: {
    messages: [
      "ðŸ’° **Consulta de Deuda**\n\nÂ¿Sobre quÃ© lÃ­nea del CUIT querÃ©s consultar?",
    ],
    options: [
      { text: "Esta lÃ­nea", action: "factura_deuda_esta_linea" },
      { text: "Otra lÃ­nea del CUIT", action: "factura_deuda_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Pagos - SelecciÃ³n de lÃ­nea
  factura_seleccionar_linea_pagos: {
    messages: [
      "ðŸ’³ **Consulta de Pagos**\n\nÂ¿Sobre quÃ© lÃ­nea del CUIT querÃ©s consultar?",
    ],
    options: [
      { text: "Esta lÃ­nea", action: "factura_pagos_esta_linea" },
      { text: "Otra lÃ­nea del CUIT", action: "factura_pagos_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Reclamo - SelecciÃ³n de lÃ­nea
  factura_seleccionar_linea_reclamo: {
    messages: [
      "ðŸ“£ **Reclamo de FacturaciÃ³n**\n\nÂ¿Sobre quÃ© lÃ­nea del CUIT querÃ©s consultar?",
    ],
    options: [
      { text: "Esta lÃ­nea", action: "factura_reclamo_esta_linea" },
      { text: "Otra lÃ­nea del CUIT", action: "factura_reclamo_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Tarifas - SelecciÃ³n de lÃ­nea
  factura_seleccionar_linea_tarifas: {
    messages: [
      "ðŸ“ˆ **Nuevas Tarifas**\n\nÂ¿Sobre quÃ© lÃ­nea del CUIT querÃ©s consultar?",
    ],
    options: [
      { text: "Esta lÃ­nea", action: "factura_tarifas_esta_linea" },
      { text: "Otra lÃ­nea del CUIT", action: "factura_tarifas_otra_linea" },
      { text: "Volver", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== OPCIONES PARA LÃNEA FIJA ===//

  factura_fija_ultima_factura: {
    messages: [
      "ðŸ“„ **Ãšltima Factura - LÃ­nea Fija**\n\nðŸ“‹ **Factura del perÃ­odo actual:**\nâ€¢ Fecha de emisiÃ³n: 15/07/2025\nâ€¢ Fecha de vencimiento: 25/07/2025\nâ€¢ Importe: $8,750.00\nâ€¢ Estado: Pendiente\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Descargar PDF", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_linea_fija_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_fija_facturas_anteriores: {
    messages: [
      "ðŸ“‚ **Facturas Anteriores - LÃ­nea Fija**\n\nðŸ“… **Ãšltimos 6 meses:**\nâ€¢ Junio 2025 - $8,200.00 âœ… Pagada\nâ€¢ Mayo 2025 - $8,450.00 âœ… Pagada\nâ€¢ Abril 2025 - $8,100.00 âœ… Pagada\nâ€¢ Marzo 2025 - $8,300.00 âœ… Pagada\nâ€¢ Febrero 2025 - $8,150.00 âœ… Pagada\nâ€¢ Enero 2025 - $8,400.00 âœ… Pagada\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Descargar todas", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_linea_fija_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_fija_reclamo_tecnico: {
    messages: [
      "âš ï¸ **Reclamo TÃ©cnico-FacturaciÃ³n**\n\nÂ¿QuerÃ©s hacer un reclamo tÃ©cnico o consultar una factura?",
    ],
    options: [
      { text: "Reclamo tÃ©cnico", action: "derivar_reclamo_tecnico" },
      { text: "Factura", action: "factura_linea_fija_opciones" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== FUNCIONES FINALES PARA "ESTA LÃNEA" ===//

  factura_ultima_esta_linea: {
    messages: [
      "ðŸ“„ **Ãšltima Factura - Esta LÃ­nea**\n\nðŸ“‹ **Factura del perÃ­odo actual:**\nâ€¢ Fecha de emisiÃ³n: 15/07/2025\nâ€¢ Fecha de vencimiento: 25/07/2025\nâ€¢ Importe: $12,450.00\nâ€¢ Estado: Pendiente\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Descargar PDF", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_anteriores_esta_linea: {
    messages: [
      "ðŸ“‚ **Facturas Anteriores - Esta LÃ­nea**\n\nðŸ“… **Ãšltimos 6 meses:**\nâ€¢ Junio 2025 - $11,890.00 âœ… Pagada\nâ€¢ Mayo 2025 - $12,100.00 âœ… Pagada\nâ€¢ Abril 2025 - $11,750.00 âœ… Pagada\nâ€¢ Marzo 2025 - $12,300.00 âœ… Pagada\nâ€¢ Febrero 2025 - $11,950.00 âœ… Pagada\nâ€¢ Enero 2025 - $12,200.00 âœ… Pagada\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Descargar todas", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_deuda_esta_linea: {
    messages: [
      "ðŸ’° **Deuda - Esta LÃ­nea**\n\nðŸ’° **Estado actual:**\nðŸ”´ **Deuda pendiente:**\nâ€¢ Factura Julio 2025: $12,450.00\nâ€¢ Vencimiento: 25/07/2025\n\nðŸ“Š **Total a pagar: $12,450.00**\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Pagar ahora", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_pagos_esta_linea: {
    messages: [
      "ðŸ’³ **Pagos - Esta LÃ­nea**\n\nâœ… **Ãšltimos pagos:**\nâ€¢ 15/06/2025 - $11,890.00 - DÃ©bito automÃ¡tico\nâ€¢ 14/05/2025 - $12,100.00 - Transferencia\nâ€¢ 13/04/2025 - $11,750.00 - DÃ©bito automÃ¡tico\nâ€¢ 15/03/2025 - $12,300.00 - Pago FÃ¡cil\nâ€¢ 14/02/2025 - $11,950.00 - DÃ©bito automÃ¡tico\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Descargar comprobantes", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_reclamo_esta_linea: {
    messages: [
      "ðŸ“£ **Reclamo de FacturaciÃ³n - Esta LÃ­nea**\n\nðŸ“ **Tipos de reclamo:**\nâ€¢ Cobro indebido\nâ€¢ Error en consumos\nâ€¢ Problema con fechas\nâ€¢ MÃ©todo de pago\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Iniciar reclamo", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_tarifas_esta_linea: {
    messages: [
      "ðŸ“ˆ **Nuevas Tarifas - Esta LÃ­nea**\n\nðŸ“‹ **Plan actual:** Premium 15GB\nðŸ’° **Costo mensual:** $12,450.00\nðŸ“… **Ãšltima actualizaciÃ³n:** Julio 2025\n\nðŸ“Š **Promociones disponibles**\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Ver promociones", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== FUNCIONES PARA "OTRA LÃNEA DEL CUIT" ===//

  factura_ultima_otra_linea: {
    messages: [
      "ðŸ“„ **Ãšltima Factura - Otra LÃ­nea del CUIT**\n\nðŸ” Para consultar otra lÃ­nea necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_anteriores_otra_linea: {
    messages: [
      "ðŸ“‚ **Facturas Anteriores - Otra LÃ­nea del CUIT**\n\nðŸ” Para consultar otra lÃ­nea necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_deuda_otra_linea: {
    messages: [
      "ðŸ’° **Deuda - Otra LÃ­nea del CUIT**\n\nðŸ” Para consultar otra lÃ­nea necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_pagos_otra_linea: {
    messages: [
      "ðŸ’³ **Pagos - Otra LÃ­nea del CUIT**\n\nðŸ” Para consultar otra lÃ­nea necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_reclamo_otra_linea: {
    messages: [
      "ðŸ“£ **Reclamo - Otra LÃ­nea del CUIT**\n\nðŸ” Para hacer un reclamo sobre otra lÃ­nea necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  factura_tarifas_otra_linea: {
    messages: [
      "ðŸ“ˆ **Tarifas - Otra LÃ­nea del CUIT**\n\nðŸ” Para consultar tarifas de otra lÃ­nea necesitÃ¡s proporcionar:\nâ€¢ NÃºmero de lÃ­nea\nâ€¢ AutorizaciÃ³n del titular\nâ€¢ ValidaciÃ³n de permisos\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡",
    ],
    options: [
      { text: "Contactar soporte", action: "factura_mensaje_final" },
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  //=== MENSAJES FINALES Y DERIVACIONES ===//

  // âœ… MENSAJE FINAL
  factura_mensaje_final: {
    messages: ["âœ… **Proceso Completado**\n\nÂ¿CÃ³mo seguimos? ðŸ‘‡"],
    options: [
      { text: "Ver opciones", action: "factura_opciones_completas" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // DerivaciÃ³n a reclamo tÃ©cnico
  derivar_reclamo_tecnico: {
    messages: [
      "ðŸ”§ **Derivando a Reclamo TÃ©cnico**\n\nTe estoy conectando con el Ã¡rea tÃ©cnica para resolver tu consulta.\n\nðŸ“ž TambiÃ©n podÃ©s llamar al 611 desde tu Movistar o al 0800-555-611.",
    ],
    options: [{ text: "MenÃº principal", action: "menu_principal" }],
  },

  //=== FLUJOS VDN POOL NO Y HORARIO COMERCIAL ===//

  // VDN Pool NO - Flujo de validaciÃ³n y derivaciÃ³n
  factura_vdn_pool_no: {
    messages: [
      "ðŸ” **ValidaciÃ³n VDN Pool**\n\nEl sistema estÃ¡ verificando el estado del VDN Pool..."
    ],
    options: [
      { text: "Dentro de horario comercial", action: "factura_dentro_horario_comercial" },
      { text: "Fuera de horario comercial", action: "factura_fuera_horario_comercial" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Dentro de horario comercial - NO
  factura_dentro_horario_comercial: {
    messages: [
      "ðŸ• **Horario Comercial Activo**\n\nEstÃ¡s dentro del horario comercial pero el VDN Pool no estÃ¡ disponible.\n\nÂ¿CÃ³mo querÃ©s continuar?"
    ],
    options: [
      { text: "Hablar con asesor", action: "factura_derivar_asesor_comercial" },
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Callback programado", action: "factura_callback_programado" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Fuera de horario comercial
  factura_fuera_horario_comercial: {
    messages: [
      "ðŸŒ™ **Fuera de Horario Comercial**\n\nðŸ“… **Horarios de atenciÃ³n:**\nâ€¢ Lunes a Viernes: 8:00 a 20:00\nâ€¢ SÃ¡bados: 9:00 a 17:00\nâ€¢ Domingos: Cerrado\n\nÂ¿QuÃ© querÃ©s hacer?"
    ],
    options: [
      { text: "Callback para maÃ±ana", action: "factura_callback_manana" },
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Dejar mensaje", action: "factura_dejar_mensaje" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Derivar a asesor comercial
  factura_derivar_asesor_comercial: {
    messages: [
      "ðŸ‘¨â€ðŸ’¼ **Conectando con Asesor Comercial**\n\nðŸ”„ Te estoy derivando con un asesor especializado en facturaciÃ³n empresarial.\n\nâ±ï¸ Tiempo estimado de espera: 3-5 minutos\n\nðŸ“ž TambiÃ©n podÃ©s llamar directamente al:\nâ€¢ **611** desde tu Movistar\nâ€¢ **0800-555-611** desde cualquier telÃ©fono"
    ],
    options: [
      { text: "Esperar en lÃ­nea", action: "factura_esperar_asesor" },
      { text: "Callback en 10 min", action: "factura_callback_10min" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Callback programado
  factura_callback_programado: {
    messages: [
      "ðŸ“ž **Callback Programado**\n\nÂ¿CuÃ¡ndo querÃ©s que te llamemos?\n\nðŸ“… **Horarios disponibles hoy:**\nâ€¢ En 15 minutos\nâ€¢ En 30 minutos\nâ€¢ En 1 hora\nâ€¢ En 2 horas"
    ],
    options: [
      { text: "En 15 minutos", action: "factura_callback_confirmado" },
      { text: "En 30 minutos", action: "factura_callback_confirmado" },
      { text: "En 1 hora", action: "factura_callback_confirmado" },
      { text: "En 2 horas", action: "factura_callback_confirmado" },
      { text: "Volver", action: "factura_dentro_horario_comercial" },
    ],
  },

  // Callback para maÃ±ana
  factura_callback_manana: {
    messages: [
      "ðŸ“ž **Callback para MaÃ±ana**\n\nðŸ“… **Horarios disponibles maÃ±ana:**\nâ€¢ 9:00 AM\nâ€¢ 11:00 AM\nâ€¢ 2:00 PM\nâ€¢ 4:00 PM\nâ€¢ 6:00 PM"
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
      "ðŸ“ **Dejar Mensaje**\n\nÂ¿QuÃ© tipo de consulta querÃ©s dejar registrada?\n\nðŸ“‹ **Opciones disponibles:**\nâ€¢ Consulta de facturaciÃ³n\nâ€¢ Problema con pagos\nâ€¢ Reclamo tÃ©cnico\nâ€¢ Consulta general"
    ],
    options: [
      { text: "Consulta de facturaciÃ³n", action: "factura_mensaje_registrado" },
      { text: "Problema con pagos", action: "factura_mensaje_registrado" },
      { text: "Reclamo tÃ©cnico", action: "factura_mensaje_registrado" },
      { text: "Consulta general", action: "factura_mensaje_registrado" },
      { text: "Volver", action: "factura_fuera_horario_comercial" },
    ],
  },

  // Esperar asesor
  factura_esperar_asesor: {
    messages: [
      "â³ **En Cola de Espera**\n\nðŸ”„ Te estamos conectando con el prÃ³ximo asesor disponible.\n\nðŸ“Š **Tu posiciÃ³n en cola:** 3\nâ±ï¸ **Tiempo estimado:** 2-4 minutos\n\nðŸ’¡ **Mientras esperÃ¡s, podÃ©s:**"
    ],
    options: [
      { text: "Usar Mi Movistar", action: "factura_usar_mi_movistar" },
      { text: "Ver Ãºltimas facturas", action: "factura_opciones_completas" },
      { text: "Cambiar a callback", action: "factura_callback_10min" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Callback en 10 minutos
  factura_callback_10min: {
    messages: [
      "ðŸ“ž **Callback Confirmado**\n\nâœ… **Te vamos a llamar en 10 minutos**\n\nðŸ“± **Al nÃºmero:** [nÃºmero de lÃ­nea actual]\nðŸ‘¨â€ðŸ’¼ **Asesor:** Especialista en facturaciÃ³n empresarial\nðŸ“‹ **Tema:** Consulta de facturaciÃ³n\n\nÂ¿EstÃ¡ todo correcto?"
    ],
    options: [
      { text: "Confirmar callback", action: "factura_callback_confirmado" },
      { text: "Cambiar horario", action: "factura_callback_programado" },
      { text: "Cancelar callback", action: "factura_derivar_asesor_comercial" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Callback confirmado
  factura_callback_confirmado: {
    messages: [
      "âœ… **Callback Confirmado**\n\nðŸ“ž **Te vamos a llamar en el horario acordado**\n\nðŸ“± Asegurate de tener tu telÃ©fono disponible\nðŸ‘¨â€ðŸ’¼ Un asesor especializado se va a comunicar con vos\nðŸ“‹ Vas a recibir un SMS de confirmaciÃ³n\n\nðŸ”” **Recordatorio:** Te llegarÃ¡ una notificaciÃ³n 5 minutos antes"
    ],
    options: [
      { text: "Entendido", action: "factura_callback_final" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Mensaje registrado
  factura_mensaje_registrado: {
    messages: [
      "ðŸ“ **Mensaje Registrado**\n\nâœ… **Tu consulta fue registrada exitosamente**\n\nðŸ“‹ **NÃºmero de caso:** #FAC-2025-0001\nðŸ“… **Fecha:** 5 de agosto de 2025\nâ±ï¸ **Respuesta estimada:** 24-48 horas\n\nðŸ“§ **Vas a recibir actualizaciones por:**\nâ€¢ SMS al nÃºmero de esta lÃ­nea\nâ€¢ Email (si estÃ¡ configurado)"
    ],
    options: [
      { text: "Entendido", action: "factura_mensaje_final" },
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },

  // Callback final 
  factura_callback_final: {
    messages: [
      "ðŸŽ¯ **Todo Listo**\n\nÂ¡Que tengas buen dÃ­a! Un asesor se va a comunicar con vos en el horario acordado.\n\nðŸ’¡ **Tip:** MantenÃ© cerca los datos de tu cuenta para agilizar la consulta."
    ],
    options: [
      { text: "MenÃº principal", action: "menu_principal" },
    ],
  },
};

module.exports = cduFacturaEstaLinea;
