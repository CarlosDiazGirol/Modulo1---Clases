// MENÚ HAMBURGUESA - Toggle
const btnHamburguesa = document.getElementById("btn-hamburguesa");
const menuNavegacion = document.getElementById("menu-navegacion");
const navLinks = document.querySelectorAll(".nav-link");

btnHamburguesa.addEventListener("click", (e) => {
    e.stopPropagation();
    menuNavegacion.classList.toggle("abierto");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuNavegacion.classList.remove("abierto");
    });
});

document.addEventListener("click", (e) => {
    if (!menuNavegacion.contains(e.target) && !btnHamburguesa.contains(e.target)) {
        menuNavegacion.classList.remove("abierto");
    }
});

// PASO 1: getElementById - Capturar y modificar elemento
const paso1Btn = document.getElementById("paso1-btn");
const paso1Resultado = document.getElementById("paso1-resultado");

paso1Btn.addEventListener("click", () => {
    paso1Resultado.textContent = "Texto modificado con getElementById";
    paso1Resultado.style.color = "#667eea";
    paso1Resultado.style.fontWeight = "bold";
});

// PASO 2: querySelector - Seleccionar por clase y modificar estilo
const paso2Btn = document.getElementById("paso2-btn");
const paso2Texto = document.querySelector(".paso2-texto");

paso2Btn.addEventListener("click", () => {
    paso2Texto.style.backgroundColor = "#667eea";
    paso2Texto.style.color = "white";
    paso2Texto.style.padding = "1.5rem";
});

// PASO 3: textContent vs innerHTML
const paso3Btn = document.getElementById("paso3-btn");
const paso3Text = document.getElementById("paso3-text");
const paso3Html = document.getElementById("paso3-html");

paso3Btn.addEventListener("click", () => {
    paso3Text.textContent = "Esto es textContent: <strong>no interpreta HTML</strong>";
    paso3Html.innerHTML = "Esto es innerHTML: <strong>sí interpreta HTML</strong>";
});

// PASO 4: createElement y appendChild
const paso4Btn = document.getElementById("paso4-btn");
const paso4Contenedor = document.getElementById("paso4-contenedor");

paso4Btn.addEventListener("click", () => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    
    const titulo = document.createElement("h3");
    titulo.textContent = "Nueva Tarjeta";
    
    const descripcion = document.createElement("p");
    descripcion.textContent = "Creada con createElement";
    
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(descripcion);
    paso4Contenedor.appendChild(tarjeta);
});

// PASO 5: Bucle for - Crear múltiples elementos
const paso5Btn = document.getElementById("paso5-btn");
const paso5Contenedor = document.getElementById("paso5-contenedor");

paso5Btn.addEventListener("click", () => {
    paso5Contenedor.innerHTML = "";
    
    for (let i = 1; i <= 5; i++) {
        const item = document.createElement("div");
        item.className = "item-lista";
        item.textContent = `Item número ${i}`;
        paso5Contenedor.appendChild(item);
    }
});

// PASO 6: innerHTML con map() - Array de objetos
const paso6Btn = document.getElementById("paso6-btn");
const paso6Contenedor = document.getElementById("paso6-contenedor");

paso6Btn.addEventListener("click", () => {
    const html = datosProductos.map(producto => `
        <div class="tarjeta">
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio}€</p>
        </div>
    `).join("");
    
    paso6Contenedor.innerHTML = html;
});

// PASO 9: classList - Manipular clases CSS
const paso9Caja = document.getElementById("paso9-caja");
const paso9Toggle = document.getElementById("paso9-toggle");
const paso9Add = document.getElementById("paso9-add");
const paso9Remove = document.getElementById("paso9-remove");

paso9Toggle.addEventListener("click", () => {
    paso9Caja.classList.toggle("activa");
});

paso9Add.addEventListener("click", () => {
    paso9Caja.classList.add("destacada");
});

paso9Remove.addEventListener("click", () => {
    paso9Caja.classList.remove("destacada");
});

