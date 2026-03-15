# Sprint 11 · Live 1 — MongoDB, Mongoose y Atlas

> **Objetivo de la Clase**
> Entender qué es una base de datos NoSQL, cómo funciona MongoDB y cómo conectar un backend Express con MongoDB Atlas usando Mongoose.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: NoSQL vs SQL, qué es MongoDB | 15 min |
| 2 | MongoDB Atlas: crear cluster y explorar Data Explorer | 20 min |
| 3 | Crear colecciones e insertar documentos en Atlas | 20 min |
| 4 | CRUD desde el Data Explorer de Atlas | 15 min |
| 5 | Conectar Express + Mongoose (código) | 15 min |
| 6 | Arquitectura híbrida SQL + MongoDB | 5 min |

---

## 🎒 Antes de Empezar

- [ ] Cuenta en MongoDB Atlas creada: https://www.mongodb.com/cloud/atlas
- [ ] Cluster M0 (gratuito) creado
- [ ] IP actual añadida en Network Access (o `0.0.0.0/0` para clase)
- [ ] Usuario de base de datos creado con contraseña

---

## 📂 Estructura del Proyecto

```
11-live-1/
├── .env
├── .env.example
├── package.json
└── src/
    ├── server.js
    ├── db/
    │   └── database.js              # Conexión con Mongoose
    ├── models/
    │   ├── Review.js                # Schema de reviews
    │   └── Wishlist.js              # Schema de wishlist
    ├── services/
    │   ├── reviewService.js         # Lógica + funciones puras
    │   └── wishlistService.js
    ├── controllers/
    │   ├── reviewController.js
    │   └── wishlistController.js
    └── routes/
        ├── reviewRoutes.js
        └── wishlistRoutes.js
```

---

## Bloque 1 · Teoría: NoSQL vs SQL (15 min)

### ¿Qué es la persistencia de datos?

Diferencia clave para explicar primero:

```js
// En memoria → se pierde al reiniciar el servidor
const reviews = [];

// En base de datos → persiste para siempre
// MongoDB Atlas = datos en la nube
```

---

### SQL vs NoSQL — Tabla comparativa

| Concepto | SQL (PostgreSQL) | NoSQL (MongoDB) |
| :--- | :--- | :--- |
| Unidad de almacenamiento | Tabla | Colección |
| Registro | Fila | Documento |
| Propiedad | Columna | Campo |
| Formato | Esquema fijo | JSON flexible |
| Relaciones | JOINs | Referencias o embebido |

---

### Cuándo usar cada una

**SQL (PostgreSQL/Supabase)** → datos estructurados con relaciones:
- users
- movies
- orders
- carts

**MongoDB** → datos flexibles, sociales o de contenido:
- reviews (diferentes campos según el tipo de reseña)
- wishlist (listas personales)
- logs, comentarios, etiquetas

> **Mensaje clave:** No hay una opción mejor. Cada base de datos se usa para lo que mejor hace.

---

### Arquitectura del proyecto del curso

```
Cliente
  ↓
API Backend (Express)
  ↓
Prisma → PostgreSQL (Supabase)    ← users, movies, orders
  ↓
Mongoose → MongoDB Atlas          ← reviews, wishlist
```

---

## Bloque 2 · MongoDB Atlas — Crear Cluster (20 min)

### Pasos en directo

1. Ir a https://cloud.mongodb.com
2. Crear nuevo proyecto (o usar el existente)
3. **Build a Database → Free (M0)**
4. Elegir región (Europe o la más cercana)
5. Ponerle nombre al cluster: `cursofsia`
6. **Security → Create User** → nombre y contraseña
7. **Network Access → Add IP Address → Allow from anywhere** (para clase)
8. Esperar ~2 minutos a que el cluster esté activo

---

### Explorar Data Explorer

1. Click en **Browse Collections**
2. Si no hay datos, click en **Add My Own Data**
3. Nombre de la database: `cursofsia`

> **Punto clave:** En MongoDB, una "database" contiene colecciones. Una colección contiene documentos.

---

## Bloque 3 · Crear Colecciones en Atlas (20 min)

### Colección `reviews`

Estructura de un documento:

```json
{
  "movieId": "movie1",
  "userId": "user1",
  "rating": 8,
  "comment": "Great movie, really enjoyed it",
  "createdAt": "2026-01-10"
}
```

**Puntos clave:**
- `_id` se genera automáticamente (ObjectId)
- No hay esquema obligatorio: cada documento puede tener campos diferentes
- El formato es JSON (internamente BSON)

Insertar varios documentos de ejemplo:

