/* ========================================
   EJERCICIO: Sticky Header & Modo Oscuro
   LocalStorage + Position Sticky
   ======================================== */

// ============ MODO OSCURO CON LOCALSTORAGE ============

const btnModoOscuro = document.getElementById('btnModoOscuro');
const body = document.body;

// Función para aplicar modo oscuro
function aplicarModoOscuro(activar) {
    if (activar) {
        body.classList.add('modo-oscuro');
        localStorage.setItem('modoOscuro', 'true');
    } else {
        body.classList.remove('modo-oscuro');
        localStorage.setItem('modoOscuro', 'false');
    }
}

// Cargar preferencia de modo oscuro al iniciar
function cargarPreferenciaModo() {
    const modoGuardado = localStorage.getItem('modoOscuro');
    
    // Si hay una preferencia guardada, aplicarla
    if (modoGuardado === 'true') {
        aplicarModoOscuro(true);
    }
}

// Toggle modo oscuro al hacer click
btnModoOscuro.addEventListener('click', () => {
    const esModoOscuro = body.classList.contains('modo-oscuro');
    aplicarModoOscuro(!esModoOscuro);
});

// ============ RENDERIZAR PRODUCTOS POR CATEGORÍA ============

if (typeof productos !== 'undefined') {
    function renderizarProductosPorCategoria() {
        // Agrupar productos por categoría
        const categorias = {
            'Portátiles': 'portatiles-container',
            'Accesorios': 'accesorios-container',
            'Monitores': 'monitores-container',
            'Audio': 'audio-container',
            'Almacenamiento': 'almacenamiento-container',
            'Tablets': 'tablets-container'
        };

        // Renderizar productos en cada contenedor
        Object.keys(categorias).forEach(categoria => {
            const container = document.getElementById(categorias[categoria]);
            if (!container) return;

            const productosCategoria = productos.filter(p => p.categoria === categoria);
            
            if (productosCategoria.length === 0) {
                container.innerHTML = '<p class="mensaje-vacio">No hay productos en esta categoría</p>';
                return;
            }

            container.innerHTML = productosCategoria.map(producto => {
                // DESTRUCTURING: Extraer propiedades del producto
                const { nombre, precio, descripcion, stock } = producto;
                
                return `
                    <div class="producto-card">
                        <h4>${nombre}</h4>
                        <p class="producto-descripcion">${descripcion}</p>
                        <div class="producto-footer">
                            <span class="producto-precio">${precio.toFixed(2)}€</span>
                            <span class="producto-stock">Stock: ${stock}</span>
                        </div>
                    </div>
                `;
            }).join('');
        });
    }
    
    renderizarProductosPorCategoria();
}

// ============ STICKY SUBMENU - Efecto visual al hacer scroll ============

const submenu = document.querySelector('.submenu-sticky');

if (submenu) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Añadir sombra cuando se hace scroll
        if (currentScroll > 100) {
            submenu.classList.add('scrolled');
        } else {
            submenu.classList.remove('scrolled');
        }
    });

    // Smooth scroll para las anclas
    const anclas = submenu.querySelectorAll('a[href^="#"]');
    anclas.forEach(ancla => {
        ancla.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = ancla.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 150; // Espacio para header + submenu
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============ INICIALIZACIÓN ============

// Cargar modo oscuro al cargar la página
cargarPreferenciaModo();

console.log('%c🎨 Ejercicio Sticky & Modo Oscuro cargado', 'color: #1a1a1a; font-size: 14px; font-weight: bold;');
console.log('✓ Position: sticky en header');
console.log('✓ Modo oscuro persistente con localStorage');
console.log('✓ Navegación entre páginas manteniendo preferencias');