// PASO 10: Proyecto Integrador
const paso10Input = document.getElementById("paso10-input");
const paso10Precio = document.getElementById("paso10-precio");
const paso10Agregar = document.getElementById("paso10-agregar");
const paso10Limpiar = document.getElementById("paso10-limpiar");
const paso10Contenedor = document.getElementById("paso10-contenedor");

let productosPersonalizados = [];

paso10Agregar.addEventListener("click", () => {
    const nombre = paso10Input.value.trim();
    const precio = paso10Precio.value;
    
    if (nombre === "" || precio === "") {
        alert("Por favor completa todos los campos");
        return;
    }
    
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: parseFloat(precio)
    };
    
    productosPersonalizados.push(nuevoProducto);
    renderizarProductos();
    
    paso10Input.value = "";
    paso10Precio.value = "";
});

paso10Limpiar.addEventListener("click", () => {
    productosPersonalizados = [];
    renderizarProductos();
});

function renderizarProductos() {
    paso10Contenedor.innerHTML = "";
    
    productosPersonalizados.forEach(producto => {
        const card = document.createElement("div");
        card.className = "producto-card";
        
        const titulo = document.createElement("h4");
        titulo.textContent = producto.nombre;
        
        const precio = document.createElement("div");
        precio.className = "precio-producto";
        precio.textContent = `${producto.precio}€`;
        
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-eliminar";
        btnEliminar.textContent = "Eliminar";
        
        btnEliminar.addEventListener("click", () => {
            productosPersonalizados = productosPersonalizados.filter(p => p.id !== producto.id);
            renderizarProductos();
        });
        
        card.appendChild(titulo);
        card.appendChild(precio);
        card.appendChild(btnEliminar);
        paso10Contenedor.appendChild(card);
    });
}
console.log(`Valor total del inventario: ${valorTotal}€`);


//EJERCICIO 3: forEach - Recorrer Arrays

const lenguajes = ["JavaScript", "Python", "Java", "TypeScript", "Go"];

console.log("Recorriendo con forEach:");
lenguajes.forEach((lenguaje, index) => {
    console.log(`${index + 1}. ${lenguaje}`);
});

// forEach con objetos
console.log("Productos con forEach:");
productos.forEach((producto) => {
    console.log(`${producto.nombre}: ${producto.precio}€`);
});


//EJERCICIO 4: map - Transformar Arrays

// Extraer solo nombres de productos
const nombresProductos = productos.map((producto) => producto.nombre);
console.log("Solo nombres:", nombresProductos);

// Extraer solo precios
const precios = productos.map((producto) => producto.precio);
console.log("Solo precios:", precios);

// Aplicar descuento del 10% a todos los productos
const productosConDescuento = productos.map((producto) => {
    return {
        nombre: producto.nombre,
        precioOriginal: producto.precio,
        precioConDescuento: producto.precio * 0.9,
        stock: producto.stock,
    };
});

console.log("Productos con descuento:");
productosConDescuento.forEach((p) => {
    console.log(
        `${p.nombre}: ${p.precioOriginal}€ → ${p.precioConDescuento.toFixed(2)}€`,
    );
});


//EJERCICIO 5: filter - Filtrar Arrays

// Filtrar productos con stock
const productosDisponibles = productos.filter((producto) => producto.stock > 0);
console.log("Productos disponibles:", productosDisponibles);

// Filtrar productos caros (> 100€)
const productosCaros = productos.filter((producto) => producto.precio > 100);
console.log("Productos caros (> 100€):", productosCaros);

// Filtrar números mayores a 15
const mayoresA15 = numeros.filter((numero) => numero > 15);
console.log("Números mayores a 15:", mayoresA15);

// Filtrar números pares
const numerosPares = numeros.filter((numero) => numero % 2 === 0);
console.log("Números pares:", numerosPares);

//EJERCICIO 6: Combinar filter + map