```json
{ "movieId": "movie1", "userId": "user1", "rating": 9, "comment": "Amazing!", "createdAt": "2026-01-10" }
{ "movieId": "movie1", "userId": "user2", "rating": 7, "comment": "Pretty good", "createdAt": "2026-01-11" }
{ "movieId": "movie2", "userId": "user1", "rating": 5, "comment": "Disappointing", "createdAt": "2026-01-12" }
```

---

### Colección `wishlist`

Estructura de un documento:

```json
{
  "userId": "user1",
  "movieId": "movie3",
  "createdAt": "2026-01-10"
}
```

Insertar varios documentos de ejemplo:

```json
{ "userId": "user1", "movieId": "movie1", "createdAt": "2026-01-10" }
{ "userId": "user1", "movieId": "movie3", "createdAt": "2026-01-11" }
{ "userId": "user2", "movieId": "movie2", "createdAt": "2026-01-12" }
```

---

## Bloque 4 · CRUD desde Data Explorer (15 min)

Ejecutar estas operaciones desde el shell de Atlas o Data Explorer:

```js
// Leer todos los documentos
db.reviews.find()

// Filtrar por película
db.reviews.find({ movieId: "movie1" })

// Filtrar por rating mínimo
db.reviews.find({ rating: { $gte: 8 } })

// Actualizar el rating de una review
db.reviews.updateOne(
  { movieId: "movie1", userId: "user1" },
  { $set: { rating: 10 } }
)

// Eliminar una review
db.reviews.deleteOne({ movieId: "movie1", userId: "user2" })
```

---

### Operadores importantes

| Operador | Significado | Ejemplo |
| :--- | :--- | :--- |
| `$set` | Actualizar campo | `{ $set: { rating: 9 } }` |
| `$gte` | Mayor o igual | `{ rating: { $gte: 8 } }` |
| `$lt` | Menor que | `{ rating: { $lt: 5 } }` |
| `$in` | Dentro de lista | `{ movieId: { $in: [...] } }` |

---

## Bloque 5 · Conectar Express + Mongoose (15 min)

### ¿Qué es Mongoose?

Mongoose es una librería ODM (Object Document Mapper) que:
- Define esquemas para los documentos
- Valida los datos antes de guardar
- Ofrece métodos como `.find()`, `.save()`, `.findByIdAndUpdate()`

> **Analogía:** Es como Prisma, pero para MongoDB.

---

### Instalación y configuración

```bash
npm install
cp .env.example .env
# Añadir la connection string de Atlas en MONGODB_URI
npm run dev
```

**Connection String de Atlas:**
```
mongodb+srv://usuario:contraseña@cursofsia.xxxxx.mongodb.net/cursofsia
```

---

### Modelo vs Schema

```js
// reviewSchema define la estructura
const reviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    rating:  { type: Number, min: 1, max: 10, required: true }
});

// Review es el modelo (equivale a la colección en MongoDB)
export const Review = mongoose.model('Review', reviewSchema);
```

---

### Probar los endpoints con Postman

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `POST` | `/reviews` | Crear review |
| `GET` | `/reviews/movie/:movieId` | Reviews de una película |
| `PUT` | `/reviews/:id` | Actualizar review |
| `DELETE` | `/reviews/:id` | Eliminar review |
| `POST` | `/wishlist` | Añadir a wishlist |
| `GET` | `/wishlist/user/:userId` | Wishlist de un usuario |
| `DELETE` | `/wishlist/:id` | Quitar de wishlist |

---

## Bloque 6 · Arquitectura Híbrida (5 min)

### Prompt de IA para revisar modelos

```
Te paso un modelo de documento MongoDB para una colección de reviews.

Quiero que me digas:
- si la estructura tiene sentido
- qué campos faltan
- qué mejorarías

No quiero que reescribas el modelo completo.
Solo quiero explicación.

{
  "movieId": "movie1",
  "userId": "user1",
  "rating": 8,
  "comment": "Great movie"
}
```

---

## ✅ Resumen Final

- [ ] Entiendo la diferencia entre SQL y NoSQL
- [ ] Sé crear una base de datos y colecciones en MongoDB Atlas
- [ ] Sé insertar, leer, actualizar y eliminar documentos en Atlas
- [ ] Entiendo qué es Mongoose y para qué sirve
- [ ] Sé definir un Schema con Mongoose
- [ ] Entiendo la arquitectura híbrida SQL + MongoDB

---

## 🔜 Próxima Clase

La siguiente sesión se centrará en **testing con Jest**.
Se aprenderá a validar la lógica de los servicios sin depender de la base de datos.
Los servicios de `reviewService.js` y `wishlistService.js` serán los primeros en testearse.
