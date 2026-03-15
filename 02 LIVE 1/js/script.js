console.log("Welcome mis DEVs");

// ARRAYS DE STRINGS
const nombresProyectos = ["Proyecto Web", "App de Tareas", "Portfolio Design", "E-commerce"];

console.log("Total de proyectos:", nombresProyectos.length);

// BUCLE FOR - Recorrer el array
for (let i = 0; i < nombresProyectos.length; i++) {
    console.log(`Proyecto ${i + 1}: ${nombresProyectos[i]}`);
}

// ARRAY DE NÚMEROS - Precios de los proyectos
const precios = [1500, 2000, 1200, 3000];

for (let i = 0; i < precios.length; i++) {
    console.log(`${nombresProyectos[i]}: €${precios[i]}`);
}

for (let i = 0; i < precios.length; i++) {
    if (precios[i] < 1500) {
        console.log(`${nombresProyectos[i]}: Precio BAJO (€${precios[i]})`);
    } else if (precios[i] >= 1500 && precios[i] < 2500) {
        console.log(`${nombresProyectos[i]}: Precio MEDIO (€${precios[i]})`);
    } else {
        console.log(`${nombresProyectos[i]}: Precio ALTO (€${precios[i]})`);
    }
}

// FUNCIONES CON STRINGS
function formatearTitulo(titulo) {
    const tituloMayusculas = titulo.toUpperCase();
    const tituloFormateado = "*** " + tituloMayusculas + " ***";
    return tituloFormateado;
}

for (let i = 0; i < nombresProyectos.length; i++) {
    console.log(formatearTitulo(nombresProyectos[i]));
}

// FUNCIONES CON NÚMEROS - Suma
function sumarPrecios(precio1, precio2) {
    const resultado = precio1 + precio2;
    return resultado;
}

// FUNCIONES CON NÚMEROS - Resta
function restarPrecios(precio1, precio2) {
    const resultado = precio1 - precio2;
    return resultado;
}

console.log("--- OPERACIONES CON PRECIOS ---");
console.log(`Precio proyecto 1: €${precios[0]}`);
console.log(`Precio proyecto 2: €${precios[1]}`);
console.log(`Suma de precios: €${sumarPrecios(precios[0], precios[1])}`);
console.log(`Diferencia de precios: €${restarPrecios(precios[1], precios[0])}`);
