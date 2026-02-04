// Capturar elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorOfertas = document.getElementById("contenedor-ofertas");
const contenedorVendidos = document.getElementById("contenedor-vendidos");
const resultadoBotones = document.getElementById("resultado-botones");

const btnModoOscuro = document.getElementById("btnModoOscuro");
const btnMostrarTodos = document.getElementById("btnMostrarTodos");
const btnMostrarOfertas = document.getElementById("btnMostrarOfertas");
const btnMostrarCaros = document.getElementById("btnMostrarCaros");
const btnLimpiar = document.getElementById("btnLimpiar");

// Función para crear el HTML de un producto
function crearHTMLProducto(producto) {
    return `
        <div class="producto-card">
            <h3>${producto.nombre}</h3>
            <span class="categoria">${producto.categoria}</span>
            ${
                producto.enOferta
                    ? `
                <div>
                    <span class="precio-original">${producto.precioOriginal}€</span>
                    <div class="precio">${producto.precio}€</div>
                    <span class="oferta">OFERTA</span>
                </div>
            `
                    : `<div class="precio">${producto.precio}€</div>`
            }
            <p class="stock">Stock: ${producto.stock} unidades</p>
        </div>
    `;
}

// Insertar todos los productos con innerHTML
const htmlProductos = productos.map(crearHTMLProducto).join("");
contenedorProductos.innerHTML = htmlProductos;

// Filtrar y mostrar solo ofertas
const productosEnOferta = productos.filter((producto) => producto.enOferta);
const htmlOfertas = productosEnOferta.map(crearHTMLProducto).join("");
contenedorOfertas.innerHTML = htmlOfertas;

// Función para crear elemento con createElement
function crearElementoProducto(producto) {
    const divCard = document.createElement("div");
    divCard.className = "producto-card";

    const h3 = document.createElement("h3");
    h3.textContent = producto.nombre;
    divCard.appendChild(h3);

    const spanCategoria = document.createElement("span");
    spanCategoria.className = "categoria";
    spanCategoria.textContent = producto.categoria;
    divCard.appendChild(spanCategoria);

    const divPrecio = document.createElement("div");
    divPrecio.className = "precio";
    divPrecio.textContent = producto.precio + "€";
    divCard.appendChild(divPrecio);

    if (producto.enOferta) {
        const spanOriginal = document.createElement("span");
        spanOriginal.className = "precio-original";
        spanOriginal.textContent = producto.precioOriginal + "€";
        divCard.insertBefore(spanOriginal, divPrecio);

        const spanOferta = document.createElement("span");
        spanOferta.className = "oferta";
        spanOferta.textContent = "OFERTA";
        divCard.appendChild(spanOferta);
    }

    const pStock = document.createElement("p");
    pStock.className = "stock";
    pStock.textContent = `Stock: ${producto.stock} unidades`;
    divCard.appendChild(pStock);

    return divCard;
}

// Insertar productos más vendidos con createElement
const masVendidos = productos.slice(0, 4);
masVendidos.forEach((producto) => {
    const elemento = crearElementoProducto(producto);
    contenedorVendidos.appendChild(elemento);
});

// Event listener para el botón de modo oscuro
btnModoOscuro.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    const modoOscuroActivo = document.body.classList.contains("modo-oscuro");
    
    if (modoOscuroActivo) {
        btnModoOscuro.textContent = "Modo Claro";
    } else {
        btnModoOscuro.textContent = "Modo Oscuro";
    }
});

// Botón: Mostrar todos los productos
btnMostrarTodos.addEventListener("click", () => {
    const html = productos.map(crearHTMLProducto).join("");
    resultadoBotones.innerHTML = `
        <h3>Todos los Productos (${productos.length})</h3>
        <div class="grid-productos">${html}</div>
    `;
});

// Botón: Mostrar solo ofertas
btnMostrarOfertas.addEventListener("click", () => {
    const ofertas = productos.filter((p) => p.enOferta);
    const html = ofertas.map(crearHTMLProducto).join("");

    resultadoBotones.innerHTML = `
        <h3>Productos en Oferta (${ofertas.length})</h3>
        <div class="grid-productos">${html}</div>
    `;
});

// Botón: Mostrar productos premium
btnMostrarCaros.addEventListener("click", () => {
    const premium = productos.filter((p) => p.precio > 500);
    const html = premium.map(crearHTMLProducto).join("");

    resultadoBotones.innerHTML = `
        <h3>Productos Premium (${premium.length})</h3>
        <div class="grid-productos">${html}</div>
    `;
});

// Botón: Limpiar resultados
btnLimpiar.addEventListener("click", () => {
    resultadoBotones.innerHTML = "";
});