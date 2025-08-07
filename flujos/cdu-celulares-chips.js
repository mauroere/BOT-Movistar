// ========================================
// CDU: CELULARES Y CHIPS
// ========================================
// Flujo para consultas sobre equipos, chips, eSIM y compras
// Diferentes permisos según tipo de usuario (TITULAR/USUARIO/TOP EMP)

const CDU_CELULARES_CHIPS = {
  // ========================================
  // MENÚ PRINCIPAL - TITULAR
  // ========================================
  menu_celulares_chips_titular: {
    messages: ["Contame, ¿qué estás buscando? 🤔"],
    options: [
      { text: "Chips/eSIM", action: "consulta_chips" },
      { text: "Comprar Celular", action: "compra_celular" },
      { text: "🔙 Volver", action: "menu_anterior" },
    ],
  },

  // ========================================
  // MENÚ PRINCIPAL - USUARIO CON ACCESO
  // ========================================
  menu_celulares_chips_usuario: {
    messages: [
      "Si querés comprar un equipo, saber cuándo vas a recibir tu compra o consultar sobre tu chip o eSIM, te puedo ayudar. 🤖",
      "Elegí una opción de la lista: 👇",
    ],
    options: [
      { text: "Chips/eSIM", action: "consulta_chips" },
      { text: "Comprar Celular", action: "compra_celular" },
      { text: "🔙 Volver", action: "menu_anterior" },
    ],
  },

  // ========================================
  // MENÚ PRINCIPAL - TOP EMPRESAS (SIN PERMISOS)
  // ========================================
  menu_celulares_chips_top_emp: {
    messages: [
      "Si querés comprar un equipo o saber cómo activar un chip, te puedo ayudar. 🤖",
      "Por otras consultas sobre estos temas, contactate con la persona titular o apoderada de tu empresa.",
      "Elegí una opción de la lista: 👇",
    ],
    options: [
      { text: "Chips/eSIM", action: "consulta_chips" },
      { text: "Comprar Celular", action: "compra_celular" },
      { text: "Seguimiento de envío", action: "seguimiento_envio" },
      { text: "🔙 Volver", action: "menu_anterior" },
    ],
  },

  // ========================================
  // POST SELECCIÓN - OPCIONES ADICIONALES
  // ========================================
  post_seleccion_opciones: {
    messages: ["¿Ya hiciste una compra? Puedo ayudarte con esto: 👇"],
    options: [
      { text: "Seguimiento de envío", action: "seguimiento_envio" },
      { text: "Cancelar compra", action: "cancelar_compra" },
      { text: "¿Otro tema?", action: "otro_tema" },
    ],
  },

  // ========================================
  // CONSULTA CHIPS/eSIM
  // ========================================
  consulta_chips: {
    messages: [
      "📱 **Chips y eSIM**",
      "",
      "¿Qué necesitás hacer con tu chip o eSIM?",
    ],
    options: [
      { text: "Activar chip nuevo", action: "activar_chip_nuevo" },
      { text: "Configurar eSIM", action: "configurar_esim" },
      { text: "Reemplazar chip dañado", action: "reemplazar_chip" },
      { text: "Consultar estado de chip", action: "estado_chip" },
      { text: "Solicitar chip adicional", action: "solicitar_chip_adicional" },
      { text: "Más opciones", action: "post_seleccion_opciones" },
      { text: "🔙 Volver", action: "detectar_tipo_usuario" },
    ],
  },

  // ========================================
  // COMPRA CELULAR
  // ========================================
  compra_celular: {
    messages: ["📱 **Compra de Celulares**", "", "¿Qué querés hacer?"],
    options: [
      { text: "Ver catálogo disponible", action: "catalogo_celulares" },
      { text: "Consultar promociones", action: "promociones_celulares" },
      { text: "Equipos en cuotas", action: "equipos_cuotas" },
      { text: "Cambio de equipo", action: "cambio_equipo" },
      { text: "Más opciones", action: "post_seleccion_opciones" },
      { text: "🔙 Volver", action: "detectar_tipo_usuario" },
    ],
  },

  // ========================================
  // SEGUIMIENTO DE ENVÍO
  // ========================================
  seguimiento_envio: {
    messages: [
      "📦 **Seguimiento de Envío**",
      "",
      "Para rastrear tu compra necesito que me proporciones:",
      "",
      "📋 **Datos requeridos:**",
      "• Número de pedido",
      "• Número de línea asociada",
      "• Fecha aproximada de compra",
      "",
      "¿Tenés el número de pedido?",
    ],
    options: [
      { text: "✅ Tengo número de pedido", action: "ingresar_numero_pedido" },
      { text: "❌ No tengo el número", action: "buscar_sin_numero" },
      { text: "📞 Llamar a ventas", action: "llamar_ventas" },
      { text: "🔙 Volver", action: "detectar_tipo_usuario" },
    ],
  },

  // ========================================
  // CANCELAR COMPRA
  // ========================================
  cancelar_compra: {
    messages: [
      "❌ **Cancelación de Compra**",
      "",
      "Para cancelar una compra necesitamos validar:",
      "",
      "📋 **Información requerida:**",
      "• Número de pedido",
      "• Motivo de cancelación",
      "• Estado actual del envío",
      "",
      "⚠️ **Importante:** Las cancelaciones tienen diferentes políticas según el estado del pedido.",
    ],
    options: [
      { text: "Pedido no enviado", action: "cancelar_no_enviado" },
      { text: "Pedido en tránsito", action: "cancelar_en_transito" },
      { text: "Consultar políticas", action: "politicas_cancelacion" },
      { text: "🔙 Volver", action: "detectar_tipo_usuario" },
    ],
  },

  // ========================================
  // OTRO TEMA
  // ========================================
  otro_tema: {
    messages: ["🤔 **¿Otro tema?**", "", "¿En qué más puedo ayudarte?"],
    options: [{ text: "🔙 Volver", action: "detectar_tipo_usuario" }],
  },

  // ========================================
  // ACTIVAR CHIP NUEVO
  // ========================================
  activar_chip_nuevo: {
    messages: [
      "📱 **Activación de Chip Nuevo**",
      "",
      "Para activar tu chip nuevo necesitás:",
      "",
      "📋 **Pasos a seguir:**",
      "1. Insertar el chip en tu equipo",
      "2. Enviar SMS con tu DNI al 567",
      "3. Aguardar confirmación (5-10 minutos)",
      "",
      "📞 **Formato SMS:** DNI sin puntos ni espacios",
      "💡 **Ejemplo:** 12345678",
      "",
      "¿Ya seguiste estos pasos?",
    ],
    options: [
      { text: "✅ Sí, pero no funciona", action: "chip_no_activa" },
      {
        text: "❌ No, voy a hacerlo ahora",
        action: "instrucciones_activacion",
      },
      { text: "🆘 Necesito ayuda técnica", action: "ayuda_tecnica_chip" },
      { text: "🔙 Volver", action: "consulta_chips" },
    ],
  },

  // ========================================
  // CONFIGURAR eSIM
  // ========================================
  configurar_esim: {
    messages: [
      "📡 **Configuración de eSIM**",
      "",
      "Para configurar tu eSIM necesitás:",
      "",
      "📱 **Requisitos:**",
      "• Equipo compatible con eSIM",
      "• Código QR de activación",
      "• Conexión a WiFi estable",
      "",
      "📋 **¿Qué tipo de configuración necesitás?**",
    ],
    options: [
      { text: "Primera configuración", action: "primera_config_esim" },
      { text: "Transferir eSIM", action: "transferir_esim" },
      { text: "Reconfigurar eSIM", action: "reconfigurar_esim" },
      { text: "Problemas con eSIM", action: "problemas_esim" },
      { text: "🔙 Volver", action: "consulta_chips" },
    ],
  },

  // ========================================
  // CATÁLOGO DE CELULARES
  // ========================================
  catalogo_celulares: {
    messages: [
      "📱 **Catálogo de Celulares Empresariales**",
      "",
      "🔥 **Destacados del mes:**",
      "",
      "📱 **Samsung Galaxy A54**",
      "• Precio: $299.990 | 12 cuotas sin interés",
      "• 128GB | Triple cámara | 5G",
      "",
      "📱 **iPhone 14**",
      "• Precio: $899.990 | 18 cuotas",
      "• 128GB | Cámara Pro | 5G",
      "",
      "📱 **Motorola Edge 40**",
      "• Precio: $249.990 | 12 cuotas",
      "• 256GB | Carga rápida | 5G",
      "",
      "💼 **Descuentos empresariales aplicables**",
    ],
    options: [
      { text: "Ver más modelos", action: "ver_mas_modelos" },
      { text: "Consultar stock", action: "consultar_stock" },
      { text: "Precios empresariales", action: "precios_empresariales" },
      { text: "Iniciar compra", action: "iniciar_compra_celular" },
      { text: "🔙 Volver", action: "compra_celular" },
    ],
  },

  // ========================================
  // INGRESAR NÚMERO DE PEDIDO
  // ========================================
  ingresar_numero_pedido: {
    messages: [
      "📋 **Ingreso de Número de Pedido**",
      "",
      "Por favor, proporcioná tu número de pedido.",
      "",
      "📝 **Formato:** Generalmente son 8-10 dígitos",
      "💡 **Ejemplo:** PED12345678",
      "",
      "📧 **¿Dónde encontrarlo?**",
      "• Email de confirmación de compra",
      "• SMS de confirmación",
      "• Comprobante de pago",
    ],
    options: [
      { text: "✍️ Ingresar número", action: "procesar_numero_pedido" },
      { text: "📧 Reenviar confirmación", action: "reenviar_confirmacion" },
      { text: "🔙 Volver", action: "seguimiento_envio" },
    ],
  },

  // ========================================
  // PROCESAR NÚMERO DE PEDIDO
  // ========================================
  procesar_numero_pedido: {
    messages: [
      "🔍 **Buscando tu pedido...**",
      "",
      "📦 **Estado de tu pedido:**",
      "",
      "📋 **Número:** PED12345678",
      "📅 **Fecha:** 28/07/2024",
      "📱 **Producto:** Samsung Galaxy A54",
      "🚚 **Estado:** En preparación",
      "",
      "📍 **Dirección de entrega:**",
      "Av. Corrientes 1234, CABA",
      "",
      "⏰ **Tiempo estimado:** 2-3 días hábiles",
    ],
    options: [
      { text: "📍 Cambiar dirección", action: "cambiar_direccion_envio" },
      { text: "📞 Contactar con envío", action: "contactar_envio" },
      { text: "📧 Recibir updates", action: "activar_notificaciones" },
      { text: "🔙 Volver", action: "seguimiento_envio" },
    ],
  },

  // ========================================
  // DETECCIÓN AUTOMÁTICA DE TIPO DE USUARIO
  // ========================================
  detectar_tipo_usuario: {
    messages: [],
    options: [],
    redirect: "menu_celulares_chips_usuario", // Por defecto, se puede cambiar según lógica
  },

  // ========================================
  // ESTADOS FINALES Y PROCESOS
  // ========================================
  chip_no_activa: {
    messages: [
      "🔧 **Chip no se activa**",
      "",
      "Vamos a revisar paso a paso:",
      "",
      "🔍 **Verificaciones:**",
      "• ¿El chip está bien insertado?",
      "• ¿Enviaste el SMS al 567?",
      "• ¿Recibiste algún mensaje de error?",
      "• ¿Pasaron más de 30 minutos?",
      "",
      "📞 **Si todo está correcto, te derivo con soporte técnico.**",
    ],
    options: [
      { text: "📞 Conectar con soporte", action: "conectar_soporte_chip" },
      { text: "🔄 Intentar nuevamente", action: "activar_chip_nuevo" },
      { text: "🔙 Volver", action: "consulta_chips" },
    ],
  },

  instrucciones_activacion: {
    messages: [
      "📋 **Instrucciones de Activación**",
      "",
      "**Paso 1:** Insertá el chip en tu celular",
      "**Paso 2:** Enviá un SMS al 567 con tu DNI (sin puntos)",
      "**Paso 3:** Esperá 5-10 minutos",
      "**Paso 4:** Reiniciá el celular",
      "",
      "💡 **Importante:** Mantené el celular encendido durante el proceso.",
      "",
      "¿Te resultó útil esta información?",
    ],
    options: [
      { text: "✅ Sí, gracias", action: "proceso_exitoso" },
      { text: "❓ Tengo dudas", action: "dudas_activacion" },
      { text: "🔙 Volver", action: "consulta_chips" },
    ],
  },

  proceso_exitoso: {
    messages: [
      "🎉 **¡Excelente!**",
      "",
      "Tu chip debería activarse en los próximos minutos.",
      "",
      "Si tenés algún problema, no dudes en contactarnos nuevamente.",
      "",
      "¿Necesitás ayuda con algo más?",
    ],
    options: [
      { text: "Otra consulta", action: "detectar_tipo_usuario" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },
};

// Exportar el CDU para uso en el sistema principal
if (typeof module !== "undefined" && module.exports) {
  module.exports = CDU_CELULARES_CHIPS;
}
