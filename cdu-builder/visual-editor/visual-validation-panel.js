// Panel de Validación para el Editor Visual
window.VisualValidationPanel = {
  init: function () {
    this.setupValidationUI();
    console.log("✅ Panel de Validación inicializado");
  },

  setupValidationUI: function () {
    // Crear contenedor para errores si no existe
    let errorContainer = document.getElementById("validation-errors");
    if (!errorContainer) {
      errorContainer = this.createErrorContainer();
    }
  },

  createErrorContainer: function () {
    const container = document.createElement("div");
    container.id = "validation-errors";
    container.className = "validation-panel";
    container.style.display = "none";

    // Insertar después de la toolbar
    const toolbar = document.querySelector(".toolbar");
    if (toolbar && toolbar.parentNode) {
      toolbar.parentNode.insertBefore(container, toolbar.nextSibling);
    }

    return container;
  },

  showValidationResult: function (result) {
    const container = document.getElementById("validation-errors");
    if (!container) return;

    if (result.valid) {
      this.showSuccess("✅ Flujo validado correctamente");
    } else {
      this.showErrors(result.errors);
    }
  },

  showErrors: function (errors) {
    const container = document.getElementById("validation-errors");
    if (!container) return;

    let html = `
      <div class="validation-header error">
        <h4>❌ Errores de Validación</h4>
        <button onclick="VisualValidationPanel.hide()" class="btn-close">×</button>
      </div>
      <div class="validation-content">
    `;

    errors.forEach((error) => {
      html += `
        <div class="validation-error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>${error}</span>
        </div>
      `;
    });

    html += `
      </div>
      <div class="validation-actions">
        <button onclick="VisualValidationPanel.autoFix()" class="btn btn-warning">
          🔧 Auto-corregir
        </button>
        <button onclick="VisualValidationPanel.hide()" class="btn btn-secondary">
          Cerrar
        </button>
      </div>
    `;

    container.innerHTML = html;
    container.style.display = "block";
  },

  showSuccess: function (message) {
    const container = document.getElementById("validation-errors");
    if (!container) return;

    container.innerHTML = `
      <div class="validation-header success">
        <h4>${message}</h4>
        <button onclick="VisualValidationPanel.hide()" class="btn-close">×</button>
      </div>
    `;
    container.style.display = "block";

    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
      this.hide();
    }, 3000);
  },

  hide: function () {
    const container = document.getElementById("validation-errors");
    if (container) {
      container.style.display = "none";
    }
  },

  autoFix: function () {
    console.log("🔧 Iniciando auto-corrección...");

    try {
      const nodes = window.VisualNodeManager.getAllNodes();
      const connections = window.VisualConnectionManager.getConnections();

      // Auto-correcciones básicas
      let fixedCount = 0;

      // 1. Verificar nodo de inicio
      const startNode = nodes.find(
        (n) => n.type === "start" || n.id === "start"
      );
      if (!startNode) {
        console.log("📝 Creando nodo de inicio faltante...");
        window.VisualNodeManager.createNode("start", { x: 50, y: 50 });
        fixedCount++;
      }

      // 2. Completar propiedades requeridas con valores por defecto
      nodes.forEach((node) => {
        const config = window.VisualEditorConfig.nodeTypes[node.type];
        if (config && config.properties) {
          Object.entries(config.properties).forEach(([key, prop]) => {
            if (
              prop.required &&
              (!node.properties[key] || node.properties[key] === "")
            ) {
              const defaultValue =
                prop.default || this.getDefaultValue(prop.type);
              node.properties[key] = defaultValue;
              console.log(
                `📝 Completando ${key} en nodo ${node.id} con: ${defaultValue}`
              );
              fixedCount++;
            }
          });
        }
      });

      // 3. Actualizar visualización
      nodes.forEach((node) => {
        window.VisualNodeManager.updateNodeContent(node.id);
      });

      if (fixedCount > 0) {
        this.showSuccess(
          `✅ ${fixedCount} problemas corregidos automáticamente`
        );
      } else {
        this.showSuccess(
          "ℹ️ No se encontraron problemas que corregir automáticamente"
        );
      }
    } catch (error) {
      console.error("❌ Error en auto-corrección:", error);
      this.showErrors(["Error durante la auto-corrección: " + error.message]);
    }
  },

  getDefaultValue: function (type) {
    switch (type) {
      case "text":
        return "Texto de ejemplo";
      case "textarea":
        return "Mensaje de ejemplo";
      case "number":
        return 0;
      case "checkbox":
        return false;
      case "array":
        return ["Opción 1"];
      default:
        return "Valor por defecto";
    }
  },
};
