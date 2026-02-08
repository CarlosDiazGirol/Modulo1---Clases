// ============ CAPTURAR ELEMENTOS DEL DOM ============
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const btnCarrito = document.getElementById("btnCarrito");
const carritoDropdown = document.getElementById("carritoDropdown");
const btnCerrarCarrito = document.getElementById("btnCerrarCarrito");

// ============ ESTADO DE LA APLICACIÓN ============
let carrito = [];

// ============ FUNCIONES DE LOCALSTORAGE ============

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        // SPREAD: Copiar el carrito guardado
        carrito = [...JSON.parse(carritoGuardado)];
    }
}

// ============ FUNCIONES DEL CARRITO ============

function agregarAlCarrito(producto) {
    // DESTRUCTURING: Extraer propiedades del producto
    const { id, nombre, precio } = producto;
    
    // Buscar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        // SPREAD: Actualizar cantidad creando nuevo objeto
        carrito = carrito.map(item => 
            item.id === id 
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        );
    } else {
        // SPREAD: Agregar nuevo producto al carrito
        const nuevoItem = { id, nombre, precio, cantidad: 1 };
        carrito = [...carrito, nuevoItem];
    }
    
    guardarCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(idProducto) {
    // SPREAD con filter: Crear nuevo array sin el producto
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    renderizarCarrito();
}

function actualizarCantidad(idProducto, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(idProducto);
        return;
    }
    
    // SPREAD: Actualizar cantidad
    carrito = carrito.map(item =>
        item.id === idProducto
            ? { ...item, cantidad: nuevaCantidad }
            : item
    );
    
    guardarCarrito();
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito');
    renderizarCarrito();
}

// ============ FUNCIONES DE RENDERIZADO ============

function renderizarProductos() {
    contenedorProductos.innerHTML = productosIniciales.map(producto => {
        // DESTRUCTURING en map
        const { id, nombre, precio, stock } = producto;
        
        return `
            <div class="producto-card">
                <h3>${nombre}</h3>
                <div class="producto-info">
                    <span class="precio">${precio.toFixed(2)}€</span>
                    <span class="stock">Stock: ${stock}</span>
                </div>
                <button class="btn-agregar" data-id="${id}">
                    Agregar al carrito
                </button>
            </div>
        `;
    }).join('');
}

function renderizarCarrito() {
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="carrito-vacio">
                <p>Tu carrito está vacío</p>
            </div>
        `;
        contadorCarrito.textContent = '0';
        totalCarrito.textContent = '0.00€';
        return;
    }
    
    // DESTRUCTURING + REDUCE: Calcular total
    const total = carrito.reduce((suma, { precio, cantidad }) => 
        suma + (precio * cantidad), 0
    );
    
    contenedorCarrito.innerHTML = carrito.map(item => {
        // DESTRUCTURING del item
        const { id, nombre, precio, cantidad } = item;
        const subtotal = precio * cantidad;
        
        return `
            <div class="carrito-item">
                <div class="item-info">
                    <h4>${nombre}</h4>
                    <p class="item-precio">${precio.toFixed(2)}€</p>
                </div>
                <div class="item-cantidad">
                    <button class="btn-cant btn-decrementar" data-id="${id}">-</button>
                    <span>${cantidad}</span>
                    <button class="btn-cant btn-incrementar" data-id="${id}">+</button>
                </div>
                <div class="item-subtotal">
                    ${subtotal.toFixed(2)}€
                </div>
                <button class="btn-eliminar" data-id="${id}">×</button>
            </div>
        `;
    }).join('');
    
    // Actualizar contador y total
    const totalItems = carrito.reduce((sum, { cantidad }) => sum + cantidad, 0);
    contadorCarrito.textContent = totalItems;
    totalCarrito.textContent = total.toFixed(2) + '€';
}

// ============ EVENT LISTENERS ============

// Event delegation para agregar productos al carrito
contenedorProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const id = parseInt(e.target.dataset.id);
        const producto = productosIniciales.find(p => p.id === id);
        if (producto) {
            agregarAlCarrito(producto);
        }
    }
});

// Event delegation para botones del carrito
contenedorCarrito.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    
    if (e.target.classList.contains('btn-eliminar')) {
        eliminarDelCarrito(id);
    } else if (e.target.classList.contains('btn-decrementar')) {
        const producto = carrito.find(item => item.id === id);
        if (producto) {
            actualizarCantidad(id, producto.cantidad - 1);
        }
    } else if (e.target.classList.contains('btn-incrementar')) {
        const producto = carrito.find(item => item.id === id);
        if (producto) {
            actualizarCantidad(id, producto.cantidad + 1);
        }
    }
});

btnVaciarCarrito.addEventListener('click', () => {
    if (carrito.length > 0) {
        if (confirm('¿Estás seguro de vaciar el carrito?')) {
            vaciarCarrito();
        }
    }
});

// Toggle dropdown del carrito
btnCarrito.addEventListener('click', (e) => {
    e.stopPropagation();
    carritoDropdown.classList.toggle('active');
});

// Cerrar carrito con botón X
btnCerrarCarrito.addEventListener('click', () => {
    carritoDropdown.classList.remove('active');
});

// Evitar que clicks dentro del carrito lo cierren
carritoDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Cerrar dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    carritoDropdown.classList.remove('active');
});

// ============ INICIALIZACIÓN ============

function init() {
    cargarCarrito();
    renderizarProductos();
    renderizarCarrito();
}

// Iniciar aplicación
init();
