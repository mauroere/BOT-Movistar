// CDU Builder - Validador
window.CDUValidator = {
  validateCDU: function () {
    const errors = [];
    const data = this.collectFormData();

    // Validaciones obligatorias
    if (!data.cduName) errors.push("El nombre del CDU es obligatorio");
    if (!data.cduTitle) errors.push("El titulo es obligatorio");
    if (!data.cduDescription) errors.push("La descripcion es obligatoria");
    if (!data.initialMessage) errors.push("El mensaje inicial es obligatorio");
    if (data.options.length === 0)
      errors.push("Debe haber al menos una opcion");

    // Validaciones de formato
    if (data.cduName && !/^[a-z0-9_]+$/.test(data.cduName)) {
      errors.push(
        "El nombre del CDU solo puede contener letras minusculas, numeros y guiones bajos"
      );
    }

    if (
      data.cduName &&
      data.cduName.length > window.CDUBuilderConfig.validation.maxCDUNameLength
    ) {
      errors.push(
        "El nombre del CDU no puede tener mas de " +
          window.CDUBuilderConfig.validation.maxCDUNameLength +
          " caracteres"
      );
    }

    // Validar opciones
    data.options.forEach(function (option, index) {
      if (!option.text)
        errors.push("La opcion " + (index + 1) + " debe tener texto");
      if (!option.action)
        errors.push("La opcion " + (index + 1) + " debe tener una accion");
      if (option.action && !/^[a-z0-9_]+$/.test(option.action)) {
        errors.push(
          "La accion de la opcion " +
            (index + 1) +
            " solo puede contener letras minusculas, numeros y guiones bajos"
        );
      }
    });

    return {
      isValid: errors.length === 0,
      errors: errors,
      data: data,
    };
  },

  collectFormData: function () {
    const options = [];
    const optionItems = document.querySelectorAll(".option-item");

    optionItems.forEach(function (item) {
      const text = item.querySelector(".option-text").value.trim();
      const action = item.querySelector(".option-action").value.trim();

      if (text && action) {
        options.push({ text: text, action: action });
      }
    });

    return {
      cduName: document.getElementById("cduName").value.trim(),
      cduTitle: document.getElementById("cduTitle").value.trim(),
      cduDescription: document.getElementById("cduDescription").value.trim(),
      cduIcon: document.getElementById("cduIcon").value.trim() || "fas fa-cog",
      initialMessage: document.getElementById("initialMessage").value.trim(),
      secondMessage: document.getElementById("secondMessage").value.trim(),
      options: options,
      author:
        document.getElementById("author").value.trim() || "CDU Builder Pro",
      version: document.getElementById("version").value.trim() || "1.0",
      enableStats: document.getElementById("enableStats").checked,
      enableLogging: document.getElementById("enableLogging").checked,
    };
  },

  showValidationErrors: function (errors) {
    const errorsContainer = document.getElementById("validationErrors");
    const errorsList = document.getElementById("errorsList");
    const successContainer = document.getElementById("validationSuccess");

    errorsList.innerHTML = errors
      .map(function (error) {
        return "<li>" + error + "</li>";
      })
      .join("");
    errorsContainer.style.display = "block";
    successContainer.style.display = "none";
  },

  hideValidationErrors: function () {
    document.getElementById("validationErrors").style.display = "none";
  },

  showValidationSuccess: function () {
    document.getElementById("validationSuccess").style.display = "block";
  },
};
