/**
 * CLASE 02 - NODE.JS Y MÓDULOS NATIVOS
 * El objetivo es crear un "Analizador de Sistema" simple.
 */

// 1. IMPORTACIÓN DE MÓDULOS NATIVOS
// En Node 18+ usamos 'node:' antes del nombre del módulo por seguridad y claridad
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

console.log("--- 🕵️ ANALIZADOR DE SISTEMA INICIADO ---");

// --- MÓDULO PROCESS ---
// Información sobre el proceso actual y argumentos
console.log("\n🚀 Información del Proceso:");
console.log("- Directorio actual:", process.cwd());
console.log("- Versión de Node:", process.version);
console.log("- ID del Proceso (PID):", process.pid);

// --- MÓDULO OS ---
// Información del Hardware y Sistema Operativo
console.log("\n💻 Información del Sistema:");
console.log("- Sistema Operativo:", os.type(), os.release());
console.log("- Arquitectura:", os.arch());
console.log("- CPUs:", os.cpus().length);
console.log("- Memoria RAM Total:", (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("- Memoria RAM Libre:", (os.freemem() / 1024 / 1024 / 1024).toFixed(2), "GB");

// --- MÓDULO PATH ---
// Gestionar rutas de forma segura entre Windows (\\) y Linux/Mac (/)
const reportFolder = path.join(process.cwd(), 'reports');
const reportFile = path.join(reportFolder, 'system_info.txt');

console.log("\n📂 Gestión de Rutas:");
console.log("- Carpeta de informes:", reportFolder);
console.log("- Archivo de destino:", reportFile);

// --- MÓDULO FS (File System) ---
// Operaciones con archivos
console.log("\n📝 Generando informe...");

try {
    // 1. Verificar si la carpeta existe, si no, crearla
    if (!fs.existsSync(reportFolder)) {
        fs.mkdirSync(reportFolder);
        console.log("✅ Carpeta 'reports' creada.");
    }

    // 2. Preparar el contenido del informe
    const content = `INFORME DE SISTEMA
Generado el: ${new Date().toLocaleString()}
-------------------
Usuario: ${os.userInfo().username}
Host: ${os.hostname()}
Plataforma: ${os.platform()}
Memoria Libre: ${os.freemem()} bytes
`;

    // 3. Escribir el archivo
    fs.writeFileSync(reportFile, content, 'utf-8');
    console.log("✅ Informe guardado con éxito en:", reportFile);

    // 4. Leer el archivo para confirmar
    const data = fs.readFileSync(reportFile, 'utf-8');
    console.log("\n📄 Contenido del informe guardado:\n");
    console.log(data);

} catch (error) {
    console.error("❌ Hubo un error procesando archivos:", error.message);
}

console.log("\n--- ✅ TAREA FINALIZADA ---");
