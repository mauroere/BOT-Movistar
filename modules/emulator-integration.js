/**
 * Emulator Integration Module - Integrador de todos los sistemas modulares
 * Conecta estadísticas, selector CDU y funcionalidad del emulador
 */

class EmulatorIntegration {
  constructor() {
    this.bot = null;
    this.statsManager = null;
    this.selectorManager = null;
    this.isInitialized = false;
    
    // Configuración del emulador
    this.config = {
      enableKeyboardShortcuts: true,    // Atajos de teclado
      autoSaveSession: true,            // Guardar sesión automáticamente
      enableAnalytics: true,            // Analytics del emulador
      showPerformanceMetrics: false,    // Métricas de rendimiento
      debugMode: false                  // Modo debug
    };
    
    // Estado de la sesión
    this.session = {
      startTime: null,
      totalInteractions: 0,
      cdusUsed: new Set(),
      currentFlow: null,
      userType: 'unknown'
    };
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    try {
      this.waitForBotInit();
      this.setupKeyboardShortcuts();
      this.setupSessionTracking();
      this.enhanceEmulatorSidebar();
      this.startPerformanceMonitoring();
      
      this.isInitialized = true;
      console.log("🚀 EmulatorIntegration inicializado correctamente");
    } catch (error) {
      console.error("❌ Error inicializando EmulatorIntegration:", error);
    }
  }

  waitForBotInit() {
    // Esperar a que el bot esté completamente inicializado
    const checkBot = setInterval(() => {
      if (window.bot && window.bot.statsManager && window.bot.selectorManager) {
        this.bot = window.bot;
        this.statsManager = window.bot.statsManager;
        this.selectorManager = window.bot.selectorManager;
        
        clearInterval(checkBot);
        this.onSystemsReady();
      }
    }, 100);

    // Timeout después de 10 segundos
    setTimeout(() => {
      if (!this.bot) {
        console.warn("⚠️ EmulatorIntegration: Timeout esperando inicialización del bot");
        clearInterval(checkBot);
      }
    }, 10000);
  }

  onSystemsReady() {
    console.log("🔗 Todos los sistemas CDU conectados al emulador");
    
    // Iniciar sesión
    this.startSession();
    
    // Configurar integraciones
    this.setupCrossSystemIntegration();
    
    // Actualizar sidebar
    this.updateEmulatorInfo();
  }

  setupKeyboardShortcuts() {
    if (!this.config.enableKeyboardShortcuts) return;

    document.addEventListener('keydown', (e) => {
      // Solo activos cuando no se está escribiendo
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch(e.key) {
        case 'Escape':
          e.preventDefault();
          this.toggleSelector();
          break;
        case 's':
          if (e.ctrlKey) {
            e.preventDefault();
            this.saveSession();
          }
          break;
        case 'r':
          if (e.ctrlKey) {
            e.preventDefault();
            this.resetEmulator();
          }
          break;
        case 'h':
          if (e.ctrlKey) {
            e.preventDefault();
            this.showKeyboardHelp();
          }
          break;
        case 'ArrowUp':
          if (e.ctrlKey) {
            e.preventDefault();
            this.previousCDU();
          }
          break;
        case 'ArrowDown':
          if (e.ctrlKey) {
            e.preventDefault();
            this.nextCDU();
          }
          break;
        case 'Enter':
          if (e.ctrlKey) {
            e.preventDefault();
            this.executeMostUsedCDU();
          }
          break;
      }
    });
  }

  setupSessionTracking() {
    if (!this.config.autoSaveSession) return;

    // Guardar sesión cada 30 segundos
    setInterval(() => {
      this.saveSession();
    }, 30000);

    // Guardar al cerrar
    window.addEventListener('beforeunload', () => {
      this.saveSession();
    });
  }

  enhanceEmulatorSidebar() {
    // El panel ya se crea desde el script principal como panel unificado
    // Solo configuramos los event listeners para los botones que están integrados
    this.setupSidebarActions();
    console.log("✅ EmulatorIntegration: Sidebar mejorada - panel unificado");
  }

