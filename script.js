class WhatsAppBot {
  constructor() {
    this.chatMessages = document.getElementById("chatMessages");
    this.messageInput = document.getElementById("messageInput");
    this.sendBtn = document.getElementById("sendBtn");
    this.voiceBtn = document.getElementById("voiceBtn");

    this.initEventListeners();
    this.botFlows = this.initBotFlows();
    this.currentFlow = null;
    this.userState = {
      name: "",
      company: "",
      currentStep: 0,
      selectedService: "",
    };
  }

  initEventListeners() {
    // Input text changes
    this.messageInput.addEventListener("input", () => {
      if (this.messageInput.value.trim()) {
        this.sendBtn.style.display = "flex";
        this.voiceBtn.style.display = "none";
      } else {
        this.sendBtn.style.display = "none";
        this.voiceBtn.style.display = "flex";
      }
    });

    // Send message on Enter
    this.messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    });

    // Send button click
    this.sendBtn.addEventListener("click", () => {
      this.sendMessage();
    });

    // Action button clicks
    document.addEventListener("click", (e) => {
      if (e.target.closest(".action-btn")) {
        this.handleActionButton(e.target.closest(".action-btn"));
      }
    });
  }

  initBotFlows() {
    // Retornar objeto vacío - los flujos se cargarán desde flujo-bienvenida-miro.js
    return {};
  }

  sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, "sent");
    this.messageInput.value = "";
    this.sendBtn.style.display = "none";
    this.voiceBtn.style.display = "flex";

    // Process bot response
    setTimeout(() => {
      this.processBotResponse(message);
    }, 1000);
  }

  addMessage(text, type = "received", options = null) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type} new`;

    const currentTime = new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let messageHTML = `
            <div class="message-content">
                <span class="message-text">${text}</span>
        `;

    if (options && type === "received") {
      messageHTML += `<div class="action-buttons">`;
      options.forEach((option) => {
        messageHTML += `
                    <button class="action-btn" data-action="${option.action}">
                        ${option.text}
                    </button>
                `;
      });
      messageHTML += `</div>`;
    }

    messageHTML += `
                <span class="message-time">${currentTime}</span>
                ${
                  type === "sent"
                    ? '<i class="fas fa-check-double message-check"></i>'
                    : ""
                }
            </div>
        `;

    messageDiv.innerHTML = messageHTML;
    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();

    // Remove animation class after animation completes
    setTimeout(() => {
      messageDiv.classList.remove("new");
    }, 300);
  }

  addTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message received typing-message";
    typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
    this.chatMessages.appendChild(typingDiv);
    this.scrollToBottom();
    return typingDiv;
  }

  removeTypingIndicator(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
      typingDiv.parentNode.removeChild(typingDiv);
    }
  }

  processBotResponse(userMessage) {
    const typingIndicator = this.addTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator(typingIndicator);

      // Detectar intención del usuario y responder apropiadamente
      const message = userMessage.toLowerCase();

      if (
        message.includes("hola") ||
        message.includes("hi") ||
        message.includes("buenos") ||
        message.includes("buenas")
      ) {
        // Saludo inicial - activar flujo de bienvenida
        this.executeFlow("welcome");
      } else if (message.includes("gracias") || message.includes("thank")) {
        this.addMessage("¡De nada! ¿Hay algo más en lo que pueda ayudarte? 😊");
        setTimeout(() => this.executeFlow("welcome"), 2000);
      } else if (
        message.includes("factura") ||
        message.includes("billing") ||
        message.includes("pagar")
      ) {
        // Consulta sobre facturación
        this.executeFlow("billing");
      } else if (
        message.includes("producto") ||
        message.includes("servicio") ||
        message.includes("plan")
      ) {
        // Consulta sobre productos
        this.executeFlow("products");
      } else if (
        message.includes("soporte") ||
        message.includes("ayuda") ||
        message.includes("problema")
      ) {
        // Solicitud de soporte
        this.executeFlow("support");
      } else if (
        message.includes("empresa") ||
        message.includes("negocio") ||
        message.includes("comercial")
      ) {
        // Consulta empresarial
        this.executeFlow("business");
      } else {
        // Respuesta genérica que activa el menú principal
        this.addMessage(
          "¡Hola! Soy tu asistente virtual de Movistar Empresas. 🤖"
        );
        setTimeout(() => {
          this.addMessage("¿En qué puedo ayudarte hoy?");
          setTimeout(() => this.executeFlow("welcome"), 1000);
        }, 1000);
      }
    }, 1500);
  }

  executeFlow(flowName) {
    const flow = this.botFlows[flowName];
    if (!flow) return;

    this.currentFlow = flowName;

    // Send flow messages with delay
    flow.messages.forEach((message, index) => {
      setTimeout(() => {
        if (index === flow.messages.length - 1 && flow.options) {
          // Last message with options
          this.addMessage(message, "received", flow.options);
        } else {
          this.addMessage(message, "received");
        }
      }, (index + 1) * 800);
    });
  }

  handleActionButton(button) {
    const action = button.getAttribute("data-action");
    const text = button.textContent.trim();

    // Add user selection as sent message
    this.addMessage(text, "sent");

    // Process action
    setTimeout(() => {
      this.processAction(action);
    }, 1000);
  }

  processAction(action) {
    const typingIndicator = this.addTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator(typingIndicator);

      switch (action) {
        // Flujo principal
        case "welcome":
          this.executeFlow("welcome");
          break;

        // TOP / Empresas - flujos principales
        case "top_empresas":
          this.executeFlow("top_empresas");
          break;
        case "top_titular":
          this.executeFlow("top_titular");
          break;
        case "top_usuario":
          this.executeFlow("top_usuario");
          break;
        case "top_usuario_facturacion":
          this.executeFlow("top_usuario_facturacion");
          break;
        case "top_usuario_comercial":
          this.executeFlow("top_usuario_comercial");
          break;
        case "top_usuario_soporte":
          this.executeFlow("top_usuario_soporte");
          break;
        case "top_usuario_segundo_menu":
          this.executeFlow("top_usuario_segundo_menu");
          break;
        case "top_usuario_mi_plan":
          this.executeFlow("top_usuario_mi_plan");
          break;
        case "top_usuario_consumo_datos":
          this.executeFlow("top_usuario_consumo_datos");
          break;
        case "top_usuario_roaming":
          this.executeFlow("top_usuario_roaming");
          break;
        case "top_titular_dentro_horario":
          this.executeFlow("top_titular_dentro_horario");
          break;
        case "top_titular_fuera_horario":
          this.executeFlow("top_titular_fuera_horario");
          break;
        case "conectar_asesor_titular":
          this.showMessage("🔄 Conectando con tu asesor comercial...", "bot");
          this.showMessage("👤 **Asesor disponible** - Te atenderá en un momento.", "bot");
          break;
        case "top_robo":
          this.executeFlow("top_robo");
          break;
        case "top_tecnica":
          this.executeFlow("top_tecnica");
          break;
        case "premium_emprendedores":
          this.executeFlow("premium_emprendedores");
          break;

        // Premium y Emprendedores - Pool y Personalizado
        case "premium_pool":
          this.executeFlow("premium_pool");
          break;
        case "premium_personalizado":
          this.executeFlow("premium_personalizado");
          break;

        // Pool - Línea móvil y fija/internet
        case "pool_linea_movil":
          this.executeFlow("pool_linea_movil");
          break;
        case "pool_linea_fija_internet":
          this.executeFlow("pool_linea_fija_internet");
          break;

        // Personalizado - Línea móvil y fija/internet
        case "personalizado_linea_movil":
          this.executeFlow("personalizado_linea_movil");
          break;
        case "personalizado_linea_fija_internet":
          this.executeFlow("personalizado_linea_fija_internet");
          break;

        // TOP Empresas - subflujos principales
        case "top_consulta_facturacion":
          this.executeFlow("top_consulta_facturacion");
          break;
        case "top_gestion_comercial":
          this.executeFlow("top_gestion_comercial");
          break;
        case "top_soporte_tecnico":
          this.executeFlow("top_soporte_tecnico");
          break;

        // Pool móvil - subflujos
        case "pool_movil_facturacion":
          this.executeFlow("pool_movil_facturacion");
          break;
        case "pool_movil_comercial":
          this.executeFlow("pool_movil_comercial");
          break;
        case "pool_movil_soporte":
          this.executeFlow("pool_movil_soporte");
          break;
        case "pool_movil_consultas":
          this.executeFlow("pool_movil_consultas");
          break;

        // Pool fija/internet - subflujos
        case "pool_fija_facturacion":
          this.executeFlow("pool_fija_facturacion");
          break;
        case "pool_fija_comercial":
          this.executeFlow("pool_fija_comercial");
          break;
        case "pool_fija_soporte":
          this.executeFlow("pool_fija_soporte");
          break;
        case "pool_fija_consultas":
          this.executeFlow("pool_fija_consultas");
          break;

        // Personalizado móvil - subflujos
        case "personalizado_movil_facturacion":
          this.executeFlow("personalizado_movil_facturacion");
          break;
        case "personalizado_movil_comercial":
          this.executeFlow("personalizado_movil_comercial");
          break;
        case "personalizado_movil_soporte":
          this.executeFlow("personalizado_movil_soporte");
          break;
        case "personalizado_movil_consultas":
          this.executeFlow("personalizado_movil_consultas");
          break;

        // Personalizado fija/internet - subflujos
        case "personalizado_fija_facturacion":
          this.executeFlow("personalizado_fija_facturacion");
          break;
        case "personalizado_fija_comercial":
          this.executeFlow("personalizado_fija_comercial");
          break;
        case "personalizado_fija_soporte":
          this.executeFlow("personalizado_fija_soporte");
          break;
        case "personalizado_fija_consultas":
          this.executeFlow("personalizado_fija_consultas");
          break;

        // TOP Empresas - subflujos detallados (solo los que tienen flujos _detalle)
        case "top_ver_factura":
          this.executeFlow("top_ver_factura_detalle");
          break;
        case "top_estado_cuenta":
          this.executeFlow("top_estado_cuenta_detalle");
          break;
        case "top_medios_pago":
          this.executeFlow("top_medios_pago_detalle");
          break;
        case "top_reclamos":
          this.executeFlow("top_reclamos_detalle");
          break;
        case "top_falla_servicio":
          this.executeFlow("top_falla_servicio_detalle");
          break;
        case "top_configuracion":
          this.executeFlow("top_configuracion_detalle");
          break;
        case "top_internet_dedicado":
          this.executeFlow("top_internet_dedicado_detalle");
          break;
        case "top_cloud":
          this.executeFlow("top_cloud_detalle");
          break;
        case "top_ampliar_servicios":
          this.executeFlow("top_ampliar_servicios_detalle");
          break;
        case "top_nuevos_productos":
          this.executeFlow("top_nuevos_productos_detalle");
          break;

        // Premium - subflujos detallados (solo los que tienen flujos _detalle)
        case "premium_ver_factura":
          this.executeFlow("premium_ver_factura_detalle");
          break;
        case "premium_estado_cuenta":
          this.executeFlow("premium_estado_cuenta_detalle");
          break;
        case "premium_conexion":
          this.executeFlow("premium_conexion_detalle");
          break;
        case "premium_config_servicios":
          this.executeFlow("premium_config_servicios_detalle");
          break;
        case "premium_planes_internet":
          this.executeFlow("premium_planes_internet_detalle");
          break;
        case "premium_moviles":
          this.executeFlow("premium_moviles_detalle");
          break;
        case "premium_contratar":
          this.executeFlow("premium_contratar_detalle");
          break;

        // NUEVO: Menú "Ver opciones" y sus subflujos
        case "ver_opciones_menu":
          this.executeFlow("ver_opciones_menu");
          break;

        // Hablar con asesoría
        case "hablar_asesoria":
          this.executeFlow("hablar_asesoria");
          break;

        // Facturas y pagos - subflujos
        case "facturas_pagos":
          this.executeFlow("facturas_pagos");
          break;
        case "ver_ultima_factura":
        case "estado_cuenta":
        case "medios_pago":
        case "realizar_pago":
        case "reclamo_facturacion":
          this.processDirectResponse(action);
          break;

        // Plan, datos y roaming - subflujos
        case "plan_datos_roaming":
          this.executeFlow("plan_datos_roaming");
          break;
        case "consultar_plan":
        case "consumo_datos":
        case "modificar_datos":
        case "info_roaming":
        case "cambiar_plan":
          this.processDirectResponse(action);
          break;

        // Ayuda técnica - subflujos
        case "ayuda_tecnica":
          this.executeFlow("ayuda_tecnica");
          break;
        case "problemas_conexion":
        case "config_equipos":
        case "lentitud_internet":
        case "problemas_llamadas":
        case "soporte_especializado":
          this.processDirectResponse(action);
          break;

        // Contratar servicios - subflujos
        case "contratar_servicios":
          this.executeFlow("contratar_servicios");
          break;
        case "contratar_lineas":
        case "contratar_internet":
        case "contratar_cloud":
        case "contratar_paquetes":
        case "contratar_adicionales":
          this.processDirectResponse(action);
          break;

        // Consultas y reclamos - subflujos
        case "consultas_reclamos":
          this.executeFlow("consultas_reclamos");
          break;
        case "consulta_general":
        case "presentar_reclamo":
        case "seguimiento_reclamo":
        case "consulta_servicios":
        case "info_cuenta":
          this.processDirectResponse(action);
          break;

        // Más opciones - subflujos
        case "mas_opciones":
          this.executeFlow("mas_opciones");
          break;
        case "portabilidad":
        case "cambio_titularidad":
        case "baja_servicios":
        case "info_cobertura":
        case "sucursales_horarios":
        case "contacto_ejecutivo":
          this.processDirectResponse(action);
          break;

        case "premium_cambiar_plan":
          this.executeFlow("premium_cambiar_plan_detalle");
          break;

        // Flujos genéricos (mantener compatibilidad)
        case "billing":
          this.executeFlow("billing");
          break;
        case "products":
          this.executeFlow("products");
          break;
        case "support":
          this.executeFlow("support");
          break;
        case "business":
          this.executeFlow("business");
          break;

        // Acciones específicas
        case "last_bill":
          this.addMessage(
            "Tu última factura es de $45,230 con vencimiento el 15 de agosto. ¿Necesitas que te envíe el detalle por email?"
          );
          break;
        case "due_dates":
          this.addMessage(
            "Próximos vencimientos:\n• 15 de agosto: $45,230\n• 15 de septiembre: Estimado $47,100"
          );
          break;
        case "human_support":
          this.addMessage(
            "Te estoy derivando con un especialista técnico. En breve se comunicarán contigo. 👨‍💼"
          );
          break;
        default:
          // Para acciones no definidas, intentar ejecutar como flujo
          if (this.botFlows[action]) {
            this.executeFlow(action);
          } else {
            setTimeout(() => this.executeFlow("welcome"), 2000);
          }
          break;
      }
    }, 1500);
  }

  // Método para procesar respuestas directas (sin flujo adicional)
  processDirectResponse(action) {
    // Check if the response exists in RESPUESTAS_BIENVENIDA from flujo-bienvenida-nuevo.js
    if (window.RESPUESTAS_BIENVENIDA && window.RESPUESTAS_BIENVENIDA[action]) {
      this.addMessage(window.RESPUESTAS_BIENVENIDA[action], "received");

      // After showing the response, offer to go back to the relevant menu
      setTimeout(() => {
        const backOptions = this.getBackOptions(action);
        if (backOptions) {
          this.addMessage("¿Necesitás algo más?", "received", backOptions);
        }
      }, 2000);
    } else {
      // Fallback if response not found
      this.addMessage(
        "Procesando tu solicitud... Un momento por favor. 🔄",
        "received"
      );
      setTimeout(() => {
        this.addMessage("¿En qué más puedo ayudarte?", "received", [
          { text: "🔙 Volver al menú principal", action: "welcome" },
        ]);
      }, 1500);
    }
  }

  // Método para obtener opciones de regreso apropiadas según la acción
  getBackOptions(action) {
    if (
      action.includes("ver_ultima_factura") ||
      action.includes("estado_cuenta") ||
      action.includes("medios_pago") ||
      action.includes("realizar_pago") ||
      action.includes("reclamo_facturacion")
    ) {
      return [
        { text: "Más sobre facturas y pagos", action: "facturas_pagos" },
        { text: "🔙 Volver al menú", action: "ver_opciones_menu" },
      ];
    }

    if (
      action.includes("consultar_plan") ||
      action.includes("consumo_datos") ||
      action.includes("modificar_datos") ||
      action.includes("info_roaming") ||
      action.includes("cambiar_plan")
    ) {
      return [
        { text: "Más sobre plan y datos", action: "plan_datos_roaming" },
        { text: "🔙 Volver al menú", action: "ver_opciones_menu" },
      ];
    }

    if (
      action.includes("problemas_conexion") ||
      action.includes("config_equipos") ||
      action.includes("lentitud_internet") ||
      action.includes("problemas_llamadas") ||
      action.includes("soporte_especializado")
    ) {
      return [
        { text: "Más ayuda técnica", action: "ayuda_tecnica" },
        { text: "🔙 Volver al menú", action: "ver_opciones_menu" },
      ];
    }

    if (action.includes("contratar_")) {
      return [
        { text: "Más servicios", action: "contratar_servicios" },
        { text: "🔙 Volver al menú", action: "ver_opciones_menu" },
      ];
    }

    if (
      action.includes("consulta_") ||
      action.includes("presentar_reclamo") ||
      action.includes("seguimiento_reclamo") ||
      action.includes("info_cuenta")
    ) {
      return [
        { text: "Más consultas", action: "consultas_reclamos" },
        { text: "🔙 Volver al menú", action: "ver_opciones_menu" },
      ];
    }

    if (
      action.includes("portabilidad") ||
      action.includes("baja_servicios") ||
      action.includes("info_cobertura") ||
      action.includes("sucursales_horarios") ||
      action.includes("contacto_ejecutivo")
    ) {
      return [
        { text: "Más opciones", action: "mas_opciones" },
        { text: "🔙 Volver al menú", action: "ver_opciones_menu" },
      ];
    }

    return [{ text: "🔙 Volver al menú", action: "ver_opciones_menu" }];
  }

  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  // Method to add custom flows from MIRO boards
  addCustomFlow(flowName, flowData) {
    this.botFlows[flowName] = flowData;
  }

  // Method to simulate different scenarios
  simulateScenario(scenario) {
    switch (scenario) {
      case "new_customer":
        this.addMessage(
          "¡Bienvenido a Movistar Empresas! Veo que eres un cliente nuevo. 🎉"
        );
        break;
      case "returning_customer":
        this.addMessage("¡Hola de nuevo! ¿En qué puedo ayudarte hoy?");
        break;
      case "urgent_support":
        this.addMessage(
          "Entiendo que tienes un problema urgente. Te estoy conectando con soporte prioritario. ⚡"
        );
        break;
    }
  }
}

// Initialize the bot when page loads
document.addEventListener("DOMContentLoaded", () => {
  const bot = new WhatsAppBot();

  // Make bot globally accessible for custom integrations
  window.whatsappBot = bot;

  // No auto-start - los mensajes iniciales ya están en el HTML
  // El flujo se activará cuando el usuario escriba "Hola!"
});

// Custom functions for MIRO integration
window.addMiroFlow = function (flowName, flowData) {
  if (window.whatsappBot) {
    window.whatsappBot.addCustomFlow(flowName, flowData);
    console.log(`Flow "${flowName}" added successfully`);
  }
};

window.simulateScenario = function (scenario) {
  if (window.whatsappBot) {
    window.whatsappBot.simulateScenario(scenario);
  }
};

// Example of how to add a custom flow from MIRO
/*
Example usage for adding flows from your MIRO boards:

window.addMiroFlow('custom_billing', {
    messages: [
        "Flujo personalizado de facturación desde MIRO",
        "¿Qué tipo de consulta de facturación tienes?"
    ],
    options: [
        { text: "Opción 1 desde MIRO", action: "miro_option_1" },
        { text: "Opción 2 desde MIRO", action: "miro_option_2" }
    ]
});
*/
