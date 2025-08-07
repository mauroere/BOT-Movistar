// ========================================
// CDU: BENEFICIOS
// ========================================
// Flujo para mostrar y gestionar beneficios de Movistar Empresas
// Club Movistar, cursos online, gigas gratis, ofertas especiales

const CDU_BENEFICIOS = {
  // ========================================
  // MENÚ PRINCIPAL DE BENEFICIOS
  // ========================================
  menu_beneficios: {
    messages: [
      "Ser parte de Movistar tiene sus recompensas. 🎉",
      "Tenemos un montón de beneficios para vos:",
      "",
      "Descuentos exclusivos 🎁",
      "",
      "Cursos online 📘",
      "",
      "Gigas gratis para navegar 📶",
      "",
      "¡Y más! ✨",
      "",
      "Elegí una opción y te sigo contando. 😊",
    ],
    options: [
      { text: "Club Movistar", action: "beneficio_club_movistar" },
      { text: "Cursos online", action: "fundacion_telefonica" },
      { text: "Test Drive 30 GB", action: "test_drive_gigas" },
      { text: "Pasar y guardar GB", action: "gestionar_gigas" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // MENÚ PRINCIPAL DE BENEFICIOS - PREMIUM/TITULAR (CON OFERTA FIBRA)
  // ========================================
  menu_beneficios_premium: {
    messages: [
      "Ser parte de Movistar tiene sus recompensas. 🎉",
      "Tenemos un montón de beneficios para vos:",
      "",
      "Descuentos exclusivos 🎁",
      "",
      "Cursos online 📘",
      "",
      "Gigas gratis para navegar 📶",
      "",
      "¡Y más! ✨",
      "",
      "Elegí una opción y te sigo contando. 😊",
    ],
    options: [
      { text: "Club Movistar", action: "beneficio_club_movistar" },
      { text: "Cursos online", action: "fundacion_telefonica" },
      { text: "Test Drive 30 GB", action: "test_drive_gigas" },
      { text: "Pasar y guardar GB", action: "gestionar_gigas" },
      { text: "Oferta de Fibra", action: "oferta_fibra" },
      { text: "🔙 Menú principal", action: "menu_principal" },
    ],
  },

  // ========================================
  // CLUB MOVISTAR
  // ========================================
  beneficio_club_movistar: {
    messages: [
      "🎁 **Club Movistar**",
      "",
      "¡Bienvenido al Club con más beneficios!",
      "",
      "✨ **Descuentos exclusivos en:**",
      "• Cines: 2x1 en entradas",
      "• Restaurantes: Hasta 30% off",
      "• Tecnología: Descuentos especiales",
      "• Viajes: Promociones en hoteles y vuelos",
      "• Entretenimiento: Streaming y eventos",
      "",
      "🎯 **Cómo acceder:**",
      "Descargá la app Mi Movistar y activá tus beneficios",
      "",
      "📱 **App disponible en:**",
      "• Google Play Store",
      "• Apple App Store",
    ],
    options: [
      { text: "Ver todos los descuentos", action: "todos_descuentos_club" },
      { text: "Cómo activar beneficios", action: "activar_beneficios_club" },
      { text: "Descargar app", action: "descargar_app_movistar" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  // ========================================
  // FUNDACIÓN TELEFÓNICA - CURSOS ONLINE
  // ========================================
  fundacion_telefonica: {
    messages: [
      "¿Conocés Fundación Telefónica? Tiene un montón de cursos gratuitos para que impulses tu carrera profesional. 🌸",
      "",
      "Hay de todo: 👇",
      "",
      "Marketing y comunicación",
      "",
      "Diseño y analítica web",
      "",
      "Programación",
      "",
      "Desarrollo de habilidades técnicas y blandas",
      "",
      "Estos beneficios son totalmente gratuitos y podés usarlos cuando lo necesites.",
      "Elegí qué opción te interesa y te cuento más:",
    ],
    options: [
      { text: "Ver modalidades", action: "modalidades_cursos" },
      { text: "Cursos de programación", action: "cursos_programacion" },
      { text: "Marketing digital", action: "cursos_marketing" },
      { text: "Habilidades blandas", action: "cursos_habilidades" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  // ========================================
  // MODALIDADES DE CURSOS
  // ========================================
  modalidades_cursos: {
    messages: [
      "Elegí la modalidad que más se adapte a vos:",
      "",
      "📌 **Sincrónica:** ideal para perfiles digitales. 📚",
      "¡Conocé los cursos e inscribite desde acá! → http://mov.is/rCQN",
      "",
      "📌 **Asincrónica:** muchas opciones para que aprendas a tu ritmo → http://mov.is/rCmLj",
      "",
      "¿Seguimos charlando? 😊",
    ],
    options: [
      { text: "Pasar gigas", action: "pasar_gigas" },
      { text: "Guardar gigas", action: "guardar_gigas" },
      { text: "🔙 Volver", action: "menu_beneficios" },
      { text: "🔙 Menú principal", action: "menu_principal" },
      { text: "Eso es todo, gracias", action: "fin_conversacion" },
    ],
  },

  // ========================================
  // TEST DRIVE 30 GB
  // ========================================
  test_drive_gigas: {
    messages: [
      "📶 **Test Drive 30 GB**",
      "",
      "¡Probá nuestra red con 30 GB gratis!",
      "",
      "🎯 **¿Cómo funciona?**",
      "• 30 GB de regalo para probar la velocidad",
      "• Válido por 30 días",
      "• Sin compromiso de permanencia",
      "• Podés usar todos los GB cuando quieras",
      "",
      "📱 **¿Qué podés hacer con 30 GB?**",
      "• Ver 30 horas de video en HD",
      "• Escuchar 200 horas de música",
      "• Navegar ilimitado en redes sociales",
      "",
      "✅ **¿Querés activar tu Test Drive?**",
    ],
    options: [
      { text: "✅ Activar Test Drive", action: "activar_test_drive" },
      { text: "Más información", action: "info_test_drive" },
      { text: "Ver términos y condiciones", action: "terminos_test_drive" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  // ========================================
  // GESTIONAR GIGAS
  // ========================================
  gestionar_gigas: {
    messages: ["📱 **Gestión de Gigas**", "", "¿Qué querés hacer con tus GB?"],
    options: [
      { text: "Pasar gigas", action: "pasar_gigas" },
      { text: "Guardar gigas", action: "guardar_gigas" },
      { text: "Ver mi consumo actual", action: "ver_consumo_gigas" },
      { text: "Comprar gigas extra", action: "comprar_gigas_extra" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  // ========================================
  // OFERTA DE FIBRA (SOLO PREMIUM/TITULAR)
  // ========================================
  oferta_fibra: {
    messages: [
      "🌐 **Oferta Especial de Fibra**",
      "",
      "📶 **Internet Ultra Rápido para tu Empresa**",
      "",
      "🚀 **Velocidades disponibles:**",
      "• 300 Mbps: $15.990/mes",
      "• 500 Mbps: $19.990/mes",
      "• 1GB: $29.990/mes",
      "",
      "🎁 **Promoción especial:**",
      "• 50% descuento primeros 6 meses",
      "• Instalación gratuita",
      "• Router WiFi 6 incluido",
      "• Soporte técnico 24/7",
      "",
      "💼 **Ideal para:**",
      "• Teletrabajo",
      "• Videoconferencias HD",
      "• Múltiples dispositivos conectados",
    ],
    options: [
      {
        text: "Consultar disponibilidad",
        action: "consultar_disponibilidad_fibra",
      },
      { text: "Hablar con comercial", action: "contactar_comercial_fibra" },
      { text: "Ver más detalles", action: "detalles_oferta_fibra" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  // ========================================
  // PASAR GIGAS
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
      { text: "✍️ Ingresar número", action: "ingresar_numero_destino" },
      { text: "Ver mi saldo disponible", action: "ver_saldo_disponible" },
      { text: "🔙 Volver", action: "gestionar_gigas" },
    ],
  },

  // ========================================
  // GUARDAR GIGAS
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
      "• GB del mes: 850 MB usados de 5 GB",
      "• GB guardados: 2.3 GB disponibles",
      "• Vencimiento: 15/09/2024",
    ],
    options: [
      {
        text: "✅ Activar guardado automático",
        action: "activar_guardado_automatico",
      },
      {
        text: "Ver historial de GB guardados",
        action: "historial_gb_guardados",
      },
      { text: "Desactivar guardado", action: "desactivar_guardado" },
      { text: "🔙 Volver", action: "gestionar_gigas" },
    ],
  },

  // ========================================
  // ACTIVAR TEST DRIVE
  // ========================================
  activar_test_drive: {
    messages: [
      "🚀 **Activando Test Drive 30 GB...**",
      "",
      "✅ **¡Listo! Tu Test Drive está activo**",
      "",
      "📱 **Detalles de tu beneficio:**",
      "• 30 GB disponibles ahora",
      "• Válido hasta: " +
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
          "es-ES"
        ),
      "• Velocidad 4G/5G completa",
      "• Sin restricciones de uso",
      "",
      "📊 **Para verificar tu saldo:**",
      "• Marcá *444# desde tu celular",
      "• Entrá a Mi Movistar app",
      "",
      "🎉 **¡Disfrutá navegando!**",
    ],
    options: [
      { text: "Ver consumo en tiempo real", action: "ver_consumo_tiempo_real" },
      { text: "Consejos para aprovechar GB", action: "consejos_aprovechar_gb" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  // ========================================
  // TODOS LOS DESCUENTOS CLUB
  // ========================================
  todos_descuentos_club: {
    messages: [
      "🎁 **Todos los Descuentos Club Movistar**",
      "",
      "🎬 **Entretenimiento:**",
      "• Cines: 2x1 en Cinemark, Hoyts, Showcase",
      "• Streaming: 3 meses gratis Netflix, Disney+",
      "• Conciertos: Descuentos en Ticketek",
      "",
      "🍽️ **Gastronomía:**",
      "• McDonald's: 20% off",
      "• Starbucks: 2x1 en bebidas",
      "• Rappi: Envío gratis + descuentos",
      "",
      "🛒 **Compras:**",
      "• Mercado Libre: Envío gratis",
      "• Falabella: 15% descuento adicional",
      "• Samsung: Hasta 25% off en equipos",
      "",
      "✈️ **Viajes:**",
      "• Despegar: Descuentos en hoteles",
      "• Aerolíneas: Millas adicionales",
    ],
    options: [
      {
        text: "Activar descuentos",
        action: "activar_descuentos_seleccionados",
      },
      { text: "Ver vigencias", action: "ver_vigencias_descuentos" },
      { text: "🔙 Volver", action: "beneficio_club_movistar" },
    ],
  },

  // ========================================
  // CONSULTAR DISPONIBILIDAD FIBRA
  // ========================================
  consultar_disponibilidad_fibra: {
    messages: [
      "🌐 **Consulta de Disponibilidad Fibra**",
      "",
      "Para verificar si llega fibra a tu zona necesitamos:",
      "",
      "📍 **Dirección completa:**",
      "• Calle y altura",
      "• Localidad",
      "• Código postal",
      "",
      "💡 **Ejemplo:**",
      "Av. Corrientes 1234, CABA, C1043",
      "",
      "📝 **Escribí tu dirección:**",
    ],
    options: [
      { text: "✍️ Ingresar dirección", action: "ingresar_direccion_fibra" },
      { text: "📞 Llamar para consultar", action: "llamar_consulta_fibra" },
      { text: "🔙 Volver", action: "oferta_fibra" },
    ],
  },

  // ========================================
  // FINALIZACIONES Y ESTADOS
  // ========================================
  fin_conversacion: {
    messages: [
      "¡Espero haberte ayudado!",
      "Si me necesitás, ya sabés dónde encontrarme. ¡Hasta la próxima! 👋",
    ],
    options: [],
  },

  // ========================================
  // CURSOS ESPECÍFICOS
  // ========================================
  cursos_programacion: {
    messages: [
      "💻 **Cursos de Programación**",
      "",
      "🚀 **Cursos disponibles:**",
      "• Introducción a Python",
      "• JavaScript desde cero",
      "• Desarrollo web con HTML/CSS",
      "• Bases de datos SQL",
      "• Git y control de versiones",
      "",
      "📚 **Modalidades:**",
      "• Online y gratuitos",
      "• Con certificado de finalización",
      "• A tu ritmo",
      "",
      "🔗 **Inscribite acá:** http://mov.is/rCQN",
    ],
    options: [
      { text: "Ver todos los cursos", action: "modalidades_cursos" },
      { text: "🔙 Volver", action: "fundacion_telefonica" },
    ],
  },

  cursos_marketing: {
    messages: [
      "📊 **Cursos de Marketing Digital**",
      "",
      "🎯 **Cursos disponibles:**",
      "• Google Ads y SEM",
      "• Redes sociales para empresas",
      "• Email marketing efectivo",
      "• Analytics y métricas",
      "• Estrategias de contenido",
      "",
      "📈 **Beneficios:**",
      "• Impulsa tu negocio",
      "• Certificación gratuita",
      "• Casos prácticos reales",
      "",
      "🔗 **Inscribite acá:** http://mov.is/rCmLj",
    ],
    options: [
      { text: "Ver todos los cursos", action: "modalidades_cursos" },
      { text: "🔙 Volver", action: "fundacion_telefonica" },
    ],
  },

  // ========================================
  // PROCESOS TÉCNICOS
  // ========================================
  activar_guardado_automatico: {
    messages: [
      "✅ **Guardado Automático Activado**",
      "",
      "🎉 **¡Perfecto!** Ahora tus GB se guardarán automáticamente.",
      "",
      "📊 **Configuración actual:**",
      "• Guardado automático: ✅ Activo",
      "• GB mínimos a guardar: 500 MB",
      "• Ciclos de validez: 2 meses",
      "",
      "📱 **Te notificaremos por SMS cuando:**",
      "• Tus GB se guarden",
      "• Estén por vencer",
      "",
      "¿Necesitás algo más?",
    ],
    options: [
      { text: "Cambiar configuración", action: "configurar_guardado" },
      { text: "Ver mi saldo total", action: "ver_saldo_total_gb" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },

  ver_consumo_tiempo_real: {
    messages: [
      "📊 **Consumo en Tiempo Real**",
      "",
      "📱 **Tu estado actual:**",
      "",
      "🎁 **Test Drive 30 GB:**",
      "• Disponibles: 28.7 GB",
      "• Usados: 1.3 GB",
      "• Días restantes: 28",
      "",
      "📶 **Plan principal:**",
      "• Disponibles: 3.2 GB",
      "• Usados: 1.8 GB",
      "• Renuevan: 15/08/2024",
      "",
      "⚡ **Velocidad actual:** 45 Mbps",
    ],
    options: [
      { text: "Actualizar consumo", action: "actualizar_consumo" },
      { text: "Configurar alertas", action: "configurar_alertas_consumo" },
      { text: "🔙 Volver", action: "menu_beneficios" },
    ],
  },
};

// Exportar el CDU para uso en el sistema principal
if (typeof module !== "undefined" && module.exports) {
  module.exports = CDU_BENEFICIOS;
}