  setupSidebarActions() {
    // Los botones están integrados en el panel unificado, solo configuramos los listeners
    document.getElementById('showKeyboardHelp')?.addEventListener('click', () => {
      this.showKeyboardHelp();
    });

    document.getElementById('resetSession')?.addEventListener('click', () => {
      this.resetEmulator();
    });
    
    console.log("✅ EmulatorIntegration: Event listeners configurados para panel unificado");
  }

  setupCrossSystemIntegration() {
    // Interceptar ejecución de CDUs para tracking
    const originalExecuteFlow = this.bot.executeFlow;
    this.bot.executeFlow = (flowName) => {
      this.trackCDUExecution(flowName);
      return originalExecuteFlow.call(this.bot, flowName);
    };

    // Interceptar cambios de stats para actualizar selector
    if (this.statsManager) {
      const originalRecordUsage = this.statsManager.recordUsage;
      this.statsManager.recordUsage = (cduId) => {
        const result = originalRecordUsage.call(this.statsManager, cduId);
        this.onStatsUpdate();
        return result;
      };
    }
  }

  startSession() {
    this.session.startTime = new Date();
    this.updateSessionTimer();
    
    // Timer para actualizar tiempo de sesión
    setInterval(() => {
      this.updateSessionTimer();
    }, 1000);
  }

  trackCDUExecution(flowName) {
    this.session.totalInteractions++;
    this.session.cdusUsed.add(flowName);
    this.session.currentFlow = flowName;
    
    this.updateEmulatorMetrics();
    
    if (this.config.debugMode) {
      console.log(`📊 CDU ejecutado: ${flowName}, Total interacciones: ${this.session.totalInteractions}`);
    }
  }

  onStatsUpdate() {
    // Actualizar selector cuando cambien las estadísticas
    if (this.selectorManager) {
      this.selectorManager.refreshStats();
    }
    
    // Actualizar métricas del emulador
    this.updateEmulatorMetrics();
  }

  updateEmulatorInfo() {
    // Actualizar estado de sistemas
    const statsStatus = document.getElementById('stats-status');
    const selectorStatus = document.getElementById('selector-status');
    
    if (statsStatus) {
      statsStatus.innerHTML = this.statsManager ? '🟢 Activo' : '🔴 Inactivo';
    }
    
    if (selectorStatus) {
      selectorStatus.innerHTML = this.selectorManager ? '🟢 Activo' : '🔴 Inactivo';
    }
  }

  updateEmulatorMetrics() {
    const interactionCount = document.getElementById('interaction-count');
    const cduUsedCount = document.getElementById('cdu-used-count');
    
    if (interactionCount) {
      interactionCount.textContent = this.session.totalInteractions;
    }
    
    if (cduUsedCount) {
      cduUsedCount.textContent = this.session.cdusUsed.size;
    }
  }

