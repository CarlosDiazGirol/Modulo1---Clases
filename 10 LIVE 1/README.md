# Sprint 10 · Live 1 — Autenticación con bcrypt y JWT

> **Objetivo de la Clase**
> Implementar un sistema de autenticación en Express usando `bcrypt` para proteger contraseñas, `JWT` para gestionar sesiones y middlewares para proteger rutas según el rol del usuario.
> Los usuarios están almacenados en la tabla `users` de Supabase creada en el Sprint 9.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: autenticación, bcrypt, JWT, roles | 20 min |
| 2 | Preparar entorno y base de datos | 10 min |
| 3 | Conexión a Supabase (`pg`) | 10 min |
| 4 | Service y Controller de login | 20 min |
| 5 | Middlewares: `authMiddleware` y `requireRole` | 15 min |
| 6 | Probar todo con Postman | 15 min |

---

## 🎒 Antes de Empezar

- [ ] Tabla `users` creada en Supabase (Sprint 9 Live 1).
- [ ] Ejecutar el script de seed para insertar usuarios de prueba (ver abajo).
- [ ] Postman instalado y abierto.

---

## 📂 Estructura del Proyecto

```
10-live-1/
├── .env               # Credenciales (NO subir a GitHub)
├── .env.example       # Plantilla de variables
├── .gitignore
├── package.json
├── scripts/
│   └── seed.js        # Script para insertar usuarios de prueba en Supabase
└── src/
    ├── server.js
    ├── db/
    │   └── database.js          # Conexión a PostgreSQL con pg
    ├── routes/
    │   └── auth.routes.js
    ├── controllers/
    │   └── auth.controller.js
    ├── services/
    │   └── auth.service.js
    └── middlewares/
        ├── authMiddleware.js    # Verifica el token JWT
        └── requireRole.js      # Controla acceso por rol
```

---

## Bloque 1 · Teoría (20 min)

### 1.1 ¿Qué es la Autenticación?

La autenticación permite que un servidor identifique **quién** es el usuario que hace una petición.

**Flujo básico:**
```
Usuario envía email + contraseña
        ↓
Servidor verifica los datos
        ↓
Servidor genera un TOKEN
        ↓
Cliente guarda el token y lo envía en cada petición
```

---

### 1.2 ¿Por qué no guardar contraseñas en texto plano?

```js
// ❌ NUNCA hacer esto
{ email: "ana@example.com", password: "123456" }
```

Si la base de datos se filtra, todas las contraseñas quedan expuestas.

**Solución: usar `bcrypt`**

`bcrypt` convierte la contraseña en un **hash irreversible**:
```
"123456" → "$2b$10$kZpq7rHv..." (hash)
```

Cuando el usuario hace login, se compara la contraseña introducida con el hash guardado. Si coincide, se permite el acceso.

---

### 1.3 ¿Qué es JWT?

JWT (JSON Web Token) es un token firmado que el servidor entrega al usuario tras el login.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFAZXhhbXBsZS5jb20ifQ.XYZ...
```

El token tiene 3 partes separadas por `.`:
1. **Header** — tipo y algoritmo.
2. **Payload** — datos del usuario (id, email, rol...).
3. **Signature** — firma que garantiza que el token no ha sido modificado.

---

### 1.4 Roles de Usuario

Los roles controlan **qué puede hacer** cada usuario:

| Rol | Acceso |
| :--- | :--- |
| `user` | Rutas públicas y su propio perfil |
| `admin` | Todas las rutas, incluidas las de administración |

---

## Bloque 2 · Preparar Entorno (10 min)

### Instalación

```bash
npm install
```

### Crear `.env`

```bash
cp .env.example .env
```

Rellena los valores en `.env`:
```
DATABASE_URL="postgresql://postgres:TU_PASSWORD@db.XXXX.supabase.co:5432/postgres"
JWT_SECRET="una-clave-secreta-larga-y-dificil-de-adivinar"
PORT=3000
```

### Insertar Usuarios de Prueba en Supabase

Antes de la clase, ejecuta el script de seed para crear los usuarios con las contraseñas ya hasheadas:

```bash
node scripts/seed.js
```

Esto crea dos usuarios en la tabla `users` de Supabase:
- `ana@example.com` / `password123` (rol: `user`)
- `admin@example.com` / `admin123` (rol: `admin`)

---

## Bloque 3 · Conexión a Supabase (`pg`) (10 min)

Abre `src/db/database.js`. Explicar que `pg` es el driver nativo de PostgreSQL para Node.js. Usamos un `Pool` para reutilizar conexiones.

---

## Bloque 4 · Login: Service y Controller (20 min)

### service (`auth.service.js`)
1. Busca al usuario por email en la base de datos.
2. Compara la contraseña con `bcrypt.compare()`.
3. Si coincide, genera un token con `jwt.sign()`.

### controller (`auth.controller.js`)
1. Lee `email` y `password` de `req.body`.
2. Llama al service.
3. Devuelve el token al cliente.

> **Tip para el live coding:** Cometer el error de comparar contraseñas directamente (`===`) y preguntar a los alumnos por qué está mal.

---

## Bloque 5 · Middlewares (15 min)

### `authMiddleware.js`
Se coloca antes del controller en rutas protegidas.
1. Lee el header `Authorization: Bearer TOKEN`.
2. Verifica el token con `jwt.verify()`.
3. Si es válido, añade `req.user` con los datos del usuario.
4. Si no, responde `401 Unauthorized`.

### `requireRole.js`
Se coloca después de `authMiddleware` en rutas restringidas.
1. Lee `req.user.role`.
2. Si el rol no coincide, responde `403 Forbidden`.
3. Si coincide, deja pasar la petición.

---

## Bloque 6 · Probar con Postman (15 min)

### Secuencia recomendada:

**1. Login de usuario normal**
```
POST http://localhost:3000/login
Body (JSON):
{
  "email": "ana@example.com",
  "password": "password123"
}
→ Responde con el token. Copiarlo.
```

**2. Acceder al perfil (ruta protegida)**
```
GET http://localhost:3000/profile
Header: Authorization: Bearer [TOKEN COPIADO]
→ Devuelve datos del usuario.
```

**3. Intentar acceder a /admin siendo usuario normal**
```
GET http://localhost:3000/admin
Header: Authorization: Bearer [TOKEN DE ANA]
→ Debe responder 403 Forbidden.
```

**4. Login de admin**
```
POST http://localhost:3000/login
Body: { "email": "admin@example.com", "password": "admin123" }
```

**5. Acceder a /admin siendo admin**
```
GET http://localhost:3000/admin
Header: Authorization: Bearer [TOKEN DE ADMIN]
→ Debe responder con acceso concedido.
```

**6. Petición sin token**
```
GET http://localhost:3000/profile
(sin header Authorization)
→ Debe responder 401 Unauthorized.
```

---

## ✅ Resumen Final

- [ ] Entiendo por qué no se guardan contraseñas en texto plano.
- [ ] Sé cómo funciona `bcrypt.hash()` y `bcrypt.compare()`.
- [ ] Entiendo qué es un token JWT y qué contiene.
- [ ] Sé cómo proteger una ruta con `authMiddleware`.
- [ ] Sé cómo restringir acceso por rol con `requireRole`.

---

## 🔜 Próxima Clase (Live 2)

Conectaremos este backend con un **frontend HTML + JavaScript**:
- Formulario de login.
- Guardar el token en `localStorage`.
- Acceder a rutas protegidas desde el navegador.
- Añadir seguridad a la API: **CORS**, **Helmet**, **Rate Limit**.
