// Convertidor de Flujo Visual a CDU
window.VisualFlowConverter = {
  convertToFlow: function () {
    const nodes = window.VisualNodeManager.getAllNodes();
    const connections = window.VisualConnectionManager.getConnections();

    if (nodes.length === 0) {
      throw new Error("No hay nodos en el flujo");
    }

    // Validar flujo
    const validation = this.validateFlow(nodes, connections);
    if (!validation.valid) {
      throw new Error("Flujo inválido: " + validation.errors.join(", "));
    }

    // Convertir a estructura CDU
    const flow = this.buildFlowStructure(nodes, connections);
    return this.generateCDUCode(flow);
  },

  validateFlow: function (nodes, connections) {
    const errors = [];

    // Si no hay nodos, error básico
    if (nodes.length === 0) {
      errors.push("El flujo está vacío. Agrega al menos un nodo.");
      return { valid: false, errors };
    }

    // Verificar que existe nodo de inicio
    // Buscar por type='start', id='start', o ID que termine en 'start'
    const startNode = nodes.find(
      (n) =>
        n.type === "start" ||
        n.id === "start" ||
        n.id.includes("start") ||
        n.id.endsWith("start")
    );

    if (!startNode) {
      errors.push(
        `Debe existir un nodo de inicio. Nodos actuales: ${nodes
          .map((n) => n.id)
          .join(", ")}`
      );
      console.warn(
        "Nodos disponibles:",
        nodes.map((n) => ({ id: n.id, type: n.type }))
      );
    } else {
      console.log("✅ Nodo de inicio encontrado:", {
        id: startNode.id,
        type: startNode.type,
      });
    }

    // Verificar que todos los nodos requeridos tienen propiedades
    nodes.forEach((node) => {
      // Skip validation for start nodes
      if (
        node.type === "start" ||
        node.id === "start" ||
        node.id.includes("start")
      ) {
        return;
      }

      const config = window.VisualEditorConfig.nodeTypes[node.type];
      if (config && config.properties) {
        Object.entries(config.properties).forEach(([key, prop]) => {
          if (prop.required) {
            const value = node.properties && node.properties[key];

            // Validación específica para arrays
            if (prop.type === "array") {
              if (
                !Array.isArray(value) ||
                value.length === 0 ||
                value.every((item) => !item || item.trim() === "")
              ) {
                const label = prop.label || key;
                errors.push(
                  `Nodo ${node.id}: ${label} debe tener al menos una opción válida`
                );
              }
            } else {
              // Validación para otros tipos
              if (!value || value === "") {
                const label = prop.label || key;
                errors.push(`Nodo ${node.id}: ${label} es requerido`);
              }
            }
          }
        });
      }
    });

    // Verificar conectividad solo si hay más de un nodo
    if (nodes.length > 1) {
      const unreachableNodes = this.findUnreachableNodes(nodes, connections);
      if (unreachableNodes.length > 0) {
        errors.push(`Nodos sin conexión: ${unreachableNodes.join(", ")}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors,
      warnings: [],
    };
  },

  findUnreachableNodes: function (nodes, connections) {
    const reachable = new Set(["start"]);
    let changed = true;

    while (changed) {
      changed = false;
      connections.forEach((conn) => {
        if (reachable.has(conn.from.nodeId) && !reachable.has(conn.to.nodeId)) {
          reachable.add(conn.to.nodeId);
          changed = true;
        }
      });
    }

    return nodes.filter((n) => !reachable.has(n.id)).map((n) => n.id);
  },

  buildFlowStructure: function (nodes, connections) {
    const flow = {
      steps: {},
      initialStep: null,
    };

    // Encontrar primer paso después del inicio
    const startConnections = connections.filter(
      (c) => c.from.nodeId === "start"
    );
    if (startConnections.length > 0) {
      flow.initialStep = startConnections[0].to.nodeId;
    }

    // Convertir cada nodo a paso
    nodes.forEach((node) => {
      if (node.id === "start") return; // Skip start node

      flow.steps[node.id] = this.convertNodeToStep(node, connections);
    });

    return flow;
  },

  convertNodeToStep: function (node, connections) {
    const config = window.VisualEditorConfig.nodeTypes[node.type];
    const step = {
      id: node.id,
      type: node.type,
      ...node.properties,
    };

    // Agregar siguiente paso
    const outgoingConnections = connections.filter(
      (c) => c.from.nodeId === node.id
    );

    if (outgoingConnections.length === 1) {
      step.nextStep = outgoingConnections[0].to.nodeId;
    } else if (outgoingConnections.length > 1) {
      // Múltiples salidas - crear estructura de opciones
      step.options = outgoingConnections.map((conn, index) => ({
        text: this.getOptionText(node, index),
        nextStep: conn.to.nodeId,
      }));
    }

    return step;
  },

  getOptionText: function (node, index) {
    const props = node.properties;

    if (props.options && props.options[index]) {
      return props.options[index];
    }

    // Generar texto por defecto según el tipo de nodo
    switch (node.type) {
      case "condition":
        return index === 0 ? "Verdadero" : "Falso";
      case "wait-message":
        return index === 0 ? "Respuesta recibida" : "Timeout";
      case "button":
        return index === 0 ? "Presionado" : "No presionado";
      case "api-call":
        return index === 0 ? "Éxito" : "Error";
      default:
        return `Opción ${index + 1}`;
    }
  },

  generateCDUCode: function (flow) {
    const basicInfo = this.getBasicInfoFromForm();

    return `const ${basicInfo.id} = {
  id: "${basicInfo.id}",
  name: "${basicInfo.name}",
  description: "${basicInfo.description}",
  author: "${basicInfo.author}",
  version: "${basicInfo.version}",
  category: "${basicInfo.category}",
  
  // Configuración inicial
  initialStep: "${flow.initialStep}",
  
  // Variables globales
  variables: {
    userName: "",
    userPhone: "",
    sessionData: {}
  },
  
  // Pasos del flujo
  steps: {
${this.generateStepsCode(flow.steps)}
  },
  
  // Funciones auxiliares
  utils: {
    formatMessage: function(text, variables) {
      return text.replace(/\\{\\{(\\w+)\\}\\}/g, (match, key) => {
        return variables[key] || match;
      });
    },
    
    log: function(message, level = 'info') {
      console.log(\`[\${level.toUpperCase()}] \${this.id}: \${message}\`);
    }
  }
};

// Registrar CDU automáticamente
if (typeof CDURegistry !== 'undefined') {
  CDURegistry.register(${basicInfo.id});
} else {
  console.warn('CDURegistry no encontrado, CDU no registrado automáticamente');
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ${basicInfo.id};
}`;
  },

  generateStepsCode: function (steps) {
    let code = "";

    Object.entries(steps).forEach(([stepId, step]) => {
      code += `    "${stepId}": ${this.generateStepCode(step)},\n`;
    });

    return code.slice(0, -2); // Remover última coma
  },

  generateStepCode: function (step) {
    switch (step.type) {
      case "send-message":
        return this.generateSendMessageStep(step);
      case "send-image":
        return this.generateSendImageStep(step);
      case "send-audio":
        return this.generateSendAudioStep(step);
      case "send-video":
        return this.generateSendVideoStep(step);
      case "wait-message":
        return this.generateWaitMessageStep(step);
      case "quick-reply":
        return this.generateQuickReplyStep(step);
      case "menu":
        return this.generateMenuStep(step);
      case "condition":
        return this.generateConditionStep(step);
      case "delay":
        return this.generateDelayStep(step);
      case "set-variable":
        return this.generateSetVariableStep(step);
      case "api-call":
        return this.generateApiCallStep(step);
      case "log":
        return this.generateLogStep(step);
      case "end":
        return this.generateEndStep(step);
      default:
        return this.generateGenericStep(step);
    }
  },

  generateSendMessageStep: function (step) {
    return `{
      type: "send",
      message: "${this.escapeString(step.text)}",
      ${step.delay ? `delay: ${step.delay},` : ""}
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateSendImageStep: function (step) {
    return `{
      type: "sendImage",
      imageUrl: "${step.imageUrl}",
      ${step.caption ? `caption: "${this.escapeString(step.caption)}",` : ""}
      ${step.delay ? `delay: ${step.delay},` : ""}
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateSendAudioStep: function (step) {
    return `{
      type: "sendAudio",
      audioUrl: "${step.audioUrl}",
      ${step.delay ? `delay: ${step.delay},` : ""}
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateSendVideoStep: function (step) {
    return `{
      type: "sendVideo",
      videoUrl: "${step.videoUrl}",
      ${step.caption ? `caption: "${this.escapeString(step.caption)}",` : ""}
      ${step.delay ? `delay: ${step.delay},` : ""}
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateWaitMessageStep: function (step) {
    return `{
      type: "waitMessage",
      timeout: ${step.timeout || 30000},
      variable: "${step.variable}",
      onReceived: "${step.options?.[0]?.nextStep || step.nextStep || "end"}",
      onTimeout: "${step.options?.[1]?.nextStep || "end"}"
    }`;
  },

  generateMenuStep: function (step) {
    // Filtrar opciones vacías o inválidas
    const options = (step.options || []).filter((opt) => {
      const optionText = typeof opt === "string" ? opt : opt?.text || "";
      return optionText.trim() !== "";
    });

    return `{
      type: "menu",
      title: "${this.escapeString(step.title || "")}",
      ${step.text ? `text: "${this.escapeString(step.text)}",` : ""}
      options: [
${options
  .map((opt, i) => {
    const optText = typeof opt === "string" ? opt : opt.text || "";
    // Usar 'destination' en lugar de 'nextStep' para las opciones de menú con destinos
    const nextStep =
      typeof opt === "object"
        ? opt.destination || opt.nextStep || "end"
        : "end";
    return `        {
          text: "${this.escapeString(optText)}",
          nextStep: "${nextStep}"
        }`;
  })
  .join(",\n")}
      ]
    }`;
  },

  generateConditionStep: function (step) {
    const trueStep = step.options?.[0]?.nextStep || "end";
    const falseStep = step.options?.[1]?.nextStep || "end";

    return `{
      type: "condition",
      variable: "${step.variable}",
      operator: "${step.operator}",
      value: "${step.value}",
      onTrue: "${trueStep}",
      onFalse: "${falseStep}"
    }`;
  },

  generateDelayStep: function (step) {
    return `{
      type: "delay",
      duration: ${step.duration || 2000},
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateSetVariableStep: function (step) {
    return `{
      type: "setVariable",
      variable: "${step.variable}",
      value: "${step.value}",
      valueType: "${step.type || "string"}",
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateApiCallStep: function (step) {
    const successStep = step.options?.[0]?.nextStep || "end";
    const errorStep = step.options?.[1]?.nextStep || "end";

    return `{
      type: "apiCall",
      url: "${step.url}",
      method: "${step.method || "GET"}",
      ${step.headers ? `headers: ${step.headers},` : ""}
      ${step.body ? `body: ${step.body},` : ""}
      ${
        step.responseVariable
          ? `responseVariable: "${step.responseVariable}",`
          : ""
      }
      onSuccess: "${successStep}",
      onError: "${errorStep}"
    }`;
  },

  generateLogStep: function (step) {
    return `{
      type: "log",
      message: "${this.escapeString(step.message)}",
      level: "${step.level || "info"}",
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  generateEndStep: function (step) {
    return `{
      type: "end",
      ${step.message ? `message: "${this.escapeString(step.message)}"` : ""}
    }`;
  },

  generateGenericStep: function (step) {
    return `{
      type: "${step.type}",
      ...${JSON.stringify(step, null, 6).replace(/^/gm, "      ")},
      nextStep: "${step.nextStep || "end"}"
    }`;
  },

  getBasicInfoFromForm: function () {
    return {
      id: document.getElementById("cduId")?.value || "visual_cdu",
      name:
        document.getElementById("cduName")?.value || "CDU Generado Visualmente",
      description:
        document.getElementById("description")?.value ||
        "CDU creado con el editor visual",
      author: document.getElementById("author")?.value || "Editor Visual",
      version: document.getElementById("version")?.value || "1.0",
      category: document.getElementById("category")?.value || "General",
    };
  },

  escapeString: function (str) {
    if (!str) return "";
    return str
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r");
  },

  // Exportar flujo visual a JSON
  exportVisualFlow: function () {
    const nodes = window.VisualNodeManager.getAllNodes();
    const connections = window.VisualConnectionManager.getConnections();

    return {
      version: "1.0",
      timestamp: new Date().toISOString(),
      nodes: nodes,
      connections: connections,
      metadata: this.getBasicInfoFromForm(),
    };
  },

  // Importar flujo visual desde JSON
  importVisualFlow: function (flowData) {
    if (!flowData.nodes || !flowData.connections) {
      throw new Error("Formato de flujo inválido");
    }

    // Limpiar canvas actual
    window.VisualNodeManager.clearAll();
    window.VisualConnectionManager.clearAll();

    // Importar nodos
    flowData.nodes.forEach((nodeData) => {
      if (nodeData.id === "start") return; // Skip start node, already exists

      const node = window.VisualNodeManager.createNode(
        nodeData.type,
        nodeData.x,
        nodeData.y,
        nodeData.properties
      );
    });

    // Importar conexiones
    setTimeout(() => {
      flowData.connections.forEach((connData) => {
        window.VisualConnectionManager.createConnection(
          connData.from.nodeId,
          connData.from.portIndex,
          connData.to.nodeId,
          connData.to.portIndex
        );
      });
    }, 100);

    // Actualizar formulario si hay metadata
    if (flowData.metadata) {
      Object.entries(flowData.metadata).forEach(([key, value]) => {
        const input = document.getElementById(key);
        if (input) input.value = value;
      });
    }
  },
};
