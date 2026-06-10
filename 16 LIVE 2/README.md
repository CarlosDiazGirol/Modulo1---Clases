# Sprint 16 · Live 2 — Checkout, Confirmación y Optimización

> **Objetivo del Live Coding**
> Cerrar el flujo del cliente con checkout real conectado a backend, página de confirmación, optimización con `useMemo` y explicación del deploy en Netlify sin añadir código específico de despliegue.

---

## Estructura de la Clase

### Bloque 1 — Técnico

- Checkout
- Confirmación
- `useMemo`
- Deploy explicado

### Bloque 2 — Transición a Proyecto

- Revisión global
- Qué viene ahora
- Cómo trabajar de forma autónoma

---

## 📂 Estructura del Proyecto

```bash
16 LIVE 2/
├── frontend/
│   ├── package.json
│   └── src/
│       ├── api/
│       │   ├── axios.js
│       │   ├── cart.js
│       │   ├── orders.js
│       │   └── products.js
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
│       │   ├── CheckoutSuccessPage/
│       │   └── NotFoundPage/
│       ├── router/
│       │   └── AppRouter.jsx
│       └── store/
│           ├── store.js
│           └── slices/
│               ├── cartSlice.js
│               └── wishlistSlice.js
└── backend/
    ├── package.json
    ├── prisma/schema.prisma
    └── src/
        ├── server.js
        ├── routes/
        │   ├── cart.routes.js
        │   ├── orders.routes.js
        │   └── products.routes.js
        ├── controllers/
        │   ├── cart.controller.js
        │   ├── orders.controller.js
        │   └── products.controller.js
        └── services/
            ├── cart.service.js
            ├── orders.service.js
            └── products.service.js
```

---

## Paso 1 — Revisar Flujo Actual

Antes de tocar código:

- ver productos
- añadir al carrito
- entrar al carrito
- detectar que falta checkout real
- detectar que falta confirmación
- detectar que falta optimización

---

## Paso 2 — Implementar Checkout

Backend esperado:

```txt
POST /api/orders
```

Frontend esperado:

```txt
dispatch(checkoutCart())
```

Flujo:

```txt
click checkout -> dispatch -> API -> backend guarda pedido -> respuesta
```

Después del éxito:

- limpiar carrito
- guardar pedido si se desea

---

## Paso 3 — Página de Confirmación

Ruta esperada:

```txt
/checkout/success
```

Debe mostrar:

- mensaje de éxito
- resumen de compra
- botón para volver

---

## Paso 4 — Optimización con useMemo

Ir a `ProductsPage`.

Problema:

- filtros se recalculan siempre

Objetivo:

- usar `useMemo` para datos derivados
- no guardar derivados en estado

Regla:

```txt
products -> fuente de verdad
filteredProducts -> calculo derivado
```

---

## Paso 5 — Datos Derivados

- no guardar datos derivados en Redux
- calcular cuando haga falta
- usar `useMemo` solo si hay coste real o claridad clara

---

## Paso 6 — Deploy en Netlify

Esta parte se explica en clase pero no añade código en el proyecto.

Puntos a comentar:

- GitHub
- Netlify
- `npm run build`
- carpeta `dist`
- variables de entorno
- frontend y backend separados
- CORS y URLs de producción

---

## Paso 7 — Test Final

Comprobar:

- flujo completo funciona
- navegación correcta
- datos persisten
- checkout limpia carrito
- confirmación renderiza bien

---

## Validación Final

- [ ] Checkout real funcionando
- [ ] Confirmación visible tras compra
- [ ] `useMemo` aplicado con sentido
- [ ] Proyecto preparado para continuar de forma autónoma
