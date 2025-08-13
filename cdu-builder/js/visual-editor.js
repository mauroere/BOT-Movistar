// Visual Flow Editor - Editor Principal
window.VisualEditor = {
  isInitialized: false,
  currentMode: "select",

  // Inicializar editor visual
  init: function () {
    if (this.isInitialized) return;

    try {
      // Inicializar componentes
      window.ComponentsPanel.init();
      window.PropertiesPanel.init();
      window.ConnectionManager.init();

      this.setupCanvas();
      this.setupToolbar();
      this.setupKeyboardShortcuts();

      this.isInitialized = true;
      console.log("✅ Editor Visual inicializado correctamente");
    } catch (error) {
      console.error("❌ Error inicializando Editor Visual:", error);
    }
  },

  // Configurar canvas
  setupCanvas: function () {
    const canvas = document.querySelector(".canvas-content");
    if (!canvas) return;

    // Click en canvas vacío deselecciona nodos
    canvas.addEventListener("click", (e) => {
      if (e.target === canvas) {
        this.deselectAll();
      }
    });

    // Prevenir menú contextual por defecto
    canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    // Scrolling y zoom (futuro)
    this.setupCanvasInteraction(canvas);
  },

  // Configurar interacción del canvas
  setupCanvasInteraction: function (canvas) {
    let isPanning = false;
    let startX, startY;

    canvas.addEventListener("mousedown", (e) => {
      if (e.button === 1) {
        // Botón del medio
        isPanning = true;
        startX = e.clientX;
        startY = e.clientY;
        canvas.style.cursor = "move";
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (isPanning) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        // Implementar panning (scroll del canvas)
        canvas.scrollLeft -= deltaX;
        canvas.scrollTop -= deltaY;

        startX = e.clientX;
        startY = e.clientY;
      }
    });

    document.addEventListener("mouseup", (e) => {
      if (e.button === 1) {
        isPanning = false;
        canvas.style.cursor = "default";
      }
    });

    // Zoom con rueda del mouse
    canvas.addEventListener("wheel", (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        // Implementar zoom (futuro)
      }
    });
  },

  // Configurar toolbar
  setupToolbar: function () {
    const toolbar = document.querySelector(".visual-toolbar");
    if (!toolbar) return;

    toolbar.innerHTML = `
            <button class="toolbar-btn primary" onclick="VisualEditor.newFlow()">
                <i class="fas fa-file"></i> Nuevo
            </button>
            <button class="toolbar-btn" onclick="VisualEditor.saveFlow()">
                <i class="fas fa-save"></i> Guardar
            </button>
            <button class="toolbar-btn" onclick="VisualEditor.loadFlow()">
                <i class="fas fa-folder-open"></i> Cargar
            </button>
            <div class="toolbar-separator"></div>
            <button class="toolbar-btn" onclick="VisualEditor.undo()">
                <i class="fas fa-undo"></i> Deshacer
            </button>
            <button class="toolbar-btn" onclick="VisualEditor.redo()">
                <i class="fas fa-redo"></i> Rehacer
            </button>
            <div class="toolbar-separator"></div>
            <button class="toolbar-btn" onclick="VisualEditor.validateFlow()">
                <i class="fas fa-check-circle"></i> Validar
            </button>
            <button class="toolbar-btn primary" onclick="VisualEditor.generateFromFlow()">
                <i class="fas fa-magic"></i> Generar CDU
            </button>
            <div class="toolbar-separator"></div>
            <button class="toolbar-btn" onclick="VisualEditor.centerView()">
                <i class="fas fa-expand-arrows-alt"></i> Centrar
            </button>
            <button class="toolbar-btn" onclick="VisualEditor.toggleMinimap()">
                <i class="fas fa-map"></i> Minimap
            </button>
        `;
  },

  // Configurar atajos de teclado
  setupKeyboardShortcuts: function () {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "n":
            e.preventDefault();
            this.newFlow();
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
          case "a":
            e.preventDefault();
            this.selectAll();
            break;
        }
      } else if (e.key === "Delete") {
        this.deleteSelected();
      } else if (e.key === "Escape") {
        this.deselectAll();
        window.ConnectionManager.clearActiveConnection();
      }
    });
  },

  // Nuevo flujo
  newFlow: function () {
    if (window.NodeManager.getAllNodes().length > 0) {
      if (!confirm("¿Crear nuevo flujo? Se perderá el trabajo actual.")) {
        return;
      }
    }

    window.NodeManager.clear();
    window.ConnectionManager.clear();
    window.PropertiesPanel.clearPanel();

    // Agregar nodo de inicio automáticamente
    setTimeout(() => {
      window.NodeManager.createNode("start", 100, 100, {
        title: "Inicio del Flujo",
      });
    }, 100);

    window.CDUBuilder.showStatus("Nuevo flujo creado", "success");
  },

  // Guardar flujo
  saveFlow: function () {
    try {
      const flowData = {
        nodes: window.NodeManager.getAllNodes(),
        connections: window.ConnectionManager.getAllConnections(),
        timestamp: new Date().toISOString(),
      };

      const dataStr = JSON.stringify(flowData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "flujo-visual.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      window.CDUBuilder.showStatus("Flujo guardado correctamente", "success");
    } catch (error) {
      window.CDUBuilder.showStatus(
        "Error al guardar: " + error.message,
        "error"
      );
    }
  },

  // Cargar flujo
  loadFlow: function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const flowData = JSON.parse(e.target.result);
          this.loadFlowData(flowData);
          window.CDUBuilder.showStatus(
            "Flujo cargado correctamente",
            "success"
          );
        } catch (error) {
          window.CDUBuilder.showStatus(
            "Error al cargar flujo: " + error.message,
            "error"
          );
        }
      };
      reader.readAsText(file);
    };

    input.click();
  },

  // Cargar datos de flujo
  loadFlowData: function (flowData) {
    // Limpiar canvas actual
    window.NodeManager.clear();
    window.ConnectionManager.clear();

    // Recrear nodos
    if (flowData.nodes) {
      flowData.nodes.forEach((nodeData) => {
        const node = window.NodeManager.createNode(
          nodeData.type,
          nodeData.x,
          nodeData.y,
          nodeData.data
        );
        // Mantener ID original
        if (nodeData.id) {
          window.NodeManager.nodes.delete(node.id);
          node.id = nodeData.id;
          window.NodeManager.nodes.set(node.id, node);

          const element = document.getElementById(
            `node-${node.id.replace(nodeData.id, "")}`
          );
          if (element) {
            element.id = `node-${node.id}`;
          }
        }
      });
    }

    // Recrear conexiones
    if (flowData.connections) {
      setTimeout(() => {
        flowData.connections.forEach((connData) => {
          window.ConnectionManager.createConnection(
            connData.from,
            connData.to,
            connData.label
          );
        });
      }, 100);
    }
  },

  // Validar flujo
  validateFlow: function () {
    try {
      const nodes = window.NodeManager.getAllNodes();
      const connections = window.ConnectionManager.getAllConnections();

      if (nodes.length === 0) {
        throw new Error("El flujo está vacío");
      }

      window.FlowToCDUConverter.validateFlow(nodes, connections);
      window.CDUBuilder.showStatus("✅ Flujo válido", "success");
    } catch (error) {
      window.CDUBuilder.showStatus("❌ " + error.message, "error");
    }
  },

  // Generar CDU desde flujo visual
  generateFromFlow: function () {
    try {
      // Convertir flujo a configuración CDU
      const cduConfig = window.FlowToCDUConverter.convertFlowToCDU();

      // Actualizar formulario de configuración
      this.updateConfigForm(cduConfig);

      // Generar código
      const code = window.CDUCodeGenerator.generateCDUCode(cduConfig);
      document.getElementById("codeOutput").textContent = code;

      // Actualizar estado global
      window.CDUBuilderConfig.AppState.generatedCode = code;
      window.CDUBuilderConfig.AppState.currentCDU = cduConfig;
      window.CDUBuilderConfig.AppState.isValid = true;

      // Actualizar estado de despliegue
      window.CDUDeploy.updateDeployStatus();

      // Mostrar pestaña de código
      window.CDUBuilder.showTab("code");

      window.CDUBuilder.showStatus(
        "CDU generado desde flujo visual",
        "success"
      );
    } catch (error) {
      window.CDUBuilder.showStatus("Error: " + error.message, "error");
    }
  },

  // Actualizar formulario de configuración con datos del flujo
  updateConfigForm: function (cduConfig) {
    if (cduConfig.cduName)
      document.getElementById("cduName").value = cduConfig.cduName;
    if (cduConfig.cduTitle)
      document.getElementById("cduTitle").value = cduConfig.cduTitle;
    if (cduConfig.cduDescription)
      document.getElementById("cduDescription").value =
        cduConfig.cduDescription;
    if (cduConfig.cduIcon)
      document.getElementById("cduIcon").value = cduConfig.cduIcon;
    if (cduConfig.author)
      document.getElementById("author").value = cduConfig.author;
    if (cduConfig.version)
      document.getElementById("version").value = cduConfig.version;

    document.getElementById("enableStats").checked =
      cduConfig.enableStats || false;
    document.getElementById("enableLogging").checked =
      cduConfig.enableLogging || false;
  },

  // Centrar vista
  centerView: function () {
    const canvas = document.querySelector(".canvas-content");
    const nodes = window.NodeManager.getAllNodes();

    if (!canvas || nodes.length === 0) return;

    // Calcular bounding box de todos los nodos
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    nodes.forEach((node) => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x + node.width);
      maxY = Math.max(maxY, node.y + node.height);
    });

    // Centrar en el canvas
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    canvas.scrollLeft = centerX - canvasWidth / 2;
    canvas.scrollTop = centerY - canvasHeight / 2;
  },

  // Toggle minimap
  toggleMinimap: function () {
    // Implementación futura del minimap
    window.CDUBuilder.showStatus("Minimap - Función en desarrollo", "info");
  },

  // Deshacer (futuro)
  undo: function () {
    window.CDUBuilder.showStatus("Deshacer - Función en desarrollo", "info");
  },

  // Rehacer (futuro)
  redo: function () {
    window.CDUBuilder.showStatus("Rehacer - Función en desarrollo", "info");
  },

  // Seleccionar todos los nodos
  selectAll: function () {
    // Implementación futura
    window.CDUBuilder.showStatus(
      "Seleccionar todo - Función en desarrollo",
      "info"
    );
  },

  // Deseleccionar todo
  deselectAll: function () {
    if (window.NodeManager.selectedNode) {
      const element = document.getElementById(
        `node-${window.NodeManager.selectedNode}`
      );
      if (element) {
        element.classList.remove("selected");
      }
      window.NodeManager.selectedNode = null;
      window.PropertiesPanel.clearPanel();
    }

    // Limpiar conexiones activas
    window.ConnectionManager.clearActiveConnection();
  },

  // Eliminar seleccionado
  deleteSelected: function () {
    if (window.NodeManager.selectedNode) {
      window.NodeManager.deleteNode(window.NodeManager.selectedNode);
    }
  },

  // Limpiar editor
  clear: function () {
    window.NodeManager.clear();
    window.ConnectionManager.clear();
    window.PropertiesPanel.clearPanel();
  },
};
