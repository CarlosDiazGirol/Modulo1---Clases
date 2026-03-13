# Clase 02 - Fundamentos de Node.js y Módulos Nativos

## 🎯 Objetivos de Aprendizaje

Al finalizar esta clase, serás capaz de:
- Entender qué es Node.js y por qué es diferente al JavaScript del navegador.
- Ejecutar scripts de JavaScript desde la terminal usando `node`.
- Utilizar módulos nativos de Node.js (`os`, `fs`, `path`, `process`).
- Comprender cómo interactuar con el Sistema Operativo.
- Usar la IA para explicar y mejorar scripts de Node.

## ⏱️ Tiempo Estimado
- **Explicación + Live Coding:** 1h 30min
- **Dudas:** 30min

## 🚀 Configuración Inicial

### 1. Verificar Instalación
Asegúrate de tener Node.js instalado (versión 18 o superior):
```bash
node --version
```

### 2. Estructura del Ejercicio
```
07 LIVE 2/
├── index.js          # Archivo principal de la clase
├── data/             # Carpeta para pruebas de sistema de archivos
│   └── test.txt      # Archivo de ejemplo
├── README.md         # Esta guía
└── package.json      # Configuración del proyecto
```

## 📂 Módulos Nativos a Explorar

En Node.js, no tenemos `window` ni `document` (DOM), pero tenemos acceso al sistema a través de módulos:

| Módulo | Descripción | Uso Real |
|--------|-------------|----------|
| **`os`** | Sistema Operativo | Monitorización de servidores, RAM, CPUs. |
| **`fs`** | File System | Leer configs, guardar logs, subir imágenes. |
| **`path`** | Rutas | Construir rutas de archivos que funcionen en Windows y Mac. |
| **`process`** | Proceso | Leer variables de entorno (claves API), argumentos. |

## 💻 Ejercicio de Clase: "System Explorer"

Vamos a construir un script que analice nuestro ordenador y guarde un informe.

### Paso 1: Ejecutar el script
Para correr el código:
```bash
node index.js
```

Para modo desarrollo (auto-recarga):
```bash
node --watch index.js
```

## 🤖 Uso de IA para Aprender

Si no entiendes una parte del código, usa este prompt en ChatGPT o Gemini:

> "Te paso este script de Node.js que usa módulos nativos. Quiero que me expliques qué hace cada parte del código y si hay alguna forma de mejorarlo. No lo reescribas, solo explícamelo para que lo entienda mejor. [Pega tu código aquí]"

## ✅ Checklist de la Clase

- [ ] ¿Sé ejecutar un archivo `.js` con Node?
- [ ] ¿Entiendo por qué no puedo usar `alert()` en Node?
- [ ] ¿Sé cómo ver cuánta memoria RAM libre tiene mi PC con el módulo `os`?
- [ ] ¿He creado o leído un archivo usando `fs`?
- [ ] ¿Entiendo para qué sirven las variables de entorno (`process.env`)?

---
**Próxima Clase:** Introducción a Express y creación de nuestro primer servidor web.
