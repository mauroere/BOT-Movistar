// CDU Builder - Generador de código
window.CDUCodeGenerator = {
  generateCDUCode: function (config) {
    const date = new Date().toLocaleDateString("es-ES");
    const messages = [config.initialMessage.replace(/\n/g, "\\n")];
    if (config.secondMessage) {
      messages.push(config.secondMessage.replace(/\n/g, "\\n"));
    }

    const codeTemplate = this.getCodeTemplate(config, date, messages);
    return codeTemplate;
  },

  getCodeTemplate: function (config, date, messages) {
    return [
      "// ========================================",
      "// " + config.cduTitle.toUpperCase(),
      "// ========================================",
      "// Autor: " + config.author,
      "// Fecha: " + date,
      "// Version: " + config.version,
      "// Descripcion: " + config.cduDescription,
      "// Generado con: CDU Builder Pro",
      "// ========================================",
      "",
      config.enableLogging
        ? "console.log('Cargando " + config.cduTitle + "...');"
        : "",
      "",
      "// Configuracion del CDU",
      "const CDU_" + config.cduName.toUpperCase() + "_CONFIG = {",
      "  name: '" + config.cduName + "',",
      "  title: '" + config.cduTitle + "',",
      "  description: '" + config.cduDescription + "',",
      "  icon: '" + config.cduIcon + "',",
      "  version: '" + config.version + "',",
      "  author: '" + config.author + "',",
      "  enabled: true,",
      "  trackStats: " + config.enableStats + ",",
      "  enableLogging: " + config.enableLogging,
      "};",
      "",
      "// Definicion del flujo principal",
      "const FLUJO_" + config.cduName.toUpperCase() + " = {",
      "  // Paso inicial",
      "  " + config.cduName + ": {",
      "    messages: [",
      this.formatMessages(messages),
      "    ],",
      "    options: [",
      this.formatOptions(config.options),
      "    ]",
      "  }",
      "};",
      "",
      this.getFunctionCode(config),
      "",
      this.getAutoInitCode(config),
      "",
      this.getInstallationInstructions(config),
    ]
      .filter(Boolean)
      .join("\n");
  },

  formatMessages: function (messages) {
    return messages
      .map(function (msg) {
        return '      "' + msg + '"';
      })
      .join(",\n");
  },

  formatOptions: function (options) {
    return options
      .map(function (opt) {
        return (
          '      { text: "' +
          opt.text.replace(/"/g, '\\"') +
          '", action: "' +
          opt.action +
          '" }'
        );
      })
      .join(",\n");
  },

  getFunctionCode: function (config) {
    const functionName = this.formatFunctionName(config.cduName);

    return [
      "// Funcion de inicializacion del CDU",
      "function init" + functionName + "CDU() {",
      config.enableLogging
        ? "  console.log('Inicializando " + config.cduTitle + "...');"
        : "",
      "",
      "  if (typeof window === 'undefined' || !window.bot) {",
      "    console.error('Bot principal no encontrado.');",
      "    return false;",
      "  }",
      "",
      "  try {",
      "    Object.keys(FLUJO_" +
        config.cduName.toUpperCase() +
        ").forEach(function(stepName) {",
      "      window.bot.addFlow(stepName, FLUJO_" +
        config.cduName.toUpperCase() +
        "[stepName]);",
      config.enableLogging
        ? "      console.log('Paso \"' + stepName + '\" registrado');"
        : "",
      "    });",
      "",
      config.enableStats ? "    if (window.bot.statsManager) {" : "",
      config.enableStats
        ? "      window.bot.statsManager.registerCDU('" +
          config.cduName +
          "', '" +
          config.cduTitle +
          "');"
        : "",
      config.enableStats ? "    }" : "",
      "",
      config.enableLogging
        ? "    console.log('" + config.cduTitle + " cargado correctamente');"
        : "",
      "    return true;",
      "  } catch (error) {",
      "    console.error('Error inicializando " +
        config.cduTitle +
        ":', error);",
      "    return false;",
      "  }",
      "}",
    ]
      .filter(Boolean)
      .join("\n");
  },

  getAutoInitCode: function (config) {
    const functionName = this.formatFunctionName(config.cduName);

    return [
      "// Auto-inicializacion",
      "document.addEventListener('DOMContentLoaded', function() {",
      "  var attempts = 0;",
      "  var maxAttempts = 50;",
      "  ",
      "  var initInterval = setInterval(function() {",
      "    attempts++;",
      "    ",
      "    if (typeof window !== 'undefined' && window.bot) {",
      "      clearInterval(initInterval);",
      "      var success = init" + functionName + "CDU();",
      config.enableLogging ? "      if (success) {" : "",
      config.enableLogging
        ? "        console.log('" + config.cduTitle + " integrado al sistema');"
        : "",
      config.enableLogging ? "      }" : "",
      "    } else if (attempts >= maxAttempts) {",
      "      clearInterval(initInterval);",
      "      console.error('Timeout: No se pudo conectar con el bot principal');",
      "    }",
      "  }, 100);",
      "});",
    ]
      .filter(Boolean)
      .join("\n");
  },

  getInstallationInstructions: function (config) {
    return [
      "// ========================================",
      "// INSTRUCCIONES DE INSTALACION:",
      "// ========================================",
      '// 1. Guarda este archivo como "cdu-' +
        config.cduName +
        '.js" en la carpeta /flujos/',
      "// 2. Agrega la referencia en index.html:",
      '//    <script src="flujos/cdu-' + config.cduName + '.js"></script>',
      "// 3. Agrega el boton en el HTML del selector CDU:",
      '//    <button class="cdu-btn" data-cdu="' + config.cduName + '">',
      '//      <i class="' + config.cduIcon + '"></i>',
      "//      <span>" + config.cduTitle + "</span>",
      "//      <small>" + config.cduDescription + "</small>",
      "//    </button>",
      "// 4. Listo! El CDU estara disponible en la interfaz",
      "// ========================================",
    ].join("\n");
  },

  formatFunctionName: function (cduName) {
    return cduName
      .split("_")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  },
};
