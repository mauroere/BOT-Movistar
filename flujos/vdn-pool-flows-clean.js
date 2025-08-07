  //=== FLUJOS VDN POOL NO Y HORARIO COMERCIAL ===//
  // VDN Pool NO - Flujo de validación y derivación
  factura_vdn_pool_no: {
    messages: [
      "🔍 **Validación VDN Pool**\n\nEl sistema está verificando el estado del VDN Pool..."
    ],
    options: [
      { text: "Dentro de horario comercial", action: "factura_dentro_horario_comercial" },
      { text: "Fuera de horario comercial", action: "factura_fuera_horario_comercial" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Dentro de horario comercial - NO
  factura_dentro_horario_comercial: {
    messages: [
      "🕒 **Horario Comercial Activo**\n\nEstás dentro del horario comercial pero el VDN Pool no está disponible.\n\n¿Cómo querés continuar?"
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
      "🌙 **Fuera de Horario Comercial**\n\n📅 **Horarios de atención:**\n• Lunes a Viernes: 8:00 a 20:00\n• Sábados: 9:00 a 17:00\n• Domingos: Cerrado\n\n¿Qué querés hacer?"
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
      "👨‍💼 **Conectando con Asesor Comercial**\n\n🔄 Te estoy derivando con un asesor especializado en facturación empresarial.\n\n⏱️ Tiempo estimado de espera: 3-5 minutos\n\n📞 También podés llamar directamente al:\n• **611** desde tu Movistar\n• **0800-555-611** desde cualquier teléfono"
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
      "📞 **Callback Programado**\n\n¿Cuándo querés que te llamemos?\n\n📅 **Horarios disponibles hoy:**\n• En 15 minutos\n• En 30 minutos\n• En 1 hora\n• En 2 horas"
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
      "📞 **Callback para Mañana**\n\n📅 **Horarios disponibles mañana:**\n• 9:00 AM\n• 11:00 AM\n• 2:00 PM\n• 4:00 PM\n• 6:00 PM"
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
      "📝 **Dejar Mensaje**\n\n¿Qué tipo de consulta querés dejar registrada?\n\n📋 **Opciones disponibles:**\n• Consulta de facturación\n• Problema con pagos\n• Reclamo técnico\n• Consulta general"
    ],
    options: [
      { text: "Consulta de facturación", action: "factura_mensaje_registrado" },
      { text: "Problema con pagos", action: "factura_mensaje_registrado" },
      { text: "Reclamo técnico", action: "factura_mensaje_registrado" },
      { text: "Consulta general", action: "factura_mensaje_registrado" },
      { text: "Volver", action: "factura_fuera_horario_comercial" },
    ],
  },

  // Callback confirmado
  factura_callback_confirmado: {
    messages: [
      "✅ **Callback Confirmado**\n\n📞 **Te vamos a llamar en el horario acordado**\n\n📱 Asegurate de tener tu teléfono disponible\n👨‍💼 Un asesor especializado se va a comunicar con vos\n📋 Vas a recibir un SMS de confirmación\n\n🔔 **Recordatorio:** Te llegará una notificación 5 minutos antes"
    ],
    options: [
      { text: "Entendido", action: "factura_callback_final" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Mensaje registrado
  factura_mensaje_registrado: {
    messages: [
      "📝 **Mensaje Registrado**\n\n✅ **Tu consulta fue registrada exitosamente**\n\n📋 **Número de caso:** #FAC-2025-0001\n📅 **Fecha:** 5 de agosto de 2025\n⏱️ **Respuesta estimada:** 24-48 horas\n\n📧 **Vas a recibir actualizaciones por:**\n• SMS al número de esta línea\n• Email (si está configurado)"
    ],
    options: [
      { text: "Entendido", action: "factura_mensaje_final" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // Callback final
  factura_callback_final: {
    messages: [
      "🎯 **Todo Listo**\n\n¡Que tengas buen día! Un asesor se va a comunicar con vos en el horario acordado.\n\n💡 **Tip:** Mantené cerca los datos de tu cuenta para agilizar la consulta."
    ],
    options: [
      { text: "Menú principal", action: "menu_principal" },
    ],
  },
