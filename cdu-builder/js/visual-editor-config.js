// Visual Flow Editor - Configuración
window.VisualEditorConfig = {
  // Tipos de nodos disponibles
  nodeTypes: {
    start: {
      id: "start",
      name: "Inicio",
      icon: "fas fa-play",
      color: "#4299e1",
      maxInputs: 0,
      maxOutputs: 1,
      category: "flow",
    },
    message: {
      id: "message",
      name: "Mensaje",
      icon: "fas fa-comment",
      color: "#48bb78",
      maxInputs: 5,
      maxOutputs: 1,
      category: "communication",
    },
    decision: {
      id: "decision",
      name: "Decisión",
      icon: "fas fa-question-circle",
      color: "#ed8936",
      maxInputs: 1,
      maxOutputs: 10,
      category: "logic",
    },
    action: {
      id: "action",
      name: "Acción",
      icon: "fas fa-cog",
      color: "#9f7aea",
      maxInputs: 1,
      maxOutputs: 1,
      category: "logic",
    },
    input: {
      id: "input",
      name: "Input Usuario",
      icon: "fas fa-keyboard",
      color: "#38b2ac",
      maxInputs: 1,
      maxOutputs: 1,
      category: "communication",
    },
    condition: {
      id: "condition",
      name: "Condición",
      icon: "fas fa-code-branch",
      color: "#d69e2e",
      maxInputs: 1,
      maxOutputs: 2,
      category: "logic",
    },
    transfer: {
      id: "transfer",
      name: "Transferir",
      icon: "fas fa-share",
      color: "#805ad5",
      maxInputs: 1,
      maxOutputs: 0,
      category: "action",
    },
    end: {
      id: "end",
      name: "Fin",
      icon: "fas fa-stop",
      color: "#f56565",
      maxInputs: 5,
      maxOutputs: 0,
      category: "flow",
    },
  },

  // Categorías de componentes
  categories: {
    flow: {
      name: "Flujo",
      icon: "fas fa-project-diagram",
      order: 1,
    },
    communication: {
      name: "Comunicación",
      icon: "fas fa-comments",
      order: 2,
    },
    logic: {
      name: "Lógica",
      icon: "fas fa-brain",
      order: 3,
    },
    action: {
      name: "Acciones",
      icon: "fas fa-bolt",
      order: 4,
    },
  },

  // Configuración del canvas
  canvas: {
    gridSize: 20,
    snapToGrid: true,
    minZoom: 0.25,
    maxZoom: 2.0,
    defaultZoom: 1.0,
  },

  // Configuración de nodos
  node: {
    minWidth: 180,
    maxWidth: 350,
    minHeight: 80,
    defaultWidth: 220,
    defaultHeight: 120,
  },

  // Configuración de conexiones
  connections: {
    curveStrength: 0.4,
    strokeWidth: 2,
    selectedStrokeWidth: 3,
  },

  // Estados del editor
  modes: {
    SELECT: "select",
    CONNECT: "connect",
    DRAG: "drag",
  },

  // Plantillas de flujos predefinidos
  flowTemplates: {
    basic: {
      name: "Flujo Básico",
      description: "Flujo simple con mensaje y opciones",
      nodes: [
        {
          id: "start_1",
          type: "start",
          x: 100,
          y: 100,
          data: {
            title: "Inicio",
          },
        },
        {
          id: "message_1",
          type: "message",
          x: 350,
          y: 100,
          data: {
            title: "Mensaje de Bienvenida",
            content: "¡Hola! ¿En qué puedo ayudarte?",
          },
        },
        {
          id: "decision_1",
          type: "decision",
          x: 600,
          y: 100,
          data: {
            title: "Seleccionar Opción",
            options: ["Soporte", "Ventas", "Información"],
          },
        },
      ],
      connections: [
        { from: "start_1", to: "message_1" },
        { from: "message_1", to: "decision_1" },
      ],
    },
    support: {
      name: "Flujo Soporte",
      description: "Flujo completo de soporte técnico",
      nodes: [
        {
          id: "start_1",
          type: "start",
          x: 50,
          y: 150,
          data: { title: "Inicio Soporte" },
        },
        {
          id: "message_1",
          type: "message",
          x: 250,
          y: 150,
          data: {
            title: "Bienvenida Soporte",
            content: "🔧 ¡Hola! Soy tu asistente de soporte técnico.",
          },
        },
        {
          id: "decision_1",
          type: "decision",
          x: 450,
          y: 150,
          data: {
            title: "Tipo de Problema",
            options: ["Conexión Internet", "Equipos", "Telefonía", "Otro"],
          },
        },
        {
          id: "message_2",
          type: "message",
          x: 250,
          y: 350,
          data: {
            title: "Problema Conexión",
            content: "Vamos a diagnosticar tu problema de conexión...",
          },
        },
        {
          id: "transfer_1",
          type: "transfer",
          x: 650,
          y: 350,
          data: {
            title: "Transferir a Técnico",
            target: "soporte_avanzado",
          },
        },
      ],
      connections: [
        { from: "start_1", to: "message_1" },
        { from: "message_1", to: "decision_1" },
        { from: "decision_1", to: "message_2", label: "Conexión Internet" },
        { from: "decision_1", to: "transfer_1", label: "Otro" },
      ],
    },
  },
};
