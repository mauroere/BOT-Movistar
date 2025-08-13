// Sistema de Drag & Drop para el Editor Visual
window.VisualDragDrop = {
  init: function () {
    this.setupDragDrop();
    console.log("✅ Sistema de Drag & Drop inicializado");
  },

  setupDragDrop: function () {
    this.setupComponentPanelDrag();
    this.setupCanvasDrop();
  },

  setupComponentPanelDrag: function () {
    const componentItems = document.querySelectorAll(
      '.component-item[draggable="true"]'
    );

    componentItems.forEach((item) => {
      item.addEventListener("dragstart", (e) => {
        const nodeType = e.target.closest(".component-item").dataset.type;
        e.dataTransfer.setData("text/plain", nodeType);
        e.dataTransfer.effectAllowed = "copy";

        // Visual feedback
        e.target.style.opacity = "0.5";
        console.log("📦 Iniciando arrastre de:", nodeType);
      });

      item.addEventListener("dragend", (e) => {
        e.target.style.opacity = "1";
      });
    });
  },

  setupCanvasDrop: function () {
    const canvas = document.getElementById("visual-canvas");
    if (!canvas) {
      console.warn("⚠️ Canvas no encontrado para drag & drop");
      return;
    }

    canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });

    canvas.addEventListener("drop", (e) => {
      e.preventDefault();
      const nodeType = e.dataTransfer.getData("text/plain");

      if (nodeType) {
        // Calcular posición relativa al canvas
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        console.log(`🎯 Soltando nodo ${nodeType} en posición (${x}, ${y})`);

        // Crear el nodo
        this.createNodeAtPosition(nodeType, x, y);
      }
    });
  },

  createNodeAtPosition: function (nodeType, x, y) {
    try {
      const node = window.VisualNodeManager.createNode(nodeType, { x, y });

      if (node) {
        console.log(`✅ Nodo ${nodeType} creado exitosamente en (${x}, ${y})`);

        // Seleccionar automáticamente el nuevo nodo
        setTimeout(() => {
          window.VisualNodeManager.selectNode(node.id);
        }, 100);
      } else {
        console.error("❌ Error creando nodo:", nodeType);
      }
    } catch (error) {
      console.error("❌ Error en createNodeAtPosition:", error);
    }
  },
};
