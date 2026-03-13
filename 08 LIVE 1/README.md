# Clase 08 - Arquitectura de Backend: Routes, Controllers y Services (GET)

## 🎯 Objetivos de Aprendizaje
Al finalizar esta clase, serás capaz de:
- Organizar un proyecto backend usando la arquitectura **Routes → Controllers → Services**.
- Comprender la separación de responsabilidades en una API.
- Crear datos simulados (**Mock DB**) para pruebas.
- Implementar los primeros endpoints **GET** del CRUD.
- Entender el flujo completo de una petición HTTP en un servidor profesional.

## ⏱️ Tiempo Estimado
- **Explicación + Live Coding:** 1h 30min
- **Dudas:** 30min

## 📂 Estructura del Proyecto
Construiremos la siguiente estructura:
```
src/
├── db/
│   └── movies.js           # Base de datos simulada (Array)
├── services/
│   └── movies.service.js   # Lógica de negocio y acceso a datos
├── controllers/
│   └── movies.controller.js# Manejo de req y res
├── routes/
│   └── movies.routes.js     # Definición de URLs y métodos
├── app.js                  # Configuración de Express
└── server.js               # Arranque del servidor
```

## 🏗️ La Arquitectura en Capas

| Capa | Responsabilidad | Análogo en un Restaurante |
| :--- | :--- | :--- |
| **Routes** | Define las URLs y qué controller las atiende. | El Hostess que te lleva a la mesa. |
| **Controllers**| Recibe la petición, pide datos y da la respuesta. | El Camarero que toma nota y sirve. |
| **Services** | Contiene la lógica (filtrar, buscar, calcular). | El Cocinero que prepara el plato. |
| **Data (DB)** | Almacena la información. | La Despensa/Nevera. |

## 🚀 Guía de Pasos

### 1. Inicialización
```bash
npm init -y
npm install express
```
*(No olvides añadir `"type": "module"` en tu `package.json`)*

### 2. Endpoints a implementar (Hoy)
- `GET /movies` -> Lista todas las películas.
- `GET /movies/:id` -> Obtiene una película por su ID único.

## 🤖 Uso de IA para Arquitectura
Puedes pedirle a la IA que revise tu estructura con este prompt:
> "Te paso la estructura de mi backend en Node.js con Express. Quiero que me digas si la separación entre routes, controllers y services es correcta. ¿Qué errores tiene y qué mejoraría? [Pega tu código]"

---
**Siguiente Paso:** En el Live 2 completaremos el CRUD con POST, PUT y DELETE.
