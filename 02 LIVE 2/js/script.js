console.log("=== EJERCICIOS DE JAVASCRIPT ===");
console.log("Abre la consola (F12) para ver los resultados");
console.log("");

// EJERCICIO 6: Recorrer Arrays con For

// Array de numeros
const numeros = [10, 25, 30, 45, 50, 65, 70, 85, 90, 100];

console.log("Array de numeros:", numeros);
console.log("Total de elementos:", numeros.length);

// Recorrer con for y mostrar cada numero
for (let i = 0; i < numeros.length; i++) {
    console.log(`Posicion ${i}: ${numeros[i]}`);
}

console.log("");

// EJERCICIO 7: Bucles con Condicionales

// Clasificar numeros en pares e impares
let pares = 0;
let impares = 0;

for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] % 2 === 0) {
        console.log(`${numeros[i]} es PAR`);
        pares++;
    } else {
        console.log(`${numeros[i]} es IMPAR`);
        impares++;
    }
}

console.log(`Total pares: ${pares}`);
console.log(`Total impares: ${impares}`);
console.log("");

// EJERCICIO 8: Operadores Matematicos

// Sumar todos los numeros del array
let suma = 0;

for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
}

console.log(`Suma total: ${suma}`);

// Calcular promedio
let promedio = suma / numeros.length;
console.log(`Promedio: ${promedio}`);

// Multiplicar los primeros 3 numeros
let multiplicacion = 1;

for (let i = 0; i < 3; i++) {
    multiplicacion *= numeros[i];
}

console.log(`Multiplicacion de los primeros 3 numeros: ${multiplicacion}`);

// Encontrar el numero mayor
let mayor = numeros[0];

for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }
}

console.log(`Numero mayor: ${mayor}`);

// Encontrar el numero menor
let menor = numeros[0];

for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}

console.log(`Numero menor: ${menor}`);

// EJERCICIO 9: Recorrer Strings

const palabra = "JavaScript";

console.log(`Palabra: ${palabra}`);
console.log(`Longitud: ${palabra.length}`);

// Recorrer cada caracter
console.log("Recorriendo caracteres:");
for (let i = 0; i < palabra.length; i++) {
    console.log(`Posicion ${i}: ${palabra[i]}`);
}

// Contar vocales
let vocales = 0;
const vocalesArray = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

for (let i = 0; i < palabra.length; i++) {
    let esVocal = false;
    
    for (let j = 0; j < vocalesArray.length; j++) {
        if (palabra[i] === vocalesArray[j]) {
            esVocal = true;
        }
    }
    
    if (esVocal) {
        console.log(`${palabra[i]} es vocal`);
        vocales++;
    }
}

console.log(`Total de vocales: ${vocales}`);

// Array de palabras
const palabras = ["HTML", "CSS", "JavaScript", "React", "Node"];

console.log("\nArray de palabras:", palabras);

// Mostrar longitud de cada palabra
for (let i = 0; i < palabras.length; i++) {
    console.log(`${palabras[i]} tiene ${palabras[i].length} letras`);
}

console.log("");

// EJERCICIO 10: Combinando Todo

// Array de calificaciones
const calificaciones = [85, 90, 78, 92, 88, 76, 95, 82, 89, 91];

console.log("Calificaciones:", calificaciones);

// 1. Calcular promedio
let sumaCalificaciones = 0;

for (let i = 0; i < calificaciones.length; i++) {
    sumaCalificaciones += calificaciones[i];
}

let promedioCalificaciones = sumaCalificaciones / calificaciones.length;
console.log(`Promedio de calificaciones: ${promedioCalificaciones.toFixed(2)}`);

// 2. Clasificar calificaciones
let aprobados = 0;
let sobresalientes = 0;
let suspensos = 0;

console.log("\nClasificacion:");
for (let i = 0; i < calificaciones.length; i++) {
    if (calificaciones[i] >= 90) {
        console.log(`Calificacion ${calificaciones[i]}: SOBRESALIENTE`);
        sobresalientes++;
        aprobados++;
    } else if (calificaciones[i] >= 70) {
        console.log(`Calificacion ${calificaciones[i]}: APROBADO`);
        aprobados++;
    } else {
        console.log(`Calificacion ${calificaciones[i]}: SUSPENSO`);
        suspensos++;
    }
}

console.log(`\nTotal sobresalientes: ${sobresalientes}`);
console.log(`Total aprobados: ${aprobados}`);
console.log(`Total suspensos: ${suspensos}`);

// 3. Encontrar mejor y peor calificacion
let mejorNota = calificaciones[0];
let peorNota = calificaciones[0];

for (let i = 1; i < calificaciones.length; i++) {
    if (calificaciones[i] > mejorNota) {
        mejorNota = calificaciones[i];
    }
    
    if (calificaciones[i] < peorNota) {
        peorNota = calificaciones[i];
    }
}

console.log(`\nMejor nota: ${mejorNota}`);
console.log(`Peor nota: ${peorNota}`);
console.log(`Diferencia: ${mejorNota - peorNota}`);

// 4. Contar cuantas notas estan por encima del promedio
let porEncimaPromedio = 0;

for (let i = 0; i < calificaciones.length; i++) {
    if (calificaciones[i] > promedioCalificaciones) {
        porEncimaPromedio++;
    }
}

console.log(`Notas por encima del promedio: ${porEncimaPromedio}`);
console.log(`Notas por debajo del promedio: ${calificaciones.length - porEncimaPromedio}`);