# Sprint 12 · Live 1 — Carrito de Compra con Prisma

> **Objetivo de la Clase**
> Implementar el flujo completo de compra de un e-commerce: añadir productos al carrito, consultarlo y realizar el checkout.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: modelo de carrito, estados, diferencia carrito/pedido | 15 min |
| 2 | Ampliar el schema de Prisma (Cart, CartItem, Order) + `db push` | 20 min |
| 3 | Servicio `getCart` + `addItem` | 20 min |
| 4 | Servicio `checkout` + lógica de total | 20 min |
| 5 | Endpoints, pruebas con Postman + IA | 15 min |

---

## 🎒 Antes de Empezar

- [ ] Proyecto backend con Prisma + Supabase funcionando
- [ ] Autenticación JWT del sprint 10 operativa
- [ ] Tabla `products` ya existente en la base de datos
- [ ] `DATABASE_URL` y `JWT_SECRET` configurados en `.env`

---

## 📂 Estructura del Proyecto

```
12-live-1/
├── .env.example
├── package.json
├── prisma/
│   └── schema.prisma          # Cart, CartItem, Order añadidos aquí
└── src/
    ├── server.js
    ├── lib/prisma.js
    ├── middlewares/
    │   └── authMiddleware.js
    ├── routes/
    │   └── cart.routes.js
    ├── controllers/
    │   └── cart.controller.js
    └── services/
        └── cart.service.js
```

---

## Bloque 1 · Teoría: El Modelo de Carrito (15 min)

### Carrito vs Pedido

| | Carrito | Pedido |
| :--- | :--- | :--- |
| Estado | Temporal / mutable | Permanente |
| Modelo | `Cart` + `CartItem` | `Order` |
| Cuándo existe | Mientras el usuario compra | Después del checkout |
| Se puede modificar | Sí | No |

---

### Estados del carrito

```
ACTIVE      → el usuario está añadiendo productos
    ↓
CHECKED_OUT → el usuario ha pagado (checkout realizado)
```

Un usuario **solo puede tener un carrito ACTIVE** en cada momento. Cuando hace checkout, ese carrito pasa a `CHECKED_OUT` y la próxima vez que visite el carrito se crea uno nuevo automáticamente.

---

### Flujo completo

```
Usuario añade producto  → POST /api/cart/items
        ↓
Usuario ve su carrito   → GET  /api/cart
        ↓
Usuario hace checkout   → POST /api/cart/checkout
        ↓
Se crea un Order
Cart pasa a CHECKED_OUT
```

---

## Bloque 2 · Ampliar el Schema de Prisma (20 min)

Abrir `prisma/schema.prisma` y añadir los tres nuevos modelos al final del archivo.

```prisma
model Cart {
  id        String     @id @default(uuid())
  userId    String
  status    CartStatus @default(ACTIVE)
  createdAt DateTime   @default(now())
  items     CartItem[]

  @@map("carts")
}

model CartItem {
  id        String @id @default(uuid())
  cartId    String
  productId String
  quantity  Int

  cart Cart @relation(fields: [cartId], references: [id])

  @@map("cart_items")
}

model Order {
  id        String   @id @default(uuid())
  userId    String
  total     Float
  createdAt DateTime @default(now())

  @@map("orders")
}

enum CartStatus {
  ACTIVE
  CHECKED_OUT
}
```

Aplicar en Supabase:

```bash
npx prisma db push
```

Verificar en Supabase que aparecen las tablas `carts`, `cart_items` y `orders`.

---

## Bloque 3 · Servicio: `getCart` y `addItem` (20 min)

Abrir `src/services/cart.service.js`.

### `getCart` — obtener o crear carrito activo

Lógica:
1. Buscar carrito `ACTIVE` del usuario
2. Si no existe → crearlo automáticamente
3. Devolver carrito con sus items

> **Pregunta para la clase:** *"¿Por qué creamos el carrito automáticamente en lugar de tener un endpoint `POST /cart`?"*
> Respuesta: porque el usuario nunca "crea" un carrito de forma explícita — simplemente empieza a comprar.

---

### `addItem` — añadir producto

Lógica:
1. Obtener carrito activo (`getCart`)
2. Comprobar si el producto ya está en el carrito
3. Si está → actualizar la cantidad
4. Si no está → crear nuevo `CartItem`

> **Punto clave:** Si el usuario añade un producto que ya tiene en el carrito, sumamos la cantidad en lugar de duplicar la línea.

---

## Bloque 4 · Servicio: `checkout` (20 min)

### Lógica del checkout

1. Obtener carrito activo del usuario
2. Validar que no está vacío
3. Calcular el total
4. Crear el `Order`
5. Cambiar el carrito a `CHECKED_OUT`

```
Cart (ACTIVE)  → Order creado  →  Cart (CHECKED_OUT)
```

### Precio fijo vs precio real

En esta clase usamos **precio fijo de 10€ por unidad** para simplificar.

En un proyecto real, el servicio consultaría el precio de cada producto:
```js
// Versión real (no implementada en esta clase)
const product = await prisma.product.findUnique({ where: { id: item.productId } });
total += product.price * item.quantity;
```

> **Explicar:** Esta simplificación es intencional. El objetivo hoy es entender el flujo, no la lógica de precios.

---

## Bloque 5 · Endpoints y Pruebas (15 min)

### Secuencia de prueba en Postman

**1. Login** → `POST /login` → copiar token

**2. Añadir producto** → `POST /api/cart/items`
```json
{
  "productId": "id-de-un-producto-existente",
  "quantity": 2
}
```
Header: `Authorization: Bearer TOKEN`

**3. Ver carrito** → `GET /api/cart`
- Debe mostrar el carrito con los items añadidos

**4. Añadir otro producto** → `POST /api/cart/items`
```json
{
  "productId": "otro-producto",
  "quantity": 1
}
```

**5. Checkout** → `POST /api/cart/checkout`
- Debe devolver el `Order` creado con el total
- El carrito pasa a `CHECKED_OUT`

**6. Volver a ver el carrito** → `GET /api/cart`
- Debe devolver un carrito nuevo vacío (ACTIVE)

---

### Prompt de IA para revisar la lógica

```
Tengo un sistema de carrito en Node.js con Prisma.

Quiero comprobar si la lógica del checkout es correcta.

El flujo es:
1. obtener carrito activo
2. calcular total (precio fijo de 10€ por unidad)
3. crear pedido
4. cerrar carrito (status CHECKED_OUT)

¿Qué problemas podría tener este enfoque?
¿Qué mejorarías en un proyecto real?
```

---

## ✅ Resumen Final

- [ ] Entiendo la diferencia entre carrito y pedido
- [ ] Sé modelar `Cart`, `CartItem` y `Order` en Prisma
- [ ] Sé aplicar cambios al schema con `npx prisma db push`
- [ ] Entiendo por qué un usuario solo puede tener un carrito ACTIVE
- [ ] Sé implementar `getCart`, `addItem` y `checkout`
- [ ] He probado el flujo completo en Postman

---

## 🔜 Próxima Clase

La siguiente sesión cubrirá:
- Deploy del backend en Render
- Documentación de la API con Swagger
