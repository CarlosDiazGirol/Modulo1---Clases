
// EJERCICIO 1: Function vs Arrow Function

// Función tradicional
function saludarTradicional(nombre) {
    return "Hola, " + nombre + "!";
}

// Arrow function
const saludarArrow = (nombre) => {
    return "Hola, " + nombre + "!";
};

// Arrow function simplificada (sin llaves, return implícito)
const saludarSimple = nombre => "Hola, " + nombre + "!";

console.log("Función tradicional:", saludarTradicional("Ana"));
console.log("Arrow function:", saludarArrow("Carlos"));
console.log("Arrow simplificada:", saludarSimple("María"));

// Más ejemplos de arrow functions
const sumar = (a, b) => a + b;
const multiplicar = (a, b) => a * b;
const cuadrado = numero => numero * numero;

console.log("Suma 5 + 3:", sumar(5, 3));
console.log("Multiplicar 4 * 6:", multiplicar(4, 6));
console.log("Cuadrado de 7:", cuadrado(7));

/* EJERCICIO 2: Crear y Usar Objetos */

// Crear un objeto persona
const persona1 = {
    nombre: "Laura",
    edad: 28,
    ciudad: "Madrid",
    profesion: "Desarrolladora"
};

console.log("Persona completa:", persona1);
console.log("Nombre:", persona1.nombre);
console.log("Edad:", persona1.edad);
console.log("Ciudad:", persona1.ciudad);

// Crear más objetos
const persona2 = {
    nombre: "David",
    edad: 32,
    ciudad: "Barcelona",
    profesion: "Diseñador"
};

const persona3 = {
    nombre: "Sara",
    edad: 25,
    ciudad: "Valencia",
    profesion: "Product Manager"
};

console.log("Persona 2:", persona2.nombre, "-", persona2.profesion);
console.log("Persona 3:", persona3.nombre, "-", persona3.profesion);


/* EJERCICIO 3: Arrays de Objetos */

// Array de estudiantes
const estudiantes = [
    {
        nombre: "Pedro",
        edad: 22,
        curso: "Full Stack",
        nota: 8.5
    },
    {
        nombre: "Marta",
        edad: 24,
        curso: "Full Stack",
        nota: 9.2
    },
    {
        nombre: "Jorge",
        edad: 23,
        curso: "Full Stack",
        nota: 7.8
    },
    {
        nombre: "Elena",
        edad: 21,
        curso: "Full Stack",
        nota: 9.5
    }
];

console.log("Array de estudiantes:", estudiantes);
console.log("Total de estudiantes:", estudiantes.length);

// EJERCICIO 4: Recorrer Arrays de Objetos con For
// Aprovechamos para hablar de literal string. Otra manera de concatenar

// Recorrer con for tradicional
console.log("Recorriendo estudiantes:");
for (let i = 0; i < estudiantes.length; i++) {
    console.log(`${estudiantes[i].nombre} - Nota: ${estudiantes[i].nota}`);
}

// Calcular promedio de notas con for
let sumaNotas = 0;
for (let i = 0; i < estudiantes.length; i++) {
    sumaNotas += estudiantes[i].nota;
}
const promedio = sumaNotas / estudiantes.length;
console.log(`Promedio de notas: ${promedio.toFixed(2)}`);

// EJERCICIO 5: Usar MAP para Transformar

// Map devuelve un NUEVO array transformado
const nombresEstudiantes = estudiantes.map(estudiante => estudiante.nombre);
console.log("Solo nombres (con map):", nombresEstudiantes);

// Obtener solo las notas
const notasEstudiantes = estudiantes.map(estudiante => estudiante.nota);
console.log("Solo notas:", notasEstudiantes);

// Crear mensajes personalizados
const mensajes = estudiantes.map(estudiante => {
    return `${estudiante.nombre} tiene ${estudiante.edad} años`;
});

// Aprovechamos para sacarlos por consola con forEach para explicarlo.
mensajes.forEach(mensaje => console.log(mensaje));

// EJERCICIO 6: Usar FILTER para Filtrar

// Filter devuelve un NUEVO array con elementos que cumplen la condición
const notables = estudiantes.filter(estudiante => estudiante.nota >= 9);
console.log("Estudiantes con nota >= 9:", notables);

// Filtrar por edad
const mayoresDe22 = estudiantes.filter(estudiante => estudiante.edad > 22);
console.log("Estudiantes mayores de 22 años:", mayoresDe22);

// Filtrar y mapear juntos
const nombresMayoresDe22 = estudiantes
    .filter(estudiante => estudiante.edad > 22)
    .map(estudiante => estudiante.nombre);
console.log("Nombres de mayores de 22:", nombresMayoresDe22);

// DOM - Mostrar Productos con innerHTML y Map

// Array de productos
const productos = [
    {
        id: 1,
        nombre: "Laptop HP",
        precio: 899,
        categoria: "Electrónica",
        stock: 15
    },
    {
        id: 2,
        nombre: "Mouse Logitech",
        precio: 25,
        categoria: "Accesorios",
        stock: 50
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        precio: 120,
        categoria: "Accesorios",
        stock: 30
    },
    {
        id: 4,
        nombre: "Monitor Samsung 27\"",
        precio: 320,
        categoria: "Electrónica",
        stock: 8
    },
    {
        id: 5,
        nombre: "Webcam HD",
        precio: 65,
        categoria: "Accesorios",
        stock: 22
    }
];

console.log("Productos disponibles:", productos);

// Obtener el elemento del DOM
const contenedorProductos = document.getElementById("productos");

// Usar map para crear HTML de cada producto
const htmlProductos = productos.map(producto => {
    return `
        <div class="producto-card">
            <h3>${producto.nombre}</h3>
            <p class="categoria">${producto.categoria}</p>
            <p class="precio">${producto.precio}€</p>
            <p class="stock">Stock: ${producto.stock} unidades</p>
        </div>
    `;
});

// Convertir array a string y añadir al DOM para quitar las ","
contenedorProductos.innerHTML = htmlProductos.join("");