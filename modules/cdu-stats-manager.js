// Sistema de Estadísticas y Ranking de CDUs
// Gestiona el contador de uso y favoritos automáticos

class CDUStatsManager {
  constructor() {
    this.storageKey = 'cduUsageStats';
    this.favoriteThreshold = 5; // Número mínimo de usos para ser favorito
    this.maxFavorites = 6; // Máximo número de favoritos
    this.stats = this.loadStats();
  }

  // Cargar estadísticas desde localStorage
  loadStats() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error cargando estadísticas CDU:', error);
      return {};
    }
  }

  // Guardar estadísticas en localStorage
  saveStats() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
    } catch (error) {
      console.error('Error guardando estadísticas CDU:', error);
    }
  }

  // Registrar uso de un CDU
  recordUsage(cduName, cduDisplayName = null) {
    if (!cduName) return;

    if (!this.stats[cduName]) {
      this.stats[cduName] = {
        count: 0,
        displayName: cduDisplayName || this.formatDisplayName(cduName),
        firstUsed: new Date().toISOString(),
        lastUsed: null
      };
    }

    this.stats[cduName].count++;
    this.stats[cduName].lastUsed = new Date().toISOString();
    
    this.saveStats();
    this.updateFavoriteButtons();
    
    console.log(`📊 CDU "${cduName}" usado ${this.stats[cduName].count} veces`);
  }

  // Formatear nombre para mostrar
  formatDisplayName(cduName) {
    return cduName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  // Obtener ranking de CDUs más usados
  getRanking() {
    return Object.entries(this.stats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }

  // Obtener CDUs favoritos (más usados)
  getFavorites() {
    return this.getRanking()
      .filter(cdu => cdu.count >= this.favoriteThreshold)
      .slice(0, this.maxFavorites);
  }

  // Verificar si un CDU es favorito
  isFavorite(cduName) {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.name === cduName);
  }

  // Obtener cantidad de usos de un CDU específico
  getUsageCount(cduName) {
    return this.stats[cduName]?.count || 0;
  }

  // Obtener datos completos de un CDU
  getCDUStats(cduName) {
    return this.stats[cduName] || null;
  }

  // Actualizar botones con indicadores de favoritos
  updateFavoriteButtons() {
    const cduButtons = document.querySelectorAll('.cdu-btn[data-cdu]');
    const favorites = this.getFavorites().map(fav => fav.name);

    cduButtons.forEach(button => {
      const cduName = button.getAttribute('data-cdu');
      const isCurrentlyFavorite = button.classList.contains('favorite');
      const shouldBeFavorite = favorites.includes(cduName);

      if (shouldBeFavorite && !isCurrentlyFavorite) {
        button.classList.add('favorite');
        this.addFavoriteIndicator(button, cduName);
      } else if (!shouldBeFavorite && isCurrentlyFavorite) {
        button.classList.remove('favorite');
        this.removeFavoriteIndicator(button);
      }

      // Actualizar contador si existe
      this.updateUsageCounter(button, cduName);
    });

    // Reordenar botones por popularidad
    this.reorderButtonsByPopularity();
  }

  // Agregar indicador visual de favorito
  addFavoriteIndicator(button, cduName) {
    const existing = button.querySelector('.favorite-indicator');
    if (existing) return;

    const count = this.stats[cduName]?.count || 0;
    const indicator = document.createElement('div');
    indicator.className = 'favorite-indicator';
    indicator.innerHTML = `<i class="fas fa-star"></i><span class="usage-count">${count}</span>`;
    indicator.title = `CDU favorito - usado ${count} veces`;
    
    button.appendChild(indicator);
  }

  // Quitar indicador de favorito
  removeFavoriteIndicator(button) {
    const indicator = button.querySelector('.favorite-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // Actualizar contador de uso
  updateUsageCounter(button, cduName) {
    const count = this.stats[cduName]?.count || 0;
    const counter = button.querySelector('.usage-count');
    
    if (counter && count > 0) {
      counter.textContent = count;
      counter.parentElement.title = `CDU favorito - usado ${count} veces`;
    }
  }

  // Reordenar botones por popularidad
  reorderButtonsByPopularity() {
    const container = document.querySelector('.cdu-selector-content');
    if (!container) return;

    const buttons = Array.from(container.querySelectorAll('.cdu-btn[data-cdu]'));
    const favorites = this.getFavorites().map(fav => fav.name);

    // Separar favoritos y no favoritos
    const favoriteButtons = buttons.filter(btn => 
      favorites.includes(btn.getAttribute('data-cdu'))
    );
    const regularButtons = buttons.filter(btn => 
      !favorites.includes(btn.getAttribute('data-cdu'))
    );

    // Ordenar favoritos por uso
    favoriteButtons.sort((a, b) => {
      const countA = this.stats[a.getAttribute('data-cdu')]?.count || 0;
      const countB = this.stats[b.getAttribute('data-cdu')]?.count || 0;
      return countB - countA;
    });

    // Reordenar en el DOM
    [...favoriteButtons, ...regularButtons].forEach(button => {
      container.appendChild(button);
    });
  }

  // Obtener estadísticas totales
  getTotalStats() {
    const ranking = this.getRanking();
    const totalUsage = ranking.reduce((sum, cdu) => sum + cdu.count, 0);
    const favorites = this.getFavorites();

    return {
      totalCDUs: Object.keys(this.stats).length,
      totalUsage,
      favoritesCount: favorites.length,
      mostUsed: ranking[0] || null,
      ranking: ranking.slice(0, 10), // Top 10
      favorites
    };
  }

  // Resetear estadísticas (para testing)
  resetStats() {
    this.stats = {};
    this.saveStats();
    this.updateFavoriteButtons();
    console.log('📊 Estadísticas CDU reseteadas');
  }

  // Exportar estadísticas
  exportStats() {
    const stats = this.getTotalStats();
    const exportData = {
      generated: new Date().toISOString(),
      ...stats
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cdu-stats-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Obtener estadísticas generales
  getGeneralStats() {
    const allCDUs = Object.keys(this.stats);
    const totalUsage = Object.values(this.stats).reduce((sum, cdu) => sum + cdu.count, 0);
    const favorites = this.getFavorites();
    
    return {
      totalCDUs: allCDUs.length,
      totalUsage: totalUsage,
      favoritesCount: favorites.length,
      mostUsed: this.getRanking()[0] || null,
      sessionCount: this.getSessionUsage()
    };
  }

  // Obtener uso en la sesión actual (simplificado)
  getSessionUsage() {
    // Por simplicidad, retornamos el total de usos
    // En una implementación más compleja, se podría trackear por sesión
    return Object.values(this.stats).reduce((sum, cdu) => sum + cdu.count, 0);
  }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.CDUStatsManager = CDUStatsManager;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CDUStatsManager;
}
