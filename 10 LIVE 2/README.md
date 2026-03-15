# Sprint 10 · Live 2 — Frontend + Seguridad de la API

> **Objetivo de la Clase**
> Conectar un frontend HTML/JS con el backend autenticado del Live 1 y proteger la API con middlewares de seguridad: CORS, Helmet y Rate Limit.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: CORS, Helmet, Rate Limit | 15 min |
| 2 | Añadir middlewares de seguridad al backend | 15 min |
| 3 | Crear el frontend (HTML + JS) | 25 min |
| 4 | Login desde el navegador y guardar token | 15 min |
| 5 | Acceder a rutas protegidas desde el frontend | 20 min |

---

## 🎒 Antes de Empezar

- [ ] El backend del Live 1 está funcionando (`npm run dev` en la carpeta `backend/`).
- [ ] Los usuarios de prueba siguen en Supabase.

---

## 📂 Estructura del Proyecto

```
10-live-2/
├── backend/                    # Backend del Live 1 + seguridad añadida
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js           # CORS, Helmet y Rate Limit añadidos aquí
│       ├── db/database.js
│       ├── routes/auth.routes.js
│       ├── controllers/auth.controller.js
│       ├── services/auth.service.js
│       └── middlewares/
│           ├── authMiddleware.js
│           └── requireRole.js
│
└── frontend/
    ├── index.html              # Formulario de login
    └── script.js              # Lógica de login y fetch con token
```

---

## Bloque 1 · Teoría: Seguridad en la API (15 min)

### ¿Qué es CORS?

CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad del **navegador** que bloquea peticiones entre dominios distintos.

```
Frontend → localhost:5500  (Live Server)
Backend  → localhost:3000  (Express)
```

Sin configurar CORS, el navegador bloquea la petición aunque en Postman funcione bien.

> **Punto clave:** Postman no aplica CORS porque no es un navegador. Si algo funciona en Postman pero no en el navegador, CORS es el culpable.

---

### ¿Qué hace Helmet?

Helmet añade automáticamente cabeceras HTTP de seguridad que protegen contra ataques comunes:

| Cabecera | Protege contra |
| :--- | :--- |
| `X-Frame-Options` | Clickjacking |
| `X-Content-Type-Options` | MIME sniffing |
| `Strict-Transport-Security` | Ataques de downgrade |

Una sola línea de código mejora la seguridad significativamente.

---

### ¿Qué hace Rate Limit?

Limita el número de peticiones que puede hacer un cliente en un período de tiempo. Protege contra:
- Ataques de fuerza bruta al endpoint `/login`.
- Abuso masivo de la API.

---

## Bloque 2 · Añadir Seguridad al Backend (15 min)

Instalar las dependencias:
```bash
cd backend
npm install cors helmet express-rate-limit
```

Los cambios se aplican en `src/server.js`. Abrir el archivo con los alumnos y añadir los tres middlewares. Ver el código por el orden correcto de registro.

---

## Bloque 3 · Crear el Frontend (25 min)

No se usa ningún framework. Solo HTML estático y JavaScript nativo con `fetch`.

### Abrir el frontend

Usar la extensión **Live Server** de VS Code para servirlo en `localhost:5500`:
1. Clic derecho sobre `frontend/index.html`.
2. `Open with Live Server`.

---

## Bloque 4 · Login desde el Navegador (15 min)

Orden para explicar `frontend/script.js`:

1. **`login()`** — hace `POST /login`, recibe el token y lo guarda en `localStorage`.
2. **`localStorage.setItem('token', data.token)`** — el token persiste aunque recargues la página.
3. Probar en la consola del navegador: `localStorage.getItem('token')`.

> **Pregunta para los alumnos:** *"¿Por qué usamos `localStorage` y no una variable de JavaScript?"*
> Respuesta: porque las variables se pierden al recargar la página.

---

## Bloque 5 · Acceder a Rutas Protegidas (20 min)

1. **`getProfile()`** — hace `GET /profile` enviando el token en el header `Authorization`.
2. **`getAdmin()`** — hace `GET /admin`. Si el usuario es `ana@example.com` (rol `user`), debe responder `403 Forbidden`.
3. Probar con el usuario `admin@example.com` para ver que funciona.
4. Probar cargando la página sin hacer login (token ausente) → debe mostrar error `401`.

---

## ✅ Resumen Final

- [ ] Entiendo qué es CORS y por qué los navegadores lo aplican.
- [ ] Sé añadir Helmet con una sola línea de código.
- [ ] Entiendo cómo Rate Limit protege el endpoint de login.
- [ ] Sé hacer `fetch` con `POST` y `JSON.stringify`.
- [ ] Sé guardar y recuperar el token JWT de `localStorage`.
- [ ] Sé enviar el token en el header `Authorization: Bearer TOKEN`.

---

## 🔜 Próxima Clase

La siguiente sesión se centrará en mejorar la arquitectura del backend añadiendo relaciones entre tablas, validaciones avanzadas y preparando la API para producción.