// Obtener nombres de productos disponibles
const nombresDisponibles = productos
    .filter((producto) => producto.stock > 0)
    .map((producto) => producto.nombre);

console.log("Nombres de productos disponibles:", nombresDisponibles);

// Obtener precios de productos baratos (< 100€)
const preciosBaratos = productos
    .filter((producto) => producto.precio < 100)
    .map((producto) => producto.precio);

console.log("Precios de productos baratos:", preciosBaratos);

// Aplicar 20% descuento solo a productos caros
const descuentoCaros = productos
    .filter((p) => p.precio > 100)
    .map((p) => {
        return {
            nombre: p.nombre,
            precioFinal: p.precio * 0.8,
        };
    });

console.log("Descuento 20% en productos caros:");
descuentoCaros.forEach((p) => console.log(`${p.nombre}: ${p.precioFinal}€`));

//EJERCICIO 7: Métodos de Array - find, some, every

const estudiantes = [
    { nombre: "Ana", edad: 22, nota: 8.5, aprobado: true },
    { nombre: "Carlos", edad: 24, nota: 6.5, aprobado: true },
    { nombre: "María", edad: 21, nota: 9.2, aprobado: true },
    { nombre: "Pedro", edad: 23, nota: 4.8, aprobado: false },
    { nombre: "Laura", edad: 22, nota: 7.5, aprobado: true },
];

// find - Encontrar el primer estudiante con nota > 9
const excelente = estudiantes.find((est) => est.nota > 9);
console.log("Primer estudiante con nota > 9:", excelente);

// some - ¿Hay algún estudiante suspenso?
const haySuspensos = estudiantes.some((est) => !est.aprobado);
console.log("¿Hay suspensos?", haySuspensos);

// every - ¿Todos son mayores de edad?
const todosMayores = estudiantes.every((est) => est.edad >= 18);
console.log("¿Todos mayores de 18?", todosMayores);

// every - ¿Todos aprobaron?
const todosAprobados = estudiantes.every((est) => est.aprobado);
console.log("¿Todos aprobaron?", todosAprobados);


//EJERCICIO 8: reduce - Acumular Valores

// Sumar todas las notas
const sumaNotas = estudiantes.reduce((acumulador, estudiante) => {
    return acumulador + estudiante.nota;
}, 0);

console.log("Suma de todas las notas:", sumaNotas.toFixed(2));
console.log("Promedio:", (sumaNotas / estudiantes.length).toFixed(2));

// Contar aprobados con reduce
const totalAprobados = estudiantes.reduce((contador, est) => {
    return est.aprobado ? contador + 1 : contador;
}, 0);

console.log("Total aprobados:", totalAprobados);

// Sumar precios de productos
const totalPrecios = productos.reduce((suma, producto) => {
    return suma + producto.precio;
}, 0);

console.log("Suma de precios:", totalPrecios);

//EJERCICIO 9: Arrow Functions en Diferentes Formas

// Arrow function simple
const saludar = (nombre) => `Hola, ${nombre}`;
console.log(saludar("Ana"));

// Arrow function con múltiples parámetros
const sumar = (a, b) => a + b;
console.log("5 + 3 =", sumar(5, 3));

// Arrow function con cuerpo
const calcularDescuento = (precio, descuento) => {
    const valorDescuento = precio * (descuento / 100);
    const precioFinal = precio - valorDescuento;
    return precioFinal;
};

console.log("Precio 100€ con 20% descuento:", calcularDescuento(100, 20));

// Array de funciones
const operaciones = [
    (a, b) => a + b,
    (a, b) => a - b,
    (a, b) => a * b,
    (a, b) => a / b,
];

console.log("Operaciones con 10 y 2:");
console.log("Suma:", operaciones[0](10, 2));
console.log("Resta:", operaciones[1](10, 2));
console.log("Multiplicación:", operaciones[2](10, 2));
console.log("División:", operaciones[3](10, 2));


