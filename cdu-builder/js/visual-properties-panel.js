// Visual Flow Editor - Panel de Propiedades
window.PropertiesPanel = {
  currentNode: null,

  init: function () {
    this.clearPanel();
  },

  // Actualizar panel con nodo seleccionado
  updatePanel: function (node) {
    this.currentNode = node;
    const panel = document.querySelector(".properties-panel");
    if (!panel) return;

    const nodeType = window.VisualEditorConfig.nodeTypes[node.type];
    let html = `
            <h3><i class="${nodeType.icon}"></i> ${nodeType.name}</h3>
            <div class="property-group">
                <label class="property-label">ID del Nodo:</label>
                <input type="text" class="property-input" value="${
                  node.id
                }" disabled>
            </div>
            <div class="property-group">
                <label class="property-label">Título:</label>
                <input type="text" class="property-input" value="${
                  node.data.title || ""
                }" 
                       onchange="PropertiesPanel.updateNodeProperty('title', this.value)">
            </div>
        `;

    // Propiedades específicas por tipo de nodo
    switch (node.type) {
      case "start":
        html += `
                    <div class="property-group">
                        <label class="property-label">Descripción:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('description', this.value)">${
                              node.data.description || ""
                            }</textarea>
                    </div>
                `;
        break;

      case "message":
        html += `
                    <div class="property-group">
                        <label class="property-label">Mensaje:</label>
                        <textarea class="property-input" rows="4" 
                            onchange="PropertiesPanel.updateNodeProperty('content', this.value)">${
                              node.data.content || ""
                            }</textarea>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Tipo de Mensaje:</label>
                        <select class="property-input" onchange="PropertiesPanel.updateNodeProperty('messageType', this.value)">
                            <option value="text" ${
                              node.data.messageType === "text" ? "selected" : ""
                            }>Texto</option>
                            <option value="image" ${
                              node.data.messageType === "image"
                                ? "selected"
                                : ""
                            }>Imagen</option>
                            <option value="document" ${
                              node.data.messageType === "document"
                                ? "selected"
                                : ""
                            }>Documento</option>
                            <option value="audio" ${
                              node.data.messageType === "audio"
                                ? "selected"
                                : ""
                            }>Audio</option>
                        </select>
                    </div>
                `;

        if (
          node.data.messageType === "image" ||
          node.data.messageType === "document" ||
          node.data.messageType === "audio"
        ) {
          html += `
                        <div class="property-group">
                            <label class="property-label">URL del Archivo:</label>
                            <input type="text" class="property-input" value="${
                              node.data.fileUrl || ""
                            }" 
                                   onchange="PropertiesPanel.updateNodeProperty('fileUrl', this.value)"
                                   placeholder="https://...">
                        </div>
                    `;
        }
        break;

      case "decision":
        html += `
                    <div class="property-group">
                        <label class="property-label">Pregunta:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('question', this.value)">${
                              node.data.question || ""
                            }</textarea>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Opciones:</label>
                        <div class="options-editor">
                `;

        (node.data.options || []).forEach((option, index) => {
          html += `
                        <div class="option-editor">
                            <input type="text" value="${option}" 
                                   onchange="PropertiesPanel.updateOption(${index}, this.value)">
                            <button onclick="PropertiesPanel.removeOption(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
        });

        html += `
                        </div>
                        <button class="btn-add-property" onclick="PropertiesPanel.addOption()">
                            <i class="fas fa-plus"></i> Agregar Opción
                        </button>
                    </div>
                `;
        break;

      case "condition":
        html += `
                    <div class="property-group">
                        <label class="property-label">Condición:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('condition', this.value)"
                            placeholder="ej: variable === 'valor'">${
                              node.data.condition || ""
                            }</textarea>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Tipo de Condición:</label>
                        <select class="property-input" onchange="PropertiesPanel.updateNodeProperty('conditionType', this.value)">
                            <option value="equals" ${
                              node.data.conditionType === "equals"
                                ? "selected"
                                : ""
                            }>Igual a</option>
                            <option value="contains" ${
                              node.data.conditionType === "contains"
                                ? "selected"
                                : ""
                            }>Contiene</option>
                            <option value="starts" ${
                              node.data.conditionType === "starts"
                                ? "selected"
                                : ""
                            }>Comienza con</option>
                            <option value="regex" ${
                              node.data.conditionType === "regex"
                                ? "selected"
                                : ""
                            }>Expresión regular</option>
                        </select>
                    </div>
                `;
        break;

      case "action":
        html += `
                    <div class="property-group">
                        <label class="property-label">Acción:</label>
                        <select class="property-input" onchange="PropertiesPanel.updateNodeProperty('actionType', this.value)">
                            <option value="set_variable" ${
                              node.data.actionType === "set_variable"
                                ? "selected"
                                : ""
                            }>Establecer Variable</option>
                            <option value="api_call" ${
                              node.data.actionType === "api_call"
                                ? "selected"
                                : ""
                            }>Llamada API</option>
                            <option value="save_data" ${
                              node.data.actionType === "save_data"
                                ? "selected"
                                : ""
                            }>Guardar Datos</option>
                            <option value="send_email" ${
                              node.data.actionType === "send_email"
                                ? "selected"
                                : ""
                            }>Enviar Email</option>
                        </select>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Parámetros:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('parameters', this.value)"
                            placeholder="Parámetros de la acción...">${
                              node.data.parameters || ""
                            }</textarea>
                    </div>
                `;
        break;

      case "input":
        html += `
                    <div class="property-group">
                        <label class="property-label">Pregunta al Usuario:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('prompt', this.value)">${
                              node.data.prompt || ""
                            }</textarea>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Tipo de Input:</label>
                        <select class="property-input" onchange="PropertiesPanel.updateNodeProperty('inputType', this.value)">
                            <option value="text" ${
                              node.data.inputType === "text" ? "selected" : ""
                            }>Texto</option>
                            <option value="number" ${
                              node.data.inputType === "number" ? "selected" : ""
                            }>Número</option>
                            <option value="email" ${
                              node.data.inputType === "email" ? "selected" : ""
                            }>Email</option>
                            <option value="phone" ${
                              node.data.inputType === "phone" ? "selected" : ""
                            }>Teléfono</option>
                        </select>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Variable a Guardar:</label>
                        <input type="text" class="property-input" value="${
                          node.data.variable || ""
                        }" 
                               onchange="PropertiesPanel.updateNodeProperty('variable', this.value)"
                               placeholder="nombre_variable">
                    </div>
                    <div class="property-group">
                        <label class="property-label">Validación:</label>
                        <input type="text" class="property-input" value="${
                          node.data.validation || ""
                        }" 
                               onchange="PropertiesPanel.updateNodeProperty('validation', this.value)"
                               placeholder="Patrón de validación">
                    </div>
                `;
        break;

      case "transfer":
        html += `
                    <div class="property-group">
                        <label class="property-label">Destino:</label>
                        <input type="text" class="property-input" value="${
                          node.data.target || ""
                        }" 
                               onchange="PropertiesPanel.updateNodeProperty('target', this.value)"
                               placeholder="ej: soporte_humano">
                    </div>
                    <div class="property-group">
                        <label class="property-label">Mensaje de Transferencia:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('transferMessage', this.value)">${
                              node.data.transferMessage ||
                              "Te estoy transfiriendo con un agente..."
                            }</textarea>
                    </div>
                `;
        break;

      case "end":
        html += `
                    <div class="property-group">
                        <label class="property-label">Mensaje de Despedida:</label>
                        <textarea class="property-input" rows="3" 
                            onchange="PropertiesPanel.updateNodeProperty('content', this.value)">${
                              node.data.content || ""
                            }</textarea>
                    </div>
                    <div class="property-group">
                        <label class="property-label">Tipo de Final:</label>
                        <select class="property-input" onchange="PropertiesPanel.updateNodeProperty('endType', this.value)">
                            <option value="normal" ${
                              node.data.endType === "normal" ? "selected" : ""
                            }>Final Normal</option>
                            <option value="restart" ${
                              node.data.endType === "restart" ? "selected" : ""
                            }>Reiniciar Conversación</option>
                            <option value="survey" ${
                              node.data.endType === "survey" ? "selected" : ""
                            }>Encuesta de Satisfacción</option>
                        </select>
                    </div>
                `;
        break;
    }

    // Propiedades generales
    html += `
            <div class="property-group">
                <label class="property-label">Posición:</label>
                <div style="display: flex; gap: 10px;">
                    <input type="number" class="property-input" value="${node.x}" 
                           onchange="PropertiesPanel.updateNodePosition('x', this.value)" 
                           placeholder="X" style="width: 50%;">
                    <input type="number" class="property-input" value="${node.y}" 
                           onchange="PropertiesPanel.updateNodePosition('y', this.value)" 
                           placeholder="Y" style="width: 50%;">
                </div>
            </div>
            <div class="property-group">
                <label class="property-label">Acciones:</label>
                <button class="btn-delete-node" onclick="PropertiesPanel.deleteCurrentNode()">
                    <i class="fas fa-trash"></i> Eliminar Nodo
                </button>
            </div>
        `;

    panel.innerHTML = html;
  },

  // Limpiar panel
  clearPanel: function () {
    const panel = document.querySelector(".properties-panel");
    if (!panel) return;

    panel.innerHTML = `
            <h3><i class="fas fa-info-circle"></i> Propiedades</h3>
            <div class="no-selection">
                <p>Selecciona un nodo para ver sus propiedades</p>
            </div>
        `;
    this.currentNode = null;
  },

  // Actualizar propiedad del nodo
  updateNodeProperty: function (property, value) {
    if (!this.currentNode) return;

    window.NodeManager.updateNodeData(this.currentNode.id, property, value);

    // Re-renderizar nodo si es necesario
    if (["title", "content", "messageType"].includes(property)) {
      window.NodeManager.rerenderNode(this.currentNode.id);
    }
  },

  // Actualizar posición del nodo
  updateNodePosition: function (axis, value) {
    if (!this.currentNode) return;

    const numValue = parseInt(value) || 0;
    this.currentNode[axis] = Math.max(0, numValue);

    const element = document.getElementById(`node-${this.currentNode.id}`);
    if (element) {
      element.style[axis === "x" ? "left" : "top"] =
        this.currentNode[axis] + "px";
      window.ConnectionManager.updateConnectionsForNode(this.currentNode.id);
    }
  },

  // Gestión de opciones
  addOption: function () {
    if (!this.currentNode || this.currentNode.type !== "decision") return;

    if (!this.currentNode.data.options) {
      this.currentNode.data.options = [];
    }

    this.currentNode.data.options.push("Nueva opción");
    this.updatePanel(this.currentNode);
    window.NodeManager.rerenderNode(this.currentNode.id);
  },

  removeOption: function (index) {
    if (!this.currentNode || this.currentNode.type !== "decision") return;

    if (
      this.currentNode.data.options &&
      this.currentNode.data.options.length > index
    ) {
      this.currentNode.data.options.splice(index, 1);
      this.updatePanel(this.currentNode);
      window.NodeManager.rerenderNode(this.currentNode.id);
    }
  },

  updateOption: function (index, value) {
    if (!this.currentNode || this.currentNode.type !== "decision") return;

    if (
      this.currentNode.data.options &&
      this.currentNode.data.options[index] !== undefined
    ) {
      this.currentNode.data.options[index] = value;
    }
  },

  // Eliminar nodo actual
  deleteCurrentNode: function () {
    if (this.currentNode) {
      window.NodeManager.deleteNode(this.currentNode.id);
      this.clearPanel();
    }
  },
};
