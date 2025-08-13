// CDU Builder - Aplicación principal
window.CDUBuilder = {
  init: function () {
    this.setupTabNavigation();
    this.addOption(); // Agregar una opción por defecto
    this.showStatus("CDU Builder Pro cargado correctamente", "success");

    // Inicializar editor visual si está disponible
    if (window.VisualEditor) {
      console.log("Editor Visual detectado, listo para inicializar");
    }
  },

  // Navegación por pestañas
  setupTabNavigation: function () {
    const tabBtns = document.querySelectorAll(".tab-btn");

    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetTab = btn.getAttribute("data-tab");
        CDUBuilder.showTab(targetTab);
      });
    });
  },

  showTab: function (tabName) {
    // Ocultar todas las pestañas
    document.querySelectorAll(".tab-content").forEach(function (tab) {
      tab.classList.remove("active");
    });

    // Desactivar todos los botones
    document.querySelectorAll(".tab-btn").forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Mostrar la pestaña seleccionada
    const targetTab = document.getElementById(tabName + "-tab");
    const targetBtn = document.querySelector('[data-tab="' + tabName + '"]');

    if (targetTab && targetBtn) {
      targetTab.classList.add("active");
      targetBtn.classList.add("active");

      // Manejo específico por pestaña
      this.handleTabActivation(tabName);
    }
  },

  handleTabActivation: function (tabName) {
    switch (tabName) {
      case "visual":
        this.initializeVisualEditor();
        break;
      case "preview":
        this.updatePreview();
        break;
      case "code":
        this.updateCodeGeneration();
        break;
    }
  },

  initializeVisualEditor: function () {
    setTimeout(() => {
      if (window.VisualEditor) {
        // Siempre asegurarse que el editor esté correctamente inicializado
        if (!window.VisualEditor.isInitialized) {
          console.log("🎨 Inicializando Editor Visual por primera vez...");
          window.VisualEditor.init();
        } else {
          console.log("🔄 Refrescando Editor Visual...");
          // Refrescar la visualización sin perder datos
          this.refreshVisualEditor();
        }
      }
    }, 100);
  },

  refreshVisualEditor: function () {
    try {
      // Refrescar conexiones SVG
      if (window.VisualConnectionManager) {
        window.VisualConnectionManager.updateConnections();
      }

      // Refrescar componentes panel si está visible
      if (
        window.VisualComponentsPanel &&
        window.VisualComponentsPanel.isInitialized
      ) {
        window.VisualComponentsPanel.render();
      }

      // Refrescar el canvas
      const canvas = document.getElementById("visual-canvas");
      if (canvas) {
        // Trigger re-render de nodos existentes
        if (window.VisualNodeManager) {
          const nodes = window.VisualNodeManager.getAllNodes();
          nodes.forEach((node) => {
            window.VisualNodeManager.updateNodeContent(node.id);
          });
        }
      }
    } catch (error) {
      console.warn("Error refrescando editor visual:", error);
    }
  },

  updatePreview: function () {
    console.log("🔄 Actualizando previsualización...");
    try {
      // Generar previsualización desde el editor visual
      if (window.VisualNodeManager && window.VisualConnectionManager) {
        const nodes = window.VisualNodeManager.getAllNodes();
        const connections = window.VisualConnectionManager.getConnections();

        if (nodes.length > 0) {
          this.generatePreview(nodes, connections);
        } else {
          this.showEmptyPreview();
        }
      } else {
        this.showEmptyPreview();
      }
    } catch (error) {
      console.error("Error generando previsualización:", error);
      this.showPreviewError(error.message);
    }
  },

  updateCodeGeneration: function () {
    console.log("📝 Actualizando generación de código...");
    try {
      if (window.VisualFlowConverter) {
        const nodes = window.VisualNodeManager.getAllNodes();
        const connections = window.VisualConnectionManager.getConnections();

        if (nodes.length > 0) {
          const code = window.VisualFlowConverter.generateCDU(
            nodes,
            connections
          );
          this.displayGeneratedCode(code);
        }
      }
    } catch (error) {
      console.error("Error generando código:", error);
    }
  },

  // Gestión de opciones
  addOption: function () {
    const container = document.getElementById("optionsContainer");
    const optionDiv = document.createElement("div");
    optionDiv.className = "option-item";
    optionDiv.innerHTML =
      '<input type="text" placeholder="Texto de la opcion" class="option-text" required>' +
      '<input type="text" placeholder="Accion (ej: siguiente_paso)" class="option-action" required>' +
      '<button type="button" class="btn btn-secondary" onclick="CDUBuilder.removeOption(this)">❌</button>';
    container.appendChild(optionDiv);
  },

  removeOption: function (button) {
    const optionItems = document.querySelectorAll(".option-item");
    if (optionItems.length > 1) {
      button.parentElement.remove();
    } else {
      this.showStatus("Debe haber al menos una opcion", "error");
    }
  },

  // Carga de plantillas
  loadTemplate: function (templateName) {
    const template = window.CDUTemplates[templateName];
    if (!template) {
      this.showStatus("Plantilla no encontrada", "error");
      return;
    }

    try {
      document.getElementById("cduName").value = template.name;
      document.getElementById("cduTitle").value = template.title;
      document.getElementById("cduDescription").value = template.description;
      document.getElementById("cduIcon").value = template.icon;
      document.getElementById("initialMessage").value = template.initialMessage;
      document.getElementById("secondMessage").value =
        template.secondMessage || "";

      // Limpiar opciones actuales
      const container = document.getElementById("optionsContainer");
      container.innerHTML = "";

      // Agregar opciones de la plantilla
      template.options.forEach(function (option) {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option-item";
        optionDiv.innerHTML =
          '<input type="text" placeholder="Texto de la opcion" class="option-text" value="' +
          option.text +
          '" required>' +
          '<input type="text" placeholder="Accion (ej: siguiente_paso)" class="option-action" value="' +
          option.action +
          '" required>' +
          '<button type="button" class="btn btn-secondary" onclick="CDUBuilder.removeOption(this)">❌</button>';
        container.appendChild(optionDiv);
      });

      window.CDUBuilderConfig.AppState.currentCDU =
        window.CDUValidator.collectFormData();
      this.showStatus(
        'Plantilla "' + template.title + '" cargada correctamente',
        "success"
      );
    } catch (error) {
      this.showStatus("Error cargando plantilla: " + error.message, "error");
    }
  },

  // Previsualización
  validateAndPreview: function () {
    const validation = window.CDUValidator.validateCDU();

    if (!validation.isValid) {
      window.CDUValidator.showValidationErrors(validation.errors);
      this.showTab("preview");
      return;
    }

    window.CDUValidator.hideValidationErrors();
    window.CDUValidator.showValidationSuccess();
    window.CDUPreview.renderPreview(validation.data);
    window.CDUBuilderConfig.AppState.currentCDU = validation.data;
    window.CDUBuilderConfig.AppState.isValid = true;
    this.showTab("preview");
  },

  // Generación de código
  validateAndGenerate: function () {
    const validation = window.CDUValidator.validateCDU();

    if (!validation.isValid) {
      window.CDUValidator.showValidationErrors(validation.errors);
      this.showTab("preview");
      return;
    }

    try {
      const code = window.CDUCodeGenerator.generateCDUCode(validation.data);
      document.getElementById("codeOutput").textContent = code;
      window.CDUBuilderConfig.AppState.generatedCode = code;
      window.CDUBuilderConfig.AppState.currentCDU = validation.data;
      window.CDUBuilderConfig.AppState.isValid = true;

      window.CDUDeploy.updateDeployStatus();
      this.showStatus(
        'CDU "' + validation.data.cduName + '" generado correctamente',
        "success"
      );
    } catch (error) {
      this.showStatus("Error al generar codigo: " + error.message, "error");
    }
  },

  // Funciones de archivo
  downloadCode: function () {
    const code = document.getElementById("codeOutput").textContent;

    if (
      !window.CDUBuilderConfig.AppState.generatedCode ||
      code === "Genera el codigo para ver el resultado aqui..."
    ) {
      this.showStatus("Primero genera el codigo antes de descargarlo", "error");
      return;
    }

    const cduName = window.CDUBuilderConfig.AppState.currentCDU
      ? window.CDUBuilderConfig.AppState.currentCDU.cduName
      : "mi_cdu";

    try {
      const blob = new Blob([code], { type: "text/javascript" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cdu-" + cduName + ".js";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showStatus("Archivo descargado correctamente", "success");
    } catch (error) {
      this.showStatus("Error al descargar: " + error.message, "error");
    }
  },

  copyCode: function () {
    const code = document.getElementById("codeOutput").textContent;

    if (!window.CDUBuilderConfig.AppState.generatedCode) {
      this.showStatus("Primero genera el codigo antes de copiarlo", "error");
      return;
    }

    navigator.clipboard
      .writeText(code)
      .then(function () {
        CDUBuilder.showStatus("Codigo copiado al portapapeles", "success");
      })
      .catch(function () {
        CDUBuilder.showStatus("Error al copiar codigo", "error");
      });
  },

  // Sistema de despliegue
  testDeploy: function () {
    window.CDUDeploy.testDeploy();
  },

  fullDeploy: function () {
    window.CDUDeploy.fullDeploy();
  },

  // Utilidades
  showStatus: function (message, type) {
    const statusDiv = document.getElementById("statusMessage");
    if (!statusDiv) return;

    statusDiv.textContent = message;
    statusDiv.className = "status-message status-" + type;

    setTimeout(function () {
      statusDiv.textContent = "";
      statusDiv.className = "";
    }, window.CDUBuilderConfig.ui.statusMessageTimeout);
  },

  clearAll: function () {
    if (confirm("Estas seguro de que quieres limpiar todos los campos?")) {
      document
        .querySelectorAll("input, textarea, select")
        .forEach(function (element) {
          if (element.type === "checkbox") {
            element.checked = element.id === "enableLogging";
          } else {
            element.value = "";
          }
        });

      // Resetear valores por defecto
      document.getElementById("cduIcon").value = "fas fa-cog";
      document.getElementById("author").value = "CDU Builder Pro";
      document.getElementById("version").value = "1.0";

      // Limpiar opciones
      const container = document.getElementById("optionsContainer");
      container.innerHTML = "";
      this.addOption();

      document.getElementById("codeOutput").textContent =
        "Genera el codigo para ver el resultado aqui...";
      document.getElementById("previewContent").innerHTML =
        '<p style="text-align: center; color: #666; margin-top: 100px;">Completa la configuracion y presiona "Previsualizar" para ver como se vera tu CDU</p>';

      // Resetear estado
      window.CDUBuilderConfig.AppState.currentCDU = null;
      window.CDUBuilderConfig.AppState.isValid = false;
      window.CDUBuilderConfig.AppState.generatedCode = null;
      window.CDUBuilderConfig.AppState.isDeployed = false;

      // Limpiar editor visual si existe
      if (window.VisualNodeManager) {
        window.VisualNodeManager.clearAll();
      }
      if (window.VisualConnectionManager) {
        window.VisualConnectionManager.clearAll();
      }

      this.showTab("config");
      this.showStatus("Formulario limpiado correctamente", "success");
    }
  },

  // Funciones de previsualización
  generatePreview: function (nodes, connections) {
    const previewContainer = document.getElementById("previewContent");
    if (!previewContainer) return;

    // Generar HTML de previsualización basado en los nodos
    let previewHTML = "";

    try {
      // Buscar nodo de inicio
      const startNode = nodes.find((n) => n.type === "start");
      if (startNode) {
        previewHTML = this.generateNodePreview(startNode, nodes, connections);
      } else if (nodes.length > 0) {
        previewHTML = this.generateNodePreview(nodes[0], nodes, connections);
      }

      previewContainer.innerHTML = previewHTML;
    } catch (error) {
      console.error("Error generando previsualización:", error);
      this.showPreviewError(error.message);
    }
  },

  generateNodePreview: function (node, allNodes, connections) {
    let html = "";

    switch (node.type) {
      case "start":
        html =
          '<div class="preview-message bot-message">🤖 ¡Conversación iniciada!</div>';
        break;

      case "send-message":
        const message = node.properties.message || "Mensaje de ejemplo";
        html = `<div class="preview-message bot-message">🤖 ${message}</div>`;
        break;

      case "menu":
        const title = node.properties.title || "Menú";
        const text = node.properties.text || "Selecciona una opción:";
        const options = node.properties.options || [];

        html = `
          <div class="preview-message bot-message">
            <strong>🤖 ${title}</strong><br>
            ${text}
          </div>
          <div class="preview-menu">
        `;

        if (Array.isArray(options) && options.length > 0) {
          options.forEach((option, index) => {
            const optionText =
              typeof option === "string"
                ? option
                : option.text || `Opción ${index + 1}`;
            html += `<button class="preview-menu-option">${
              index + 1
            }. ${optionText}</button>`;
          });
        } else {
          html +=
            '<button class="preview-menu-option">1. Opción de ejemplo</button>';
        }

        html += "</div>";
        break;

      case "wait-message":
        const prompt =
          node.properties.prompt || "Por favor, escribe tu respuesta:";
        html = `
          <div class="preview-message bot-message">🤖 ${prompt}</div>
          <div class="preview-input">
            <input type="text" placeholder="Escribe tu respuesta..." disabled>
            <button disabled>Enviar</button>
          </div>
        `;
        break;

      case "condition":
        const condition = node.properties.condition || "Condición de ejemplo";
        html = `<div class="preview-message system-message">🔀 Evaluando: ${condition}</div>`;
        break;

      default:
        html = `<div class="preview-message system-message">📋 Nodo: ${node.type}</div>`;
    }

    return html;
  },

  showEmptyPreview: function () {
    const previewContainer = document.getElementById("previewContent");
    if (previewContainer) {
      previewContainer.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #666;">
          <i class="fas fa-info-circle" style="font-size: 3em; margin-bottom: 20px;"></i>
          <h3>No hay contenido para previsualizar</h3>
          <p>Ve al <strong>Editor Visual</strong> y crea algunos nodos para ver la previsualización aquí.</p>
          <button onclick="CDUBuilder.showTab('visual')" class="btn btn-primary">🎨 Ir al Editor Visual</button>
        </div>
      `;
    }
  },

  showPreviewError: function (errorMessage) {
    const previewContainer = document.getElementById("previewContent");
    if (previewContainer) {
      previewContainer.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #721c24;">
          <i class="fas fa-exclamation-triangle" style="font-size: 3em; margin-bottom: 20px; color: #dc3545;"></i>
          <h3>Error en la previsualización</h3>
          <p>${errorMessage}</p>
          <button onclick="CDUBuilder.showTab('visual')" class="btn btn-primary">🎨 Volver al Editor</button>
        </div>
      `;
    }
  },

  displayGeneratedCode: function (code) {
    const codeOutput = document.getElementById("codeOutput");
    if (codeOutput) {
      codeOutput.textContent = code;
    }
  },
};

// Inicialización cuando se carga el DOM
document.addEventListener("DOMContentLoaded", function () {
  window.CDUBuilder.init();
});
