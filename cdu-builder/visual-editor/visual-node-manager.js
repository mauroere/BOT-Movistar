// Gestor de Nodos del Editor Visual
window.VisualNodeManager = {
  selectedNode: null,
  draggedNode: null,
  dragOffset: { x: 0, y: 0 },
  nodeCounter: 0,
  nodes: new Map(),

  init: function () {
    console.log("Inicializando Gestor de Nodos...");
    this.setupEventListeners();
    console.log("Gestor de Nodos inicializado");
  },

  setupEventListeners: function () {
    const canvas = document.getElementById("visual-canvas");
    if (!canvas) return;

    // Event listeners del canvas
    canvas.addEventListener("click", (e) => this.handleCanvasClick(e));

    // Prevenir selección de texto durante drag
    canvas.addEventListener("selectstart", (e) => e.preventDefault());
  },

  createNode: function (type, x, y, properties = {}) {
    const config = window.VisualEditorConfig.nodeTypes[type];
    if (!config) {
      console.error("Tipo de nodo no encontrado:", type);
      return null;
    }

    this.nodeCounter++;
    const nodeId = type + "_" + this.nodeCounter;

    const node = {
      id: nodeId,
      type: type,
      x: x,
      y: y,
      width: 200,
      height: 80,
      properties: { ...this.getDefaultProperties(config), ...properties },
    };

    // Crear elemento DOM
    const element = this.createNodeElement(node, config);
    const canvas = document.getElementById("visual-canvas");
    if (!canvas) {
      console.error("Canvas no encontrado");
      return null;
    }

    canvas.appendChild(element);

    // Guardar nodo
    this.nodes.set(nodeId, node);

    console.log("Nodo creado y guardado:", nodeId);

    return node;
  },

  createNodeElement: function (node, config) {
    const element = document.createElement("div");
    element.className = "visual-node";
    element.id = "node-" + node.id;
    element.dataset.nodeId = node.id;
    element.style.left = node.x + "px";
    element.style.top = node.y + "px";
    element.style.position = "absolute";
    element.style.borderColor = config.color;

    element.innerHTML = `
      <div class="node-header" style="background-color: ${config.color}">
        <div class="node-icon">${config.icon}</div>
        <div class="node-title">${config.label}</div>
        <div class="node-controls">
          <button class="node-btn delete-btn" onclick="VisualNodeManager.deleteNode('${
            node.id
          }')" title="Eliminar">✕</button>
        </div>
      </div>
      <div class="node-body">
        <div class="node-content">
          ${this.getNodeContentHtml(node, config)}
        </div>
        <div class="node-ports">
          <div class="node-port input" data-port-type="input" data-port-index="0"></div>
          <div class="node-port output" data-port-type="output" data-port-index="0"></div>
        </div>
      </div>
    `;

    // Hacer el nodo clickeable para selección
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      this.selectNode(node.id);
    });

    // Hacer el nodo draggable
    this.makeNodeDraggable(element);

    return element;
  },

  getNodeContentHtml: function (node, config) {
    const props = node.properties;
    let content = "";

    // Contenido específico por tipo de nodo
    if (
      node.type === "menu" &&
      props.options &&
      Array.isArray(props.options) &&
      props.options.length > 0
    ) {
      // Mostrar título y número de opciones para nodos de menú
      if (props.title) {
        content += `<div class="node-property"><strong>${props.title}</strong></div>`;
      }
      content += `<div class="node-property">${props.options.length} opciones:</div>`;

      // Mostrar las primeras 3 opciones
      const displayOptions = props.options.slice(0, 3);
      displayOptions.forEach((option, index) => {
        const optionText = typeof option === "object" ? option.text : option;
        const destination =
          typeof option === "object" ? option.destination : "";
        const truncatedText = this.truncateText(
          optionText || `Opción ${index + 1}`,
          20
        );

        if (destination) {
          content += `<div class="node-option">• ${truncatedText} → ${destination}</div>`;
        } else {
          content += `<div class="node-option">• ${truncatedText}</div>`;
        }
      });

      if (props.options.length > 3) {
        content += `<div class="node-option">... y ${
          props.options.length - 3
        } más</div>`;
      }
    } else {
      // Contenido genérico para otros tipos de nodo
      if (props.text) {
        content += `<div class="node-property">${this.truncateText(
          props.text,
          50
        )}</div>`;
      } else if (props.title) {
        content += `<div class="node-property">${props.title}</div>`;
      } else if (props.message) {
        content += `<div class="node-property">${this.truncateText(
          props.message,
          50
        )}</div>`;
      }
    }

    return content || '<div class="node-property">Configurar...</div>';
  },

  getNodePortsHtml: function (node, config) {
    let html = "";

    // Puertos de entrada
    if (config.inputs > 0) {
      for (let i = 0; i < config.inputs; i++) {
        html += `<div class="node-port input" data-port-type="input" data-port-index="${i}"></div>`;
      }
    }

    // Puertos de salida
    let outputCount = config.outputs;
    if (config.outputs === "dynamic") {
      outputCount =
        (node.properties.options && node.properties.options.length) || 1;
    }

    if (outputCount > 0) {
      for (let i = 0; i < outputCount; i++) {
        html += `<div class="node-port output" data-port-type="output" data-port-index="${i}"></div>`;
      }
    }

    return html;
  },

  makeNodeDraggable: function (element) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    const header = element.querySelector(".node-header");
    if (!header) return;

    header.addEventListener("mousedown", (e) => {
      if (e.target.closest(".node-btn")) {
        return; // No arrastrar si se hace clic en botones
      }

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(element.style.left) || 0;
      startTop = parseInt(element.style.top) || 0;

      this.selectNode(element.dataset.nodeId);

      e.preventDefault();
      e.stopPropagation();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newLeft = Math.max(0, startLeft + dx);
      const newTop = Math.max(0, startTop + dy);

      element.style.left = newLeft + "px";
      element.style.top = newTop + "px";

      // Actualizar posición en el modelo
      const node = this.nodes.get(element.dataset.nodeId);
      if (node) {
        node.x = newLeft;
        node.y = newTop;
      }

      // Actualizar conexiones
      if (window.VisualConnectionManager) {
        window.VisualConnectionManager.updateConnections();
      }
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
      }
    });
  },

  selectNode: function (nodeId) {
    // Deseleccionar nodo anterior
    if (this.selectedNode) {
      const prevElement = document.getElementById("node-" + this.selectedNode);
      if (prevElement) {
        prevElement.classList.remove("selected");
      }
    }

    // Si nodeId es null, limpiar selección
    if (!nodeId) {
      this.selectedNode = null;
      window.VisualPropertiesPanel.clearProperties();
      return;
    }

    // Seleccionar nuevo nodo
    this.selectedNode = nodeId;
    const element = document.getElementById("node-" + nodeId);
    if (element) {
      element.classList.add("selected");
    }

    // Actualizar panel de propiedades solo para nodos que no sean 'start'
    if (nodeId !== "start") {
      const node = this.nodes.get(nodeId);
      if (node && window.VisualPropertiesPanel) {
        window.VisualPropertiesPanel.updateProperties(node);
      }
    } else {
      // Para el nodo start, mostrar información básica
      window.VisualPropertiesPanel.clearProperties();
    }
  },

  deleteNode: function (nodeId) {
    if (confirm("¿Estás seguro de que deseas eliminar este nodo?")) {
      // Eliminar conexiones relacionadas
      window.VisualConnectionManager.removeNodeConnections(nodeId);

      // Eliminar elemento DOM
      const element = document.getElementById("node-" + nodeId);
      if (element) {
        element.remove();
      }

      // Eliminar del modelo
      this.nodes.delete(nodeId);

      // Deseleccionar si estaba seleccionado
      if (this.selectedNode === nodeId) {
        this.selectedNode = null;
        window.VisualPropertiesPanel.clearProperties();
      }
    }
  },

  updateNodeContent: function (nodeId) {
    const node = this.nodes.get(nodeId);
    const element = document.getElementById("node-" + nodeId);

    if (!node || !element) return;

    const config = window.VisualEditorConfig.nodeTypes[node.type];
    const contentEl = element.querySelector(".node-content");
    const portsEl = element.querySelector(".node-ports");

    if (contentEl) {
      contentEl.innerHTML = this.getNodeContentHtml(node, config);
    }

    if (portsEl) {
      portsEl.innerHTML = this.getNodePortsHtml(node, config);
    }

    // Actualizar conexiones
    window.VisualConnectionManager.updateConnections();
  },

  getDefaultProperties: function (config) {
    const props = {};
    for (const [key, prop] of Object.entries(config.properties)) {
      if (prop.default !== undefined) {
        props[key] = prop.default;
      }
    }
    return props;
  },

  truncateText: function (text, maxLength) {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  },

  handleCanvasClick: function (e) {
    if (e.target.id === "visual-canvas") {
      // Clic en el canvas vacío - deseleccionar
      this.selectNode(null);
    }
  },

  // API pública
  getNode: function (nodeId) {
    return this.nodes.get(nodeId);
  },

  getAllNodes: function () {
    return Array.from(this.nodes.values());
  },

  clearAll: function () {
    this.nodes.forEach((node) => {
      const element = document.getElementById("node-" + node.id);
      if (element) element.remove();
    });
    this.nodes.clear();
    this.selectedNode = null;
    this.nodeCounter = 0;
  },
};
