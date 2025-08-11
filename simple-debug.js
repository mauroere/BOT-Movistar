console.log("🧪 Script de debug simple cargándose...");

document.addEventListener('DOMContentLoaded', function() {
    console.log("🧪 DOM loaded - ejecutando debug simple");
    
    // Buscar los elementos del selector
    const selector = document.getElementById('cduSelector');
    const toggleBtn = document.getElementById('cduToggleBtn');
    const content = document.getElementById('cduSelectorContent');
    
    console.log("🧪 Elementos encontrados:");
    console.log("  - selector:", selector ? "✅" : "❌");
    console.log("  - toggleBtn:", toggleBtn ? "✅" : "❌");
    console.log("  - content:", content ? "✅" : "❌");
    
    if (selector) {
        console.log("  - selector classes:", selector.className);
        console.log("  - selector innerHTML preview:", selector.innerHTML.substring(0, 100) + "...");
    }
    
    if (toggleBtn) {
        console.log("  - toggleBtn classes:", toggleBtn.className);
        console.log("  - toggleBtn innerHTML:", toggleBtn.innerHTML);
        
        // Agregar listener simple
        toggleBtn.addEventListener('click', function(e) {
            console.log("🖱️ CLICK SIMPLE DETECTADO!");
            e.preventDefault();
            
            if (content) {
                const isCollapsed = content.classList.contains('collapsed');
                console.log("  - Estado actual:", isCollapsed ? "colapsado" : "expandido");
                
                if (isCollapsed) {
                    content.classList.remove('collapsed');
                    console.log("  - ➡️ Expandiendo...");
                } else {
                    content.classList.add('collapsed');
                    console.log("  - ➡️ Colapsando...");
                }
                
                setTimeout(() => {
                    console.log("  - Estado después:", content.classList.contains('collapsed') ? "colapsado" : "expandido");
                    console.log("  - Max-height:", getComputedStyle(content).maxHeight);
                    console.log("  - Opacity:", getComputedStyle(content).opacity);
                }, 100);
            }
        });
        
        console.log("🧪 Listener simple agregado al toggle button");
    }
});

// Función para testing manual
window.simpleToggleTest = function() {
    const content = document.getElementById('cduSelectorContent');
    if (content) {
        const isCollapsed = content.classList.contains('collapsed');
        if (isCollapsed) {
            content.classList.remove('collapsed');
        } else {
            content.classList.add('collapsed');
        }
        console.log("🧪 Toggle manual ejecutado. Nuevo estado:", content.classList.contains('collapsed') ? "colapsado" : "expandido");
    }
};
