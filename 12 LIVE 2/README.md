# Sprint 12 · Live 2 — Swagger: Documentar la API

> **Objetivo de la Clase**
> Añadir documentación interactiva a la API con Swagger / OpenAPI. Los alumnos podrán ver y probar todos los endpoints desde el navegador sin necesidad de Postman.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: qué es Swagger, OpenAPI y por qué documentar la API | 10 min |
| 2 | Render: cómo funciona el deploy automático (demo) | 15 min |
| 3 | Instalar `swagger-ui-express` y crear `swagger.json` | 20 min |
| 4 | Documentar el endpoint `GET /api/cart` con seguridad JWT | 20 min |
| 5 | Documentar `POST /api/cart/items` y `POST /api/cart/checkout` | 20 min |
| 6 | Probar la API desde Swagger UI + IA | 5 min |

---

## 🎒 Antes de Empezar

- [ ] El ejercicio del Live 1 (carrito) está funcionando
- [ ] `npm install` ejecutado
- [ ] `.env` configurado con `DATABASE_URL` y `JWT_SECRET`

---

## 📂 Estructura del Proyecto

```
12-live-2/
├── swagger.json               ← OpenAPI spec (se construye en clase)
├── docs/
│   └── index.html             ← Swagger UI estático (visible en el proyecto)
├── .env.example
├── package.json
├── prisma/schema.prisma
└── src/
    ├── server.js              ← sirve docs/ y swagger.json con express.static
    ├── lib/prisma.js
    ├── middlewares/authMiddleware.js
    ├── routes/cart.routes.js
    ├── controllers/cart.controller.js
    └── services/cart.service.js
```

---

## Bloque 1 · Teoría: Swagger y OpenAPI (10 min)

### ¿Qué es Swagger?

Swagger es una herramienta que lee un archivo de especificación (`swagger.json` o `swagger.yaml`) y genera una **interfaz visual interactiva** para explorar y probar la API.

```
swagger.json  →  Swagger UI  →  navegador
```

### ¿Qué es OpenAPI?

OpenAPI es el estándar. Swagger es la herramienta visual que lo implementa. Se usan ambos términos indistintamente.

### ¿Por qué documentar la API?

- El frontend sabe exactamente qué endpoints existen y qué datos esperar
- Otros desarrolladores pueden usar la API sin leer el código
- Se pueden probar los endpoints directamente desde el navegador (sin Postman)
- Es una práctica estándar en proyectos profesionales

---

## Bloque 2 · Deploy en Render (15 min — demo)

> Esta parte es una demostración del profesor. No hay código que crear.

### Flujo de deploy automático

```
Cambio en el código
      ↓
git push → GitHub
      ↓
Render detecta el push
      ↓
Ejecuta: npm install + npm start
      ↓
API pública en https://mi-backend.onrender.com
```

### Pasos en Render

1. Ir a https://render.com → New Web Service
2. Conectar repositorio de GitHub
3. Configurar:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
4. Añadir variables de entorno en la sección *Environment*:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `MONGODB_URI` (si aplica)
5. Esperar el primer deploy

### Seguridad en producción

Swagger es muy útil en desarrollo, pero en producción puede exponer endpoints sensibles.

Opciones habituales en proyectos reales:

```js
// Solo mostrar Swagger en desarrollo
if (process.env.NODE_ENV !== 'production') {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
```

En este proyecto educativo lo dejamos siempre visible para poder probar la API fácilmente.

---

## Bloque 3 · Instalar Swagger (20 min)

```bash
npm install
```

No hay dependencias extra para Swagger — se usa directamente `express.static()` para servir la carpeta `docs/`. El HTML carga Swagger UI desde CDN.

Iniciar el servidor y abrir:
```
http://localhost:3000/api/docs
```

Swagger UI carga desde `docs/index.html` y lee la spec desde `/swagger.json`. Los paths estarán disponibles — los iremos completando en directo.

---

### Estructura del `swagger.json`

Explicar las tres secciones principales:

```json
{
  "openapi": "3.0.0",
  "info": { ... },          // Nombre y versión de la API
  "components": { ... },    // Esquemas reutilizables (ej: JWT)
  "paths": { ... }          // Los endpoints
}
```

