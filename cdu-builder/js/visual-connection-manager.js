// Visual Flow Editor - Gestor de Conexiones
window.ConnectionManager = {
  connections: new Map(),
  connectionCounter: 0,
  connectingFrom: null,
  svg: null,

  // Inicializar SVG para conexiones
  init: function () {
    const canvas = document.querySelector(".canvas-content");
    if (!canvas) return;

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.classList.add("connection-svg");
    this.svg.innerHTML = `
            <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                        refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#667eea"/>
                </marker>
            </defs>
        `;

    canvas.appendChild(this.svg);
  },

  // Manejar click en punto de conexión
  handleConnectionPoint: function (nodeId, type) {
    if (type === "output") {
      // Iniciar conexión desde salida
      this.startConnection(nodeId);
    } else if (type === "input") {
      // Completar conexión hacia entrada
      this.completeConnection(nodeId);
    }
  },

  // Iniciar conexión
  startConnection: function (fromNodeId) {
    // Limpiar conexión anterior si existe
    this.clearActiveConnection();

    this.connectingFrom = fromNodeId;

    // Marcar punto como activo
    const outputPoint = document.querySelector(
      `#node-${fromNodeId} .connection-point.output`
    );
    if (outputPoint) {
      outputPoint.classList.add("active");
    }

    // Cambiar cursor
    document.querySelector(".canvas-content").style.cursor = "crosshair";

    // Mostrar feedback visual
    this.showConnectionFeedback(true);
  },

  // Completar conexión
  completeConnection: function (toNodeId) {
    if (!this.connectingFrom || this.connectingFrom === toNodeId) {
      this.clearActiveConnection();
      return;
    }

    // Verificar si la conexión es válida
    if (this.isValidConnection(this.connectingFrom, toNodeId)) {
      this.createConnection(this.connectingFrom, toNodeId);
    }

    this.clearActiveConnection();
  },

  // Verificar si la conexión es válida
  isValidConnection: function (fromNodeId, toNodeId) {
    // No conectar a sí mismo
    if (fromNodeId === toNodeId) return false;

    // Verificar límites de conexiones
    const fromNode = window.NodeManager.getNode(fromNodeId);
    const toNode = window.NodeManager.getNode(toNodeId);

    if (!fromNode || !toNode) return false;

    const fromType = window.VisualEditorConfig.nodeTypes[fromNode.type];
    const toType = window.VisualEditorConfig.nodeTypes[toNode.type];

    // Verificar que el nodo origen pueda tener salidas
    if (fromType.maxOutputs === 0) return false;

    // Verificar que el nodo destino pueda tener entradas
    if (toType.maxInputs === 0) return false;

    // Contar conexiones actuales
    const fromConnections = this.getNodeOutputConnections(fromNodeId);
    const toConnections = this.getNodeInputConnections(toNodeId);

    if (fromConnections.length >= fromType.maxOutputs) return false;
    if (toConnections.length >= toType.maxInputs) return false;

    // Verificar que no exista ya esta conexión
    return !this.connectionExists(fromNodeId, toNodeId);
  },

  // Crear conexión
  createConnection: function (fromNodeId, toNodeId, label = "") {
    const connectionId = "conn_" + ++this.connectionCounter;

    const connection = {
      id: connectionId,
      from: fromNodeId,
      to: toNodeId,
      label: label,
    };

    this.connections.set(connectionId, connection);
    this.renderConnection(connection);

    return connection;
  },

  // Renderizar conexión
  renderConnection: function (connection) {
    const fromNode = window.NodeManager.getNode(connection.from);
    const toNode = window.NodeManager.getNode(connection.to);

    if (!fromNode || !toNode) return;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("id", `connection-${connection.id}`);
    path.classList.add("connection-path");

    // Calcular posiciones
    this.updateConnectionPath(connection);

    // Eventos
    path.addEventListener("click", (e) => {
      e.stopPropagation();
      this.selectConnection(connection.id);
    });

    path.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      window.ContextMenu.showConnectionMenu(e.clientX, e.clientY, connection);
    });

    this.svg.appendChild(path);

    // Animación de entrada
    path.classList.add("connection-enter");
  },

  // Actualizar path de conexión
  updateConnectionPath: function (connection) {
    const fromNode = window.NodeManager.getNode(connection.from);
    const toNode = window.NodeManager.getNode(connection.to);
    const path = document.getElementById(`connection-${connection.id}`);

    if (!fromNode || !toNode || !path) return;

    // Calcular puntos de conexión
    const fromX = fromNode.x + fromNode.width;
    const fromY = fromNode.y + fromNode.height / 2;
    const toX = toNode.x;
    const toY = toNode.y + toNode.height / 2;

    // Crear curva bezier
    const dx = toX - fromX;
    const curveStrength = window.VisualEditorConfig.connections.curveStrength;
    const cp1X = fromX + dx * curveStrength;
    const cp1Y = fromY;
    const cp2X = toX - dx * curveStrength;
    const cp2Y = toY;

    const pathData = `M ${fromX} ${fromY} C ${cp1X} ${cp1Y} ${cp2X} ${cp2Y} ${toX} ${toY}`;
    path.setAttribute("d", pathData);
  },

  // Actualizar conexiones de un nodo
  updateConnectionsForNode: function (nodeId) {
    this.connections.forEach((connection) => {
      if (connection.from === nodeId || connection.to === nodeId) {
        this.updateConnectionPath(connection);
      }
    });
  },

  // Limpiar conexión activa
  clearActiveConnection: function () {
    this.connectingFrom = null;

    // Remover clases activas
    document.querySelectorAll(".connection-point.active").forEach((point) => {
      point.classList.remove("active");
    });

    // Restaurar cursor
    const canvas = document.querySelector(".canvas-content");
    if (canvas) {
      canvas.style.cursor = "default";
    }

    this.showConnectionFeedback(false);
  },

  // Mostrar feedback de conexión
  showConnectionFeedback: function (show) {
    const inputPoints = document.querySelectorAll(".connection-point.input");
    inputPoints.forEach((point) => {
      if (show) {
        point.style.background = "#48bb78";
        point.style.transform = "translateY(-50%) scale(1.2)";
      } else {
        point.style.background = "";
        point.style.transform = "";
      }
    });
  },

  // Seleccionar conexión
  selectConnection: function (connectionId) {
    // Deseleccionar conexiones anteriores
    document.querySelectorAll(".connection-path.selected").forEach((path) => {
      path.classList.remove("selected");
      path.style.strokeWidth =
        window.VisualEditorConfig.connections.strokeWidth;
    });

    // Seleccionar nueva conexión
    const path = document.getElementById(`connection-${connectionId}`);
    if (path) {
      path.classList.add("selected");
      path.style.strokeWidth =
        window.VisualEditorConfig.connections.selectedStrokeWidth;
    }
  },

  // Eliminar conexión
  deleteConnection: function (connectionId) {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Eliminar del DOM
    const path = document.getElementById(`connection-${connectionId}`);
    if (path) {
      path.remove();
    }

    // Eliminar del mapa
    this.connections.delete(connectionId);
  },

  // Obtener conexiones de salida de un nodo
  getNodeOutputConnections: function (nodeId) {
    return Array.from(this.connections.values()).filter(
      (conn) => conn.from === nodeId
    );
  },

  // Obtener conexiones de entrada de un nodo
  getNodeInputConnections: function (nodeId) {
    return Array.from(this.connections.values()).filter(
      (conn) => conn.to === nodeId
    );
  },

  // Verificar si existe una conexión
  connectionExists: function (fromNodeId, toNodeId) {
    return Array.from(this.connections.values()).some(
      (conn) => conn.from === fromNodeId && conn.to === toNodeId
    );
  },

  // Remover todas las conexiones de un nodo
  removeNodeConnections: function (nodeId) {
    const toRemove = [];

    this.connections.forEach((connection, id) => {
      if (connection.from === nodeId || connection.to === nodeId) {
        toRemove.push(id);
      }
    });

    toRemove.forEach((id) => this.deleteConnection(id));
  },

  // Obtener todas las conexiones
  getAllConnections: function () {
    return Array.from(this.connections.values());
  },

  // Limpiar todas las conexiones
  clear: function () {
    this.connections.clear();
    this.connectionCounter = 0;
    this.connectingFrom = null;

    if (this.svg) {
      this.svg
        .querySelectorAll(".connection-path")
        .forEach((path) => path.remove());
    }
  },
};
