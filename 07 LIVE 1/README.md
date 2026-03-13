# Clase 07 - Introducción a Express y Servidores Backend

## 🎯 Objetivos de Aprendizaje

Al finalizar esta clase, serás capaz de:
- Entender qué es Express y su rol en el desarrollo backend
- Comprender el rol de un backend en una aplicación
- Configurar un proyecto Node con `type: module`
- Crear un servidor básico con Express
- Crear y organizar rutas GET
- Entender cómo funcionan `req` y `res`
- Comprender la importancia de la ruta `/health`
- Entender cómo funcionan las APIs que devuelven JSON
- Usar IA como apoyo para revisar código

## ⏱️ Tiempo Estimado
- **Explicación + Live Coding:** 1h 30min
- **Dudas:** 30min

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener:
- ✅ Node.js 18+ instalado
- ✅ Una cuenta en GitHub
- ✅ Una cuenta en ChatGPT o Google Gemini
- ✅ Un editor de código (VS Code recomendado)

## 🚀 Configuración Inicial

### Paso 1: Clonar o Forkear el Repositorio
```bash
git clone <url-del-repositorio>
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Iniciar el Servidor
```bash
npm start
```

El servidor debería estar corriendo en: `http://localhost:3000`

## 📂 Estructura del Proyecto

```
07-APOYO/
├── server.js           # Punto de entrada - arranca el servidor
├── app.js              # Configuración de Express y rutas
├── routes/             # Definición de endpoints
│   ├── healthRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── package.json        # Dependencias y scripts
└── README.md          # Este archivo
```

## 🧩 Conceptos Clave

### ¿Qué es Express?
Express es un framework minimalista para Node.js que simplifica la creación de servidores y APIs.

**Analogía:**
- **Node.js** = motor del coche (entorno backend)
- **Express** = el coche completo (framework que facilita el desarrollo)

### Flujo de una Petición HTTP
```
Cliente (navegador/app) 
    ↓
Petición HTTP (GET /products)
    ↓
Servidor Express
    ↓
Ruta correspondiente (/products)
    ↓
Respuesta JSON
    ↓
Cliente recibe los datos
```

### ¿Qué es una Ruta?
Una ruta define qué ocurre cuando alguien accede a una URL específica.

**Ejemplos:**
- `GET /users` → obtener usuarios
- `GET /products` → obtener productos
- `POST /login` → iniciar sesión

### req y res
Dos objetos fundamentales en Express:

- **`req` (request):** contiene información de la petición del cliente
- **`res` (response):** permite enviar una respuesta al cliente

### APIs y JSON
Las APIs modernas devuelven datos en formato JSON:
```json
{
  "id": 1,
  "name": "Producto Ejemplo",
  "price": 29.99
}
```

### La Ruta /health
Esta ruta especial se usa para verificar que el servidor está funcionando.

**¿Por qué es importante?**
Herramientas como Docker, Kubernetes, AWS, Render y sistemas de monitorización hacen peticiones periódicas a `/health` para comprobar que el servidor sigue "vivo".

**Respuesta típica:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-13T10:30:00.000Z"
}
```

## 💻 Ejercicios Durante la Clase

### Ejercicio 1: Explorar el Servidor Básico
1. Abre `server.js` y examina cómo se arranca el servidor
2. Identifica dónde se define el puerto
3. Ejecuta `npm start` y accede a `http://localhost:3000`

### Ejercicio 2: Crear tu Primera Ruta
1. Abre `routes/productRoutes.js`
2. Crea una nueva ruta que devuelva un producto específico
3. Prueba la ruta en el navegador

### Ejercicio 3: Probar la Ruta /health
1. Accede a `http://localhost:3000/health`
2. Observa la respuesta JSON
3. Modifica el mensaje de respuesta

### Ejercicio 4: Crear una Nueva Ruta de Usuarios
1. Crea una ruta `GET /api/users` que devuelva una lista de usuarios
2. Los usuarios deben tener: id, name, email
3. Prueba tu ruta

## 🤖 Uso de IA para Revisar Código

Durante el desarrollo, puedes usar ChatGPT o Gemini como copiloto.

**Prompt de ejemplo:**
```
Te paso la estructura de mi proyecto Express.
Quiero que me digas si es lo suficientemente correcta o es un desastre.

Si no está bien quiero que me digas:
- qué errores tiene
- qué mejoraría
- por qué

Solo quiero explicación para entenderlo mejor, no que me lo resuelvas.

[Pegar aquí el contenido de server.js, app.js y routes]
```

## 🔍 Probando el Servidor

### Desde el Navegador
Simplemente accede a las URLs:
- `http://localhost:3000/health`
- `http://localhost:3000/api/products`
- `http://localhost:3000/api/users`

### Desde la Terminal (curl)
```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/products
```

## ✅ Checklist de la Clase

Al finalizar, deberías haber cubierto:
- [ ] ¿Qué es Express?
- [ ] Cómo funciona un servidor backend
- [ ] Qué son las rutas
- [ ] Qué es una API
- [ ] Para qué sirve /health
- [ ] Cómo organizar rutas en carpetas
- [ ] req y res
- [ ] Respuestas JSON

## 🔜 Próxima Clase

En la siguiente sesión aprenderemos:
- CRUD completo con Express
- Parámetros de ruta (`:id`)
- POST, PUT, DELETE
- Organización con controllers y services
- Mejores prácticas de arquitectura

## 📚 Recursos Adicionales

- [Documentación oficial de Express](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [REST API Best Practices](https://restfulapi.net/)

## 🐛 Problemas Comunes

### El servidor no arranca
- Verifica que el puerto 3000 no esté en uso
- Revisa que ejecutaste `npm install`
- Comprueba la versión de Node: `node --version`

### Error: Cannot use import statement
- Verifica que `package.json` tenga `"type": "module"`

### No veo cambios en el navegador
- Recarga la página con Ctrl+Shift+R (forzar recarga)
- Verifica que el servidor esté corriendo

---

**¡Buena suerte! 🚀**
