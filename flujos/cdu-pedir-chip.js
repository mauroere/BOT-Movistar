// CDU Pedir un Chip
// Mensajes exactos del diagrama original

const cduPedirChip = {
  //=== PUNTO DE ENTRADA ===//

  menu_pedir_chip: {
    messages: [
      "¡Bien! Voy a ayudarte con este trámite. 👌\n\nDecime, ¿necesitás solo el chip o también un equipo? 📱",
    ],
    options: [
      { text: "Solo un chip", action: "pedir_chip_solo_chip" },
      { text: "Chip + equipo", action: "pedir_chip_chip_equipo" },
      { text: "Volver", action: "menu_principal" },
    ],
  },

  //=== FLUJO SOLO UN CHIP ===//

  pedir_chip_solo_chip: {
    messages: [
      "Perfecto, vamos a hacer el trámite desde acá para que recibas el chip en tu domicilio. 😁\n\nTené en cuenta estos tiempos de envío: AMBA: hasta 4 días hábiles \nResto del país: hasta 10 días hábiles. \nSi lo necesitás con urgencia, podés pedirlo en alguna de nuestras sucursales.\n\n¿Empezamos?",
    ],
    options: [
      { text: "Sí, continuar", action: "pedir_chip_amba" },
      { text: "Pedir en sucursal", action: "pedir_chip_interior" },
      { text: "Volver", action: "menu_pedir_chip" },
    ],
  },

  //=== FLUJO AMBA ===//

  pedir_chip_amba: {
    messages: [
      "Empezamos! 😄\n\n¿Necesitás pedir un chip nuevo para esta línea u otra de tu CUIT?",
    ],
    options: [
      { text: "Esta línea", action: "pedir_chip_esta_linea" },
      { text: "Otra línea del CUIT", action: "pedir_chip_transferir" },
      { text: "3 líneas o más", action: "pedir_chip_tres_lineas" },
    ],
  },

  pedir_chip_esta_linea: {
    messages: [
      "¡Todo en orden! 👌\n\nSegún mis registros, tengo este domicilio de facturación:\n{{domicilio de facturación}}\n\n¿Querés que enviemos el chip a esa dirección?",
    ],
    options: [
      { text: "Sí, a esta dirección", action: "pedir_chip_confirmar_direccion" },
      { text: "No, a otra dirección", action: "pedir_chip_otra_direccion" },
    ],
  },

  pedir_chip_confirmar_direccion: {
    messages: [
      "¡Ok! ¿Necesitás agregar algún comentario para ayudarnos a encontrar el domicilio? 🤔 \nPor ejemplo: es un local en una galería, es una casa al fondo del pasillo, es un kiosco.",
    ],
    options: [
      { text: "Sí, agregar", action: "pedir_chip_agregar_comentario" },
      { text: "No, continuar", action: "pedir_chip_persona_autorizada" },
    ],
  },

  pedir_chip_agregar_comentario: {
    messages: [
      "Dale, escribime el comentario acá: 👇",
    ],
    options: [
      { text: "Continuar", action: "pedir_chip_persona_autorizada" },
    ],
  },

  pedir_chip_persona_autorizada: {
    messages: [
      "Por favor, escribime el nombre y apellido de la persona autorizada para recibir el chip.\n👆 Tiene que ser mayor de 18 años.",
    ],
    options: [
      { text: "Continuar", action: "pedir_chip_dni" },
    ],
  },

  pedir_chip_dni: {
    messages: [
      "¡Anotado! ✍\n\nPor favor, escribime el número de DNI de la persona que recibirá el chip.\nEscribí solo números, por ejemplo: _31222333_.",
    ],
    options: [
      { text: "Continuar", action: "pedir_chip_celular" },
    ],
  },

  pedir_chip_celular: {
    messages: [
      "¡Estamos terminando! 😁\nPor último, dejame un celular de contacto. Escribilo con código de área, sin cero ni 15. Por ejemplo: _1122223333_",
    ],
    options: [
      { text: "Continuar", action: "pedir_chip_confirmacion_final" },
    ],
  },

  pedir_chip_confirmacion_final: {
    messages: [
      "¡Listo! Ya tengo todos los datos. 🥳 \nVas a recibir tu chip dentro los próximos 10 días hábiles, según tu ubicación. No te olvides de tener el DNI a mano. ☺\n\nPara conocer el estado de tu envío, podés escribirme _seguir mi chip_. Si no lo recibís en ese tiempo o tenés algún problema, contactate con tu representante comercial.\n\n¿Te ayudo con algo más?",
    ],
    options: [
      { text: "Eso es todo, gracias", action: "pedir_chip_despedida" },
      { text: "Pedir otro chip", action: "menu_pedir_chip" },
      { text: "Menu principal", action: "menu_principal" },
    ],
  },

  pedir_chip_despedida: {
    messages: [
      "¡Fue un placer ayudarte! 😊\n\nEstoy acá para lo que necesites. ¡Hasta la próxima! 👋",
    ],
    options: [
      { text: "Menu principal", action: "menu_principal" },
    ],
  },

  pedir_chip_tres_lineas: {
    messages: [
      "En ese caso, voy a transferirte con tu representante comercial para agilizar el trámite. 👌",
    ],
    options: [
      { text: "Finalizar", action: "menu_principal" },
    ],
  },

  pedir_chip_otra_direccion: {
    messages: [
      "¿De qué necesitás *agregar algún comentario* para ayudarnos a encontrar el domicilio? 👀 WhatsApp primero de una localidad una una de la línea en tu celular, en una casa al fondo del patio, en un kiosco.",
    ],
    options: [
      { text: "Sí, una dirección", action: "pedir_chip_nueva_direccion" },
      { text: "No, continuar", action: "pedir_chip_persona_autorizada" },
    ],
  },

  pedir_chip_nueva_direccion: {
    messages: [
      "Por favor, escribime el *nombre y apellido* de la persona autorizada para retirar el chip. Vas a tener que suscripción o persona *nombre y apellido de la empresa autorizada*",
    ],
    options: [
      { text: "Empezar de nuevo", action: "menu_pedir_chip" },
      { text: "Hablar afuera del CDU", action: "pedir_chip_persona_autorizada" },
    ],
  },

  //=== FLUJO INTERIOR (PEDIR EN SUCURSAL) ===//

  pedir_chip_interior: {
    messages: [
      "En esta web podés buscar la Tienda Movistar más cercana a tu domicilio: http://mov.is/r4owm.\n\nTené en cuenta que solo la persona titular o apoderada de la empresa podrá retirar el chip presentando el DNI.\n\n¿Te ayudo con algo más? 😊",
    ],
    options: [
      { text: "No, gracias", action: "pedir_chip_no_gracias" },
      { text: "Volver", action: "menu_pedir_chip" },
      { text: "Menu principal", action: "menu_principal" },
    ],
  },

  pedir_chip_no_gracias: {
    messages: [
      "¡Me alegra haberte ayudado! 😊\n\nSi necesitás algo más, no dudes en escribirme. ¡Hasta pronto! 👋",
    ],
    options: [
      { text: "Menu principal", action: "menu_principal" },
    ],
  },

  //=== CHIP + EQUIPO ===//

  pedir_chip_chip_equipo: {
    messages: [
      "Por favor, aguardame un momento y te transfiero con un representante Comercial . 😉",
    ],
    options: [
      { text: "ASESOR. Fin de Flujo", action: "pedir_chip_transferir" },
    ],
  },

  //=== TRANSFERENCIA ===//

  pedir_chip_transferir: {
    messages: [
      "Voy a transferirte con tu *representante comercial* para terminar este trámite 📞",
    ],
    options: [{ text: "Finalizar", action: "menu_principal" }],
  },
};

// Registrar el CDU en el sistema global
if (typeof window !== "undefined") {
  window.cduPedirChip = cduPedirChip;
  console.log("✅ CDU Pedir Chip cargado correctamente");
}

// Exportar para Node.js si es necesario
if (typeof module !== "undefined" && module.exports) {
  module.exports = cduPedirChip;
}
