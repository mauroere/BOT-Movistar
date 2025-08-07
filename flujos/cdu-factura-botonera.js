// ========================================
// CDU: FACTURA CON BOTONERA
// ========================================
// Flujo para consulta de facturas, deudas, pagos y reclamos de facturación
// Acceso solo para TITULAR o usuarios con perfil habilitado

const CDU_FACTURA_BOTONERA = {
  // ========================================
  // MENÚ PRINCIPAL DE FACTURACIÓN
  // ========================================
  facturacion_cuit: {
    messages: [
      "Desde acá podés descargar tus últimas 6 facturas, consultar sobre pagos y deudas de tu CUIT.",
      "Elegí una opción y te ayudo: 👇",
    ],
    options: [
      { text: "Última factura", action: "ver_ultima_factura" },
      { text: "Facturas anteriores", action: "ver_facturas_anteriores" },
      { text: "Deuda", action: "consultar_deuda" },
      { text: "Pagos", action: "consultar_pagos" },
      { text: "Reclamo de facturación", action: "reclamo_facturacion" },
      { text: "Nuevas tarifas", action: "ver_tarifas" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // SELECCIÓN DE LÍNEA DEL CUIT
  // ========================================
  seleccion_linea_cuit: {
    messages: ["Ahora, contame por qué línea de tu CUIT querés consultar: 👇"],
    options: [
      { text: "Esta línea", action: "accion_sobre_esta_linea" },
      { text: "Otra línea del CUIT", action: "accion_otra_linea" },
      { text: "🔙 Volver", action: "volver_menu_opciones" },
      { text: "Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // USUARIO SIN HABILITACIÓN
  // ========================================
  sin_habilitacion_cuit: {
    messages: [
      "Veo que tu línea no está habilitada para descargar facturas del CUIT.",
      "Por favor, ponete en contacto con la persona apoderada o titular de tu empresa para conocer los montos a pagar.",
      "Si querés consultar por facturas de una línea bajo DNI, hacelo desde este canal de WhatsApp: https://mov.is/s3SF",
    ],
    options: [
      { text: "🔙 Menú principal", action: "menu_principal" },
      { text: "Contactar titular", action: "contactar_titular" },
    ],
  },

  // ========================================
  // ÚLTIMA FACTURA
  // ========================================
  ver_ultima_factura: {
    messages: [
      "📄 **Última Factura Disponible**",
      "",
      "🗓️ **Período**: Julio 2024",
      "💰 **Monto**: $125.450,80",
      "📅 **Vencimiento**: 15/08/2024",
      "✅ **Estado**: Pagada",
      "",
      "📥 **Descarga**: La factura se enviará por email en PDF",
    ],
    options: [
      { text: "Descargar PDF", action: "descargar_factura_pdf" },
      { text: "Enviar por email", action: "enviar_factura_email" },
      { text: "Ver detalle", action: "ver_detalle_factura" },
      { text: "🔙 Volver", action: "facturacion_cuit" },
    ],
  },

  // ========================================
  // FACTURAS ANTERIORES
  // ========================================
  ver_facturas_anteriores: {
    messages: [
      "📄 **Facturas Anteriores Disponibles**",
      "",
      "Podés descargar hasta las últimas 6 facturas:",
      "",
      "• Junio 2024 - $118.320,50 ✅ Pagada",
      "• Mayo 2024 - $122.180,75 ✅ Pagada",
      "• Abril 2024 - $119.945,30 ✅ Pagada",
      "• Marzo 2024 - $125.670,80 ✅ Pagada",
      "• Febrero 2024 - $121.485,60 ✅ Pagada",
      "• Enero 2024 - $127.330,40 ✅ Pagada",
    ],
    options: [
      { text: "Descargar todas", action: "descargar_todas_facturas" },
      { text: "Seleccionar período", action: "seleccionar_periodo" },
      { text: "🔙 Volver", action: "facturacion_cuit" },
    ],
  },

  // ========================================
  // CONSULTAR DEUDA
  // ========================================
  consultar_deuda: {
    messages: [
      "💳 **Estado de Deuda CUIT**",
      "",
      "✅ **Estado Actual**: Sin deudas pendientes",
      "📅 **Última actualización**: 04/08/2024",
      "💰 **Próximo vencimiento**: 15/08/2024 - $128.650,90",
      "",
      "🔔 **Recordatorio**: Configurá débito automático para evitar recargos",
    ],
    options: [
      {
        text: "Configurar débito automático",
        action: "config_debito_automatico",
      },
      { text: "Ver próximos vencimientos", action: "proximos_vencimientos" },
      { text: "Historial de pagos", action: "historial_pagos" },
      { text: "🔙 Volver", action: "facturacion_cuit" },
    ],
  },

  // ========================================
  // CONSULTAR PAGOS
  // ========================================
  consultar_pagos: {
    messages: [
      "💰 **Historial de Pagos CUIT**",
      "",
      "📅 **Últimos pagos registrados:**",
      "",
      "• 15/07/2024 - $125.450,80 ✅ Acreditado",
      "• 15/06/2024 - $118.320,50 ✅ Acreditado",
      "• 15/05/2024 - $122.180,75 ✅ Acreditado",
      "",
      "🏦 **Medio de pago**: Débito automático Banco Santander",
    ],
    options: [
      { text: "Ver todos los pagos", action: "ver_todos_pagos" },
      { text: "Cambiar medio de pago", action: "cambiar_medio_pago" },
      { text: "Comprobante de pago", action: "comprobante_pago" },
      { text: "🔙 Volver", action: "facturacion_cuit" },
    ],
  },

  // ========================================
  // RECLAMO DE FACTURACIÓN
  // ========================================
  reclamo_facturacion: {
    messages: [
      "📝 **Reclamo de Facturación**",
      "",
      "¿Qué tipo de reclamo querés realizar?",
    ],
    options: [
      { text: "Error en el monto", action: "reclamo_monto" },
      { text: "Servicios no contratados", action: "reclamo_servicios" },
      { text: "Problema con descuentos", action: "reclamo_descuentos" },
      { text: "Cargos duplicados", action: "reclamo_duplicados" },
      { text: "Otro reclamo", action: "reclamo_otro" },
      { text: "🔙 Volver", action: "facturacion_cuit" },
    ],
  },

  // ========================================
  // NUEVAS TARIFAS
  // ========================================
  ver_tarifas: {
    messages: [
      "📊 **Nuevas Tarifas y Promociones**",
      "",
      "🆕 **Vigentes desde Agosto 2024:**",
      "",
      "• Plan TOP Empresarial: +8% ajuste tarifario",
      "• Internet 1GB: Precio promocional $89.990/mes",
      "• Líneas adicionales: 20% descuento por 6 meses",
      "• Roaming internacional: Nuevas tarifas preferenciales",
      "",
      "📋 Ver documento completo de tarifas en: mov.is/tarifas",
    ],
    options: [
      { text: "Descargar tarifario completo", action: "descargar_tarifario" },
      { text: "Comparar con mi plan actual", action: "comparar_plan" },
      { text: "Consultar promociones", action: "consultar_promociones" },
      { text: "🔙 Volver", action: "facturacion_cuit" },
    ],
  },

  // ========================================
  // ACCIONES DE CONTINUIDAD
  // ========================================
  como_seguimos: {
    messages: ["¿Cómo seguimos?"],
    options: [
      { text: "Ver opciones", action: "ver_opciones" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // ACCIONES FINALES (TODOS LOS CAMINOS TERMINAN AQUÍ)
  // ========================================
  ver_opciones: {
    messages: ["✅ **Proceso completado**", "¿Necesitás ayuda con algo más?"],
    options: [
      { text: "Otra consulta de facturación", action: "facturacion_cuit" },
      { text: "Soporte técnico", action: "soporte_tecnico" },
      { text: "Atención comercial", action: "atencion_comercial" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // ACCIONES SOBRE LÍNEAS ESPECÍFICAS
  // ========================================
  accion_sobre_esta_linea: {
    messages: [
      "✅ **Línea seleccionada**: Esta línea actual",
      "Procesando consulta para tu línea...",
    ],
    options: [{ text: "Continuar", action: "como_seguimos" }],
  },

  accion_otra_linea: {
    messages: [
      "📱 **Seleccionar otra línea del CUIT**",
      "Por favor, indicá el número de línea que querés consultar:",
      "",
      "Formato: 11-1234-5678",
    ],
    options: [
      { text: "Ingresar número", action: "ingresar_numero_linea" },
      { text: "🔙 Volver", action: "seleccion_linea_cuit" },
    ],
  },

  volver_menu_opciones: {
    messages: [],
    options: [],
    redirect: "facturacion_cuit",
  },

  // ========================================
  // ACCIONES ESPECÍFICAS DE FACTURACIÓN
  // ========================================
  descargar_factura_pdf: {
    messages: [
      "📥 **Descargando factura...**",
      "Tu factura en PDF se descargará automáticamente.",
      "También la enviamos a tu email registrado.",
    ],
    options: [{ text: "Listo", action: "como_seguimos" }],
  },

  enviar_factura_email: {
    messages: [
      "📧 **Enviando por email...**",
      "Tu factura se envió a: empresa@email.com",
      "Revisá tu bandeja de entrada en unos minutos.",
    ],
    options: [{ text: "Listo", action: "como_seguimos" }],
  },

  config_debito_automatico: {
    messages: [
      "🏦 **Configurar Débito Automático**",
      "Para evitar recargos y olvidos, configurá el débito automático.",
      "",
      "Beneficios:",
      "• 5% descuento en tu factura",
      "• Sin recargos por mora",
      "• Pago automático cada mes",
    ],
    options: [
      { text: "Configurar ahora", action: "proceso_debito_automatico" },
      { text: "Más información", action: "info_debito_automatico" },
      { text: "🔙 Volver", action: "consultar_deuda" },
    ],
  },

  reclamo_monto: {
    messages: [
      "💰 **Reclamo por Error en Monto**",
      "Para procesar tu reclamo necesitamos:",
      "",
      "📋 **Información requerida:**",
      "• Número de factura",
      "• Monto observado",
      "• Motivo del reclamo",
      "",
      "📞 Un especialista se contactará en 24-48hs",
    ],
    options: [
      { text: "Iniciar reclamo", action: "proceso_reclamo_monto" },
      { text: "🔙 Volver", action: "reclamo_facturacion" },
    ],
  },
};

// Exportar el CDU para uso en el sistema principal
if (typeof module !== "undefined" && module.exports) {
  module.exports = CDU_FACTURA_BOTONERA;
}
