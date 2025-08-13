// CDU Builder - Configuración global
window.CDUBuilderConfig = {
  version: "2.0.0",
  author: "CDU Builder Pro Team",

  // Estado global de la aplicación
  AppState: {
    currentCDU: null,
    isValid: false,
    generatedCode: null,
    isDeployed: false,
  },

  // Configuración de validaciones
  validation: {
    maxCDUNameLength: 50,
    maxTitleLength: 100,
    maxDescriptionLength: 200,
    minOptions: 1,
    maxOptions: 10,
  },

  // Configuración de UI
  ui: {
    animationDuration: 300,
    statusMessageTimeout: 5000,
  },
};
