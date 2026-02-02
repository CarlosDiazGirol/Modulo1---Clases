//EJERCICIO 1: For + Condicionales con Arrays Simples

const numeros = [12, 5, 18, 7, 25, 9, 30, 15, 3, 22];

console.log("Array de números:", numeros);

// Contar pares e impares
let pares = 0;
let impares = 0;

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        pares++;
        console.log(`${numeros[i]} es PAR`);
    } else {
        impares++;
        console.log(`${numeros[i]} es IMPAR`);
    }
}

console.log(`Total pares: ${pares}`);
console.log(`Total impares: ${impares}`);


//EJERCICIO 2: For con Objetos

const productos = [
    { nombre: "Laptop", precio: 899, stock: 5 },
    { nombre: "Mouse", precio: 25, stock: 15 },
    { nombre: "Teclado", precio: 75, stock: 0 },
    { nombre: "Monitor", precio: 320, stock: 8 },
    { nombre: "Webcam", precio: 65, stock: 12 },
];

console.log("Productos en stock:");
for (let i = 0; i < productos.length; i++) {
    if (productos[i].stock > 0) {
        console.log(
            `${productos[i].nombre} - Precio: ${productos[i].precio}€ - Stock: ${productos[i].stock}`,
        );
    } else {
        console.log(`${productos[i].nombre} - SIN STOCK`);
    }
}

// Calcular valor total del inventario
let valorTotal = 0;
for (let i = 0; i < productos.length; i++) {
    valorTotal += productos[i].precio * productos[i].stock;
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
