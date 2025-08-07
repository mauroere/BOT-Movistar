// ========================================
// CDU: CONTRATAR SERVICIOS
// ========================================
// Flujo para contratación de servicios empresariales
// Requiere validación de habilitación y datos de instalación

const CDU_CONTRATAR_SERVICIOS = {
  // ========================================
  // MENÚ PRINCIPAL DE CONTRATACIÓN
  // ========================================
  menu_servicios: {
    messages: ["Contame, ¿qué tipo de servicio querés contratar? 😁"],
    options: [
      { text: "Alta de línea", action: "asignar_comercial" },
      { text: "Portabilidad", action: "asignar_comercial" },
      { text: "Cambio de Plan", action: "asignar_comercial" },
      { text: "Internet Movistar Fibra", action: "asignar_comercial" },
      { text: "Pack de Gigas", action: "asignar_comercial" },
      { text: "Movistar TV", action: "asignar_comercial" },
      { text: "Soluciones Digitales", action: "asignar_comercial" },
      { text: "Otros Productos", action: "asignar_comercial" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // ASIGNACIÓN COMERCIAL - SOLICITUD DE DIRECCIÓN
  // ========================================
  asignar_comercial: {
    messages: [
      "¡Excelente!",
      "Antes de transferirte con tu representante comercial, escribime el domicilio de instalación con calle, altura, localidad y provincia. 📍",
      "Por ejemplo: Lavalle 354, Lanús, Buenos Aires.",
    ],
    options: [
      { text: "📍 Ingresar dirección", action: "espera_direccion_cliente" },
      { text: "🔙 Volver", action: "menu_servicios" },
    ],
  },

  // ========================================
  // ESPERANDO DIRECCIÓN DEL CLIENTE
  // ========================================
  espera_direccion_cliente: {
    messages: [
      "👂 **Esperando tu dirección...**",
      "",
      "Por favor, escribí la dirección de instalación completa:",
      "• Calle y altura",
      "• Localidad",
      "• Provincia",
      "",
      "📝 Ejemplo: *Av. Corrientes 1234, CABA, Buenos Aires*",
    ],
    options: [
      { text: "✍️ Escribir dirección", action: "procesar_direccion" },
      { text: "🔙 Volver", action: "asignar_comercial" },
    ],
  },

  // ========================================
  // PROCESAMIENTO DE DIRECCIÓN
  // ========================================
  procesar_direccion: {
    messages: [
      "✅ **Dirección recibida**",
      "",
      "📋 **Datos para instalación:**",
      "• Dirección: [Dirección ingresada por cliente]",
      "• Fecha de solicitud: " + new Date().toLocaleDateString("es-ES"),
      "",
      "🔄 **Transfiriendo con representante comercial...**",
      "",
      "Un especialista comercial te contactará en las próximas 2 horas para:",
      "• Confirmar disponibilidad técnica",
      "• Coordinar fecha de instalación",
      "• Detalles del servicio contratado",
    ],
    options: [
      {
        text: "👤 Conectar con Comercial",
        action: "conectar_comercial_servicios",
      },
      { text: "📞 Solicitar llamada", action: "solicitar_llamada_comercial" },
    ],
  },

  // ========================================
  // LÍNEA NO HABILITADA (TOP EMPRESAS)
  // ========================================
  linea_no_habilitada: {
    messages: [
      "Esta línea no está habilitada para contratar servicios bajo CUIT.",
      "Por favor, contactate con la persona apoderada o titular de tu empresa ✌️",
      "¡Nos vemos!",
    ],
    options: [
      { text: "Contactar titular", action: "contactar_titular_empresa" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // CONEXIÓN CON COMERCIAL
  // ========================================
  conectar_comercial_servicios: {
    messages: [
      "🔄 **Conectando con representante comercial...**",
      "",
      "📋 **Resumen de tu solicitud:**",
      "• Servicio solicitado: Contratación",
      "• Dirección proporcionada: ✅",
      "• Prioridad: Alta",
      "",
      "⏱️ **Tiempo estimado de conexión: 2-3 minutos**",
      "",
      "Un especialista se comunicará contigo ahora para procesar tu solicitud.",
    ],
    options: [{ text: "✅ Esperando asesor", action: "en_espera_comercial" }],
  },

  // ========================================
  // SOLICITAR LLAMADA COMERCIAL
  // ========================================
  solicitar_llamada_comercial: {
    messages: [
      "📞 **Solicitud de Llamada Programada**",
      "",
      "🕒 **Horarios disponibles:**",
      "• Hoy: 14:00 - 18:00 hs",
      "• Mañana: 09:00 - 12:00 hs",
      "• Mañana: 14:00 - 18:00 hs",
      "",
      "Un representante comercial te llamará al número de esta línea.",
      "",
      "📋 **Datos confirmados:**",
      "• Dirección de instalación: ✅",
      "• Servicio de interés: ✅",
      "• Número de contacto: Esta línea",
    ],
    options: [
      { text: "📅 Programar para hoy", action: "programar_llamada_hoy" },
      { text: "📅 Programar para mañana", action: "programar_llamada_manana" },
      { text: "🔙 Volver", action: "procesar_direccion" },
    ],
  },

  // ========================================
  // EN ESPERA DEL COMERCIAL
  // ========================================
  en_espera_comercial: {
    messages: [
      "⏳ **En cola de atención comercial...**",
      "",
      "🎯 **Tu posición:** 2do en la cola",
      "⏱️ **Tiempo estimado:** 1-2 minutos",
      "",
      "📋 **Mientras esperás, recordá tener a mano:**",
      "• DNI del titular",
      "• Datos de la dirección de instalación",
      "• Información sobre el servicio deseado",
      "",
      "🔔 Un asesor se conectará automáticamente.",
    ],
    options: [
      { text: "⏸️ Cancelar espera", action: "cancelar_espera_comercial" },
    ],
  },

  // ========================================
  // PROGRAMACIÓN DE LLAMADAS
  // ========================================
  programar_llamada_hoy: {
    messages: [
      "✅ **Llamada programada para HOY**",
      "",
      "🕒 **Horario:** Entre las 14:00 y 18:00 hs",
      "📞 **Número:** Esta línea de WhatsApp",
      "👤 **Especialista:** Área Comercial",
      "",
      "📋 **Confirmación enviada por SMS**",
      "",
      "🔔 **Recordatorio:** Te enviaremos un mensaje 30 minutos antes de la llamada.",
      "",
      "¿Necesitás algo más mientras tanto?",
    ],
    options: [
      { text: "✅ Todo listo", action: "fin_proceso_comercial" },
      { text: "📝 Cambiar horario", action: "solicitar_llamada_comercial" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  programar_llamada_manana: {
    messages: [
      "✅ **Llamada programada para MAÑANA**",
      "",
      "📅 **Fecha:** " +
        new Date(Date.now() + 86400000).toLocaleDateString("es-ES"),
      "🕒 **Horario:** A confirmar (09:00-12:00 o 14:00-18:00)",
      "📞 **Número:** Esta línea de WhatsApp",
      "",
      "📋 **Confirmación enviada por SMS**",
      "",
      "🔔 **El asesor te consultará el horario específico al contactarte.**",
      "",
      "¿Necesitás algo más?",
    ],
    options: [
      { text: "✅ Todo listo", action: "fin_proceso_comercial" },
      { text: "📝 Cambiar fecha", action: "solicitar_llamada_comercial" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // CANCELACIÓN Y FINALIZACIONES
  // ========================================
  cancelar_espera_comercial: {
    messages: [
      "❌ **Espera cancelada**",
      "",
      "No hay problema, podés retomar cuando quieras.",
      "",
      "🔄 **Opciones disponibles:**",
      "• Volver a la cola de espera",
      "• Programar una llamada",
      "• Continuar por chat",
      "",
      "Tu solicitud de contratación queda guardada.",
    ],
    options: [
      { text: "🔄 Volver a cola", action: "conectar_comercial_servicios" },
      { text: "📞 Programar llamada", action: "solicitar_llamada_comercial" },
      { text: "💬 Continuar por chat", action: "continuar_por_chat" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  fin_proceso_comercial: {
    messages: [
      "🎉 **¡Proceso iniciado exitosamente!**",
      "",
      "📋 **Resumen:**",
      "✅ Servicio de interés: Registrado",
      "✅ Dirección de instalación: Confirmada",
      "✅ Contacto comercial: Programado",
      "",
      "📧 **Recibirás confirmación por email y SMS**",
      "",
      "🙋‍♀️ ¿Hay algo más en lo que pueda ayudarte?",
    ],
    options: [
      { text: "Otro servicio", action: "menu_servicios" },
      { text: "Consulta técnica", action: "soporte_tecnico" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // CONTACTO CON TITULAR EMPRESA
  // ========================================
  contactar_titular_empresa: {
    messages: [
      "📞 **Contacto con Titular/Apoderado**",
      "",
      "Para contratar servicios bajo CUIT necesitás:",
      "",
      "👤 **Persona autorizada:**",
      "• Titular de la cuenta",
      "• Apoderado registrado",
      "• Responsable con poder de firma",
      "",
      "📋 **Documentación requerida:**",
      "• DNI del titular/apoderado",
      "• Constancia de CUIT",
      "• Poder notarial (si corresponde)",
      "",
      "📞 **Centro de Atención:** 0800-555-EMPRESAS",
    ],
    options: [
      { text: "📞 Llamar centro", action: "llamar_centro_empresas" },
      { text: "📧 Solicitar contacto", action: "solicitar_contacto_titular" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  continuar_por_chat: {
    messages: [
      "💬 **Continuando por Chat**",
      "",
      "Un representante comercial te atenderá por este mismo canal.",
      "",
      "⏱️ **Tiempo estimado:** 5-10 minutos",
      "🔔 **Te notificaremos** cuando esté disponible",
      "",
      "Mientras tanto, podés seguir navegando en el menú principal.",
    ],
    options: [
      { text: "✅ Esperando por chat", action: "espera_chat_comercial" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // ESTADOS FINALES
  // ========================================
  fin_conversacion: {
    messages: [
      "👋 **¡Hasta la próxima!**",
      "",
      "Gracias por contactar Movistar Empresas.",
      "Estamos aquí cuando nos necesites.",
    ],
    options: [],
  },

  espera_chat_comercial: {
    messages: [
      "💬 **En espera por chat...**",
      "",
      "🎯 **Estado:** Esperando representante comercial",
      "⏰ **Estimado:** 5-10 minutos",
      "",
      "Te notificaremos cuando esté listo.",
    ],
    options: [{ text: "🔙 Menú principal", action: "menu_principal" }],
  },
};

// Exportar el CDU para uso en el sistema principal
if (typeof module !== "undefined" && module.exports) {
  module.exports = CDU_CONTRATAR_SERVICIOS;
}
