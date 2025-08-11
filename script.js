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
    // Los flujos se cargarán dinámicamente desde los archivos CDU
    return {};
  }

  // Cargar dinámicamente los CDUs disponibles
  async loadCDUs() {
    try {
      // Cargar CDU de Bienvenida
      if (typeof FLUJO_BIENVENIDA_MIRO !== "undefined") {
        Object.assign(this.botFlows, FLUJO_BIENVENIDA_MIRO);
      }

      // Cargar CDU de Factura con Botonera
      if (typeof CDU_FACTURA_BOTONERA !== "undefined") {
        Object.assign(this.botFlows, CDU_FACTURA_BOTONERA);
      }

      // Cargar CDU de Contratar Servicios
      if (typeof CDU_CONTRATAR_SERVICIOS !== "undefined") {
        Object.assign(this.botFlows, CDU_CONTRATAR_SERVICIOS);
      }

      // Cargar CDU de Celulares y Chips
      if (typeof CDU_CELULARES_CHIPS !== "undefined") {
        Object.assign(this.botFlows, CDU_CELULARES_CHIPS);
      }

      // Cargar CDU de Beneficios
      if (typeof CDU_BENEFICIOS !== "undefined") {
        Object.assign(this.botFlows, CDU_BENEFICIOS);
      }

      // Cargar CDU de Plan x Botonera
      if (typeof CDU_PLAN_BOTONERA !== "undefined") {
        Object.assign(this.botFlows, CDU_PLAN_BOTONERA);
      }

      // Cargar CDU de Factura de esta línea
      if (typeof cduFacturaEstaLinea !== "undefined") {
        Object.assign(this.botFlows, cduFacturaEstaLinea);
      }

      // Cargar CDU de Cambio de SIM/eSIM
      if (typeof cduCambioSim !== "undefined") {
        Object.assign(this.botFlows, cduCambioSim);
      }

      // Cargar CDU de Pedir Chip
      if (typeof cduPedirChip !== "undefined") {
        Object.assign(this.botFlows, cduPedirChip);
      }

      console.log("✅ CDUs cargados:", Object.keys(this.botFlows));
    } catch (error) {
      console.error("Error cargando CDUs:", error);
    }
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

    // Remove animation class after animation completes and scroll again
    setTimeout(() => {
      messageDiv.classList.remove("new");
      this.scrollToBottom();
    }, 300);

    // Additional scroll for buttons if they exist
    if (options && type === "received") {
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
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
        // Respuesta genérica que activa el menú principal directamente
        setTimeout(() => this.executeFlow("welcome"), 1000);
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
        // Ensure scroll to bottom after each message
        setTimeout(() => this.scrollToBottom(), 100);
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
          this.showMessage(
            "👤 **Asesor disponible** - Te atenderá en un momento.",
            "bot"
          );
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

        // Facturas y pagos - NUEVO CDU
        case "facturacion_cuit":
          this.executeFlow("facturacion_cuit");
          break;
        case "seleccion_linea_cuit":
          this.executeFlow("seleccion_linea_cuit");
          break;
        case "sin_habilitacion_cuit":
          this.executeFlow("sin_habilitacion_cuit");
          break;
        case "como_seguimos":
          this.executeFlow("como_seguimos");
          break;
        case "accion_sobre_esta_linea":
          this.executeFlow("accion_sobre_esta_linea");
          break;
        case "accion_otra_linea":
          this.executeFlow("accion_otra_linea");
          break;
        case "descargar_factura_pdf":
          this.executeFlow("descargar_factura_pdf");
          break;
        case "enviar_factura_email":
          this.executeFlow("enviar_factura_email");
          break;
        case "config_debito_automatico":
          this.executeFlow("config_debito_automatico");
          break;
        case "reclamo_monto":
          this.executeFlow("reclamo_monto");
          break;

        // Contratar Servicios - NUEVO CDU
        case "menu_servicios":
          this.executeFlow("menu_servicios");
          break;
        case "asignar_comercial":
          this.executeFlow("asignar_comercial");
          break;
        case "espera_direccion_cliente":
          this.executeFlow("espera_direccion_cliente");
          break;
        case "procesar_direccion":
          this.executeFlow("procesar_direccion");
          break;
        case "linea_no_habilitada":
          this.executeFlow("linea_no_habilitada");
          break;
        case "conectar_comercial_servicios":
          this.executeFlow("conectar_comercial_servicios");
          break;
        case "solicitar_llamada_comercial":
          this.executeFlow("solicitar_llamada_comercial");
          break;
        case "en_espera_comercial":
          this.executeFlow("en_espera_comercial");
          break;
        case "programar_llamada_hoy":
          this.executeFlow("programar_llamada_hoy");
          break;
        case "programar_llamada_manana":
          this.executeFlow("programar_llamada_manana");
          break;
        case "cancelar_espera_comercial":
          this.executeFlow("cancelar_espera_comercial");
          break;
        case "fin_proceso_comercial":
          this.executeFlow("fin_proceso_comercial");
          break;
        case "contactar_titular_empresa":
          this.executeFlow("contactar_titular_empresa");
          break;
        case "continuar_por_chat":
          this.executeFlow("continuar_por_chat");
          break;
        case "fin_conversacion":
          this.executeFlow("fin_conversacion");
          break;
        case "espera_chat_comercial":
          this.executeFlow("espera_chat_comercial");
          break;

        // Beneficios - NUEVO CDU
        case "menu_beneficios":
          this.executeFlow("menu_beneficios");
          break;
        case "menu_beneficios_premium":
          this.executeFlow("menu_beneficios_premium");
          break;
        case "beneficio_club_movistar":
          this.executeFlow("beneficio_club_movistar");
          break;
        case "fundacion_telefonica":
          this.executeFlow("fundacion_telefonica");
          break;
        case "test_drive_gigas":
          this.executeFlow("test_drive_gigas");
          break;
        case "gestionar_gigas":
          this.executeFlow("gestionar_gigas");
          break;
        case "oferta_fibra":
          this.executeFlow("oferta_fibra");
          break;
        case "modalidades_cursos":
          this.executeFlow("modalidades_cursos");
          break;
        case "pasar_gigas":
          this.executeFlow("pasar_gigas");
          break;
        case "guardar_gigas":
          this.executeFlow("guardar_gigas");
          break;
        case "activar_test_drive":
          this.executeFlow("activar_test_drive");
          break;
        case "todos_descuentos_club":
          this.executeFlow("todos_descuentos_club");
          break;
        case "consultar_disponibilidad_fibra":
          this.executeFlow("consultar_disponibilidad_fibra");
          break;
        case "cursos_programacion":
          this.executeFlow("cursos_programacion");
          break;
        case "cursos_marketing":
          this.executeFlow("cursos_marketing");
          break;
        case "activar_guardado_automatico":
          this.executeFlow("activar_guardado_automatico");
          break;
        case "ver_consumo_tiempo_real":
          this.executeFlow("ver_consumo_tiempo_real");
          break;
        case "activar_descuentos_seleccionados":
          this.executeFlow("activar_descuentos_seleccionados");
          break;
        case "ver_vigencias_descuentos":
          this.executeFlow("ver_vigencias_descuentos");
          break;
        case "ingresar_direccion_fibra":
          this.executeFlow("ingresar_direccion_fibra");
          break;
        case "llamar_consulta_fibra":
          this.executeFlow("llamar_consulta_fibra");
          break;
        case "cursos_habilidades":
          this.executeFlow("cursos_habilidades");
          break;
        case "activar_beneficios_club":
          this.executeFlow("activar_beneficios_club");
          break;
        case "descargar_app_movistar":
          this.executeFlow("descargar_app_movistar");
          break;
        case "info_test_drive":
          this.executeFlow("info_test_drive");
          break;
        case "terminos_test_drive":
          this.executeFlow("terminos_test_drive");
          break;
        case "ver_consumo_gigas":
          this.executeFlow("ver_consumo_gigas");
          break;
        case "comprar_gigas_extra":
          this.executeFlow("comprar_gigas_extra");
          break;
        case "contactar_comercial_fibra":
          this.executeFlow("contactar_comercial_fibra");
          break;
        case "detalles_oferta_fibra":
          this.executeFlow("detalles_oferta_fibra");
          break;
        case "ingresar_numero_destino":
          this.executeFlow("ingresar_numero_destino");
          break;
        case "ver_saldo_disponible":
          this.executeFlow("ver_saldo_disponible");
          break;
        case "historial_gb_guardados":
          this.executeFlow("historial_gb_guardados");
          break;
        case "desactivar_guardado":
          this.executeFlow("desactivar_guardado");
          break;
        case "configurar_guardado":
          this.executeFlow("configurar_guardado");
          break;
        case "ver_saldo_total_gb":
          this.executeFlow("ver_saldo_total_gb");
          break;
        case "actualizar_consumo":
          this.executeFlow("actualizar_consumo");
          break;
        case "configurar_alertas_consumo":
          this.executeFlow("configurar_alertas_consumo");
          break;
        case "consejos_aprovechar_gb":
          this.executeFlow("consejos_aprovechar_gb");
          break;

        // Plan x Botonera - NUEVO CDU
        case "menu_plan_botonera":
          this.executeFlow("menu_plan_botonera");
          break;
        case "menu_plan_botonera_top_emp_usuario":
          this.executeFlow("menu_plan_botonera_top_emp_usuario");
          break;
        case "menu_plan_botonera_premium_titular":
          this.executeFlow("menu_plan_botonera_premium_titular");
          break;
        case "menu_plan_botonera_premium_usuario_full":
          this.executeFlow("menu_plan_botonera_premium_usuario_full");
          break;
        case "menu_plan_botonera_premium_usuario_consumo":
          this.executeFlow("menu_plan_botonera_premium_usuario_consumo");
          break;
        case "menu_plan_botonera_top_emp":
          this.executeFlow("menu_plan_botonera_top_emp_usuario");
          break;
        case "menu_plan_botonera_titular":
          this.executeFlow("menu_plan_botonera_premium_titular");
          break;
        case "menu_plan_botonera_premium_full":
          this.executeFlow("menu_plan_botonera_premium_usuario_full");
          break;
        case "menu_plan_botonera_premium_consumo":
          this.executeFlow("menu_plan_botonera_premium_usuario_consumo");
          break;

        // CDU: Factura de esta línea
        case "menu_factura_esta_linea":
          this.executeFlow("menu_factura_esta_linea");
          break;
        case "info_plan":
          this.executeFlow("info_plan");
          break;
        case "info_planes":
          this.executeFlow("info_planes");
          break;
        case "cambio_plan":
          this.executeFlow("cambio_plan");
          break;
        case "consumos":
          this.executeFlow("consumos");
          break;
        case "comprar_gigas":
          this.executeFlow("comprar_gigas");
          break;
        case "gestion_roaming":
          this.executeFlow("gestion_roaming");
          break;
        case "detalles_plan_completo":
          this.executeFlow("detalles_plan_completo");
          break;
        case "historial_consumo_plan":
          this.executeFlow("historial_consumo_plan");
          break;
        case "modificar_servicios_plan":
          this.executeFlow("modificar_servicios_plan");
          break;
        case "detalles_por_linea":
          this.executeFlow("detalles_por_linea");
          break;
        case "resumen_consumos_total":
          this.executeFlow("resumen_consumos_total");
          break;
        case "gestionar_lineas":
          this.executeFlow("gestionar_lineas");
          break;
        case "cambio_plan_linea_1":
          this.executeFlow("cambio_plan_linea_1");
          break;
        case "cambio_plan_linea_2":
          this.executeFlow("cambio_plan_linea_2");
          break;
        case "cambio_plan_linea_3":
          this.executeFlow("cambio_plan_linea_3");
          break;
        case "planes_disponibles":
          this.executeFlow("planes_disponibles");
          break;
        case "consumo_por_app":
          this.executeFlow("consumo_por_app");
          break;
        case "historial_mensual_consumo":
          this.executeFlow("historial_mensual_consumo");
          break;
        case "configurar_alertas_datos":
          this.executeFlow("configurar_alertas_datos");
          break;
        case "proyeccion_consumo":
          this.executeFlow("proyeccion_consumo");
          break;
        case "comprar_1gb":
          this.executeFlow("comprar_1gb");
          break;
        case "comprar_3gb":
          this.executeFlow("comprar_3gb");
          break;
        case "comprar_5gb":
          this.executeFlow("comprar_5gb");
          break;
        case "comprar_10gb":
          this.executeFlow("comprar_10gb");
          break;
        case "terminos_compra_gigas":
          this.executeFlow("terminos_compra_gigas");
          break;
        case "activar_roaming":
          this.executeFlow("activar_roaming");
          break;
        case "packs_roaming":
          this.executeFlow("packs_roaming");
          break;
        case "tarifas_roaming":
          this.executeFlow("tarifas_roaming");
          break;
        case "historial_roaming":
          this.executeFlow("historial_roaming");
          break;
        case "info_roaming":
          this.executeFlow("info_roaming");
          break;
        case "ingresar_numero_destino_plan":
          this.executeFlow("ingresar_numero_destino_plan");
          break;
        case "ver_saldo_disponible_plan":
          this.executeFlow("ver_saldo_disponible_plan");
          break;
        case "activar_guardado_automatico_plan":
          this.executeFlow("activar_guardado_automatico_plan");
          break;
        case "historial_gb_guardados_plan":
          this.executeFlow("historial_gb_guardados_plan");
          break;
        case "desactivar_guardado_plan":
          this.executeFlow("desactivar_guardado_plan");
          break;
        case "confirmar_upgrade_premium":
          this.executeFlow("confirmar_upgrade_premium");
          break;
        case "confirmar_upgrade_elite":
          this.executeFlow("confirmar_upgrade_elite");
          break;
        case "confirmar_downgrade_smart":
          this.executeFlow("confirmar_downgrade_smart");
          break;
        case "confirmar_downgrade_basico":
          this.executeFlow("confirmar_downgrade_basico");
          break;
        case "comparativa_planes":
          this.executeFlow("comparativa_planes");
          break;
        case "comprar_pack_america_datos":
          this.executeFlow("comprar_pack_america_datos");
          break;
        case "comprar_pack_america_completo":
          this.executeFlow("comprar_pack_america_completo");
          break;
        case "comprar_pack_europa_datos":
          this.executeFlow("comprar_pack_europa_datos");
          break;
        case "mas_destinos_roaming":
          this.executeFlow("mas_destinos_roaming");
          break;
        case "confirmar_compra_1gb":
          this.executeFlow("confirmar_compra_1gb");
          break;
        case "cambiar_metodo_pago":
          this.executeFlow("cambiar_metodo_pago");
          break;
        case "ver_saldo_actualizado":
          this.executeFlow("ver_saldo_actualizado");
          break;
        case "roaming_usa":
          this.executeFlow("roaming_usa");
          break;
        case "roaming_espana":
          this.executeFlow("roaming_espana");
          break;
        case "roaming_brasil":
          this.executeFlow("roaming_brasil");
          break;
        case "roaming_chile":
          this.executeFlow("roaming_chile");
          break;
        case "roaming_mexico":
          this.executeFlow("roaming_mexico");
          break;
        case "roaming_otro_pais":
          this.executeFlow("roaming_otro_pais");
          break;
        case "packs_roaming_usa":
          this.executeFlow("packs_roaming_usa");
          break;
        case "config_celular_roaming":
          this.executeFlow("config_celular_roaming");
          break;
        case "consejos_roaming":
          this.executeFlow("consejos_roaming");
          break;
        case "desglose_facturacion":
          this.executeFlow("desglose_facturacion");
          break;
        case "comparar_planes":
          this.executeFlow("comparar_planes");
          break;
        case "tendencia_semanal":
          this.executeFlow("tendencia_semanal");
          break;
        case "limites_por_app":
          this.executeFlow("limites_por_app");
          break;
        case "consejos_ahorro_datos":
          this.executeFlow("consejos_ahorro_datos");
          break;

        // Celulares y Chips - NUEVO CDU
        case "menu_celulares_chips_titular":
          this.executeFlow("menu_celulares_chips_titular");
          break;
        case "menu_celulares_chips_usuario":
          this.executeFlow("menu_celulares_chips_usuario");
          break;
        case "menu_celulares_chips_top_emp":
          this.executeFlow("menu_celulares_chips_top_emp");
          break;
        case "post_seleccion_opciones":
          this.executeFlow("post_seleccion_opciones");
          break;
        case "consulta_chips":
          this.executeFlow("consulta_chips");
          break;
        case "compra_celular":
          this.executeFlow("compra_celular");
          break;
        case "seguimiento_envio":
          this.executeFlow("seguimiento_envio");
          break;
        case "cancelar_compra":
          this.executeFlow("cancelar_compra");
          break;
        case "otro_tema":
          this.executeFlow("otro_tema");
          break;
        case "activar_chip_nuevo":
          this.executeFlow("activar_chip_nuevo");
          break;
        case "configurar_esim":
          this.executeFlow("configurar_esim");
          break;
        case "catalogo_celulares":
          this.executeFlow("catalogo_celulares");
          break;
        case "ingresar_numero_pedido":
          this.executeFlow("ingresar_numero_pedido");
          break;
        case "procesar_numero_pedido":
          this.executeFlow("procesar_numero_pedido");
          break;
        case "detectar_tipo_usuario":
          this.executeFlow("detectar_tipo_usuario");
          break;
        case "chip_no_activa":
          this.executeFlow("chip_no_activa");
          break;
        case "instrucciones_activacion":
          this.executeFlow("instrucciones_activacion");
          break;
        case "proceso_exitoso":
          this.executeFlow("proceso_exitoso");
          break;

        // Facturas y pagos - subflujos existentes
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
    // Scroll to bottom with smooth behavior
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    
    // Also try with requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    });
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
        // Cliente que regresa - ir directo al menú principal
        this.executeFlow("welcome");
        break;
      case "urgent_support":
        this.addMessage(
          "Entiendo que tienes un problema urgente. Te estoy conectando con soporte prioritario. ⚡"
        );
        break;
    }
  }
}

// La inicialización se hará desde index.html después de cargar todos los CDUs

// Custom functions for MIRO integration
window.addMiroFlow = function (flowName, flowData) {
  if (window.bot) {
    window.bot.addCustomFlow(flowName, flowData);
    console.log(`Flow "${flowName}" added successfully`);
  }
};

window.simulateScenario = function (scenario) {
  if (window.bot) {
    window.bot.simulateScenario(scenario);
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
