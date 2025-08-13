// CDU Builder - Plantillas predefinidas
window.CDUTemplates = {
  soporte: {
    name: "soporte_tecnico",
    title: "CDU Soporte Tecnico",
    description: "Asistencia tecnica especializada",
    icon: "fas fa-tools",
    initialMessage:
      "Hola! Soy tu asistente de soporte tecnico de Movistar Empresas.\n\nEn que puedo ayudarte hoy?",
    secondMessage: "Selecciona el tipo de problema que estas experimentando:",
    options: [
      { text: "Problemas de conexion a Internet", action: "soporte_conexion" },
      { text: "Configuracion de equipos", action: "soporte_equipos" },
      { text: "Problemas con lineas telefonicas", action: "soporte_lineas" },
      { text: "Consultas tecnicas avanzadas", action: "soporte_avanzado" },
      { text: "Hablar con tecnico especializado", action: "transfer_tecnico" },
      { text: "Volver al menu principal", action: "welcome" },
    ],
  },

  facturacion: {
    name: "consultas_facturacion",
    title: "CDU Consultas Facturacion",
    description: "Consultas sobre facturacion y pagos",
    icon: "fas fa-file-invoice-dollar",
    initialMessage:
      "Hola! Te ayudo con todas tus consultas de facturacion y pagos.",
    secondMessage: "Que necesitas hacer hoy?",
    options: [
      { text: "Ver mi ultima factura", action: "ver_ultima_factura" },
      { text: "Descargar facturas anteriores", action: "descargar_facturas" },
      { text: "Consultar estado de pagos", action: "estado_pagos" },
      { text: "Reportar problema de cobro", action: "reclamo_cobro" },
      { text: "Configurar debito automatico", action: "config_debito" },
      { text: "Volver al menu principal", action: "welcome" },
    ],
  },

  comercial: {
    name: "atencion_comercial",
    title: "CDU Atencion Comercial",
    description: "Servicios, ofertas y upgrades",
    icon: "fas fa-handshake",
    initialMessage:
      "Hola! Soy tu asesor comercial virtual de Movistar Empresas.",
    secondMessage:
      "Te ayudo a encontrar las mejores soluciones para tu empresa:",
    options: [
      { text: "Nuevos servicios de Internet", action: "servicios_internet" },
      { text: "Planes moviles empresariales", action: "planes_moviles" },
      { text: "Soluciones de telefonia fija", action: "telefonia_fija" },
      { text: "Upgrades de plan actual", action: "upgrade_plan" },
      { text: "Ofertas y promociones vigentes", action: "ofertas_actuales" },
      { text: "Hablar con asesor comercial", action: "transfer_comercial" },
      { text: "Volver al menu principal", action: "welcome" },
    ],
  },

  reclamos: {
    name: "gestion_reclamos",
    title: "CDU Gestion de Reclamos",
    description: "Gestion y seguimiento de reclamos",
    icon: "fas fa-exclamation-triangle",
    initialMessage:
      "Hola! Lamento que hayas tenido inconvenientes.\n\nEstoy aqui para ayudarte a resolver tu situacion.",
    secondMessage: "Que tipo de reclamo necesitas hacer?",
    options: [
      {
        text: "Reclamo por facturacion incorrecta",
        action: "reclamo_facturacion",
      },
      { text: "Falla o interrupcion de servicio", action: "reclamo_servicio" },
      { text: "Problema con atencion recibida", action: "reclamo_atencion" },
      { text: "Demora en instalacion/reparacion", action: "reclamo_demora" },
      {
        text: "Seguimiento de reclamo existente",
        action: "seguimiento_reclamo",
      },
      { text: "Escalamiento a supervisor", action: "escalamiento" },
      { text: "Volver al menu principal", action: "welcome" },
    ],
  },
};
