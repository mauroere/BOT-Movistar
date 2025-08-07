// ========================================
// CDU: PLAN X BOTONERA
// ========================================
// Flujo para gestión de planes, consumos, datos móviles y roaming
// Diferente según tipo de usuario: TOP EMP, TITULAR-PREMIUM, EMPRENDEDORES, PREMIUM/EMP sin línea titular

const CDU_PLAN_BOTONERA = {
  // ========================================
  // SELECTOR INICIAL DEL ASESOR - ELEGIR PERFIL DE CLIENTE
  // ========================================
  menu_plan_botonera: {
    messages: [
      "🎯 **CDU Plan x Botonera**",
      "",
      "Como asesor, selecciona el perfil del cliente que estás atendiendo:",
      "",
      "📊 **¿Qué tipo de cliente tienes en línea?**",
    ],
    options: [
      {
        text: "🏢 TOP EMP - Usuario",
        action: "menu_plan_botonera_top_emp_usuario",
      },
      {
        text: "👑 PREMIUM/EMP - Titular",
        action: "menu_plan_botonera_premium_titular",
      },
      {
        text: "📱 PREMIUM/EMP - Usuario Línea FULL",
        action: "menu_plan_botonera_premium_usuario_full",
      },
      {
        text: "💳 PREMIUM/EMP - Usuario Línea CONSUMO",
        action: "menu_plan_botonera_premium_usuario_consumo",
      },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // 1️⃣ SEGMENTO: TOP EMP → ROL: USUARIO
  // ========================================
  menu_plan_botonera_top_emp_usuario: {
    messages: [
      "🏢 **Cliente TOP EMP - Usuario**",
      "",
      "Desde acá, voy a poder ayudarte a:\n\n✅ Conocer o cambiar tu plan\n✅ Conocer tus consumos\n✅ Gestionar tus datos móviles\n✅ Activar o comprar packs de roaming",
      "Para continuar, elegí una opción de la lista: 👇",
    ],
    options: [
      { text: "Mi Plan", action: "info_plan" },
      { text: "Consumo de datos móviles", action: "consumos" },
      { text: "Pasar gigas", action: "pasar_gigas" },
      { text: "Roaming", action: "gestion_roaming" },
      { text: "🔙 Cambiar perfil cliente", action: "menu_plan_botonera" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // 2️⃣ SEGMENTO: PREMIUM Y EMPRENDEDORES → ROL: TITULAR
  // ========================================
  menu_plan_botonera_premium_titular: {
    messages: [
      "👑 **Cliente PREMIUM/EMPRENDEDORES - Titular**",
      "",
      "Desde acá, voy a poder ayudarte a:\n\n✅ Conocer o cambiar tu plan\n✅ Conocer tus consumos\n✅ Gestionar tus datos móviles\n✅ Activar o comprar packs de roaming",
      "Para continuar, elegí una opción de la lista: 👇",
    ],
    options: [
      { text: "Mis Planes", action: "info_planes" },
      { text: "Cambiar el plan", action: "cambio_plan" },
      { text: "Consumo de datos móviles", action: "consumos" },
      { text: "Comprar gigas", action: "comprar_gigas" },
      { text: "Pasar gigas", action: "pasar_gigas" },
      { text: "Guardar gigas", action: "guardar_gigas" },
      { text: "Roaming", action: "gestion_roaming" },
      { text: "🔙 Cambiar perfil cliente", action: "menu_plan_botonera" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // 2️⃣ SEGMENTO: PREMIUM Y EMPRENDEDORES → ROL: USUARIO → LÍNEA FULL
  // ========================================
  menu_plan_botonera_premium_usuario_full: {
    messages: [
      "📱 **Cliente PREMIUM/EMPRENDEDORES - Usuario Línea FULL**",
      "",
      "Desde acá, voy a poder ayudarte a:\n\n✅ Conocer o cambiar tu plan\n✅ Conocer tus consumos\n✅ Gestionar tus datos móviles\n✅ Activar o comprar packs de roaming",
      "Para continuar, elegí una opción de la lista: 👇",
    ],
    options: [
      { text: "Mi Plan", action: "info_plan" },
      { text: "Consumo de datos móviles", action: "consumos" },
      { text: "Pasar gigas", action: "pasar_gigas" },
      { text: "Guardar gigas", action: "guardar_gigas" },
      { text: "Roaming", action: "gestion_roaming" },
      { text: "🔙 Cambiar perfil cliente", action: "menu_plan_botonera" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // 2️⃣ SEGMENTO: PREMIUM Y EMPRENDEDORES → ROL: USUARIO → LÍNEA CONSUMO
  // ========================================
  menu_plan_botonera_premium_usuario_consumo: {
    messages: [
      "💳 **Cliente PREMIUM/EMPRENDEDORES - Usuario Línea CONSUMO**",
      "",
      "Desde acá, voy a poder ayudarte a:\n\n✅ Conocer o cambiar tu plan\n✅ Conocer tus consumos\n✅ Gestionar tus datos móviles\n✅ Activar o comprar packs de roaming",
      "Para continuar, elegí una opción de la lista: 👇",
    ],
    options: [
      { text: "Mi Plan", action: "info_plan" },
      { text: "Consumo de datos móviles", action: "consumos" },
      { text: "Comprar gigas", action: "comprar_gigas" },
      { text: "Pasar gigas", action: "pasar_gigas" },
      { text: "Guardar gigas", action: "guardar_gigas" },
      { text: "Roaming", action: "gestion_roaming" },
      { text: "🔙 Cambiar perfil cliente", action: "menu_plan_botonera" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // INFORMACIÓN DE PLAN INDIVIDUAL
  // ========================================
  info_plan: {
    messages: [
      "📱 **Mi Plan Actual**",
      "",
      "🎯 **Plan:** Movistar Empresas Full",
      "💰 **Precio:** $28.500/mes",
      "📞 **Minutos:** Ilimitados nacionales",
      "💬 **SMS:** 500 incluidos",
      "📶 **Datos:** 15 GB + 5 GB de regalo",
      "",
      "📊 **Consumo actual:**",
      "• Datos: 8.2 GB usados de 20 GB",
      "• Minutos: 450 min usados (ilimitados)",
      "• SMS: 127 usados de 500",
      "",
      "📅 **Renovación:** 15 de agosto de 2024",
      "✅ **Estado:** Activo y al día",
    ],
    options: [
      { text: "Ver detalles completos", action: "detalles_plan_completo" },
      { text: "Historial de consumo", action: "historial_consumo_plan" },
      { text: "Modificar servicios", action: "modificar_servicios_plan" },
      { text: "🔙 Volver", action: "menu_plan_botonera_top_emp" },
    ],
  },

  // ========================================
  // INFORMACIÓN DE MÚLTIPLES PLANES (TITULAR)
  // ========================================
  info_planes: {
    messages: [
      "📱 **Mis Planes Empresariales**",
      "",
      "🏢 **Líneas activas en tu cuenta:**",
      "",
      "📞 **Línea 1:** 11-2345-6789",
      "• Plan: Full Empresas ($28.500/mes)",
      "• Datos: 12.5 GB usados de 20 GB",
      "• Estado: ✅ Activo",
      "",
      "📞 **Línea 2:** 11-2345-6790",
      "• Plan: Smart Empresas ($18.900/mes)",
      "• Datos: 3.2 GB usados de 10 GB",
      "• Estado: ✅ Activo",
      "",
      "📞 **Línea 3:** 11-2345-6791",
      "• Plan: Básico Empresas ($12.500/mes)",
      "• Datos: 1.8 GB usados de 5 GB",
      "• Estado: ✅ Activo",
    ],
    options: [
      { text: "Ver detalles por línea", action: "detalles_por_linea" },
      { text: "Resumen de consumos", action: "resumen_consumos_total" },
      { text: "Gestionar líneas", action: "gestionar_lineas" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // CAMBIO DE PLAN
  // ========================================
  cambio_plan: {
    messages: [
      "🔄 **Cambiar Plan**",
      "",
      "¿Qué línea querés modificar?",
      "",
      "📱 **Líneas disponibles:**",
    ],
    options: [
      { text: "📞 Línea 11-2345-6789", action: "cambio_plan_linea_1" },
      { text: "📞 Línea 11-2345-6790", action: "cambio_plan_linea_2" },
      { text: "📞 Línea 11-2345-6791", action: "cambio_plan_linea_3" },
      { text: "Ver planes disponibles", action: "planes_disponibles" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // CONSUMOS DE DATOS MÓVILES
  // ========================================
  consumos: {
    messages: [
      "📊 **Consumo de Datos Móviles**",
      "",
      "📈 **Período actual (agosto 2024):**",
      "",
      "📶 **Plan principal:**",
      "• Disponibles: 11.8 GB de 20 GB",
      "• Usados: 8.2 GB (41%)",
      "• Días restantes: 11 días",
      "",
      "🎁 **Datos adicionales:**",
      "• GB guardados: 2.5 GB disponibles",
      "• Test Drive: 1.2 GB restantes",
      "",
      "⚡ **Velocidad promedio:** 42 Mbps",
      "📱 **Apps más consumidas:**",
      "• WhatsApp Business: 1.2 GB",
      "• Zoom: 2.8 GB",
      "• Navegación: 3.1 GB",
      "• Email: 0.6 GB",
    ],
    options: [
      { text: "Detalle por aplicación", action: "consumo_por_app" },
      { text: "Historial mensual", action: "historial_mensual_consumo" },
      { text: "Configurar alertas", action: "configurar_alertas_datos" },
      { text: "Ver proyección", action: "proyeccion_consumo" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // COMPRAR GIGAS
  // ========================================
  comprar_gigas: {
    messages: [
      "💳 **Comprar Gigas Adicionales**",
      "",
      "📦 **Packs disponibles:**",
      "",
      "🟢 **Pack 1 GB - $850**",
      "• Válido 30 días",
      "• Velocidad completa 4G/5G",
      "",
      "🔵 **Pack 3 GB - $2.200**",
      "• Válido 30 días",
      "• Velocidad completa 4G/5G",
      "• 15% descuento vs. individual",
      "",
      "🟣 **Pack 5 GB - $3.400**",
      "• Válido 30 días",
      "• Velocidad completa 4G/5G",
      "• 20% descuento vs. individual",
      "",
      "🟡 **Pack 10 GB - $6.200**",
      "• Válido 45 días",
      "• Velocidad completa 4G/5G",
      "• 27% descuento vs. individual",
    ],
    options: [
      { text: "💳 Comprar 1 GB ($850)", action: "comprar_1gb" },
      { text: "💳 Comprar 3 GB ($2.200)", action: "comprar_3gb" },
      { text: "💳 Comprar 5 GB ($3.400)", action: "comprar_5gb" },
      { text: "💳 Comprar 10 GB ($6.200)", action: "comprar_10gb" },
      { text: "Ver términos y condiciones", action: "terminos_compra_gigas" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // GESTIÓN DE ROAMING
  // ========================================
  gestion_roaming: {
    messages: [
      "✈️ **Gestión de Roaming**",
      "",
      "🌎 **Roaming Internacional**",
      "",
      "📍 **Estado actual:** Inactivo",
      "💰 **Saldo roaming:** $0",
      "📱 **Packs activos:** Ninguno",
      "",
      "🎯 **¿Qué querés hacer?**",
      "",
      "🔹 **Activar roaming** para próximo viaje",
      "🔹 **Comprar packs** de datos/llamadas",
      "🔹 **Consultar tarifas** por país",
      "🔹 **Ver historial** de uso en roaming",
    ],
    options: [
      { text: "✅ Activar roaming", action: "activar_roaming" },
      { text: "📦 Comprar packs roaming", action: "packs_roaming" },
      { text: "💰 Consultar tarifas", action: "tarifas_roaming" },
      { text: "📊 Historial roaming", action: "historial_roaming" },
      { text: "ℹ️ Información importante", action: "info_roaming" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // PASAR GIGAS (REUTILIZADO DEL CDU BENEFICIOS)
  // ========================================
  pasar_gigas: {
    messages: [
      "📤 **Pasar Gigas**",
      "",
      "¿Querés compartir tus GB con otra línea?",
      "",
      "📋 **¿Cómo funciona?**",
      "• Podés pasar desde 100 MB",
      "• Solo a líneas Movistar",
      "• El traspaso es inmediato",
      "• No tiene costo adicional",
      "",
      "📱 **¿A qué línea querés pasar GB?**",
      "",
      "Escribí el número (sin 0 y sin 15):",
      "💡 **Ejemplo:** 1123456789",
    ],
    options: [
      { text: "✍️ Ingresar número", action: "ingresar_numero_destino_plan" },
      { text: "Ver mi saldo disponible", action: "ver_saldo_disponible_plan" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // GUARDAR GIGAS (REUTILIZADO DEL CDU BENEFICIOS)
  // ========================================
  guardar_gigas: {
    messages: [
      "💾 **Guardar Gigas**",
      "",
      "¡No pierdas tus GB sin usar!",
      "",
      "🎯 **Cómo funciona:**",
      "• Los GB que no uses se acumulan",
      "• Válidos hasta 2 ciclos siguientes",
      "• Se consumen automáticamente cuando los necesites",
      "• Sin costo adicional",
      "",
      "📊 **Tu estado actual:**",
      "• GB del mes: 8.2 GB usados de 20 GB",
      "• GB guardados: 2.5 GB disponibles",
      "• Vencimiento: 15/09/2024",
    ],
    options: [
      {
        text: "✅ Activar guardado automático",
        action: "activar_guardado_automatico_plan",
      },
      {
        text: "Ver historial de GB guardados",
        action: "historial_gb_guardados_plan",
      },
      { text: "Desactivar guardado", action: "desactivar_guardado_plan" },
      { text: "🔙 Volver", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // CAMBIO DE PLAN POR LÍNEA
  // ========================================
  cambio_plan_linea_1: {
    messages: [
      "🔄 **Cambiar Plan - Línea 11-2345-6789**",
      "",
      "📱 **Plan actual:** Full Empresas ($28.500/mes)",
      "",
      "🎯 **Planes disponibles para upgrade/downgrade:**",
      "",
      "⬆️ **Upgrade:**",
      "• Premium Empresas: $35.900/mes (+30 GB)",
      "• Elite Empresas: $45.500/mes (+50 GB + Roaming)",
      "",
      "⬇️ **Downgrade:**",
      "• Smart Empresas: $18.900/mes (10 GB)",
      "• Básico Empresas: $12.500/mes (5 GB)",
      "",
      "⚠️ **Importante:** Los cambios se activan en el próximo ciclo",
    ],
    options: [
      { text: "📈 Upgrade a Premium", action: "confirmar_upgrade_premium" },
      { text: "📈 Upgrade a Elite", action: "confirmar_upgrade_elite" },
      { text: "📉 Downgrade a Smart", action: "confirmar_downgrade_smart" },
      { text: "📉 Downgrade a Básico", action: "confirmar_downgrade_basico" },
      { text: "Ver comparativa detallada", action: "comparativa_planes" },
      { text: "🔙 Volver", action: "cambio_plan" },
    ],
  },

  // ========================================
  // PACKS DE ROAMING
  // ========================================
  packs_roaming: {
    messages: [
      "📦 **Packs de Roaming Disponibles**",
      "",
      "🌎 **Región: América** (USA, Canadá, México, Chile, Brasil)",
      "",
      "📱 **Pack Datos América - $2.900**",
      "• 1 GB para 7 días",
      "• Velocidad 4G completa",
      "",
      "☎️ **Pack Llamadas América - $1.200**",
      "• 60 minutos para 7 días",
      "• Llamadas a y desde Argentina",
      "",
      "🎯 **Pack Completo América - $3.800**",
      "• 1 GB + 60 minutos para 7 días",
      "• 15% descuento vs. packs separados",
      "",
      "🌍 **Europa** (España, Francia, Italia, Reino Unido)",
      "",
      "📱 **Pack Datos Europa - $3.400**",
      "• 1 GB para 7 días",
      "",
      "☎️ **Pack Llamadas Europa - $1.800**",
      "• 60 minutos para 7 días",
    ],
    options: [
      {
        text: "💳 Comprar Pack América Datos",
        action: "comprar_pack_america_datos",
      },
      {
        text: "💳 Comprar Pack América Completo",
        action: "comprar_pack_america_completo",
      },
      {
        text: "💳 Comprar Pack Europa Datos",
        action: "comprar_pack_europa_datos",
      },
      { text: "Ver más destinos", action: "mas_destinos_roaming" },
      { text: "🔙 Volver", action: "gestion_roaming" },
    ],
  },

  // ========================================
  // COMPRAS Y CONFIRMACIONES
  // ========================================
  comprar_1gb: {
    messages: [
      "💳 **Confirmar Compra - Pack 1 GB**",
      "",
      "🛒 **Resumen de compra:**",
      "• Pack: 1 GB adicional",
      "• Precio: $850",
      "• Validez: 30 días",
      "• Línea: 11-2345-6789",
      "",
      "💰 **Método de pago:** Débito automático",
      "📅 **Activación:** Inmediata tras confirmación",
      "",
      "✅ **¿Confirmas la compra?**",
    ],
    options: [
      { text: "✅ Confirmar compra", action: "confirmar_compra_1gb" },
      { text: "🔄 Cambiar método de pago", action: "cambiar_metodo_pago" },
      { text: "❌ Cancelar", action: "comprar_gigas" },
    ],
  },

  confirmar_compra_1gb: {
    messages: [
      "✅ **¡Compra Exitosa!**",
      "",
      "🎉 **Pack 1 GB activado correctamente**",
      "",
      "📊 **Detalles:**",
      "• 1 GB agregado a tu línea",
      "• Disponible para usar ahora",
      "• Vence: " +
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
          "es-ES"
        ),
      "",
      "💰 **Facturación:**",
      "• Monto: $850",
      "• Se verá reflejado en tu próxima factura",
      "",
      "📱 **Para verificar:** Marcá *444# desde tu celular",
    ],
    options: [
      { text: "Ver mi nuevo saldo", action: "ver_saldo_actualizado" },
      { text: "Comprar más gigas", action: "comprar_gigas" },
      { text: "🔙 Volver al menú", action: "menu_plan_botonera_titular" },
    ],
  },

  // ========================================
  // ACTIVACIÓN DE ROAMING
  // ========================================
  activar_roaming: {
    messages: [
      "✅ **Activar Roaming Internacional**",
      "",
      "🌍 **¿A qué país vas a viajar?**",
      "",
      "📍 **Selecciona tu destino:**",
    ],
    options: [
      { text: "🇺🇸 Estados Unidos", action: "roaming_usa" },
      { text: "🇪🇸 España", action: "roaming_espana" },
      { text: "🇧🇷 Brasil", action: "roaming_brasil" },
      { text: "🇨🇱 Chile", action: "roaming_chile" },
      { text: "🇲🇽 México", action: "roaming_mexico" },
      { text: "🌎 Otro país", action: "roaming_otro_pais" },
      { text: "🔙 Volver", action: "gestion_roaming" },
    ],
  },

  roaming_usa: {
    messages: [
      "🇺🇸 **Roaming en Estados Unidos**",
      "",
      "✅ **Roaming activado para USA**",
      "",
      "💰 **Tarifas aplicables:**",
      "• Datos: $0.50 por MB",
      "• Llamadas recibidas: $1.20 por minuto",
      "• Llamadas realizadas: $2.80 por minuto",
      "• SMS enviados: $0.80 c/u",
      "",
      "🎯 **Recomendación:** Comprá un pack de datos para ahorrar",
      "",
      "⚠️ **Importante:**",
      "• El roaming se activa en 2-4 horas",
      "• Configurá tu celular en modo roaming",
      "• Llevá siempre el documento de identidad",
    ],
    options: [
      { text: "📦 Comprar pack para USA", action: "packs_roaming_usa" },
      {
        text: "📋 Configuración del celular",
        action: "config_celular_roaming",
      },
      { text: "⚠️ Consejos importantes", action: "consejos_roaming" },
      { text: "✅ Entendido", action: "gestion_roaming" },
    ],
  },

  // ========================================
  // DETALLES Y CONFIGURACIONES
  // ========================================
  detalles_plan_completo: {
    messages: [
      "📋 **Detalles Completos del Plan**",
      "",
      "📱 **Plan:** Movistar Empresas Full",
      "💰 **Precio base:** $28.500/mes (sin impuestos)",
      "🏷️ **Precio final:** $34.485/mes (con IVA)",
      "",
      "📞 **Servicios incluidos:**",
      "• Llamadas ilimitadas nacionales",
      "• WhatsApp, Telegram y redes sociales sin descuento de datos",
      "• Hotspot/Modem sin restricciones",
      "• Acceso prioritario a la red 4G/5G",
      "",
      "📶 **Datos:**",
      "• Plan base: 15 GB",
      "• Bonus permanente: +5 GB",
      "• Total disponible: 20 GB/mes",
      "",
      "🌐 **Servicios adicionales:**",
      "• Cloud Empresarial: 50 GB incluidos",
      "• Soporte técnico prioritario 24/7",
      "• Gestión desde Mi Movistar Empresas",
    ],
    options: [
      {
        text: "💰 Ver desglose de facturación",
        action: "desglose_facturacion",
      },
      { text: "📊 Comparar con otros planes", action: "comparar_planes" },
      { text: "🔄 Modificar servicios", action: "modificar_servicios_plan" },
      { text: "🔙 Volver", action: "info_plan" },
    ],
  },

  consumo_por_app: {
    messages: [
      "📱 **Consumo por Aplicación**",
      "",
      "📊 **Período: Agosto 2024**",
      "",
      "🥇 **Top consumidores:**",
      "",
      "1️⃣ **Navegación web:** 3.1 GB (38%)",
      "   • Chrome, Firefox, Safari",
      "",
      "2️⃣ **Zoom:** 2.8 GB (34%)",
      "   • Videoconferencias empresariales",
      "",
      "3️⃣ **WhatsApp Business:** 1.2 GB (15%)",
      "   • Mensajes, fotos, documentos",
      "",
      "4️⃣ **Email:** 0.6 GB (7%)",
      "   • Outlook, Gmail corporativo",
      "",
      "5️⃣ **YouTube:** 0.3 GB (4%)",
      "",
      "6️⃣ **Otros:** 0.2 GB (2%)",
      "   • Apps varias, actualizaciones",
    ],
    options: [
      { text: "📈 Ver tendencia semanal", action: "tendencia_semanal" },
      { text: "⚙️ Configurar límites por app", action: "limites_por_app" },
      { text: "💡 Consejos de ahorro", action: "consejos_ahorro_datos" },
      { text: "🔙 Volver", action: "consumos" },
    ],
  },
};

// Exportar el CDU para uso en el sistema principal
if (typeof module !== "undefined" && module.exports) {
  module.exports = CDU_PLAN_BOTONERA;
}
