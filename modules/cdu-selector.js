/**
 * CDU Selector Module - Sistema modular para selección de CDUs
 * Integrado con sistema de estadísticas y ranking
 */

class CDUSelectorManager {
  constructor(botInstance, statsManager = null) {
    this.bot = botInstance;
    this.statsManager = statsManager;
    this.isInitialized = false;
    
    // Configuración
    this.config = {
      autoSortByStats: true,          // Auto-ordenar por estadísticas
      showFavoriteSection: false,     // Mostrar sección de favoritos - DESHABILITADO
      maxVisibleCDUs: 20,            // Máximo CDUs visibles sin colapsar
      animationDelay: 300,           // Delay para animaciones
      updateInterval: 5000,          // Intervalo actualización automática (ms)
    };
    
    // Estado interno
    this.currentSort = 'alphabetical'; // 'alphabetical', 'usage', 'recent'
    this.isCollapsed = true;
    this.selectedCDU = null;
    
    // Referencias DOM
    this.elements = {};
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    console.log("🚀 CDUSelectorManager: Iniciando...");
    
    try {
      // Esperar a que el DOM esté completamente cargado
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initAfterDOM());
      } else {
        this.initAfterDOM();
      }
    } catch (error) {
      console.error("❌ Error inicializando CDUSelectorManager:", error);
    }
  }

  initAfterDOM() {
    console.log("📄 CDUSelectorManager: DOM listo, inicializando...");
    
    try {
      const elementsFound = this.bindElements();
      
      if (!elementsFound) {
        console.error("❌ CDUSelectorManager: No se pudieron encontrar elementos DOM requeridos");
        return;
      }
      
      const listenersSetup = this.setupBasicEventListeners();
      
      if (!listenersSetup) {
        console.error("❌ CDUSelectorManager: No se pudieron configurar event listeners");
        return;
      }
      
      // Crear selector mejorado después de vincular elementos básicos
      this.createEnhancedSelector();
      
      // Re-vincular referencias DOM después de modificar elementos
      this.rebindAfterDOMChanges();
      
      // Configurar listeners después de las modificaciones DOM
      const finalListenersSetup = this.setupBasicEventListeners();
      
      this.isInitialized = true;
      
      console.log("✅ CDUSelectorManager inicializado correctamente");
      
      // Actualizar lista de CDUs después de un pequeño delay
      // para asegurar que los flujos del bot estén cargados
      setTimeout(() => {
        console.log("⏰ Intentando cargar CDUs después de delay...");
        this.updateCDUList();
      }, 1000);
      
      // Test del estado inicial
      if (this.elements.content) {
        console.log("📊 Estado inicial del content:", {
          collapsed: this.elements.content.classList.contains('collapsed'),
          classes: this.elements.content.className,
          display: window.getComputedStyle(this.elements.content).display,
          maxHeight: window.getComputedStyle(this.elements.content).maxHeight
        });
      }
      
      // Exponer para debugging
      if (typeof window !== 'undefined') {
        window.debugCDUSelector = this;
        console.log("🐛 CDUSelector expuesto como window.debugCDUSelector");
        console.log("   Para hacer test manual: window.debugCDUSelector.testToggle()");
        console.log("   Para actualizar CDUs: window.debugCDUSelector.updateCDUList()");
        console.log("   Para revisar flujos: window.debugCDUSelector.bot.botFlows");
      }
      
    } catch (error) {
      console.error("❌ Error en initAfterDOM:", error);
    }
  }

  bindElements() {
    console.log("🔍 Binding elements...");
    
    this.elements = {
      selector: document.getElementById("cduSelector"),
      toggleBtn: document.getElementById("cduToggleBtn"),
      content: document.getElementById("cduSelectorContent"),
      grid: document.querySelector(".cdu-grid"),
      clearBtn: document.getElementById("clearChatBtn"),
      resetBtn: document.getElementById("resetBotBtn")
    };

    // Verificar elementos requeridos y mostrar debug detallado
    const requiredElements = ['selector', 'toggleBtn', 'content', 'grid'];
    let allElementsFound = true;
    
    console.log("🔍 Elementos DOM encontrados:");
    requiredElements.forEach(key => {
      const element = this.elements[key];
      const found = !!element;
      const classes = found ? element.className : 'N/A';
      
      console.log(`  ${key}: ${found ? '✅' : '❌'} ${found ? `(classes: ${classes})` : 'NO ENCONTRADO'}`);
      
      if (!found) {
        allElementsFound = false;
      }
    });

    // Verificar específicamente el botón toggle
    if (this.elements.toggleBtn) {
      console.log("🔘 Toggle button encontrado:");
      console.log("  - ID:", this.elements.toggleBtn.id);
      console.log("  - Classes:", this.elements.toggleBtn.className);
      console.log("  - Parent:", this.elements.toggleBtn.parentElement?.className);
      console.log("  - Inner HTML:", this.elements.toggleBtn.innerHTML);
    }

    if (allElementsFound) {
      console.log("✅ CDUSelector: Todos los elementos DOM vinculados correctamente");
    } else {
      console.error("❌ CDUSelector: Faltan elementos DOM requeridos");
    }

    return allElementsFound;
  }

  createEnhancedSelector() {
    if (!this.elements.selector) return;

    // Crear header mejorado
    this.createEnhancedHeader();
    
    // Crear controles de ordenamiento
    this.createSortingControls();
    
    // Crear sección de favoritos
    if (this.config.showFavoriteSection && this.statsManager) {
      this.createFavoritesSection();
    }
    
    // Mejorar grid existente
    this.enhanceGrid();
  }

  createEnhancedHeader() {
    const existingHeader = this.elements.selector.querySelector('.cdu-selector-header');
    if (!existingHeader) return;

    existingHeader.innerHTML = `
      <div class="cdu-header-left">
        <span class="cdu-title">Selector de CDUs</span>
        <span class="cdu-count" id="cduCount">0 CDUs</span>
      </div>
      <div class="cdu-header-right">
        <button class="cdu-sort-btn" id="cduSortBtn" title="Cambiar ordenamiento">
          <i class="fas fa-sort-alpha-down"></i>
        </button>
        <button class="cdu-stats-toggle" id="cduStatsToggle" title="Mostrar estadísticas">
          <i class="fas fa-chart-bar"></i>
        </button>
        <button class="cdu-toggle-btn collapsed" id="cduToggleBtn">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    `;

    // Actualizar referencias
    this.elements.toggleBtn = document.getElementById("cduToggleBtn");
    this.elements.sortBtn = document.getElementById("cduSortBtn");
    this.elements.statsToggle = document.getElementById("cduStatsToggle");
    this.elements.countDisplay = document.getElementById("cduCount");
  }

  // Re-vincular referencias DOM después de modificar elementos
  rebindAfterDOMChanges() {
    console.log("🔄 Re-vinculando referencias DOM después de cambios...");
    
    // Actualizar referencias que pueden haber cambiado
    this.elements.toggleBtn = document.getElementById("cduToggleBtn");
    this.elements.sortBtn = document.getElementById("cduSortBtn");
    this.elements.statsToggle = document.getElementById("cduStatsToggle");
    this.elements.countDisplay = document.getElementById("cduCount");
    
    if (this.elements.toggleBtn) {
      console.log("✅ Toggle button re-vinculado correctamente");
    } else {
      console.error("❌ No se pudo re-vincular el toggle button");
    }
    
    if (this.elements.sortBtn) {
      console.log("✅ Sort button re-vinculado correctamente");
    } else {
      console.error("❌ No se pudo re-vincular el sort button");
    }
    
    if (this.elements.statsToggle) {
      console.log("✅ Stats toggle re-vinculado correctamente");
    } else {
      console.error("❌ No se pudo re-vincular el stats toggle");
    }
  }

  createSortingControls() {
    if (!this.elements.content) return;

    const sortingDiv = document.createElement('div');
    sortingDiv.className = 'cdu-sorting-controls collapsed';
    sortingDiv.innerHTML = `
      <div class="sorting-options">
        <button class="sort-option active" data-sort="alphabetical">
          <i class="fas fa-sort-alpha-down"></i>
          Alfabético
        </button>
        <button class="sort-option" data-sort="usage">
          <i class="fas fa-fire"></i>
          Más Usados
        </button>
        <button class="sort-option" data-sort="recent">
          <i class="fas fa-clock"></i>
          Recientes
        </button>
      </div>
    `;

    this.elements.content.insertBefore(sortingDiv, this.elements.grid);
  }

  createFavoritesSection() {
    if (!this.elements.content || !this.statsManager) return;

    const favoritesDiv = document.createElement('div');
    favoritesDiv.className = 'cdu-favorites-section collapsed';
    favoritesDiv.innerHTML = `
      <div class="favorites-header">
        <i class="fas fa-star"></i>
        <span>CDUs Favoritos</span>
        <span class="favorites-count" id="favoritesCount">0</span>
      </div>
      <div class="favorites-grid" id="favoritesGrid">
        <!-- Los favoritos se cargan dinámicamente -->
      </div>
    `;

    this.elements.content.insertBefore(favoritesDiv, this.elements.content.querySelector('.cdu-sorting-controls') || this.elements.grid);
  }

  enhanceGrid() {
    if (!this.elements.grid) return;

    this.elements.grid.classList.add('enhanced-cdu-grid');
    
    // Agregar filtro de búsqueda
    const searchDiv = document.createElement('div');
    searchDiv.className = 'cdu-search-container collapsed';
    searchDiv.innerHTML = `
      <div class="cdu-search-input-container">
        <i class="fas fa-search"></i>
        <input type="text" id="cduSearchInput" placeholder="Buscar CDU..." class="cdu-search-input">
        <button id="cduClearSearch" class="cdu-clear-search">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    this.elements.grid.parentNode.insertBefore(searchDiv, this.elements.grid);
  }

  setupBasicEventListeners() {
    console.log("🔗 CDUSelectorManager: Configurando event listeners básicos...");
    
    // Toggle principal - método directo
    if (this.elements.toggleBtn) {
      console.log("🔘 Configurando listener para toggle button...");
      
      // Remover listeners previos si existen
      this.elements.toggleBtn.onclick = null;
      
      // Agregar nuevo listener
      this.elements.toggleBtn.addEventListener('click', (e) => {
        console.log("🖱️ ¡CLICK DETECTADO EN TOGGLE!");
        e.preventDefault();
        e.stopPropagation();
        this.basicToggle();
      });
      
      // También agregar listener al header completo para mayor área clickeable
      const header = this.elements.toggleBtn.closest('.cdu-selector-header');
      if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', (e) => {
          // Solo si no se clickeó directamente el botón
          if (e.target !== this.elements.toggleBtn && !this.elements.toggleBtn.contains(e.target)) {
            console.log("🖱️ ¡CLICK DETECTADO EN HEADER!");
            e.preventDefault();
            this.basicToggle();
          }
        });
        console.log("✅ Header también es clickeable");
      }
      
      console.log("✅ Toggle button listener agregado");
    } else {
      console.error("❌ Toggle button no encontrado - no se pueden configurar listeners");
      return false;
    }

    // CDU buttons - método directo  
    if (this.elements.grid) {
      this.elements.grid.addEventListener('click', (e) => {
        const cduBtn = e.target.closest('.cdu-btn');
        if (cduBtn && !cduBtn.disabled) {
          console.log("🖱️ CDU button clickeado:", cduBtn.dataset.cdu);
          this.handleCDUSelection(cduBtn);
        }
      });
      console.log("✅ CDU grid listener agregado");
    }

    // Sort button - cambiar ordenamiento
    if (this.elements.sortBtn) {
      this.elements.sortBtn.addEventListener('click', (e) => {
        console.log("🖱️ Sort button clickeado");
        e.preventDefault();
        e.stopPropagation();
        this.cycleSortMode();
      });
      console.log("✅ Sort button listener agregado");
    }

    // Stats toggle - mostrar/ocultar estadísticas  
    if (this.elements.statsToggle) {
      this.elements.statsToggle.addEventListener('click', (e) => {
        console.log("🖱️ Stats toggle clickeado");
        e.preventDefault();
        e.stopPropagation();
        this.toggleStatsView();
      });
      console.log("✅ Stats toggle listener agregado");
    }
    
    return true;
  }

  basicToggle() {
    console.log("🔄 basicToggle ejecutado");
    
    if (!this.elements.content) {
      console.error("❌ Content element no encontrado para toggle");
      return;
    }

    const isCollapsed = this.elements.content.classList.contains('collapsed');
    console.log("🔄 Estado actual:", isCollapsed ? "colapsado" : "expandido");
    console.log("🔄 Classes actuales:", this.elements.content.className);
    
    if (isCollapsed) {
      this.elements.content.classList.remove('collapsed');
      console.log("📂 Expandiendo selector...");
    } else {
      this.elements.content.classList.add('collapsed');
      console.log("📁 Colapsando selector...");
    }
    
    console.log("🔄 Classes después del toggle:", this.elements.content.className);
    
    // Actualizar icono del botón
    if (this.elements.toggleBtn) {
      const icon = this.elements.toggleBtn.querySelector('i');
      if (icon) {
        const newIconClass = isCollapsed ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        icon.className = newIconClass;
        console.log("🔄 Icono actualizado a:", newIconClass);
      }
    }
    
    this.isCollapsed = !isCollapsed;
    
    // Verificar estado después del cambio
    setTimeout(() => {
      const computedStyle = window.getComputedStyle(this.elements.content);
      console.log("📊 Estado final:", {
        maxHeight: computedStyle.maxHeight,
        opacity: computedStyle.opacity,
        display: computedStyle.display,
        overflow: computedStyle.overflow
      });
    }, 100);
  }

  // Método de test para llamar desde consola del navegador
  testToggle() {
    console.log("🧪 Test manual del toggle...");
    this.basicToggle();
  }

  toggleSelector() {
    if (!this.elements.content || !this.elements.toggleBtn) {
      console.warn("⚠️ CDUSelector: Elementos no encontrados para toggle");
      return;
    }

    const isCollapsed = this.elements.content.classList.contains('collapsed');
    
    if (isCollapsed) {
      this.elements.content.classList.remove('collapsed');
      console.log("📂 CDUSelector: Expandido");
    } else {
      this.elements.content.classList.add('collapsed');
      console.log("📁 CDUSelector: Colapsado");
    }
    
    this.isCollapsed = !isCollapsed;
    this.updateToggleButton();
    
    // Actualizar lista si se está expandiendo
    if (!this.isCollapsed) {
      setTimeout(() => this.updateCDUList(), 100);
    }
  }

  expandSelector() {
    // Expandir elementos
    const elementsToExpand = [
      this.elements.content,
      document.querySelector('.cdu-sorting-controls'),
      document.querySelector('.cdu-favorites-section'),
      document.querySelector('.cdu-search-container')
    ].filter(Boolean);

    elementsToExpand.forEach(el => el.classList.remove('collapsed'));
    
    // Actualizar lista
    setTimeout(() => this.updateCDUList(), this.config.animationDelay);
  }

  collapseSelector() {
    const elementsToCollapse = [
      this.elements.content,
      document.querySelector('.cdu-sorting-controls'),
      document.querySelector('.cdu-favorites-section'),
      document.querySelector('.cdu-search-container')
    ].filter(Boolean);

    elementsToCollapse.forEach(el => el.classList.add('collapsed'));
  }

  updateToggleButton() {
    if (!this.elements.toggleBtn) return;
    
    const icon = this.elements.toggleBtn.querySelector('i');
    if (icon) {
      icon.className = this.isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    }
    
    this.elements.toggleBtn.classList.toggle('collapsed', this.isCollapsed);
  }

  handleSortChange(option) {
    // Remover active de otros botones
    document.querySelectorAll('.sort-option').forEach(btn => btn.classList.remove('active'));
    option.classList.add('active');
    
    // Actualizar sorting
    this.currentSort = option.dataset.sort;
    this.updateCDUList();
    this.updateSortIcon();
  }

  cycleSortMode() {
    console.log("🔄 Cambiando modo de ordenamiento...");
    
    const sortTypes = ['alphabetical', 'usage', 'recent'];
    const currentIndex = sortTypes.indexOf(this.currentSort);
    this.currentSort = sortTypes[(currentIndex + 1) % sortTypes.length];
    
    console.log(`📊 Nuevo ordenamiento: ${this.currentSort}`);
    
    // Actualizar icono del botón
    this.updateSortIcon();
    
    // Actualizar lista con nuevo ordenamiento
    this.updateCDUList();
  }

  cycleSorting() {
    const sortTypes = ['alphabetical', 'usage', 'recent'];
    const currentIndex = sortTypes.indexOf(this.currentSort);
    this.currentSort = sortTypes[(currentIndex + 1) % sortTypes.length];
    
    // Actualizar UI
    document.querySelectorAll('.sort-option').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-sort="${this.currentSort}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    this.updateCDUList();
    this.updateSortIcon();
  }

  updateSortIcon() {
    if (!this.elements.sortBtn) return;
    
    const icon = this.elements.sortBtn.querySelector('i');
    if (!icon) return;

    const icons = {
      alphabetical: 'fas fa-sort-alpha-down',
      usage: 'fas fa-fire',
      recent: 'fas fa-clock'
    };

    icon.className = icons[this.currentSort] || icons.alphabetical;
    
    // Actualizar tooltip
    const tooltips = {
      alphabetical: 'Ordenar por nombre (actual)',
      usage: 'Ordenar por uso (actual)', 
      recent: 'Ordenar por reciente (actual)'
    };
    
    this.elements.sortBtn.title = tooltips[this.currentSort] || 'Cambiar ordenamiento';
  }

  toggleStatsView() {
    console.log("📊 Toggling stats view...");
    
    // Buscar el panel de estadísticas unificado
    const statsPanel = document.querySelector('.unified-activity-panel');
    const statsSection = document.querySelector('.cdu-stats-section');
    
    if (statsPanel) {
      const isCollapsed = statsPanel.classList.contains('collapsed');
      if (isCollapsed) {
        statsPanel.classList.remove('collapsed');
        console.log("📊 Panel de estadísticas expandido");
      } else {
        statsPanel.classList.add('collapsed');
        console.log("📊 Panel de estadísticas colapsado");
      }
      
      // Actualizar icono del botón
      this.updateStatsIcon(!isCollapsed);
    } else if (statsSection) {
      // Fallback a sección de stats específica
      const isCollapsed = statsSection.classList.contains('collapsed');
      if (isCollapsed) {
        statsSection.classList.remove('collapsed');
        console.log("📊 Sección de estadísticas expandida");
      } else {
        statsSection.classList.add('collapsed');
        console.log("📊 Sección de estadísticas colapsada");
      }
      
      this.updateStatsIcon(!isCollapsed);
    } else {
      console.warn("⚠️ No se encontró panel de estadísticas para toggle");
    }
  }

  updateStatsIcon(isCollapsed) {
    if (this.elements.statsToggle) {
      const icon = this.elements.statsToggle.querySelector('i');
      if (icon) {
        icon.className = isCollapsed ? 'fas fa-chart-bar' : 'fas fa-chart-line';
      }
      this.elements.statsToggle.title = isCollapsed ? 'Mostrar estadísticas' : 'Ocultar estadísticas';
    }
  }

  updateCDUList() {
    console.log("🔄 updateCDUList - Actualizando lista de CDUs");
    
    if (!this.bot || !this.elements.grid) {
      console.warn("⚠️ Bot o grid no disponible para actualizar CDUs");
      return;
    }

    const cdus = this.getCDUList();
    console.log("📋 CDUs obtenidos para mostrar:", cdus.length);
    
    const sortedCDUs = this.sortCDUs(cdus);
    console.log("🔀 CDUs después de ordenar:", sortedCDUs.length);
    
    // Actualizar contador
    this.updateCDUCounter(sortedCDUs.length);
    
    // Actualizar favoritos
    if (this.config.showFavoriteSection && this.statsManager) {
      this.updateFavoritesSection();
    }
    
    // Actualizar grid principal
    this.renderCDUGrid(sortedCDUs);
  }

  getCDUList() {
    console.log("🔍 getCDUList - Revisando disponibilidad de datos:");
    console.log("  - this.bot:", this.bot ? "✅" : "❌");
    console.log("  - this.bot.botFlows:", this.bot?.botFlows ? "✅" : "❌");
    
    if (!this.bot) {
      console.warn("⚠️ Bot instance no disponible");
      return [];
    }
    
    if (!this.bot.botFlows) {
      console.warn("⚠️ bot.botFlows no disponible");
      console.log("  - Propiedades disponibles en bot:", Object.keys(this.bot));
      return [];
    }

    // Lista de CDUs desarrollados y funcionales
    const developedCDUs = [
      // CDUs principales desarrollados
      'cdu_factura_esta_linea',
      'cdu_pedir_chip', 
      'cdu_cambio_sim',
      'cdu_beneficios',
      'cdu_celulares_chips',
      'cdu_contratar_servicios',
      'cdu_factura_botonera',
      'cdu_plan_botonera',
      
      // Flujos principales del sistema
      'welcome',
      'bienvenida',
      'facturas_pagos', 
      'plan_datos_roaming',
      'ayuda_tecnica',
      'contratar_servicios',
      'celulares_chips',
      'mas_opciones',
      'beneficios'
    ];

    const allFlows = Object.keys(this.bot.botFlows);
    console.log("  - Total flows encontrados:", allFlows.length);
    console.log("  - Flows disponibles:", allFlows.slice(0, 5), allFlows.length > 5 ? '...' : '');

    // Filtrar solo los CDUs desarrollados que existen en botFlows
    const availableCDUs = developedCDUs.filter(cduId => this.bot.botFlows[cduId]);
    console.log("  - CDUs desarrollados disponibles:", availableCDUs.length);
    console.log("  - CDUs encontrados:", availableCDUs);

    const mappedCDUs = availableCDUs.map(cduId => ({
      id: cduId,
      name: this.formatCDUName(cduId),
      flow: this.bot.botFlows[cduId]
    }));

    console.log("  - CDUs finales mapeados:", mappedCDUs.length);

    return mappedCDUs;
  }

  isValidCDU(cduId) {
    // Filtrar CDUs que no deben mostrarse en el selector
    const excludedPatterns = [
      'welcome',
      '_detalle',
      '_interno',
      'temp_',
      'debug_'
    ];

    return !excludedPatterns.some(pattern => cduId.includes(pattern));
  }

  formatCDUName(cduId) {
    // Nombres personalizados para CDUs desarrollados
    const customNames = {
      'cdu_factura_esta_linea': '📄 Factura de esta línea',
      'cdu_pedir_chip': '📱 Pedir un Chip',
      'cdu_cambio_sim': '🔄 Cambio de SIM/eSIM', 
      'cdu_beneficios': '🎁 Beneficios',
      'cdu_celulares_chips': '📱 Celulares y Chips',
      'cdu_contratar_servicios': '🛒 Contratar Servicios',
      'cdu_factura_botonera': '📄 Factura con Botonera',
      'cdu_plan_botonera': '📋 Plan con Botonera',
      'welcome': '👋 Bienvenida',
      'bienvenida': '👋 Flujo de Bienvenida',
      'facturas_pagos': '💳 Facturas y Pagos',
      'plan_datos_roaming': '🌍 Plan Datos y Roaming',
      'ayuda_tecnica': '🔧 Ayuda Técnica',
      'contratar_servicios': '🛒 Contratar Servicios',
      'celulares_chips': '📱 Celulares y Chips',
      'mas_opciones': '⚙️ Más Opciones',
      'beneficios': '🎁 Beneficios'
    };

    // Si hay un nombre personalizado, usarlo
    if (customNames[cduId]) {
      return customNames[cduId];
    }

    // Formateo genérico para otros casos
    return cduId
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  sortCDUs(cdus) {
    switch (this.currentSort) {
      case 'usage':
        return this.sortByUsage(cdus);
      case 'recent':
        return this.sortByRecent(cdus);
      default:
        return this.sortAlphabetically(cdus);
    }
  }

  sortAlphabetically(cdus) {
    return cdus.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByUsage(cdus) {
    if (!this.statsManager) return this.sortAlphabetically(cdus);
    
    const ranking = this.statsManager.getRanking();
    const usageMap = new Map(ranking.map(item => [item.id, item.count]));
    
    return cdus.sort((a, b) => {
      const usageA = usageMap.get(a.id) || 0;
      const usageB = usageMap.get(b.id) || 0;
      return usageB - usageA; // Mayor uso primero
    });
  }

  sortByRecent(cdus) {
    if (!this.statsManager) return this.sortAlphabetically(cdus);
    
    const ranking = this.statsManager.getRanking();
    const recentMap = new Map(ranking.map(item => [item.id, new Date(item.lastUsed || 0)]));
    
    return cdus.sort((a, b) => {
      const recentA = recentMap.get(a.id) || new Date(0);
      const recentB = recentMap.get(b.id) || new Date(0);
      return recentB - recentA; // Más reciente primero
    });
  }

  updateFavoritesSection() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const favoritesCount = document.getElementById('favoritesCount');
    
    if (!favoritesGrid || !this.statsManager) return;

    const favorites = this.statsManager.getFavorites();
    
    // Actualizar contador
    if (favoritesCount) {
      favoritesCount.textContent = favorites.length;
    }

    // Renderizar favoritos
    favoritesGrid.innerHTML = favorites.map(fav => `
      <button class="cdu-btn favorite compact" data-cdu="${fav.id}" title="${fav.name} (${fav.count} usos)">
        <div class="cdu-btn-content">
          <i class="fas fa-star cdu-favorite-icon"></i>
          <span class="cdu-btn-text">${fav.name}</span>
          <span class="cdu-usage-badge">${fav.count}</span>
        </div>
      </button>
    `).join('');
  }

  renderCDUGrid(cdus) {
    if (!this.elements.grid) return;

    this.elements.grid.innerHTML = cdus.map(cdu => {
      const usageCount = this.statsManager ? this.statsManager.getUsageCount(cdu.id) : 0;
      const isFavorite = this.statsManager ? this.statsManager.isFavorite(cdu.id) : false;
      
      return `
        <button class="cdu-btn ${isFavorite ? 'favorite' : ''}" 
                data-cdu="${cdu.id}" 
                title="${cdu.name}${usageCount > 0 ? ` (${usageCount} usos)` : ''}">
          <div class="cdu-btn-content">
            ${isFavorite ? '<i class="fas fa-star cdu-favorite-icon"></i>' : ''}
            <span class="cdu-btn-text">${cdu.name}</span>
            ${usageCount > 0 ? `<span class="cdu-usage-badge">${usageCount}</span>` : ''}
          </div>
          ${isFavorite ? '<div class="favorite-indicator"><i class="fas fa-star"></i><span class="usage-count">' + usageCount + '</span></div>' : ''}
        </button>
      `;
    }).join('');
  }

  handleCDUSelection(button) {
    console.log("🎯 handleCDUSelection ejecutado");
    
    const cduName = button.getAttribute('data-cdu');
    console.log("📝 CDU seleccionado:", cduName);
    
    if (!cduName) {
      console.error("❌ No se encontró data-cdu en el botón");
      return;
    }
    
    if (!this.bot) {
      console.error("❌ Bot no disponible");
      return;
    }

    // Verificar si el método executeFlow existe
    if (typeof this.bot.executeFlow !== 'function') {
      console.error("❌ bot.executeFlow no es una función");
      return;
    }

    console.log("🎯 Ejecutando CDU:", cduName);
    
    // Actualizar UI
    this.updateSelectedCDU(button);
    
    // Registro de estadísticas si está disponible
    if (this.statsManager) {
      this.statsManager.recordUsage(cduName, button.querySelector('span')?.textContent);
    }
    
    // Ejecutar CDU
    try {
      this.bot.executeFlow(cduName);
      console.log("✅ CDU ejecutado correctamente");
      
      // Auto-colapsar el selector después de la selección
      setTimeout(() => {
        this.basicToggle();
      }, 1000);
      
    } catch (error) {
      console.error("❌ Error ejecutando CDU:", error);
    }
  }

  updateSelectedCDU(button) {
    // Remover selección anterior
    document.querySelectorAll('.cdu-btn').forEach(btn => btn.classList.remove('active'));
    
    // Agregar selección actual
    button.classList.add('active');
    this.selectedCDU = button.getAttribute('data-cdu');
  }

  updateCDUCounter(count) {
    const counter = document.getElementById('cduCount');
    if (counter) {
      counter.textContent = `${count} CDU${count !== 1 ? 's' : ''}`;
    }
  }

  handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    const buttons = document.querySelectorAll('.cdu-btn');
    
    buttons.forEach(button => {
      const text = button.textContent.toLowerCase();
      const matches = text.includes(searchTerm);
      
      button.style.display = matches || !searchTerm ? 'block' : 'none';
    });
    
    // Mostrar/ocultar botón limpiar
    const clearBtn = document.getElementById('cduClearSearch');
    if (clearBtn) {
      clearBtn.style.display = searchTerm ? 'block' : 'none';
    }
  }

  clearSearch() {
    const searchInput = document.getElementById('cduSearchInput');
    if (searchInput) {
      searchInput.value = '';
      this.handleSearch('');
    }
  }

  clearChat() {
    if (this.bot && this.bot.chatMessages) {
      this.bot.chatMessages.innerHTML = '';
    }
  }

  resetBot() {
    this.clearChat();
    
    // Remover selecciones
    document.querySelectorAll('.cdu-btn').forEach(btn => btn.classList.remove('active'));
    this.selectedCDU = null;
    
    // Recargar CDUs
    if (this.bot && this.bot.loadCDUs) {
      this.bot.loadCDUs();
    }
    
    // Actualizar listas
    setTimeout(() => this.updateCDUList(), 500);
  }

  startAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    this.updateInterval = setInterval(() => {
      if (!this.isCollapsed && this.statsManager) {
        this.updateCDUList();
      }
    }, this.config.updateInterval);
  }

  // Métodos públicos para integración externa
  
  refreshStats() {
    if (this.statsManager && !this.isCollapsed) {
      this.updateCDUList();
    }
  }

  setStatsManager(statsManager) {
    this.statsManager = statsManager;
    if (this.isInitialized) {
      this.updateCDUList();
    }
  }

  getSortingMode() {
    return this.currentSort;
  }

  setSortingMode(mode) {
    if (['alphabetical', 'usage', 'recent'].includes(mode)) {
      this.currentSort = mode;
      this.updateCDUList();
      this.updateSortIcon();
    }
  }

  getSelectedCDU() {
    return this.selectedCDU;
  }

  // Cleanup
  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    
    this.isInitialized = false;
    console.log("🔄 CDUSelectorManager destruido");
  }
}

// Registro global
if (typeof window !== 'undefined') {
  window.CDUSelectorManager = CDUSelectorManager;
  console.log("✅ CDUSelectorManager disponible globalmente");
}

// Exportación para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CDUSelectorManager;
}
