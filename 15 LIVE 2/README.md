# Sprint 15 · Live 2 — Autenticación Real con Redux Toolkit, JWT y Backend

> **Objetivo de la Clase**
> Implementar autenticación real conectando frontend y backend, usando Redux Toolkit con `createAsyncThunk`, JWT, `localStorage`, interceptores de Axios y rutas protegidas.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Probar backend en Postman y repasar flujo JWT | 15 min |
| 2 | Crear `registerThunk` y `loginThunk` | 25 min |
| 3 | Guardar token y persistir sesión | 20 min |
| 4 | Interceptor de Axios y `PrivateRoute` | 20 min |
| 5 | Roles, errores reales e IA | 10 min |

---

## 🎒 Antes de Empezar

- [ ] Backend funcionando
- [ ] Prisma conectado a Supabase
- [ ] `bcrypt` y JWT configurados
- [ ] Variables de entorno preparadas
- [ ] `npm install` ejecutado en frontend y backend

---

## 📂 Estructura del Proyecto

```bash
15 LIVE 2/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   ├── axios.js
│       │   └── auth.js
│       ├── components/
│       │   ├── Header/
│       │   ├── Footer/
│       │   ├── Layout/
│       │   ├── PrivateRoute/
│       │   └── StatusMessage/
│       ├── pages/
│       │   ├── HomePage/
│       │   ├── LoginPage/
│       │   ├── RegisterPage/
│       │   ├── AdminPage/
│       │   └── NotFoundPage/
│       ├── router/
│       │   └── AppRouter.jsx
│       └── store/
│           ├── store.js
│           └── slices/
│               └── authSlice.js
└── backend/
    ├── package.json
    ├── .env.example
    ├── prisma/
    │   └── schema.prisma
    └── src/
        ├── server.js
        ├── lib/prisma.js
        ├── middlewares/authMiddleware.js
        ├── routes/auth.routes.js
        ├── controllers/auth.controller.js
        └── services/auth.service.js
```

---

## Objetivos de Aprendizaje

- Entender autenticación real con base de datos
- Conectar frontend con backend real
- Usar `createAsyncThunk`
- Entender el flujo completo JWT
- Persistir sesión con `localStorage`
- Usar interceptores de Axios
- Proteger rutas con `PrivateRoute`
- Entender roles `USER` y `ADMIN`
- Debuggear errores reales

---

## Preparación del Ejercicio

El proyecto deja preparado:

- `authSlice` incompleto
- `LoginPage` sin conectar
- `RegisterPage` sin conectar
- Axios sin interceptor
- rutas sin proteger
- backend mínimo ya montado

Archivos pensados para construir en directo:

- `frontend/src/store/slices/authSlice.js`
- `frontend/src/store/store.js`
- `frontend/src/api/axios.js`
- `frontend/src/pages/LoginPage/LoginPage.jsx`
- `frontend/src/pages/RegisterPage/RegisterPage.jsx`
- `frontend/src/components/PrivateRoute/PrivateRoute.jsx`

---

## Qué Estamos Construyendo

No es un login fake.

Flujo real:

```txt
frontend -> API Express -> Prisma -> Supabase -> respuesta -> JWT -> frontend
```

---

## Flujo Completo de Autenticación

```txt
usuario introduce datos
-> dispatch(loginThunk)
-> API Express
-> Prisma consulta Supabase
-> bcrypt valida password
-> JWT se genera
-> frontend recibe token
-> Redux guarda estado
-> UI cambia
```

---

## Puntos Clave a Enfatizar

- el backend es parte clave
- nunca guardar passwords en texto plano
- JWT identifica al usuario
- `createAsyncThunk` encapsula async
- `localStorage` mantiene sesión tras refresh
- el interceptor añade `Authorization`
- `PrivateRoute` depende del estado global
- roles permiten acceso diferenciado
- siempre manejar `loading` y `error`

---

## Prompt para IA

```txt
Estoy implementando login con JWT en React y Redux Toolkit conectado a un backend con Prisma y Supabase.

Quiero que revises si estoy gestionando correctamente:
- token
- errores
- flujo de autenticación

No quiero que me lo soluciones, solo explicación.
```

---

## Validación Final

- [ ] Register crea usuarios en la base de datos
- [ ] Login devuelve token válido
- [ ] Token se guarda correctamente
- [ ] Rutas protegidas funcionan
- [ ] Axios envía token automáticamente

---

## Conexión con Sprint 4

Después de este punto se trabajará:

- carrito real
- wishlist
- checkout
- optimización con `useMemo`
