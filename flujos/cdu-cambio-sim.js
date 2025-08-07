// CDU Cambio de SIM/eSIM
// Textos originales exactos proporcionados por el usuario

const cduCambioSim = {
  //=== PUNTO DE ENTRADA PRINCIPAL ===//

  menu_cambio_sim: {
    messages: [
      "🔵 **[ASESOR]** CDU Cambio de SIM/eSIM\n\n🎯 **SELECCIONAR PERFIL DEL CLIENTE:**\n\nClasificar el tipo de usuario para aplicar el flujo correspondiente\n\n⚠️ *Esta clasificación es interna - el cliente NO ve esta pantalla*",
    ],
    options: [
      {
        text: "👔 PyE - Titular/Autorizado",
        action: "cambio_sim_pye_titulares_autorizados",
      },
      { text: "👥 PyE - Usuario", action: "cambio_sim_pye_usuarios" },
      { text: "🏢 TyE - Usuario", action: "cambio_sim_tye_usuarios" },
      { text: "⬅️ Volver al selector de CDUs", action: "menu_principal" },
    ],
  },

  //=== TEXTO ORIGINAL PyE TITULARES/AUTORIZADOS ===//

  cambio_sim_pye_titulares_autorizados: {
    messages: [
      "Puedo ayudarte a *pedir tu nuevo chip físico o eSIM virtual manteniendo tu número*. 👌\n\n👆 La eSIM es un chip virtual que se activa escaneando un código QR. \n\nEstá disponible solo para algunos celus. Si tenés dudas, buscá los modelos compatibles acá: http://mov.is/qJ2VB.\n\nSi necesitás dar de alta un número nuevo, elegí _Pedir línea nueva_ ¿Cómo seguimos? 😊",
    ],
    options: [
      { text: "Pedir un Chip", action: "pedir_chip_solo_chip" },
      { text: "Pedir una eSIM", action: "pedir_esim_pendiente" },
      { text: "Pedir línea nueva", action: "pedir_linea_nueva_asesor" },
      { text: "⬅️ Volver", action: "menu_cambio_sim" },
    ],
  },

  //=== TEXTO ORIGINAL PyE USUARIOS ===//

  cambio_sim_pye_usuarios: {
    messages: [
      "¡Hola! 😊 Veo que necesitas cambiar tu **SIM/eSIM**. ⚠️ **IMPORTANTE para usuarios PyE:** Para realizar este cambio necesitas que el **titular de la cuenta** autorice la operación. Si no tienes la autorización del titular, él puede: • Llamar para autorizar el cambio • Venir personalmente • Darte autorización por escrito ¿Tienes autorización del titular? 👔",
    ],
    options: [
      { text: "✅ Sí, tengo autorización", action: "cambio_sim_completado" },
      {
        text: "❌ No tengo autorización",
        action: "cambio_sim_sin_autorizacion",
      },
      { text: "⬅️ Volver", action: "menu_cambio_sim" },
    ],
  },

  //=== TEXTO ORIGINAL TyE USUARIOS ===//

  cambio_sim_tye_usuarios: {
    messages: [
      "¡Hola! 😊 Veo que tienes una línea **empresarial (TyE)** y necesitas cambiar tu SIM/eSIM. 🏢 **Para usuarios TyE** necesitamos validar tu autorización empresarial. 📋 **Información requerida:** • Identificación personal vigente • Autorización de la empresa • Verificación de que eres usuario autorizado ¿Tienes la documentación necesaria? 📄",
    ],
    options: [
      {
        text: "✅ Sí, tengo toda la documentación",
        action: "cambio_sim_completado",
      },
      {
        text: "❌ No tengo la documentación completa",
        action: "cambio_sim_sin_documentacion",
      },
      { text: "⬅️ Volver", action: "menu_cambio_sim" },
    ],
  },

  //=== NODOS DE FINALIZACIÓN BÁSICOS ===//

  cambio_sim_completado: {
    messages: [
      "🎉 ¡Cambio completado exitosamente! Tu SIM/eSIM está activo y funcionando.",
    ],
    options: [{ text: "✅ Gracias", action: "menu_principal" }],
  },

  cambio_sim_sin_autorizacion: {
    messages: [
      "Para proceder necesitas la autorización del titular. Por favor contacta al titular de la cuenta.",
    ],
    options: [{ text: "✅ Entendido", action: "menu_principal" }],
  },

  cambio_sim_sin_documentacion: {
    messages: [
      "Para proceder necesitas la documentación empresarial completa. Por favor consigue la documentación y regresa.",
    ],
    options: [{ text: "✅ Entendido", action: "menu_principal" }],
  },

  //=== NUEVAS OPCIONES PyE TITULARES/AUTORIZADOS ===//

  pedir_esim_pendiente: {
    messages: [
      "🔵 **[ASESOR]** El CDU para eSIM aún no está desarrollado. Derivar manualmente al proceso correspondiente.",
    ],
    options: [
      { text: "⬅️ Volver", action: "cambio_sim_pye_titulares_autorizados" },
      { text: "🏠 Ir al menú principal", action: "menu_principal" },
    ],
  },

  pedir_linea_nueva_asesor: {
    messages: [
      "Por favor, aguardame un momento y te transfiero con un representante Comercial . �",
    ],
    options: [
      { text: "✅ Finalizar", action: "menu_principal" },
    ],
  },

  //=== FLUJO PEDIR CHIP INTEGRADO ===//

  pedir_chip_solo_chip: {
    messages: [
      "Perfecto, vamos a hacer el trámite. Decime ¿necesitás solo el chip o también un equipo? 📱\n\nTené en cuenta estos *Métodos de Envío*:\n*AMBA*: Envío a casa, Colonia, y *Resto del país*: Solo retira desde Movistar, deberás ir presencialmente.\n\n¿Estás en AMBA? 👆",
    ],
    options: [
      { text: "Sí, AMBA", action: "pedir_chip_amba" },
      { text: "No, interior", action: "pedir_chip_interior" },
      { text: "Volver", action: "cambio_sim_pye_titulares_autorizados" },
    ],
  },

  pedir_chip_amba: {
    messages: [
      "¡Todo en orden! 👌\n\nSegún mis registros, tengo este *domicilio de facturación*:\n((domicilio de facturación))\n\n¿Querés que enviemos el chip a esa dirección?",
    ],
    options: [
      { text: "Sí, agregar", action: "pedir_chip_transferir" },
      { text: "No, otra dirección", action: "pedir_chip_otra_direccion" },
    ],
  },

  pedir_chip_otra_direccion: {
    messages: [
      "¿De qué necesitás *agregar algún comentario* para ayudarnos a encontrar el domicilio? 👀 WhatsApp primero de una localidad una una de la línea en tu celular, en una casa al fondo del patio, en un kiosco.",
    ],
    options: [
      { text: "Sí, una dirección", action: "pedir_chip_nueva_direccion" },
      { text: "No, continuar", action: "pedir_chip_transferir" },
    ],
  },

  pedir_chip_nueva_direccion: {
    messages: [
      "Por favor, escribime el *nombre y apellido* de la persona autorizada para retirar el chip. Vas a tener que suscripción o persona *nombre y apellido de la empresa autorizada*",
    ],
    options: [
      { text: "Empezar de nuevo", action: "cambio_sim_pye_titulares_autorizados" },
      { text: "Hablar afuera del CDU", action: "pedir_chip_transferir" },
    ],
  },

  pedir_chip_interior: {
    messages: [
      "Ningún problema.\n\nVoy a transferirte con tu *representante comercial* para terminar este trámite 📞",
    ],
    options: [
      { text: "Hablar afuera del CDU", action: "pedir_chip_transferir" },
    ],
  },

  pedir_chip_transferir: {
    messages: [
      "Voy a transferirte con tu *representante comercial* para terminar este trámite 📞",
    ],
    options: [
      { text: "Finalizar", action: "menu_principal" },
    ],
  },
};

// Registrar el CDU en el sistema global
if (typeof window !== "undefined") {
  window.cduCambioSim = cduCambioSim;
  console.log("✅ CDU Cambio de SIM/eSIM cargado correctamente");
}

// Exportar para Node.js si es necesario
if (typeof module !== "undefined" && module.exports) {
  module.exports = cduCambioSim;
}
