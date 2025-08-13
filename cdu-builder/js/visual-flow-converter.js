// Visual Flow Editor - Convertidor de Flujo a CDU
window.FlowToCDUConverter = {
  // Convertir flujo visual a configuración CDU
  convertFlowToCDU: function () {
    const nodes = window.NodeManager.getAllNodes();
    const connections = window.ConnectionManager.getAllConnections();

    if (nodes.length === 0) {
      throw new Error("El flujo está vacío. Agrega al menos un nodo.");
    }

    // Encontrar nodo de inicio
    const startNode = nodes.find((node) => node.type === "start");
    if (!startNode) {
      throw new Error("El flujo debe tener un nodo de inicio.");
    }

    // Validar flujo
    this.validateFlow(nodes, connections);

    // Convertir nodos a pasos CDU
    const cduSteps = this.convertNodesToCDUSteps(nodes, connections, startNode);

    // Generar configuración CDU
    const cduConfig = this.generateCDUConfig(cduSteps, startNode);

    return cduConfig;
  },

  // Validar flujo
  validateFlow: function (nodes, connections) {
    const errors = [];

    // Verificar nodos sin conexiones
    nodes.forEach((node) => {
      if (node.type !== "start" && node.type !== "end") {
        const hasInput = connections.some((conn) => conn.to === node.id);
        const hasOutput = connections.some((conn) => conn.from === node.id);

        if (!hasInput) {
          errors.push(
            `Nodo "${node.data.title}" no tiene conexiones de entrada`
          );
        }
        if (!hasOutput && node.type !== "end" && node.type !== "transfer") {
          errors.push(
            `Nodo "${node.data.title}" no tiene conexiones de salida`
          );
        }
      }
    });

    // Verificar nodos de decisión con opciones
    nodes
      .filter((node) => node.type === "decision")
      .forEach((node) => {
        if (!node.data.options || node.data.options.length === 0) {
          errors.push(
            `Nodo de decisión "${node.data.title}" no tiene opciones definidas`
          );
        }
      });

    if (errors.length > 0) {
      throw new Error("Errores en el flujo:\n" + errors.join("\n"));
    }
  },

  // Convertir nodos a pasos CDU
  convertNodesToCDUSteps: function (nodes, connections, startNode) {
    const steps = new Map();

    // Procesar cada nodo
    nodes.forEach((node) => {
      const step = this.convertNodeToStep(node, connections);
      if (step) {
        steps.set(node.id, step);
      }
    });

    return steps;
  },

  // Convertir nodo individual a paso CDU
  convertNodeToStep: function (node, connections) {
    const nodeConnections = connections.filter((conn) => conn.from === node.id);

    switch (node.type) {
      case "start":
        return this.convertStartNode(node, nodeConnections);

      case "message":
        return this.convertMessageNode(node, nodeConnections);

      case "decision":
        return this.convertDecisionNode(node, nodeConnections);

      case "condition":
        return this.convertConditionNode(node, nodeConnections);

      case "action":
        return this.convertActionNode(node, nodeConnections);

      case "input":
        return this.convertInputNode(node, nodeConnections);

      case "transfer":
        return this.convertTransferNode(node);

      case "end":
        return this.convertEndNode(node);

      default:
        return null;
    }
  },

  // Convertir nodo de inicio
  convertStartNode: function (node, connections) {
    const messages = [];
    if (node.data.description) {
      messages.push(node.data.description);
    }

    const nextStep = connections.length > 0 ? connections[0].to : null;

    return {
      messages: messages.length > 0 ? messages : ["Iniciando conversación..."],
      options: nextStep ? [{ text: "Continuar", action: nextStep }] : [],
    };
  },

  // Convertir nodo de mensaje
  convertMessageNode: function (node, connections) {
    const messages = [];

    if (node.data.content) {
      messages.push(node.data.content);
    }

    const nextStep = connections.length > 0 ? connections[0].to : null;
    const options = nextStep ? [{ text: "Continuar", action: nextStep }] : [];

    return {
      messages: messages.length > 0 ? messages : ["Mensaje no definido"],
      options: options,
    };
  },

  // Convertir nodo de decisión
  convertDecisionNode: function (node, connections) {
    const messages = [];

    if (node.data.question) {
      messages.push(node.data.question);
    } else if (node.data.content) {
      messages.push(node.data.content);
    }

    const options = [];

    // Mapear opciones con conexiones
    if (node.data.options && node.data.options.length > 0) {
      node.data.options.forEach((optionText, index) => {
        const connection = connections[index];
        if (connection) {
          options.push({
            text: optionText,
            action: connection.to,
          });
        } else {
          options.push({
            text: optionText,
            action: "end_flow",
          });
        }
      });
    }

    return {
      messages: messages.length > 0 ? messages : ["Selecciona una opción:"],
      options: options,
    };
  },

  // Convertir nodo de condición
  convertConditionNode: function (node, connections) {
    const trueConnection = connections.find(
      (conn) => conn.label === "true" || conn.label === "verdadero"
    );
    const falseConnection = connections.find(
      (conn) => conn.label === "false" || conn.label === "falso"
    );

    // En un CDU simple, las condiciones se manejan como decisiones binarias
    const options = [];

    if (trueConnection) {
      options.push({ text: "Sí", action: trueConnection.to });
    }

    if (falseConnection) {
      options.push({ text: "No", action: falseConnection.to });
    }

    return {
      messages: [node.data.condition || "Evaluar condición"],
      options: options,
      condition: node.data.condition,
    };
  },

  // Convertir nodo de acción
  convertActionNode: function (node, connections) {
    const nextStep = connections.length > 0 ? connections[0].to : null;

    return {
      messages: [`Ejecutando: ${node.data.actionType || "acción"}`],
      options: nextStep ? [{ text: "Continuar", action: nextStep }] : [],
      action: {
        type: node.data.actionType,
        parameters: node.data.parameters,
      },
    };
  },

  // Convertir nodo de input
  convertInputNode: function (node, connections) {
    const nextStep = connections.length > 0 ? connections[0].to : null;

    return {
      messages: [
        node.data.prompt || "Por favor, ingresa la información solicitada:",
      ],
      input: {
        type: node.data.inputType || "text",
        variable: node.data.variable,
        validation: node.data.validation,
      },
      nextStep: nextStep,
    };
  },

  // Convertir nodo de transferencia
  convertTransferNode: function (node) {
    return {
      messages: [
        node.data.transferMessage || "Te estoy transfiriendo con un agente...",
      ],
      transfer: {
        target: node.data.target || "agente_humano",
      },
    };
  },

  // Convertir nodo final
  convertEndNode: function (node) {
    const messages = [];

    if (node.data.content) {
      messages.push(node.data.content);
    }

    const step = {
      messages: messages.length > 0 ? messages : ["Conversación finalizada"],
      options: [],
    };

    if (node.data.endType === "restart") {
      step.options.push({ text: "Reiniciar", action: "welcome" });
    } else if (node.data.endType === "survey") {
      step.options.push({ text: "Evaluar atención", action: "survey" });
    }

    return step;
  },

  // Generar configuración CDU completa
  generateCDUConfig: function (steps, startNode) {
    // Obtener configuración básica desde el formulario
    const basicConfig = window.CDUValidator.collectFormData();

    // Convertir steps Map a objeto
    const flowSteps = {};
    steps.forEach((step, nodeId) => {
      // Usar un nombre de paso más limpio
      const stepName = this.generateStepName(nodeId, step);
      flowSteps[stepName] = step;
    });

    // Actualizar nombres de acción en opciones
    this.updateActionNames(flowSteps, steps);

    return {
      ...basicConfig,
      flowSteps: flowSteps,
      startStep: this.generateStepName(startNode.id, steps.get(startNode.id)),
    };
  },

  // Generar nombre de paso limpio
  generateStepName: function (nodeId, step) {
    // Convertir IDs de nodo a nombres de paso más descriptivos
    const typeMap = {
      start_: "inicio",
      message_: "mensaje",
      decision_: "decision",
      condition_: "condicion",
      action_: "accion",
      input_: "entrada",
      transfer_: "transferir",
      end_: "fin",
    };

    for (const [prefix, name] of Object.entries(typeMap)) {
      if (nodeId.startsWith(prefix)) {
        const number = nodeId.replace(prefix, "");
        return number === "1" ? name : `${name}_${number}`;
      }
    }

    return nodeId;
  },

  // Actualizar nombres de acción en opciones
  updateActionNames: function (flowSteps, originalSteps) {
    Object.keys(flowSteps).forEach((stepName) => {
      const step = flowSteps[stepName];

      if (step.options) {
        step.options = step.options.map((option) => {
          // Encontrar el paso original correspondiente
          for (const [nodeId, originalStep] of originalSteps) {
            if (option.action === nodeId) {
              option.action = this.generateStepName(nodeId, originalStep);
              break;
            }
          }
          return option;
        });
      }

      if (step.nextStep) {
        for (const [nodeId, originalStep] of originalSteps) {
          if (step.nextStep === nodeId) {
            step.nextStep = this.generateStepName(nodeId, originalStep);
            break;
          }
        }
      }
    });
  },
};
