// Gestor de Conexiones del Editor Visual
window.VisualConnectionManager = {
  connections: new Map(),
  connectionCounter: 0,
  isConnecting: false,
  connectionStart: null,
  tempConnection: null,

  init: function () {
    this.setupEventListeners();
    this.setupSVG();
  },

  setupEventListeners: function () {
    console.log("ConnectionManager: Configurando event listeners");

    // Event listeners para puertos con mayor especificidad
    document.addEventListener("mousedown", (e) => {
      console.log("MouseDown en:", e.target, "Clases:", e.target.className);
      if (e.target.classList.contains("node-port")) {
        e.preventDefault();
        e.stopPropagation();
        this.handlePortClick(e);
      }
    });

    // También escuchar clicks normales como fallback
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("node-port")) {
        e.preventDefault();
        e.stopPropagation();
        this.handlePortClick(e);
      }
    });

    // Limpiar conexión temporal con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isConnecting) {
        this.cancelConnection();
      }
    });
  },

  setupSVG: function () {
    const svg = document.getElementById("connections-svg");
    if (!svg) return;

    // Configurar SVG para cubrir todo el canvas
    const canvas = document.getElementById("visual-canvas");
    if (canvas) {
      const resizeObserver = new ResizeObserver(() => {
        this.updateSVGSize();
      });
      resizeObserver.observe(canvas);
      this.updateSVGSize();
    }
  },

  updateSVGSize: function () {
    const svg = document.getElementById("connections-svg");
    const canvas = document.getElementById("visual-canvas");

    if (!svg || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    svg.style.width = canvas.scrollWidth + "px";
    svg.style.height = canvas.scrollHeight + "px";
  },

  handlePortClick: function (e) {
    e.stopPropagation();
    e.preventDefault();

    const port = e.target;
    const nodeElement = port.closest(".visual-node");

    if (!nodeElement) {
      console.error("No se encontró el nodo padre del puerto");
      return;
    }

    const nodeId = nodeElement.dataset.nodeId;
    const portType = port.dataset.portType;
    const portIndex = parseInt(port.dataset.portIndex || "0");

    console.log("Puerto clickeado:", {
      nodeId,
      portType,
      portIndex,
      isConnecting: this.isConnecting,
      connectionStart: this.connectionStart,
    });

    if (!this.isConnecting) {
      // Iniciar conexión solo desde puertos de salida
      if (portType === "output") {
        console.log("Iniciando conexión desde puerto de salida");
        this.startConnection(nodeId, portIndex);
        this.highlightCompatiblePorts(nodeId);

        // Agregar indicador visual
        port.style.boxShadow = "0 0 10px #2ecc71";
        port.style.transform = "scale(1.2)";
      } else {
        console.log(
          "Intento de iniciar conexión desde puerto de entrada - ignorado"
        );
      }
    } else {
      // Completar conexión en puerto de entrada
      if (portType === "input" && this.connectionStart.nodeId !== nodeId) {
        console.log("Completando conexión en puerto de entrada");
        this.completeConnection(nodeId, portIndex);
      } else {
        console.log("Cancelando conexión - mismo nodo o puerto incorrecto");
        this.cancelConnection();
      }
    }
  },

  startConnection: function (nodeId, portIndex) {
    console.log("Iniciando conexión desde:", { nodeId, portIndex });

    this.isConnecting = true;
    this.connectionStart = { nodeId, portIndex };

    // Cambiar cursor
    document.body.style.cursor = "crosshair";

    // Crear conexión temporal
    this.createTempConnection();

    // Crear función bound para poder removerla después
    this.boundMouseMoveHandler = this.handleConnectionMouseMove.bind(this);

    // Seguir mouse
    document.addEventListener("mousemove", this.boundMouseMoveHandler);

    console.log("✅ Conexión iniciada");
  },

  completeConnection: function (toNodeId, toPortIndex) {
    const fromNodeId = this.connectionStart.nodeId;
    const fromPortIndex = this.connectionStart.portIndex;

    // Validar conexión
    if (
      this.isValidConnection(fromNodeId, fromPortIndex, toNodeId, toPortIndex)
    ) {
      this.createConnection(fromNodeId, fromPortIndex, toNodeId, toPortIndex);
    }

    this.cancelConnection();
  },

  cancelConnection: function () {
    console.log("Cancelando conexión...");

    this.isConnecting = false;
    this.connectionStart = null;

    // Restaurar cursor
    document.body.style.cursor = "default";

    // Eliminar conexión temporal
    this.removeTempConnection();

    // Quitar highlights de todos los puertos
    this.clearHighlights();

    // Remover event listener de mouse move usando la referencia guardada
    if (this.boundMouseMoveHandler) {
      document.removeEventListener("mousemove", this.boundMouseMoveHandler);
      this.boundMouseMoveHandler = null;
    }

    // Limpiar estilos de puertos
    document.querySelectorAll(".node-port").forEach((port) => {
      port.style.boxShadow = "";
      port.style.transform = "";
    });

    console.log("✅ Conexión cancelada");
  },

  createConnection: function (
    fromNodeId,
    fromPortIndex,
    toNodeId,
    toPortIndex
  ) {
    console.log("Creando conexión:", {
      fromNodeId,
      fromPortIndex,
      toNodeId,
      toPortIndex,
    });

    this.connectionCounter++;
    const connectionId = "conn_" + this.connectionCounter;

    const connection = {
      id: connectionId,
      from: { nodeId: fromNodeId, portIndex: fromPortIndex },
      to: { nodeId: toNodeId, portIndex: toPortIndex },
    };

    this.connections.set(connectionId, connection);
    this.renderConnection(connection);

    // Disparar evento personalizado
    document.dispatchEvent(
      new CustomEvent("connection-created", {
        detail: {
          id: connectionId,
          from: `${fromNodeId}:${fromPortIndex}`,
          to: `${toNodeId}:${toPortIndex}`,
          connection: connection,
        },
      })
    );

    console.log("✅ Conexión creada exitosamente:", connectionId);
    return connection;
  },

  renderConnection: function (connection) {
    console.log("Renderizando conexión:", connection.id);

    const svg = document.getElementById("connections-svg");
    if (!svg) {
      console.error("❌ SVG de conexiones no encontrado");
      return;
    }

    const fromPos = this.getPortPosition(
      connection.from.nodeId,
      "output",
      connection.from.portIndex
    );
    const toPos = this.getPortPosition(
      connection.to.nodeId,
      "input",
      connection.to.portIndex
    );

    if (!fromPos || !toPos) {
      console.error("❌ No se pudieron obtener las posiciones de los puertos", {
        fromPos,
        toPos,
      });
      return;
    }

    console.log("Posiciones de puertos:", { fromPos, toPos });

    // Crear path SVG
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.id = "connection-" + connection.id;
    path.classList.add("connection-path");
    path.setAttribute("marker-end", "url(#arrowhead)");

    const pathData = this.createBezierPath(fromPos, toPos);
    path.setAttribute("d", pathData);

    // Agregar event listeners
    path.addEventListener("click", () => this.selectConnection(connection.id));
    path.addEventListener("dblclick", () =>
      this.deleteConnection(connection.id)
    );

    svg.appendChild(path);

    console.log("✅ Conexión renderizada:", path.id);
  },

  createBezierPath: function (from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    // Puntos de control para curva bezier
    const cp1x = from.x + Math.abs(dx) * 0.5;
    const cp1y = from.y;
    const cp2x = to.x - Math.abs(dx) * 0.5;
    const cp2y = to.y;

    return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
  },

  getPortPosition: function (nodeId, portType, portIndex) {
    console.log(
      `Obteniendo posición del puerto: ${nodeId}, ${portType}, ${portIndex}`
    );

    const nodeElement = document.getElementById("node-" + nodeId);
    if (!nodeElement) {
      console.error("❌ Nodo no encontrado:", "node-" + nodeId);
      return null;
    }

    const ports = nodeElement.querySelectorAll(`.node-port.${portType}`);
    if (!ports[portIndex]) {
      console.error("❌ Puerto no encontrado:", {
        portType,
        portIndex,
        availablePorts: ports.length,
      });
      return null;
    }

    const port = ports[portIndex];
    const nodeRect = nodeElement.getBoundingClientRect();
    const portRect = port.getBoundingClientRect();
    const canvasRect = document
      .getElementById("visual-canvas")
      .getBoundingClientRect();

    const position = {
      x: portRect.left + portRect.width / 2 - canvasRect.left,
      y: portRect.top + portRect.height / 2 - canvasRect.top,
    };

    console.log("Posición calculada:", position);
    return position;
  },

  updateConnections: function () {
    this.connections.forEach((connection) => {
      this.updateConnectionPath(connection);
    });
  },

  updateConnectionPath: function (connection) {
    const path = document.getElementById("connection-" + connection.id);
    if (!path) return;

    const fromPos = this.getPortPosition(
      connection.from.nodeId,
      "output",
      connection.from.portIndex
    );
    const toPos = this.getPortPosition(
      connection.to.nodeId,
      "input",
      connection.to.portIndex
    );

    if (fromPos && toPos) {
      const pathData = this.createBezierPath(fromPos, toPos);
      path.setAttribute("d", pathData);
    }
  },

  deleteConnection: function (connectionId) {
    if (confirm("¿Eliminar esta conexión?")) {
      // Eliminar del DOM
      const path = document.getElementById("connection-" + connectionId);
      if (path) path.remove();

      // Eliminar del modelo
      this.connections.delete(connectionId);
    }
  },

  removeNodeConnections: function (nodeId) {
    const toRemove = [];

    this.connections.forEach((connection, id) => {
      if (
        connection.from.nodeId === nodeId ||
        connection.to.nodeId === nodeId
      ) {
        toRemove.push(id);
      }
    });

    toRemove.forEach((id) => {
      const path = document.getElementById("connection-" + id);
      if (path) path.remove();
      this.connections.delete(id);
    });
  },

  isValidConnection: function (
    fromNodeId,
    fromPortIndex,
    toNodeId,
    toPortIndex
  ) {
    // No auto-conexión
    if (fromNodeId === toNodeId) return false;

    // Verificar que no exista ya esta conexión
    for (const connection of this.connections.values()) {
      if (
        connection.from.nodeId === fromNodeId &&
        connection.from.portIndex === fromPortIndex &&
        connection.to.nodeId === toNodeId &&
        connection.to.portIndex === toPortIndex
      ) {
        return false;
      }
    }

    // Verificar que el puerto de entrada no tenga ya una conexión
    for (const connection of this.connections.values()) {
      if (
        connection.to.nodeId === toNodeId &&
        connection.to.portIndex === toPortIndex
      ) {
        return false; // Puerto de entrada ya conectado
      }
    }

    return true;
  },

  createTempConnection: function () {
    const svg = document.getElementById("connections-svg");
    if (!svg) return;

    this.tempConnection = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    this.tempConnection.classList.add("temp-connection");
    svg.appendChild(this.tempConnection);
  },

  removeTempConnection: function () {
    if (this.tempConnection) {
      this.tempConnection.remove();
      this.tempConnection = null;
    }
  },

  handleConnectionMouseMove: function (e) {
    if (!this.tempConnection || !this.connectionStart) {
      return;
    }

    // Verificar que el nodo de origen aún existe
    const sourceNode = document.getElementById(
      "node-" + this.connectionStart.nodeId
    );
    if (!sourceNode) {
      console.warn("Nodo de origen no encontrado, cancelando conexión");
      this.cancelConnection();
      return;
    }

    const fromPos = this.getPortPosition(
      this.connectionStart.nodeId,
      "output",
      this.connectionStart.portIndex
    );

    if (!fromPos) {
      console.warn("No se pudo obtener posición del puerto de origen");
      return;
    }

    const canvas = document.getElementById("visual-canvas");
    if (!canvas) {
      console.warn("Canvas no encontrado");
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    const toPos = {
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top,
    };

    const pathData = this.createBezierPath(fromPos, toPos);
    this.tempConnection.setAttribute("d", pathData);
  },

  highlightCompatiblePorts: function (excludeNodeId) {
    const inputPorts = document.querySelectorAll(".node-port.input");
    inputPorts.forEach((port) => {
      const nodeElement = port.closest(".visual-node");
      if (nodeElement.dataset.nodeId !== excludeNodeId) {
        port.classList.add("compatible");
      }
    });
  },

  clearHighlights: function () {
    document.querySelectorAll(".node-port.compatible").forEach((port) => {
      port.classList.remove("compatible");
    });
  },

  selectConnection: function (connectionId) {
    // Deseleccionar otras conexiones
    document.querySelectorAll(".connection-path.selected").forEach((path) => {
      path.classList.remove("selected");
    });

    // Seleccionar esta conexión
    const path = document.getElementById("connection-" + connectionId);
    if (path) {
      path.classList.add("selected");
    }
  },

  // API pública
  getConnections: function () {
    return Array.from(this.connections.values());
  },

  // Alias para compatibilidad
  getAllConnections: function () {
    return this.getConnections();
  },

  clearAll: function () {
    // Eliminar del DOM
    document
      .querySelectorAll(".connection-path")
      .forEach((path) => path.remove());

    // Limpiar modelo
    this.connections.clear();
    this.connectionCounter = 0;
  },
};
