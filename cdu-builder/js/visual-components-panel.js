// Visual Flow Editor - Panel de Componentes
window.ComponentsPanel = {
  init: function () {
    this.renderComponents();
    this.setupDragAndDrop();
  },

  // Renderizar componentes por categoría
  renderComponents: function () {
    const panel = document.querySelector(".components-panel");
    if (!panel) return;

    const categories = window.VisualEditorConfig.categories;
    const nodeTypes = window.VisualEditorConfig.nodeTypes;

    let html = '<h3><i class="fas fa-puzzle-piece"></i> Componentes</h3>';

    // Agrupar nodos por categoría
    Object.keys(categories)
      .sort((a, b) => categories[a].order - categories[b].order)
      .forEach((categoryKey) => {
        const category = categories[categoryKey];
        const categoryNodes = Object.values(nodeTypes).filter(
          (node) => node.category === categoryKey
        );

        if (categoryNodes.length === 0) return;

        html += `
                    <div class="component-category">
                        <h4><i class="${category.icon}"></i> ${category.name}</h4>
                `;

        categoryNodes.forEach((nodeType) => {
          html += `
                        <div class="draggable-component ${nodeType.id}" 
                             data-node-type="${nodeType.id}"
                             draggable="true">
                            <i class="${nodeType.icon}"></i>
                            <span>${nodeType.name}</span>
                        </div>
                    `;
        });

        html += "</div>";
      });

    // Plantillas de flujo
    html += `
            <div class="component-category">
                <h4><i class="fas fa-magic"></i> Plantillas</h4>
        `;

    Object.keys(window.VisualEditorConfig.flowTemplates).forEach(
      (templateKey) => {
        const template = window.VisualEditorConfig.flowTemplates[templateKey];
        html += `
                <div class="template-item" onclick="ComponentsPanel.loadTemplate('${templateKey}')">
                    <i class="fas fa-file-alt"></i>
                    <div>
                        <div class="template-name">${template.name}</div>
                        <div class="template-desc">${template.description}</div>
                    </div>
                </div>
            `;
      }
    );

    html += "</div>";
    panel.innerHTML = html;
  },

  // Configurar drag and drop
  setupDragAndDrop: function () {
    const components = document.querySelectorAll(".draggable-component");

    components.forEach((component) => {
      component.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", component.dataset.nodeType);
        component.classList.add("dragging");
      });

      component.addEventListener("dragend", (e) => {
        component.classList.remove("dragging");
      });
    });

    // Configurar drop zone
    this.setupDropZone();
  },

  // Configurar zona de drop
  setupDropZone: function () {
    const canvas = document.querySelector(".canvas-content");
    if (!canvas) return;

    canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
      this.showDropZone(e);
    });

    canvas.addEventListener("dragleave", (e) => {
      this.hideDropZone();
    });

    canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      this.handleDrop(e);
      this.hideDropZone();
    });
  },

  // Mostrar zona de drop
  showDropZone: function (event) {
    let dropZone = document.querySelector(".drop-zone");

    if (!dropZone) {
      dropZone = document.createElement("div");
      dropZone.className = "drop-zone";
      dropZone.innerHTML =
        '<i class="fas fa-plus"></i> Soltar aquí para agregar';
      document.querySelector(".canvas-content").appendChild(dropZone);
    }

    const canvasRect = document
      .querySelector(".canvas-content")
      .getBoundingClientRect();
    const x = event.clientX - canvasRect.left - 100;
    const y = event.clientY - canvasRect.top - 25;

    dropZone.style.left = Math.max(0, x) + "px";
    dropZone.style.top = Math.max(0, y) + "px";
    dropZone.style.width = "200px";
    dropZone.style.height = "50px";
    dropZone.classList.add("active");
  },

  // Ocultar zona de drop
  hideDropZone: function () {
    const dropZone = document.querySelector(".drop-zone");
    if (dropZone) {
      dropZone.classList.remove("active");
    }
  },

  // Manejar drop
  handleDrop: function (event) {
    const nodeType = event.dataTransfer.getData("text/plain");
    if (!nodeType) return;

    const canvasRect = document
      .querySelector(".canvas-content")
      .getBoundingClientRect();
    const x = event.clientX - canvasRect.left - 100;
    const y = event.clientY - canvasRect.top - 50;

    // Crear nodo
    window.NodeManager.createNode(nodeType, Math.max(0, x), Math.max(0, y));
  },

  // Cargar plantilla de flujo
  loadTemplate: function (templateKey) {
    if (!confirm("¿Cargar esta plantilla? Se perderá el flujo actual.")) {
      return;
    }

    const template = window.VisualEditorConfig.flowTemplates[templateKey];
    if (!template) return;

    // Limpiar canvas
    window.NodeManager.clear();
    window.ConnectionManager.clear();

    // Crear nodos
    template.nodes.forEach((nodeData) => {
      const node = window.NodeManager.createNode(
        nodeData.type,
        nodeData.x,
        nodeData.y,
        nodeData.data
      );

      // Forzar ID específico para las conexiones
      if (nodeData.id) {
        window.NodeManager.nodes.delete(node.id);
        node.id = nodeData.id;
        window.NodeManager.nodes.set(node.id, node);

        const element = document.getElementById(
          `node-${node.id.replace(nodeData.id, "")}`
        );
        if (element) {
          element.id = `node-${node.id}`;
        }
      }
    });

    // Crear conexiones
    setTimeout(() => {
      template.connections.forEach((connData) => {
        window.ConnectionManager.createConnection(
          connData.from,
          connData.to,
          connData.label
        );
      });
    }, 100);

    // Mostrar mensaje
    window.CDUBuilder.showStatus(
      `Plantilla "${template.name}" cargada correctamente`,
      "success"
    );
  },
};