---

## Bloque 4 · Documentar `GET /api/cart` (20 min)

Abrir `swagger.json` y construir el primer endpoint paso a paso.

### Añadir el security scheme (una sola vez)

```json
"components": {
  "securitySchemes": {
    "bearerAuth": {
      "type": "http",
      "scheme": "bearer",
      "bearerFormat": "JWT"
    }
  }
}
```

Esto define que la API usa JWT. Ahora cualquier endpoint puede referenciar `bearerAuth`.

---

### Documentar el endpoint

```json
"/api/cart": {
  "get": {
    "summary": "Obtener carrito activo",
    "description": "Devuelve el carrito activo del usuario. Si no existe, lo crea automáticamente.",
    "security": [{ "bearerAuth": [] }],
    "responses": {
      "200": { "description": "Carrito devuelto correctamente" },
      "401": { "description": "Token no proporcionado o inválido" }
    }
  }
}
```

Recargar Swagger UI → aparece el endpoint.

**Probarlo en directo:**
1. Hacer login con Postman → copiar token
2. En Swagger UI → botón `Authorize` → pegar token
3. Ejecutar `GET /api/cart`

---

## Bloque 5 · Documentar el Resto de Endpoints (20 min)

### `POST /api/cart/items`

Este endpoint necesita un `requestBody`. Mostrar cómo se define:

```json
"/api/cart/items": {
  "post": {
    "summary": "Añadir producto al carrito",
    "security": [{ "bearerAuth": [] }],
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "required": ["productId", "quantity"],
            "properties": {
              "productId": { "type": "string" },
              "quantity":  { "type": "integer", "minimum": 1 }
            }
          }
        }
      }
    },
    "responses": {
      "201": { "description": "Producto añadido" },
      "400": { "description": "Campos obligatorios ausentes" },
      "401": { "description": "No autenticado" }
    }
  }
}
```

---

### `POST /api/cart/checkout`

```json
"/api/cart/checkout": {
  "post": {
    "summary": "Realizar checkout",
    "description": "Crea un pedido y cierra el carrito. El total se calcula como 10€ por unidad.",
    "security": [{ "bearerAuth": [] }],
    "responses": {
      "200": { "description": "Pedido creado. Carrito pasa a CHECKED_OUT." },
      "400": { "description": "Carrito vacío o no encontrado" },
      "401": { "description": "No autenticado" }
    }
  }
}
```

---

## Bloque 6 · Probar en Swagger UI + IA (5 min)

### Flujo completo desde Swagger UI

1. `Authorize` → pegar token JWT
2. `POST /api/cart/items` → añadir producto
3. `GET /api/cart` → ver carrito con el item
4. `POST /api/cart/checkout` → checkout
5. `GET /api/cart` → carrito nuevo vacío

---

### Prompt de IA

```
Tengo un archivo swagger.json para documentar mi API de carrito.

Quiero que me digas:
- si la documentación está completa
- qué campos o respuestas faltan documentar
- cómo mejoraría la experiencia para un desarrollador frontend

No quiero que reescribas el archivo completo.
Solo explicación.
```

---

## ✅ Resumen Final

- [ ] Entiendo qué es Swagger y para qué sirve
- [ ] Sé instalar `swagger-ui-express` en Express
- [ ] Sé crear un archivo `swagger.json` con especificación OpenAPI 3.0
- [ ] Sé documentar endpoints con `security`, `requestBody` y `responses`
- [ ] Sé probar endpoints autenticados directamente desde Swagger UI
- [ ] Entiendo los riesgos de Swagger expuesto en producción

---

## 🔜 Próximas Semanas — Proyecto Final

El backend ya tiene:
- autenticación (bcrypt + JWT)
- productos
- reviews y wishlist (MongoDB)
- carrito y checkout (Prisma + Supabase)
- documentación (Swagger)

Lo que se añadirá:
1. Subida de imágenes con **Cloudinary**
2. Tests de endpoints con **Supertest**
3. Backend preparado para consumo desde **React**
