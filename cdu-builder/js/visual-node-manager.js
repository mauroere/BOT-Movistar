// Visual Flow Editor - Gestor de Nodos
window.NodeManager = {
  nodes: new Map(),
  selectedNode: null,
  draggedNode: null,
  nodeCounter: 0,

  // Crear un nuevo nodo
  createNode: function (type, x, y, data = {}) {
    const nodeType = window.VisualEditorConfig.nodeTypes[type];
    if (!nodeType) {
      console.error("Tipo de nodo no encontrado:", type);
      return null;
    }

    const nodeId = type + "_" + ++this.nodeCounter;
    const node = {
      id: nodeId,
      type: type,
      x: x,
      y: y,
      width: window.VisualEditorConfig.node.defaultWidth,
      height: window.VisualEditorConfig.node.defaultHeight,
      data: {
        title: data.title || nodeType.name,
        content: data.content || "",
        options: data.options || [],
        ...data,
      },
      inputs: [],
      outputs: [],
    };

    this.nodes.set(nodeId, node);
    this.renderNode(node);
    this.selectNode(nodeId);

    // Actualizar panel de propiedades
    if (window.PropertiesPanel) {
      window.PropertiesPanel.updatePanel(node);
    }

    return node;
  },

  // Renderizar nodo en el DOM
  renderNode: function (node) {
    const nodeType = window.VisualEditorConfig.nodeTypes[node.type];
    const canvas = document.querySelector(".canvas-content");

    const nodeElement = document.createElement("div");
    nodeElement.className = `flow-node ${node.type}`;
    nodeElement.id = `node-${node.id}`;
    nodeElement.style.left = node.x + "px";
    nodeElement.style.top = node.y + "px";
    nodeElement.style.width = node.width + "px";

    nodeElement.innerHTML = this.getNodeHTML(node, nodeType);

    // Event listeners
    this.attachNodeEvents(nodeElement, node);

    canvas.appendChild(nodeElement);

    // Animación de entrada
    nodeElement.classList.add("node-enter");

    return nodeElement;
  },

  // HTML del nodo
  getNodeHTML: function (node, nodeType) {
    let html = `
            <div class="node-header">
                <div class="node-type-icon ${node.type}">
                    <i class="${nodeType.icon}"></i>
                </div>
                <span class="node-title">${node.data.title}</span>
                <div class="node-actions">
                    <button class="node-btn-delete" onclick="NodeManager.deleteNode('${node.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="node-content">
        `;

    // Contenido específico según el tipo
    switch (node.type) {
      case "start":
        html += `<div class="node-description">Punto de inicio del flujo</div>`;
        break;

      case "message":
        html += `
                    <textarea class="node-message" placeholder="Escribe tu mensaje..."
                        onchange="NodeManager.updateNodeData('${
                          node.id
                        }', 'content', this.value)"
                    >${node.data.content || ""}</textarea>
                `;
        break;

      case "decision":
        html += `
                    <div class="node-description">Presenta opciones al usuario</div>
                    <div class="node-options">
                `;
        node.data.options.forEach((option, index) => {
          html += `
                        <div class="node-option">
                            <input type="text" value="${option}" 
                                onchange="NodeManager.updateNodeOption('${
                                  node.id
                                }', ${index}, this.value)"
                                placeholder="Opción ${index + 1}">
                            <button onclick="NodeManager.removeNodeOption('${
                              node.id
                            }', ${index})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
        });
        html += `
                        <button class="btn-add-option" onclick="NodeManager.addNodeOption('${node.id}')">
                            + Agregar opción
                        </button>
                    </div>
                `;
        break;

      case "action":
        html += `
                    <input type="text" class="node-action" 
                        placeholder="Acción a realizar..."
                        value="${node.data.action || ""}"
                        onchange="NodeManager.updateNodeData('${
                          node.id
                        }', 'action', this.value)">
                `;
        break;

      case "condition":
        html += `
                    <input type="text" class="node-condition" 
                        placeholder="Condición a evaluar..."
                        value="${node.data.condition || ""}"
                        onchange="NodeManager.updateNodeData('${
                          node.id
                        }', 'condition', this.value)">
                `;
        break;

      case "transfer":
        html += `
                    <input type="text" class="node-target" 
                        placeholder="Destino de transferencia..."
                        value="${node.data.target || ""}"
                        onchange="NodeManager.updateNodeData('${
                          node.id
                        }', 'target', this.value)">
                `;
        break;

      case "input":
        html += `
                    <input type="text" class="node-prompt" 
                        placeholder="Pregunta al usuario..."
                        value="${node.data.prompt || ""}"
                        onchange="NodeManager.updateNodeData('${
                          node.id
                        }', 'prompt', this.value)">
                    <select onchange="NodeManager.updateNodeData('${
                      node.id
                    }', 'inputType', this.value)">
                        <option value="text" ${
                          node.data.inputType === "text" ? "selected" : ""
                        }>Texto</option>
                        <option value="number" ${
                          node.data.inputType === "number" ? "selected" : ""
                        }>Número</option>
                        <option value="email" ${
                          node.data.inputType === "email" ? "selected" : ""
                        }>Email</option>
                        <option value="phone" ${
                          node.data.inputType === "phone" ? "selected" : ""
                        }>Teléfono</option>
                    </select>
                `;
        break;

      case "end":
        html += `
                    <textarea class="node-message" placeholder="Mensaje de despedida..."
                        onchange="NodeManager.updateNodeData('${
                          node.id
                        }', 'content', this.value)"
                    >${node.data.content || ""}</textarea>
                `;
        break;
    }

    html += `
            </div>
        `;

    // Puntos de conexión
    if (nodeType.maxInputs > 0) {
      html += `<div class="connection-point input" data-node="${node.id}" data-type="input"></div>`;
    }

    if (nodeType.maxOutputs > 0) {
      html += `<div class="connection-point output" data-node="${node.id}" data-type="output"></div>`;
    }

    return html;
  },

  // Eventos del nodo
  attachNodeEvents: function (element, node) {
    // Selección de nodo
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      this.selectNode(node.id);
    });

    // Drag & Drop
    element.addEventListener("mousedown", (e) => {
      if (
        e.target.classList.contains("node-header") ||
        e.target.closest(".node-header")
      ) {
        this.startNodeDrag(node.id, e);
      }
    });

    // Puntos de conexión
    const connectionPoints = element.querySelectorAll(".connection-point");
    connectionPoints.forEach((point) => {
      point.addEventListener("click", (e) => {
        e.stopPropagation();
        window.ConnectionManager.handleConnectionPoint(
          point.dataset.node,
          point.dataset.type
        );
      });
    });

    // Menú contextual
    element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      window.ContextMenu.show(e.clientX, e.clientY, node);
    });
  },

  // Seleccionar nodo
  selectNode: function (nodeId) {
    // Deseleccionar nodo anterior
    if (this.selectedNode) {
      const prevElement = document.getElementById(`node-${this.selectedNode}`);
      if (prevElement) {
        prevElement.classList.remove("selected");
      }
    }

    // Seleccionar nuevo nodo
    this.selectedNode = nodeId;
    const element = document.getElementById(`node-${nodeId}`);
    if (element) {
      element.classList.add("selected");
    }

    // Actualizar panel de propiedades
    const node = this.nodes.get(nodeId);
    if (node && window.PropertiesPanel) {
      window.PropertiesPanel.updatePanel(node);
    }
  },

  // Iniciar arrastrar nodo
  startNodeDrag: function (nodeId, event) {
    this.draggedNode = nodeId;
    const node = this.nodes.get(nodeId);
    const element = document.getElementById(`node-${nodeId}`);

    if (!node || !element) return;

    const rect = element.getBoundingClientRect();
    const canvasRect = document
      .querySelector(".canvas-content")
      .getBoundingClientRect();

    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    element.classList.add("dragging");

    const handleMouseMove = (e) => {
      const newX = e.clientX - canvasRect.left - offsetX;
      const newY = e.clientY - canvasRect.top - offsetY;

      node.x = Math.max(0, newX);
      node.y = Math.max(0, newY);

      element.style.left = node.x + "px";
      element.style.top = node.y + "px";

      // Actualizar conexiones
      window.ConnectionManager.updateConnectionsForNode(nodeId);
    };

    const handleMouseUp = () => {
      element.classList.remove("dragging");
      this.draggedNode = null;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  },

  // Actualizar datos del nodo
  updateNodeData: function (nodeId, key, value) {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.data[key] = value;

      // Actualizar panel de propiedades si el nodo está seleccionado
      if (this.selectedNode === nodeId && window.PropertiesPanel) {
        window.PropertiesPanel.updatePanel(node);
      }
    }
  },

  // Gestión de opciones en nodos de decisión
  addNodeOption: function (nodeId) {
    const node = this.nodes.get(nodeId);
    if (node && node.type === "decision") {
      node.data.options.push("Nueva opción");
      this.rerenderNode(nodeId);
    }
  },

  removeNodeOption: function (nodeId, index) {
    const node = this.nodes.get(nodeId);
    if (node && node.type === "decision") {
      node.data.options.splice(index, 1);
      this.rerenderNode(nodeId);
    }
  },

  updateNodeOption: function (nodeId, index, value) {
    const node = this.nodes.get(nodeId);
    if (
      node &&
      node.type === "decision" &&
      node.data.options[index] !== undefined
    ) {
      node.data.options[index] = value;
    }
  },

  // Re-renderizar nodo
  rerenderNode: function (nodeId) {
    const oldElement = document.getElementById(`node-${nodeId}`);
    const node = this.nodes.get(nodeId);

    if (oldElement && node) {
      oldElement.remove();
      this.renderNode(node);
    }
  },

  // Eliminar nodo
  deleteNode: function (nodeId) {
    if (confirm("¿Estás seguro de eliminar este nodo?")) {
      // Eliminar conexiones
      window.ConnectionManager.removeNodeConnections(nodeId);

      // Eliminar del DOM
      const element = document.getElementById(`node-${nodeId}`);
      if (element) {
        element.remove();
      }

      // Eliminar del mapa
      this.nodes.delete(nodeId);

      // Deseleccionar si estaba seleccionado
      if (this.selectedNode === nodeId) {
        this.selectedNode = null;
        if (window.PropertiesPanel) {
          window.PropertiesPanel.clearPanel();
        }
      }
    }
  },

  // Obtener nodo por ID
  getNode: function (nodeId) {
    return this.nodes.get(nodeId);
  },

  // Obtener todos los nodos
  getAllNodes: function () {
    return Array.from(this.nodes.values());
  },

  // Limpiar todos los nodos
  clear: function () {
    this.nodes.clear();
    this.selectedNode = null;
    this.draggedNode = null;
    this.nodeCounter = 0;

    const canvas = document.querySelector(".canvas-content");
    if (canvas) {
      canvas.querySelectorAll(".flow-node").forEach((node) => node.remove());
    }
  },
};