//EJERCICIO 10: Ejercicio Completo Integrador

const empleados = [
    { nombre: "Juan", departamento: "IT", salario: 3500, antiguedad: 5 },
    { nombre: "María", departamento: "Ventas", salario: 2800, antiguedad: 3 },
    { nombre: "Pedro", departamento: "IT", salario: 4200, antiguedad: 7 },
    { nombre: "Ana", departamento: "RRHH", salario: 3200, antiguedad: 4 },
    { nombre: "Carlos", departamento: "Ventas", salario: 2500, antiguedad: 2 },
    { nombre: "Laura", departamento: "IT", salario: 3800, antiguedad: 6 },
];

// 1. Usar forEach para mostrar todos
empleados.forEach((emp, index) => {
    console.log(
        `${index + 1}. ${emp.nombre} - ${emp.departamento} - ${emp.salario}€`,
    );
});

// 2. filter - Empleados de IT
const empleadosIT = empleados.filter((emp) => emp.departamento === "IT");
console.log("2. Empleados de IT:", empleadosIT.length);
empleadosIT.forEach((emp) =>
    console.log(`   - ${emp.nombre}: ${emp.salario}€`),
);

// 3. map - Aumentar salario 10% a todos
const empleadosConAumento = empleados.map((emp) => {
    return {
        ...emp,
        salarioAnterior: emp.salario,
        salarioNuevo: emp.salario * 1.1,
    };
});

console.log("3. Salarios con aumento del 10%:");
empleadosConAumento.forEach((emp) => {
    console.log(
        `   ${emp.nombre}: ${emp.salarioAnterior}€ → ${emp.salarioNuevo.toFixed(2)}€`,
    );
});

// 4. filter + map - Nombres de empleados con alta antigüedad (> 4 años)
const nombresAntiguos = empleados
    .filter((emp) => emp.antiguedad > 4)
    .map((emp) => emp.nombre);

console.log("4. Empleados con > 4 años antigüedad:", nombresAntiguos);

// 5. reduce - Salario total por departamento
const salariosPorDepartamento = empleados.reduce((acum, emp) => {
    if (!acum[emp.departamento]) {
        acum[emp.departamento] = 0;
    }
    acum[emp.departamento] += emp.salario;
    return acum;
}, {});

console.log("5. Salarios totales por departamento:");
console.log(salariosPorDepartamento);

// 6. find - Empleado con mayor salario
const empleadoMejorPagado = empleados.reduce((max, emp) => {
    return emp.salario > max.salario ? emp : max;
});

console.log(
    "6. Empleado mejor pagado:",
    empleadoMejorPagado.nombre,
    "-",
    empleadoMejorPagado.salario + "€",
);

// 7. some - ¿Hay empleados que ganen más de 4000€?
const hayAltosSalarios = empleados.some((emp) => emp.salario > 4000);
console.log("7. ¿Hay empleados con salario > 4000€?", hayAltosSalarios);

// 8. every - ¿Todos ganan más de 2000€?
const todosGananMasDe2000 = empleados.every((emp) => emp.salario > 2000);
console.log("8. ¿Todos ganan más de 2000€?", todosGananMasDe2000);

// 9. Promedio de salarios
const promedioSalarios =
    empleados.reduce((suma, emp) => suma + emp.salario, 0) / empleados.length;
console.log("9. Salario promedio:", promedioSalarios.toFixed(2) + "€");

// 10. Comparación for vs métodos modernos

// Con for tradicional
let sumaFor = 0;
for (let i = 0; i < empleados.length; i++) {
    if (empleados[i].departamento === "IT") {
        sumaFor += empleados[i].salario;
    }
}
console.log("Suma salarios IT (for):", sumaFor);

// Con métodos modernos
const sumaMetodos = empleados
    .filter((emp) => emp.departamento === "IT")
    .reduce((suma, emp) => suma + emp.salario, 0);
console.log("Suma salarios IT (filter + reduce):", sumaMetodos);
