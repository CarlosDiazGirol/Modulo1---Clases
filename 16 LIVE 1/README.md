# Sprint 16 · Live 1 — Flujo Completo del Cliente: Carrito y Wishlist

> **Objetivo de la Clase**
> Entender el flujo completo del cliente dentro de un e-commerce real, conectando carrito y wishlist con backend, calculando totales y diferenciando qué estado debe ser global y cuál local.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Repaso del flujo autenticado y del backend | 15 min |
| 2 | Carrito real conectado a API | 25 min |
| 3 | Wishlist real + estado global | 20 min |
| 4 | Totales, resumen y UX | 20 min |
| 5 | Errores reales e IA | 10 min |

---

## 🎒 Antes de Empezar

- [ ] Redux funcionando
- [ ] Autenticación implementada
- [ ] Backend funcionando en `http://localhost:3000`
- [ ] Base de datos en Supabase
- [ ] Axios con interceptor configurado

---

## 📂 Estructura del Proyecto

```bash
16 LIVE 1/
├── frontend/
│   ├── package.json
│   └── src/
│       ├── api/
│       │   ├── axios.js
│       │   ├── cart.js
│       │   ├── products.js
│       │   └── wishlist.js
│       ├── components/
│       │   ├── Header/
│       │   ├── Footer/
│       │   ├── Layout/
│       │   ├── ProductCard/
│       │   ├── CartSummary/
│       │   └── StatusMessage/
│       ├── pages/
│       │   ├── ProductsPage/
│       │   ├── CartPage/
│       │   └── NotFoundPage/
│       ├── router/
│       │   └── AppRouter.jsx
│       └── store/
│           ├── store.js
│           └── slices/
│               ├── authSlice.js
│               ├── cartSlice.js
│               └── wishlistSlice.js
└── backend/
    ├── package.json
    ├── prisma/schema.prisma
    └── src/
        ├── server.js
        ├── lib/prisma.js
        ├── middlewares/authMiddleware.js
        ├── routes/
        │   ├── cart.routes.js
        │   ├── products.routes.js
        │   └── wishlist.routes.js
        ├── controllers/
        │   ├── cart.controller.js
        │   ├── products.controller.js
        │   └── wishlist.controller.js
        └── services/
            ├── cart.service.js
            ├── products.service.js
            └── wishlist.service.js
```

---

## Objetivos de Aprendizaje

- Entender el flujo completo del cliente
- Añadir productos al carrito persistidos en backend
- Gestionar wishlist real
- Calcular totales correctamente
- Mostrar resumen de compra
- Entender estado global vs local
- Mejorar experiencia de usuario

---

## Preparación del Ejercicio

El proyecto deja preparado:

- carrito parcialmente implementado
- wishlist incompleta
- totales sin calcular
- UI con poco feedback
- llamadas a API sin terminar

Archivos pensados para construir en directo:

- `frontend/src/store/slices/cartSlice.js`
- `frontend/src/store/slices/wishlistSlice.js`
- `frontend/src/pages/ProductsPage/ProductsPage.jsx`
- `frontend/src/pages/CartPage/CartPage.jsx`
- `frontend/src/components/CartSummary/CartSummary.jsx`
- `backend/src/services/cart.service.js`
- `backend/src/services/wishlist.service.js`

---

## Puntos Clave a Enfatizar

- ver producto -> anadir al carrito -> backend -> guardar -> UI actualizada
- wishlist es persistencia real, no solo un icono
- no duplicar estado
- los totales deben calcularse correctamente
- Redux guarda estado compartido
- inputs y UI temporal siguen siendo estado local
- siempre manejar loading y error

---

## Prompt para IA

```txt
Estoy gestionando carrito y wishlist en React con Redux y backend real.

Quiero que revises si estoy separando bien:
- estado global
- llamadas a API
- logica de UI

No quiero codigo, solo explicacion.
```

---

## Validación Final

- [ ] Carrito funciona con backend
- [ ] Wishlist funciona con backend
- [ ] Totales correctos
- [ ] UI actualizada correctamente
- [ ] Estado sincronizado

---

## Conexión con la Siguiente Clase

En el Live 2 se trabajará:

- checkout real
- confirmación de compra
- `useMemo`
- deploy explicado
