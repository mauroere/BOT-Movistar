// Panel de Propiedades del Editor Visual
window.VisualPropertiesPanel = {
  currentNode: null,

  init: function () {
    this.setupEventListeners();
  },

  setupEventListeners: function () {
    // Listener para cambios en los inputs de propiedades
    document.addEventListener("input", (e) => {
      if (e.target.classList.contains("property-input")) {
        this.handlePropertyChange(e);
      }
      // Manejar inputs de array
      if (e.target.classList.contains("array-input")) {
        const property = e.target.closest(".array-field").dataset.property;
        this.handleArrayChange(property);
      }
      // Manejar inputs de opciones de menú
      if (e.target.classList.contains("menu-option-text")) {
        const property = e.target.closest(".menu-options-field").dataset
          .property;
        this.handleMenuOptionChange(property);
      }
    });

    document.addEventListener("change", (e) => {
      if (e.target.classList.contains("property-input")) {
        this.handlePropertyChange(e);
      }
      // Manejar cambios en arrays también en 'change'
      if (e.target.classList.contains("array-input")) {
        const property = e.target.closest(".array-field").dataset.property;
        this.handleArrayChange(property);
      }
      // Manejar cambios en selects de destino de menú
      if (e.target.classList.contains("menu-option-destination")) {
        const property = e.target.closest(".menu-options-field").dataset
          .property;
        this.handleMenuOptionChange(property);
      }
    });
  },

  updateProperties: function (node) {
    this.currentNode = node;
    const container = document.getElementById("properties-content");
    if (!container) return;

    const config = window.VisualEditorConfig.nodeTypes[node.type];
    if (!config) return;

    container.innerHTML = this.generatePropertiesHTML(node, config);
  },

  generatePropertiesHTML: function (node, config) {
    let html = `
      <div class="properties-header">
        <div class="node-info">
          <span class="node-icon">${config.icon}</span>
          <span class="node-name">${config.label}</span>
        </div>
        <div class="node-id">ID: ${node.id}</div>
      </div>
      <div class="properties-form">
    `;

    // Generar campos para cada propiedad
    Object.entries(config.properties).forEach(([key, prop]) => {
      const value = node.properties[key] || "";
      html += this.generatePropertyField(key, prop, value);
    });

    html += "</div>";
    return html;
  },

  generatePropertyField: function (key, prop, value) {
    const required = prop.required ? "required" : "";
    const requiredMark = prop.required
      ? '<span class="required-mark">*</span>'
      : "";
    const label = prop.label || key;

    let input = "";
    let fieldClass = "property-field";
    if (prop.required && (!value || value === "")) {
      fieldClass += " field-required-empty";
    }

    switch (prop.type) {
      case "text":
        input = `<input type="text" id="prop-${key}" class="property-input form-input" 
                        data-property="${key}" value="${this.escapeHtml(
          value
        )}" ${required} 
                        placeholder="${prop.placeholder || prop.label || ""}">`;
        break;

      case "textarea":
        input = `<textarea id="prop-${key}" class="property-input form-input" 
                           data-property="${key}" ${required} rows="3" 
                           placeholder="${
                             prop.placeholder || prop.label || ""
                           }">${this.escapeHtml(value)}</textarea>`;
        break;

      case "number":
        input = `<input type="number" id="prop-${key}" class="property-input form-input" 
                        data-property="${key}" value="${
          value || prop.default || ""
        }" ${required} 
                        min="${prop.min || ""}" max="${prop.max || ""}" 
                        step="${prop.step || ""}">`;
        break;

      case "select":
        input = `<select id="prop-${key}" class="property-input form-input" 
                         data-property="${key}" ${required}>`;
        if (!required) {
          input += '<option value="">-- Seleccionar --</option>';
        }
        prop.options.forEach((option) => {
          const selected = value === option ? "selected" : "";
          input += `<option value="${option}" ${selected}>${option}</option>`;
        });
        input += "</select>";
        break;

      case "checkbox":
        const checked = value ? "checked" : "";
        input = `<label class="checkbox-label">
                   <input type="checkbox" id="prop-${key}" class="property-input" 
                          data-property="${key}" ${checked}>
                   <span class="checkbox-text">${label}</span>
                 </label>`;
        return `<div class="${fieldClass}">${input}</div>`;

      case "array":
        input = this.generateArrayField(key, prop, value);
        break;

      case "menu-options":
        input = this.generateMenuOptionsField(key, prop, value);
        break;

      default:
        input = `<input type="text" id="prop-${key}" class="property-input form-input" 
                        data-property="${key}" value="${this.escapeHtml(
          value
        )}" ${required}>`;
    }

    return `
      <div class="${fieldClass}">
        <label for="prop-${key}" class="property-label">
          ${label}${requiredMark}
        </label>
        ${input}
        ${
          prop.required && (!value || value === "")
            ? '<div class="field-error">Este campo es requerido</div>'
            : ""
        }
      </div>
    `;
  },

  generateArrayField: function (key, prop, value) {
    const items = Array.isArray(value) ? value : [];

    let html = `<div class="array-field" data-property="${key}">`;

    items.forEach((item, index) => {
      html += `
        <div class="array-item">
          <input type="text" class="form-input array-input" 
                 data-index="${index}" value="${this.escapeHtml(item)}">
          <button type="button" class="btn btn-small btn-secondary" 
                  onclick="VisualPropertiesPanel.removeArrayItem('${key}', ${index})">✕</button>
        </div>
      `;
    });

    html += `
      <button type="button" class="btn btn-small btn-primary" 
              onclick="VisualPropertiesPanel.addArrayItem('${key}')">+ Agregar</button>
    </div>`;

    return html;
  },

  generateMenuOptionsField: function (key, prop, value) {
    const options = Array.isArray(value) ? value : [];
    const availableNodes = this.getAvailableDestinationNodes();

    let html = `<div class="menu-options-field" data-property="${key}">`;

    options.forEach((option, index) => {
      const optionText =
        typeof option === "object" ? option.text || "" : option;
      const optionDestination =
        typeof option === "object" ? option.destination || "" : "";

      html += `
        <div class="menu-option-item" data-index="${index}">
          <div class="option-row">
            <div class="option-text">
              <label>Texto de la opción:</label>
              <input type="text" class="form-input menu-option-text" 
                     data-index="${index}" value="${this.escapeHtml(
        optionText
      )}" 
                     placeholder="Ejemplo: Ver mi saldo">
            </div>
            <div class="option-destination">
              <label>Destino:</label>
              <select class="form-input menu-option-destination" data-index="${index}">
                <option value="">Seleccionar destino...</option>
                ${availableNodes
                  .map((node) => {
                    const selected =
                      optionDestination === node.id ? "selected" : "";
                    return `<option value="${node.id}" ${selected}>${node.label} (${node.id})</option>`;
                  })
                  .join("")}
              </select>
            </div>
            <div class="option-actions">
              <button type="button" class="btn btn-small btn-secondary" 
                      onclick="VisualPropertiesPanel.removeMenuOption('${key}', ${index})">
                🗑️
              </button>
            </div>
          </div>
        </div>
      `;
    });

    html += `
      <div class="menu-options-actions">
        <button type="button" class="btn btn-small btn-primary" 
                onclick="VisualPropertiesPanel.addMenuOption('${key}')">
          ➕ Agregar Opción
        </button>
        <button type="button" class="btn btn-small btn-info" 
                onclick="VisualPropertiesPanel.refreshDestinations('${key}')">
          🔄 Actualizar Destinos
        </button>
      </div>
    </div>`;

    return html;
  },

  getAvailableDestinationNodes: function () {
    if (!window.VisualNodeManager) return [];

    const nodes = window.VisualNodeManager.getAllNodes();
    return nodes
      .filter((node) => node.id !== this.currentNode?.id) // Excluir el nodo actual
      .map((node) => ({
        id: node.id,
        label: this.getNodeDisplayName(node),
        type: node.type,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  },

  getNodeDisplayName: function (node) {
    const config = window.VisualEditorConfig.nodeTypes[node.type];
    let displayName = config?.label || node.type;

    // Agregar información específica del nodo si está disponible
    if (node.properties?.title) {
      displayName += `: ${node.properties.title}`;
    } else if (node.properties?.message) {
      displayName += `: ${this.truncateText(node.properties.message, 30)}`;
    } else if (node.properties?.text) {
      displayName += `: ${this.truncateText(node.properties.text, 30)}`;
    }

    return displayName;
  },

  truncateText: function (text, maxLength) {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  },

  handlePropertyChange: function (e) {
    if (!this.currentNode) return;

    const property = e.target.dataset.property;
    let value = e.target.value;

    // Conversión de tipos
    const config = window.VisualEditorConfig.nodeTypes[this.currentNode.type];
    const propConfig = config.properties[property];

    if (propConfig) {
      switch (propConfig.type) {
        case "number":
          value = parseFloat(value) || 0;
          break;
        case "checkbox":
          value = e.target.checked;
          break;
        case "array":
          // Los arrays se manejan por separado
          this.handleArrayChange(property);
          return;
        case "menu-options":
          // Las opciones de menú se manejan por separado
          this.handleMenuOptionChange(property);
          return;
      }
    }

    // Actualizar propiedad en el nodo
    this.currentNode.properties[property] = value;

    // Actualizar la representación visual del nodo
    window.VisualNodeManager.updateNodeContent(this.currentNode.id);

    // Marcar como modificado
    this.markAsModified();
  },

  handleArrayChange: function (property) {
    if (!this.currentNode) return;

    const arrayField = document.querySelector(
      `.array-field[data-property="${property}"]`
    );
    if (!arrayField) return;

    const inputs = arrayField.querySelectorAll(".array-input");
    // No filtrar valores vacíos aquí - mantener todos los inputs para la edición
    const values = Array.from(inputs).map((input) => input.value);

    console.log(`📝 Actualizando propiedad ${property}:`, values);

    this.currentNode.properties[property] = values;
    window.VisualNodeManager.updateNodeContent(this.currentNode.id);
    this.markAsModified();
  },

  addArrayItem: function (property) {
    if (!this.currentNode) return;

    const arrayField = document.querySelector(
      `.array-field[data-property="${property}"]`
    );
    if (!arrayField) return;

    const currentValues = this.currentNode.properties[property] || [];
    currentValues.push("");
    this.currentNode.properties[property] = currentValues;

    // Re-renderizar el campo array
    const config = window.VisualEditorConfig.nodeTypes[this.currentNode.type];
    const propConfig = config.properties[property];

    const propertyField = arrayField.closest(".property-field");
    const label = propertyField.querySelector(".property-label");
    const labelText = label.textContent;

    const newHTML = this.generatePropertyField(
      property,
      propConfig,
      currentValues
    );
    propertyField.outerHTML = newHTML;
  },

  removeArrayItem: function (property, index) {
    if (!this.currentNode) return;

    const currentValues = this.currentNode.properties[property] || [];
    currentValues.splice(index, 1);
    this.currentNode.properties[property] = currentValues;

    // Re-renderizar el campo array
    const config = window.VisualEditorConfig.nodeTypes[this.currentNode.type];
    const propConfig = config.properties[property];

    const arrayField = document.querySelector(
      `.array-field[data-property="${property}"]`
    );
    const propertyField = arrayField.closest(".property-field");

    const newHTML = this.generatePropertyField(
      property,
      propConfig,
      currentValues
    );
    propertyField.outerHTML = newHTML;

    window.VisualNodeManager.updateNodeContent(this.currentNode.id);
    this.markAsModified();
  },

  // Funciones específicas para opciones de menú con destinos
  addMenuOption: function (property) {
    if (!this.currentNode) return;

    const currentOptions = this.currentNode.properties[property] || [];
    currentOptions.push({ text: "", destination: "" });
    this.currentNode.properties[property] = currentOptions;

    // Re-renderizar el campo
    this.refreshMenuOptionsField(property);
  },

  removeMenuOption: function (property, index) {
    if (!this.currentNode) return;

    const currentOptions = this.currentNode.properties[property] || [];
    currentOptions.splice(index, 1);
    this.currentNode.properties[property] = currentOptions;

    // Re-renderizar el campo
    this.refreshMenuOptionsField(property);

    window.VisualNodeManager.updateNodeContent(this.currentNode.id);
    this.markAsModified();
  },

  refreshMenuOptionsField: function (property) {
    const config = window.VisualEditorConfig.nodeTypes[this.currentNode.type];
    const propConfig = config.properties[property];
    const currentOptions = this.currentNode.properties[property] || [];

    const menuField = document.querySelector(
      `.menu-options-field[data-property="${property}"]`
    );
    if (!menuField) return;

    const propertyField = menuField.closest(".property-field");
    const newHTML = this.generatePropertyField(
      property,
      propConfig,
      currentOptions
    );
    propertyField.outerHTML = newHTML;

    // Re-conectar eventos
    this.setupMenuOptionsEvents(property);
  },

  setupMenuOptionsEvents: function (property) {
    const menuField = document.querySelector(
      `.menu-options-field[data-property="${property}"]`
    );
    if (!menuField) return;

    // Eventos para inputs de texto
    menuField.querySelectorAll(".menu-option-text").forEach((input) => {
      input.addEventListener("input", () =>
        this.handleMenuOptionChange(property)
      );
    });

    // Eventos para selects de destino
    menuField.querySelectorAll(".menu-option-destination").forEach((select) => {
      select.addEventListener("change", () =>
        this.handleMenuOptionChange(property)
      );
    });
  },

  handleMenuOptionChange: function (property) {
    if (!this.currentNode) return;

    const menuField = document.querySelector(
      `.menu-options-field[data-property="${property}"]`
    );
    if (!menuField) return;

    const options = [];
    const optionItems = menuField.querySelectorAll(".menu-option-item");

    optionItems.forEach((item) => {
      const index = parseInt(item.dataset.index);
      const textInput = item.querySelector(".menu-option-text");
      const destinationSelect = item.querySelector(".menu-option-destination");

      options.push({
        text: textInput?.value || "",
        destination: destinationSelect?.value || "",
      });
    });

    console.log(`📝 Actualizando opciones de menú ${property}:`, options);

    this.currentNode.properties[property] = options;
    window.VisualNodeManager.updateNodeContent(this.currentNode.id);
    this.markAsModified();
  },

  refreshDestinations: function (property) {
    // Re-renderizar el campo con destinos actualizados
    this.refreshMenuOptionsField(property);
    console.log("🔄 Destinos actualizados");
  },

  clearProperties: function () {
    this.currentNode = null;
    const container = document.getElementById("properties-content");
    if (container) {
      container.innerHTML = `
        <div class="no-selection">
          <i class="fas fa-mouse-pointer"></i>
          <p>Selecciona un nodo para editar sus propiedades</p>
        </div>
      `;
    }
  },

  validateProperties: function () {
    if (!this.currentNode) return { valid: true, errors: [] };

    const config = window.VisualEditorConfig.nodeTypes[this.currentNode.type];
    const errors = [];

    Object.entries(config.properties).forEach(([key, prop]) => {
      const value = this.currentNode.properties[key];

      if (
        prop.required &&
        (!value || (Array.isArray(value) && value.length === 0))
      ) {
        errors.push(`${prop.label || key} es requerido`);
      }
    });

    return {
      valid: errors.length === 0,
      errors: errors,
    };
  },

  markAsModified: function () {
    // Marcar el documento como modificado
    if (window.VisualEditor) {
      window.VisualEditor.setModified(true);
    }
  },

  escapeHtml: function (text) {
    if (!text) return "";
    return text
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },

  // Método para copiar propiedades de un nodo a otro
  copyProperties: function (sourceNode, targetNode) {
    if (sourceNode.type === targetNode.type) {
      targetNode.properties = { ...sourceNode.properties };
      window.VisualNodeManager.updateNodeContent(targetNode.id);
    }
  },
};
