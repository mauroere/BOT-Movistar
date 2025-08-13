// Panel de Componentes del Editor Visual
window.VisualComponentsPanel = {
  init: function () {
    console.log("Inicializando Panel de Componentes...");
    const panel = document.querySelector(".components-panel");
    if (!panel) {
      console.error("Panel de componentes no encontrado");
      return;
    }

    this.renderComponents();
    this.setupDragAndDrop();
    console.log("Panel de Componentes inicializado");
  },

  renderComponents: function () {
    const panel = document.querySelector(".components-panel");
    if (!panel) return;

    // Limpiar contenido actual (excepto el título)
    const title = panel.querySelector("h4");
    panel.innerHTML = "";
    if (title) panel.appendChild(title);

    // Agrupar componentes por categoría
    const categories = {};
    Object.entries(window.VisualEditorConfig.nodeTypes).forEach(
      ([type, config]) => {
        if (!categories[config.category]) {
          categories[config.category] = [];
        }
        categories[config.category].push({ type, config });
      }
    );

    // Renderizar cada categoría
    Object.entries(window.VisualEditorConfig.categories)
      .sort((a, b) => a[1].order - b[1].order)
      .forEach(([categoryId, categoryConfig]) => {
        if (categories[categoryId]) {
          this.renderCategory(
            panel,
            categoryId,
            categoryConfig,
            categories[categoryId]
          );
        }
      });
  },

  renderCategory: function (panel, categoryId, categoryConfig, components) {
    const categoryElement = document.createElement("div");
    categoryElement.className = "component-category";

    categoryElement.innerHTML = `
      <h5>${categoryConfig.label}</h5>
      <div class="component-group">
        ${components
          .map(
            ({ type, config }) => `
          <div class="component-item" draggable="true" data-type="${type}" title="${config.label}">
            <div class="component-icon">${config.icon}</div>
            <span>${config.label}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    panel.appendChild(categoryElement);
  },

  setupDragAndDrop: function () {
    // Drag and drop desde el panel de componentes
    document.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("component-item")) {
        const nodeType = e.target.dataset.type;
        console.log("Iniciando drag de componente:", nodeType);
        e.dataTransfer.setData("text/plain", nodeType);
        e.dataTransfer.effectAllowed = "copy";

        // Agregar clase visual durante el drag
        e.target.classList.add("dragging");
      }
    });

    document.addEventListener("dragend", (e) => {
      if (e.target.classList.contains("component-item")) {
        e.target.classList.remove("dragging");
        console.log("Finalizando drag");
      }
    });

    // Setup drop zone en el canvas
    const canvas = document.getElementById("visual-canvas");
    if (canvas) {
      console.log("Configurando drop zone en canvas");
      this.setupCanvasDropZone(canvas);
    } else {
      console.error("Canvas no encontrado para configurar drop zone");
    }
  },

  setupCanvasDropZone: function (canvas) {
    canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      canvas.classList.add("drag-over");
    });

    canvas.addEventListener("dragleave", (e) => {
      if (e.target === canvas) {
        canvas.classList.remove("drag-over");
      }
    });

    canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      canvas.classList.remove("drag-over");

      const nodeType = e.dataTransfer.getData("text/plain");
      console.log("Tipo de nodo a crear:", nodeType);

      if (nodeType && window.VisualEditorConfig.nodeTypes[nodeType]) {
        // Usar offsetX y offsetY para posición más precisa
        const x = e.offsetX;
        const y = e.offsetY;

        console.log("Posición de drop:", x, y);

        // Crear el nodo
        const node = window.VisualNodeManager.createNode(nodeType, x, y);
        if (node) {
          console.log("Nodo creado exitosamente:", node.id);
          // Seleccionar automáticamente el nodo creado
          window.VisualNodeManager.selectNode(node.id);

          // Mostrar mensaje de éxito
          this.showDropFeedback(e.clientX, e.clientY, "✓");
        } else {
          console.error("Error creando nodo");
        }
      } else {
        console.error("Tipo de nodo inválido:", nodeType);
      }
    });
  },

  showDropFeedback: function (x, y, icon) {
    const feedback = document.createElement("div");
    feedback.className = "drop-feedback";
    feedback.textContent = icon;
    feedback.style.position = "fixed";
    feedback.style.left = x + "px";
    feedback.style.top = y + "px";
    feedback.style.pointerEvents = "none";
    feedback.style.fontSize = "24px";
    feedback.style.color = "#4CAF50";
    feedback.style.zIndex = "10000";
    feedback.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(feedback);

    // Animar y remover
    setTimeout(() => {
      feedback.style.transition = "all 0.5s ease-out";
      feedback.style.opacity = "0";
      feedback.style.transform = "translate(-50%, -50%) scale(2)";

      setTimeout(() => {
        document.body.removeChild(feedback);
      }, 500);
    }, 100);
  },

  // Métodos de utilidad
  addCustomComponent: function (type, config) {
    window.VisualEditorConfig.nodeTypes[type] = config;
    this.renderComponents();
  },

  removeComponent: function (type) {
    delete window.VisualEditorConfig.nodeTypes[type];
    this.renderComponents();
  },

  filterComponents: function (searchTerm) {
    const items = document.querySelectorAll(".component-item");
    items.forEach((item) => {
      const label = item.querySelector("span").textContent.toLowerCase();
      const matches = label.includes(searchTerm.toLowerCase());
      item.style.display = matches ? "flex" : "none";
    });

    // Ocultar categorías vacías
    const categories = document.querySelectorAll(".component-category");
    categories.forEach((category) => {
      const visibleItems = category.querySelectorAll(
        '.component-item[style="display: flex"], .component-item:not([style*="display"])'
      );
      category.style.display = visibleItems.length > 0 ? "block" : "none";
    });
  },

  collapseCategory: function (categoryId) {
    const category = document.querySelector(
      `.component-category[data-category="${categoryId}"]`
    );
    if (category) {
      const group = category.querySelector(".component-group");
      group.style.display = group.style.display === "none" ? "grid" : "none";
    }
  },
};
