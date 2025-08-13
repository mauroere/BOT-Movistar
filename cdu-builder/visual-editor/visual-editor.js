// Controlador Principal del Editor Visual
window.VisualEditor = {
  isInitialized: false,
  isModified: false,
  currentFile: null,
  history: [],
  historyIndex: -1,
  maxHistorySize: 50,

  init: function () {
    if (this.isInitialized) return;

    console.log("Inicializando Editor Visual...");

    try {
      // Verificar que el DOM del editor visual esté disponible
      const visualTab = document.getElementById("visual-tab");
      const canvas = document.getElementById("visual-canvas");
      const componentsPanel = document.querySelector(".components-panel");
      const propertiesPanel = document.querySelector(".properties-panel");

      if (!visualTab || !canvas || !componentsPanel || !propertiesPanel) {
        console.error("Elementos del editor visual no encontrados");
        setTimeout(() => this.init(), 100);
        return;
      }

      // Inicializar componentes en orden
      this.setupToolbar();
      this.setupKeyboardShortcuts();
      this.setupCanvas();

      // Inicializar gestores
      window.VisualNodeManager.init();
      window.VisualConnectionManager.init();
      window.VisualComponentsPanel.init();
      window.VisualPropertiesPanel.init();
      window.VisualDragDrop.init();
      window.VisualValidationPanel.init();

      // Setup inicial del canvas
      this.setupInitialState();

      this.isInitialized = true;
      console.log("Editor Visual inicializado correctamente");
    } catch (error) {
      console.error("Error inicializando Editor Visual:", error);
    }
  },

  setupToolbar: function () {
    // Botones de archivo
    this.bindToolbarButton("visual-new", () => this.newFlow());
    this.bindToolbarButton("visual-open", () => this.openFlow());
    this.bindToolbarButton("visual-save", () => this.saveFlow());

    // Botones de edición
    this.bindToolbarButton("visual-undo", () => this.undo());
    this.bindToolbarButton("visual-redo", () => this.redo());

    // Botones de vista
    this.bindToolbarButton("visual-zoom-in", () => this.zoomIn());
    this.bindToolbarButton("visual-zoom-out", () => this.zoomOut());
    this.bindToolbarButton("visual-zoom-fit", () => this.zoomFit());

    // Botones de flujo
    this.bindToolbarButton("visual-validate", () => this.validateFlow());
    this.bindToolbarButton("visual-generate", () => this.generateCDU());
  },

  bindToolbarButton: function (id, handler) {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", handler);
    }
  },

  setupKeyboardShortcuts: function () {
    document.addEventListener("keydown", (e) => {
      // Solo procesar si estamos en la pestaña visual
      if (!document.getElementById("visual-tab").classList.contains("active"))
        return;

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "n":
            e.preventDefault();
            this.newFlow();
            break;
          case "o":
            e.preventDefault();
            this.openFlow();
            break;
          case "s":
            e.preventDefault();
            this.saveFlow();
            break;
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              this.redo();
            } else {
              this.undo();
            }
            break;
          case "y":
            e.preventDefault();
            this.redo();
            break;
          case "a":
            e.preventDefault();
            this.selectAll();
            break;
        }
      }

      // Tecla Delete para eliminar nodos seleccionados
      if (e.key === "Delete" || e.key === "Backspace") {
        const selectedNode = window.VisualNodeManager.selectedNode;
        if (selectedNode && selectedNode !== "start") {
          e.preventDefault();
          window.VisualNodeManager.deleteNode(selectedNode);
        }
      }

      // Escape para cancelar operaciones
      if (e.key === "Escape") {
        window.VisualConnectionManager.cancelConnection();
        this.clearSelection();
      }
    });
  },

  setupCanvas: function () {
    const canvas = document.getElementById("visual-canvas");
    if (!canvas) return;

    // Configurar scroll infinito
    canvas.style.minWidth = "2000px";
    canvas.style.minHeight = "2000px";

    // Grid visual
    this.setupGrid();

    // Drag del canvas para hacer pan
    this.setupCanvasPanning();
  },

  setupGrid: function () {
    const canvas = document.getElementById("visual-canvas");
    if (!canvas) return;

    // Agregar grid CSS
    canvas.style.backgroundImage = `
      radial-gradient(circle, #ccc 1px, transparent 1px),
      radial-gradient(circle, #ccc 1px, transparent 1px)
    `;
    canvas.style.backgroundSize = "20px 20px";
    canvas.style.backgroundPosition = "0 0, 10px 10px";
  },

  setupCanvasPanning: function () {
    const container = document.querySelector(".canvas-container");
    if (!container) return;

    let isPanning = false;
    let startX, startY, startScrollLeft, startScrollTop;

    container.addEventListener("mousedown", (e) => {
      if (e.target.id === "visual-canvas" && !e.ctrlKey) {
        isPanning = true;
        startX = e.clientX;
        startY = e.clientY;
        startScrollLeft = container.scrollLeft;
        startScrollTop = container.scrollTop;
        container.style.cursor = "grabbing";
        e.preventDefault();
      }
    });

    container.addEventListener("mousemove", (e) => {
      if (!isPanning) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      container.scrollLeft = startScrollLeft - dx;
      container.scrollTop = startScrollTop - dy;
    });

    container.addEventListener("mouseup", () => {
      if (isPanning) {
        isPanning = false;
        container.style.cursor = "default";
      }
    });

    // Zoom con rueda del mouse
    container.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          this.zoomIn();
        } else {
          this.zoomOut();
        }
      }
    });
  },

  setupInitialState: function () {
    const canvas = document.getElementById("visual-canvas");
    if (!canvas) {
      console.error("Canvas no encontrado para setup inicial");
      return;
    }

    console.log("Configurando estado inicial del canvas...");

    // Limpiar cualquier nodo de inicio huérfano existente
    const orphanStart = document.getElementById("start-node");
    if (orphanStart) {
      orphanStart.remove();
      console.log("🗑️ Nodo de inicio huérfano removido");
    }

    // Verificar si ya hay un nodo de inicio registrado en el NodeManager
    const existingStart = window.VisualNodeManager.getAllNodes().find(
      (n) => n.type === "start" || n.id === "start"
    );

    if (!existingStart) {
      console.log("Creando nodo de inicio integrado...");

      // Crear nodo de inicio usando el sistema oficial de NodeManager
      const startNode = window.VisualNodeManager.createNode("start", {
        x: 100,
        y: 100,
      });

      console.log("✅ Nodo de inicio creado e integrado:", startNode.id);
    } else {
      console.log("✅ Nodo de inicio ya existe:", existingStart.id);
    }

    // Guardar estado inicial
    setTimeout(() => {
      this.saveState();
    }, 100);
  },

  // Operaciones de archivo
  newFlow: function () {
    if (this.isModified && !confirm("¿Descartar cambios no guardados?")) {
      return;
    }

    window.VisualNodeManager.clearAll();
    window.VisualConnectionManager.clearAll();
    this.setupInitialState();
    this.clearHistory();
    this.setModified(false);
    this.currentFile = null;

    // Limpiar propiedades
    window.VisualPropertiesPanel.clearProperties();

    this.showMessage("Nuevo flujo creado", "success");
  },

  openFlow: function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const flowData = JSON.parse(event.target.result);
            window.VisualFlowConverter.importVisualFlow(flowData);
            this.currentFile = file.name;
            this.setModified(false);
            this.clearHistory();
            this.saveState();
            this.showMessage("Flujo cargado correctamente", "success");
          } catch (error) {
            this.showMessage("Error cargando flujo: " + error.message, "error");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  },

  saveFlow: function () {
    try {
      const flowData = window.VisualFlowConverter.exportVisualFlow();
      const filename = this.currentFile || "flujo_visual.json";

      const blob = new Blob([JSON.stringify(flowData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      URL.revokeObjectURL(url);
      this.setModified(false);
      this.showMessage("Flujo guardado correctamente", "success");
    } catch (error) {
      this.showMessage("Error guardando flujo: " + error.message, "error");
    }
  },

  // Control de historial
  saveState: function () {
    const state = {
      nodes: window.VisualNodeManager.getAllNodes().map((n) => ({ ...n })),
      connections: window.VisualConnectionManager.getConnections().map((c) => ({
        ...c,
      })),
      timestamp: Date.now(),
    };

    // Eliminar estados futuros si estamos en medio del historial
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    this.history.push(state);

    // Limitar tamaño del historial
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }

    this.updateHistoryButtons();
  },

  undo: function () {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreState(this.history[this.historyIndex]);
      this.updateHistoryButtons();
      this.showMessage("Deshecho", "info");
    }
  },

  redo: function () {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreState(this.history[this.historyIndex]);
      this.updateHistoryButtons();
      this.showMessage("Rehecho", "info");
    }
  },

  restoreState: function (state) {
    // Limpiar estado actual
    window.VisualNodeManager.clearAll();
    window.VisualConnectionManager.clearAll();

    // Restaurar nodos
    state.nodes.forEach((nodeData) => {
      if (nodeData.id === "start") {
        this.setupInitialState();
        return;
      }

      window.VisualNodeManager.createNode(
        nodeData.type,
        nodeData.x,
        nodeData.y,
        nodeData.properties
      );
    });

    // Restaurar conexiones
    setTimeout(() => {
      state.connections.forEach((connData) => {
        window.VisualConnectionManager.createConnection(
          connData.from.nodeId,
          connData.from.portIndex,
          connData.to.nodeId,
          connData.to.portIndex
        );
      });
    }, 100);
  },

  clearHistory: function () {
    this.history = [];
    this.historyIndex = -1;
    this.updateHistoryButtons();
  },

  updateHistoryButtons: function () {
    const undoBtn = document.getElementById("visual-undo");
    const redoBtn = document.getElementById("visual-redo");

    if (undoBtn) {
      undoBtn.disabled = this.historyIndex <= 0;
    }
    if (redoBtn) {
      redoBtn.disabled = this.historyIndex >= this.history.length - 1;
    }
  },

  // Zoom y vista
  zoomIn: function () {
    const canvas = document.getElementById("visual-canvas");
    const currentScale = parseFloat(
      canvas.style.transform?.match(/scale\(([\d.]+)\)/)?.[1] || "1"
    );
    const newScale = Math.min(currentScale * 1.2, 3);
    canvas.style.transform = `scale(${newScale})`;
    this.showMessage(`Zoom: ${Math.round(newScale * 100)}%`, "info");
  },

  zoomOut: function () {
    const canvas = document.getElementById("visual-canvas");
    const currentScale = parseFloat(
      canvas.style.transform?.match(/scale\(([\d.]+)\)/)?.[1] || "1"
    );
    const newScale = Math.max(currentScale / 1.2, 0.1);
    canvas.style.transform = `scale(${newScale})`;
    this.showMessage(`Zoom: ${Math.round(newScale * 100)}%`, "info");
  },

  zoomFit: function () {
    const canvas = document.getElementById("visual-canvas");
    canvas.style.transform = "scale(1)";

    // Centrar vista en los nodos
    const container = document.querySelector(".canvas-container");
    const nodes = document.querySelectorAll(".visual-node");

    if (nodes.length > 0) {
      let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        minX = Math.min(minX, parseInt(node.style.left));
        minY = Math.min(minY, parseInt(node.style.top));
        maxX = Math.max(maxX, parseInt(node.style.left) + rect.width);
        maxY = Math.max(maxY, parseInt(node.style.top) + rect.height);
      });

      const centerX = (minX + maxX) / 2 - container.clientWidth / 2;
      const centerY = (minY + maxY) / 2 - container.clientHeight / 2;

      container.scrollLeft = Math.max(0, centerX);
      container.scrollTop = Math.max(0, centerY);
    }

    this.showMessage("Vista ajustada", "info");
  },

  // Validación y generación
  validateFlow: function () {
    try {
      const nodes = window.VisualNodeManager.getAllNodes();
      const connections = window.VisualConnectionManager.getConnections();

      console.log("Validando flujo:", {
        nodes: nodes.length,
        connections: connections.length,
      });

      if (nodes.length === 0) {
        this.showMessage("No hay nodos para validar", "warning");
        return;
      }

      const validation = window.VisualFlowConverter.validateFlow(
        nodes,
        connections
      );

      // Usar el panel de validación
      if (window.VisualValidationPanel) {
        window.VisualValidationPanel.showValidationResult(validation);
      }

      if (validation.valid) {
        console.log(
          `✅ Flujo válido con ${nodes.length} nodos y ${connections.length} conexiones`
        );
      } else {
        console.warn("Errores de validación:", validation.errors);
      }
    } catch (error) {
      this.showMessage("Error validando flujo: " + error.message, "error");
    }
  },

  generateCDU: function () {
    try {
      const cduCode = window.VisualFlowConverter.convertToFlow();

      // Actualizar el código en la pestaña correspondiente
      const codeTextarea = document.getElementById("generatedCode");
      if (codeTextarea) {
        codeTextarea.value = cduCode;
      }

      // Cambiar a la pestaña de código
      if (window.CDUBuilder && window.CDUBuilder.showTab) {
        window.CDUBuilder.showTab("code");
      }

      this.showMessage("CDU generado correctamente ✓", "success");
    } catch (error) {
      this.showMessage("Error generando CDU: " + error.message, "error");
    }
  },

  // Utilidades
  setModified: function (modified) {
    this.isModified = modified;

    // Actualizar UI para mostrar estado modificado
    const title = document.title;
    if (modified && !title.includes("*")) {
      document.title = title + " *";
    } else if (!modified && title.includes("*")) {
      document.title = title.replace(" *", "");
    }
  },

  clearSelection: function () {
    window.VisualNodeManager.selectNode(null);
  },

  selectAll: function () {
    // Implementar selección múltiple si es necesario
    console.log("Seleccionar todo - funcionalidad pendiente");
  },

  showMessage: function (message, type = "info") {
    // Crear elemento de mensaje
    const messageEl = document.createElement("div");
    messageEl.className = `visual-message visual-message-${type}`;
    messageEl.textContent = message;

    // Posicionar en la esquina superior derecha
    messageEl.style.position = "fixed";
    messageEl.style.top = "20px";
    messageEl.style.right = "20px";
    messageEl.style.zIndex = "10000";
    messageEl.style.padding = "10px 15px";
    messageEl.style.borderRadius = "4px";
    messageEl.style.fontSize = "14px";
    messageEl.style.fontWeight = "bold";
    messageEl.style.maxWidth = "300px";
    messageEl.style.wordWrap = "break-word";

    // Colores según tipo
    switch (type) {
      case "success":
        messageEl.style.backgroundColor = "#d4edda";
        messageEl.style.color = "#155724";
        messageEl.style.border = "1px solid #c3e6cb";
        break;
      case "error":
        messageEl.style.backgroundColor = "#f8d7da";
        messageEl.style.color = "#721c24";
        messageEl.style.border = "1px solid #f5c6cb";
        break;
      case "warning":
        messageEl.style.backgroundColor = "#fff3cd";
        messageEl.style.color = "#856404";
        messageEl.style.border = "1px solid #ffeaa7";
        break;
      default: // info
        messageEl.style.backgroundColor = "#d1ecf1";
        messageEl.style.color = "#0c5460";
        messageEl.style.border = "1px solid #bee5eb";
    }

    document.body.appendChild(messageEl);

    // Remover después de 3 segundos
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.style.transition = "opacity 0.3s ease-out";
        messageEl.style.opacity = "0";
        setTimeout(() => {
          if (messageEl.parentNode) {
            document.body.removeChild(messageEl);
          }
        }, 300);
      }
    }, 3000);
  },

  // Mostrar errores de validación
  showValidationErrors: function (errors) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "validation-errors-panel";
    errorContainer.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: white;
      border: 2px solid #dc3545;
      border-radius: 8px;
      padding: 0;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
    `;

    errorContainer.innerHTML = `
      <div class="error-header" style="background: #dc3545; color: white; padding: 12px; border-radius: 6px 6px 0 0; display: flex; justify-content: space-between; align-items: center;">
        <h4 style="margin: 0; font-size: 14px;">❌ Errores de Validación</h4>
        <button style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;" onclick="this.closest('.validation-errors-panel').remove()">×</button>
      </div>
      <div class="error-list" style="padding: 15px;">
        ${errors
          .map(
            (error) => `
          <div class="error-item" style="margin-bottom: 12px; padding: 8px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #dc3545;">
            <div style="display: flex; align-items: flex-start; gap: 8px;">
              <span style="color: #dc3545; font-weight: bold;">⚠️</span>
              <div>
                <div style="color: #495057; font-size: 13px; margin-bottom: 4px;">${error}</div>
                ${this.getErrorSolution(error)}
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="error-actions" style="padding: 15px; border-top: 1px solid #dee2e6; display: flex; gap: 10px; justify-content: flex-end;">
        <button class="btn-primary" style="padding: 6px 12px; font-size: 12px;" onclick="VisualEditor.autoFix()">🔧 Auto-corregir</button>
        <button class="btn-secondary" style="padding: 6px 12px; font-size: 12px;" onclick="this.closest('.validation-errors-panel').remove()">Cerrar</button>
      </div>
    `;

    // Agregar al canvas
    const canvas = document.getElementById("visual-canvas");
    if (canvas) {
      canvas.appendChild(errorContainer);

      // Auto-remover después de 15 segundos
      setTimeout(() => {
        if (errorContainer.parentElement) {
          errorContainer.remove();
        }
      }, 15000);
    }
  },

  // Obtener sugerencia de solución para cada error
  getErrorSolution: function (error) {
    if (error.includes("nodo de inicio")) {
      return `<div style="color: #007bff; font-size: 12px; font-style: italic;">💡 Arrastra un componente "🚀 Inicio" al canvas</div>`;
    }
    if (error.includes("requerido")) {
      return `<div style="color: #007bff; font-size: 12px; font-style: italic;">💡 Selecciona el nodo y completa el campo marcado con *</div>`;
    }
    if (error.includes("sin conexión")) {
      return `<div style="color: #007bff; font-size: 12px; font-style: italic;">💡 Conecta los puertos: salida (🟢) → entrada (🔴)</div>`;
    }
    return "";
  },

  // Auto-corregir errores comunes
  autoFix: function () {
    const nodes = window.VisualNodeManager.getAllNodes();

    console.log("Iniciando auto-corrección...");

    // 1. Si no hay nodo de inicio, crear uno
    const hasStart = nodes.some((n) => n.type === "start" || n.id === "start");
    if (!hasStart && nodes.length > 0) {
      const startNode = window.VisualNodeManager.createNode("start", {
        x: 50,
        y: 100,
      });
      console.log("✅ Nodo de inicio creado:", startNode.id);

      // Conectar al primer nodo existente si es posible
      const firstNode = nodes[0];
      if (firstNode) {
        try {
          window.VisualConnectionManager.createConnection(
            startNode.id,
            0,
            firstNode.id,
            0
          );
          console.log("✅ Nodo de inicio conectado al primer nodo");
        } catch (e) {
          console.warn("⚠️ No se pudo conectar automáticamente:", e.message);
        }
      }
    }

    // 2. Llenar campos requeridos con valores por defecto
    nodes.forEach((node) => {
      const config = window.VisualEditorConfig.nodeTypes[node.type];
      if (config && config.properties) {
        Object.entries(config.properties).forEach(([key, prop]) => {
          if (prop.required && (!node.properties || !node.properties[key])) {
            if (!node.properties) node.properties = {};

            // Valores por defecto según el tipo
            switch (prop.type) {
              case "text":
                node.properties[key] =
                  prop.default || `Ejemplo de ${prop.label || key}`;
                break;
              case "textarea":
                node.properties[key] =
                  prop.default || `Texto de ejemplo para ${prop.label || key}`;
                break;
              case "number":
                node.properties[key] = prop.default || 1000;
                break;
              default:
                node.properties[key] = prop.default || "Valor por defecto";
            }

            console.log(`✅ Campo ${key} completado para nodo ${node.id}`);
          }
        });
      }
    });

    // Refrescar el panel de propiedades si hay un nodo seleccionado
    if (
      window.VisualPropertiesPanel &&
      window.VisualPropertiesPanel.selectedNodeId
    ) {
      window.VisualPropertiesPanel.showProperties(
        window.VisualPropertiesPanel.selectedNodeId
      );
    }

    // Cerrar panel de errores
    const errorPanel = document.querySelector(".validation-errors-panel");
    if (errorPanel) {
      errorPanel.remove();
    }

    this.showMessage(
      "✅ Auto-corrección aplicada. Revisa las propiedades de los nodos.",
      "success"
    );

    // Re-validar después de la corrección
    setTimeout(() => {
      this.validateFlow();
    }, 1000);
  },
};