  updateSessionTimer() {
    const sessionTime = document.getElementById('session-time');
    if (!sessionTime || !this.session.startTime) return;
    
    const elapsed = Date.now() - this.session.startTime.getTime();
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    
    sessionTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Métodos de control del emulador

  toggleSelector() {
    if (this.selectorManager) {
      this.selectorManager.toggleSelector();
    }
  }

  resetEmulator() {
    if (confirm('¿Resetear completamente el emulador? Se perderán datos de la sesión actual.')) {
      // Reset bot
      if (this.bot && this.bot.selectorManager) {
        this.bot.selectorManager.resetBot();
      }
      
      // Reset session
      this.session = {
        startTime: new Date(),
        totalInteractions: 0,
        cdusUsed: new Set(),
        currentFlow: null,
        userType: 'unknown'
      };
      
      this.updateEmulatorMetrics();
      console.log("🔄 Emulador reseteado completamente");
    }
  }

  previousCDU() {
    // Navegar al CDU anterior en el selector
    if (this.selectorManager) {
      // Implementar navegación por teclado en el selector
      console.log("⬆️ CDU anterior (funcionalidad pendiente)");
    }
  }

  nextCDU() {
    // Navegar al siguiente CDU en el selector
    if (this.selectorManager) {
      // Implementar navegación por teclado en el selector
      console.log("⬇️ CDU siguiente (funcionalidad pendiente)");
    }
  }

  executeMostUsedCDU() {
    if (this.statsManager) {
      const favorites = this.statsManager.getFavorites();
      if (favorites.length > 0) {
        this.bot.executeFlow(favorites[0].id);
        console.log(`🚀 Ejecutando CDU más usado: ${favorites[0].name}`);
      }
    }
  }

  showKeyboardHelp() {
    const modal = document.createElement('div');
    modal.className = 'keyboard-help-modal';
    modal.innerHTML = `
      <div class="keyboard-help-content">
        <div class="keyboard-help-header">
          <h3>⌨️ Atajos de Teclado</h3>
          <button class="close-help">✕</button>
        </div>
        <div class="keyboard-shortcuts">
          <div class="shortcut-group">
            <h4>Navegación</h4>
            <div class="shortcut-item">
              <span class="shortcut-key">Esc</span>
              <span class="shortcut-desc">Toggle selector CDU</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">Ctrl + ↑/↓</span>
              <span class="shortcut-desc">Navegar CDUs</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">Ctrl + Enter</span>
              <span class="shortcut-desc">Ejecutar CDU favorito</span>
            </div>
          </div>
          <div class="shortcut-group">
            <h4>Acciones</h4>
            <div class="shortcut-item">
              <span class="shortcut-key">Ctrl + S</span>
              <span class="shortcut-desc">Guardar sesión</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">Ctrl + R</span>
              <span class="shortcut-desc">Reset emulador</span>
            </div>
            <div class="shortcut-item">
              <span class="shortcut-key">Ctrl + H</span>
              <span class="shortcut-desc">Mostrar ayuda</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Cerrar modal
    modal.querySelector('.close-help').addEventListener('click', () => {
      modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  saveSession() {
    if (!this.config.autoSaveSession) return;

    const sessionData = {
      ...this.session,
      cdusUsed: Array.from(this.session.cdusUsed),
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem('emulator_session', JSON.stringify(sessionData));
      console.log("💾 Sesión guardada automáticamente");
    } catch (error) {
      console.warn("⚠️ Error guardando sesión:", error);
    }
  }

  exportSession() {
    const sessionData = {
      session: {
        ...this.session,
        cdusUsed: Array.from(this.session.cdusUsed)
      },
      stats: this.statsManager ? this.statsManager.exportStats() : null,
      timestamp: new Date().toISOString(),
      emulatorVersion: '2.0.0'
    };

    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `emulator-session-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("📥 Sesión exportada correctamente");
  }

  startPerformanceMonitoring() {
    if (!this.config.showPerformanceMetrics) return;

    setInterval(() => {
      const memory = performance.memory;
      if (memory && this.config.debugMode) {
        console.log(`📊 Memoria: ${Math.round(memory.usedJSHeapSize / 1048576)}MB`);
      }
    }, 30000);
  }

  // API pública para extensiones
  getIntegrationStatus() {
    return {
      bot: !!this.bot,
      stats: !!this.statsManager,
      selector: !!this.selectorManager,
      session: this.session
    };
  }

  // Cleanup
  destroy() {
    this.saveSession();
    this.isInitialized = false;
    console.log("🔄 EmulatorIntegration destruido");
  }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Esperar un poco para que se carguen otros sistemas
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      window.emulatorIntegration = new EmulatorIntegration();
    }
  }, 500);
});

// Registro global
if (typeof window !== 'undefined') {
  window.EmulatorIntegration = EmulatorIntegration;
  console.log("✅ EmulatorIntegration disponible globalmente");
}

// Exportación para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EmulatorIntegration;
}
