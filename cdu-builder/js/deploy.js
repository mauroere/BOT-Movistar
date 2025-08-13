// CDU Builder - Deploy
window.CDUDeploy = {
  updateDeployStatus: function () {
    const deployStatus = document.getElementById("deployStatus");
    const testBtn = document.getElementById("testDeployBtn");
    const fullBtn = document.getElementById("fullDeployBtn");
    const AppState = window.CDUBuilderConfig.AppState;

    if (AppState.isValid && AppState.generatedCode) {
      deployStatus.className = "deploy-status ready";
      deployStatus.innerHTML =
        '<i class="fas fa-check-circle"></i>' +
        "<p><strong>CDU listo para despliegue</strong></p>" +
        "<p>CDU: <strong>" +
        AppState.currentCDU.cduTitle +
        "</strong></p>" +
        "<p>Nombre: <code>" +
        AppState.currentCDU.cduName +
        "</code></p>";
      testBtn.style.display = "inline-flex";
      fullBtn.style.display = "inline-flex";
    }
  },

  testDeploy: function () {
    const AppState = window.CDUBuilderConfig.AppState;

    if (!AppState.isValid || !AppState.generatedCode) {
      CDUBuilder.showStatus("CDU no valido para despliegue", "error");
      return;
    }

    try {
      if (window.opener && window.opener.bot) {
        const tempFlow = this.createFlowFromCDU(AppState.currentCDU);
        window.opener.bot.addFlow(AppState.currentCDU.cduName, tempFlow);

        if (window.opener.bot.cduSelector) {
          window.opener.bot.cduSelector.updateCDUList();
        }

        this.showDeployResult(
          "success",
          "CDU desplegado temporalmente en el emulador",
          "El CDU esta ahora disponible para pruebas. Se eliminara al recargar la pagina."
        );
      } else {
        this.showDeployResult(
          "error",
          "Emulador no encontrado",
          "Abre esta herramienta desde la ventana del emulador principal."
        );
      }
    } catch (error) {
      this.showDeployResult(
        "error",
        "Error en despliegue temporal",
        error.message
      );
    }
  },

  fullDeploy: function () {
    const AppState = window.CDUBuilderConfig.AppState;

    if (!AppState.isValid || !AppState.generatedCode) {
      CDUBuilder.showStatus("CDU no valido para despliegue", "error");
      return;
    }

    const instructions = this.generateInstallationInstructions();
    this.showDeployResult("info", "Instrucciones de instalacion", instructions);
  },

  createFlowFromCDU: function (cdu) {
    const messages = [cdu.initialMessage];
    if (cdu.secondMessage) messages.push(cdu.secondMessage);

    return {
      messages: messages,
      options: cdu.options,
    };
  },

  generateInstallationInstructions: function () {
    const cdu = window.CDUBuilderConfig.AppState.currentCDU;
    return (
      '<div style="text-align: left; max-width: 600px;">' +
      "<h4>Para instalar permanentemente tu CDU:</h4>" +
      "<ol>" +
      '<li><strong>Descargar:</strong> Usa el boton "Descargar Archivo" para obtener <code>cdu-' +
      cdu.cduName +
      ".js</code></li>" +
      "<li><strong>Guardar:</strong> Coloca el archivo en la carpeta <code>/flujos/</code></li>" +
      "<li><strong>HTML:</strong> Agrega en <code>index.html</code> antes del <code>&lt;/body&gt;</code>:" +
      '<pre style="background: #f4f4f4; padding: 10px; margin: 10px 0; border-radius: 5px; overflow-x: auto;">&lt;script src="flujos/cdu-' +
      cdu.cduName +
      '.js"&gt;&lt;/script&gt;</pre>' +
      "</li>" +
      "<li><strong>Boton:</strong> Agrega en el selector CDU:" +
      '<pre style="background: #f4f4f4; padding: 10px; margin: 10px 0; border-radius: 5px; overflow-x: auto;">&lt;button class="cdu-btn" data-cdu="' +
      cdu.cduName +
      '"&gt;\n  &lt;i class="' +
      cdu.cduIcon +
      '"&gt;&lt;/i&gt;\n  &lt;span&gt;' +
      cdu.cduTitle +
      "&lt;/span&gt;\n  &lt;small&gt;" +
      cdu.cduDescription +
      "&lt;/small&gt;\n&lt;/button&gt;</pre>" +
      "</li>" +
      "<li><strong>Listo!</strong> Recarga el emulador y tu CDU estara disponible</li>" +
      "</ol>" +
      "</div>"
    );
  },

  showDeployResult: function (type, title, message) {
    const deployResults = document.getElementById("deployResults");
    const className =
      type === "success"
        ? "status-success"
        : type === "error"
        ? "status-error"
        : "status-message";

    deployResults.innerHTML =
      '<div class="' +
      className +
      '">' +
      "<strong>" +
      title +
      "</strong>" +
      '<div style="margin-top: 10px;">' +
      message +
      "</div>" +
      "</div>";

    if (type === "success") {
      window.CDUBuilderConfig.AppState.isDeployed = true;
      const deployStatus = document.getElementById("deployStatus");
      deployStatus.className = "deploy-status deployed";
      deployStatus.innerHTML =
        '<i class="fas fa-rocket"></i>' +
        "<p><strong>CDU desplegado exitosamente</strong></p>" +
        "<p>Ya esta disponible para usar!</p>";
    }
  },
};
