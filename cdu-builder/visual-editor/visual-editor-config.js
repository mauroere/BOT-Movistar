// Configuración del Editor Visual
window.VisualEditorConfig = {
  // Configuración del canvas
  canvas: {
    gridSize: 20,
    defaultZoom: 1,
    minZoom: 0.1,
    maxZoom: 3,
    padding: 50,
  },

  // Tipos de nodos disponibles
  nodeTypes: {
    start: {
      category: "flow",
      label: "Inicio",
      icon: "🚀",
      color: "#27ae60",
      inputs: 0,
      outputs: 1,
      properties: {
        welcomeMessage: {
          type: "textarea",
          label: "Mensaje de bienvenida",
          default:
            "Hola! Bienvenido a nuestro servicio. ¿En qué puedo ayudarte?",
          required: false,
        },
      },
    },
    "send-message": {
      category: "messages",
      label: "Enviar Mensaje",
      icon: "💬",
      color: "#4CAF50",
      inputs: 1,
      outputs: 1,
      properties: {
        text: { type: "textarea", label: "Texto del mensaje", required: true },
        delay: { type: "number", label: "Delay (ms)", default: 1000 },
      },
    },
    "send-image": {
      category: "messages",
      label: "Enviar Imagen",
      icon: "🖼️",
      color: "#2196F3",
      inputs: 1,
      outputs: 1,
      properties: {
        imageUrl: { type: "text", label: "URL de la imagen", required: true },
        caption: { type: "textarea", label: "Texto descriptivo" },
        delay: { type: "number", label: "Delay (ms)", default: 1000 },
      },
    },
    "send-audio": {
      category: "messages",
      label: "Enviar Audio",
      icon: "🔊",
      color: "#FF9800",
      inputs: 1,
      outputs: 1,
      properties: {
        audioUrl: { type: "text", label: "URL del audio", required: true },
        delay: { type: "number", label: "Delay (ms)", default: 1000 },
      },
    },
    "send-video": {
      category: "messages",
      label: "Enviar Video",
      icon: "🎥",
      color: "#E91E63",
      inputs: 1,
      outputs: 1,
      properties: {
        videoUrl: { type: "text", label: "URL del video", required: true },
        caption: { type: "textarea", label: "Texto descriptivo" },
        delay: { type: "number", label: "Delay (ms)", default: 1000 },
      },
    },
    "wait-message": {
      category: "interactions",
      label: "Esperar Respuesta",
      icon: "⏳",
      color: "#9C27B0",
      inputs: 1,
      outputs: 2, // Respuesta recibida / Timeout
      properties: {
        timeout: { type: "number", label: "Timeout (ms)", default: 30000 },
        variable: {
          type: "text",
          label: "Variable para guardar respuesta",
          required: true,
        },
      },
    },
    "quick-reply": {
      category: "interactions",
      label: "Respuesta Rápida",
      icon: "⚡",
      color: "#FF5722",
      inputs: 1,
      outputs: 1,
      properties: {
        text: { type: "textarea", label: "Texto del mensaje", required: true },
        options: {
          type: "array",
          label: "Opciones de respuesta rápida",
          required: true,
        },
      },
    },
    menu: {
      category: "interactions",
      label: "Menú",
      icon: "📋",
      color: "#607D8B",
      inputs: 1,
      outputs: "dynamic", // Basado en opciones
      properties: {
        title: { type: "text", label: "Título del menú", required: true },
        text: { type: "textarea", label: "Texto del menú" },
        options: {
          type: "menu-options",
          label: "Opciones del menú",
          required: true,
          description: "Define las opciones del menú y sus destinos",
        },
      },
    },
    button: {
      category: "interactions",
      label: "Botón",
      icon: "🔘",
      color: "#795548",
      inputs: 1,
      outputs: 2, // Presionado / No presionado
      properties: {
        text: { type: "text", label: "Texto del botón", required: true },
        url: { type: "text", label: "URL (opcional)" },
      },
    },
    condition: {
      category: "flow-control",
      label: "Condición",
      icon: "❓",
      color: "#FFC107",
      inputs: 1,
      outputs: 2, // Verdadero / Falso
      properties: {
        variable: { type: "text", label: "Variable a evaluar", required: true },
        operator: {
          type: "select",
          label: "Operador",
          options: ["==", "!=", ">", "<", ">=", "<=", "contains", "startsWith"],
          required: true,
        },
        value: { type: "text", label: "Valor a comparar", required: true },
      },
    },
    delay: {
      category: "flow-control",
      label: "Delay",
      icon: "⏱️",
      color: "#9E9E9E",
      inputs: 1,
      outputs: 1,
      properties: {
        duration: {
          type: "number",
          label: "Duración (ms)",
          required: true,
          default: 2000,
        },
      },
    },
    jump: {
      category: "flow-control",
      label: "Saltar a",
      icon: "🔄",
      color: "#673AB7",
      inputs: 1,
      outputs: 0,
      properties: {
        target: { type: "text", label: "ID del paso destino", required: true },
      },
    },
    end: {
      category: "flow-control",
      label: "Finalizar",
      icon: "🏁",
      color: "#F44336",
      inputs: 1,
      outputs: 0,
      properties: {
        message: { type: "textarea", label: "Mensaje de despedida" },
      },
    },
    "set-variable": {
      category: "actions",
      label: "Establecer Variable",
      icon: "📝",
      color: "#3F51B5",
      inputs: 1,
      outputs: 1,
      properties: {
        variable: {
          type: "text",
          label: "Nombre de la variable",
          required: true,
        },
        value: { type: "text", label: "Valor", required: true },
        type: {
          type: "select",
          label: "Tipo",
          options: ["string", "number", "boolean"],
          default: "string",
        },
      },
    },
    "api-call": {
      category: "actions",
      label: "Llamada API",
      icon: "🌐",
      color: "#00BCD4",
      inputs: 1,
      outputs: 2, // Éxito / Error
      properties: {
        url: { type: "text", label: "URL de la API", required: true },
        method: {
          type: "select",
          label: "Método",
          options: ["GET", "POST", "PUT", "DELETE"],
          default: "GET",
        },
        headers: { type: "textarea", label: "Headers (JSON)" },
        body: { type: "textarea", label: "Body (JSON)" },
        responseVariable: { type: "text", label: "Variable para respuesta" },
      },
    },
    log: {
      category: "actions",
      label: "Log/Debug",
      icon: "📊",
      color: "#8BC34A",
      inputs: 1,
      outputs: 1,
      properties: {
        message: { type: "textarea", label: "Mensaje de log", required: true },
        level: {
          type: "select",
          label: "Nivel",
          options: ["info", "warn", "error", "debug"],
          default: "info",
        },
      },
    },
  },

  // Categorías de componentes
  categories: {
    messages: { label: "📨 Mensajes", order: 1 },
    interactions: { label: "🎮 Interacciones", order: 2 },
    "flow-control": { label: "🔄 Control de Flujo", order: 3 },
    actions: { label: "🛠️ Acciones", order: 4 },
  },

  // Templates predefinidos
  templates: {
    "welcome-flow": {
      name: "Flujo de Bienvenida",
      description: "Template básico de bienvenida con menú",
      nodes: [
        {
          id: "welcome",
          type: "send-message",
          x: 200,
          y: 100,
          properties: { text: "¡Hola! Bienvenido a nuestro servicio." },
        },
        {
          id: "menu",
          type: "menu",
          x: 200,
          y: 200,
          properties: {
            title: "Menú Principal",
            text: "Selecciona una opción:",
            options: ["Información", "Soporte", "Contacto"],
          },
        },
      ],
      connections: [{ from: "welcome", to: "menu" }],
    },
  },
};
