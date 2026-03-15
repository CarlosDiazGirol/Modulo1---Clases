# Sprint 11 · Live 2 — Testing con Jest

> **Objetivo de la Clase**
> Aprender a escribir tests unitarios con Jest para validar la lógica del backend sin depender de la base de datos.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: qué es un test unitario y por qué importa | 15 min |
| 2 | Instalar Jest y configurar ES Modules | 10 min |
| 3 | Tests de reviews: 5 funciones puras | 25 min |
| 4 | Tests de wishlist + `describe` | 20 min |
| 5 | Casos de error + matchers avanzados + IA | 20 min |

---

## 🎒 Antes de Empezar

- [ ] Node.js 18+ instalado
- [ ] Los servicios del Live 1 revisados (especialmente las funciones puras)

---

## 📂 Estructura del Proyecto

```
11-live-2/
├── package.json
└── src/
    ├── services/
    │   ├── reviewService.js       # 5 funciones puras (sin MongoDB)
    │   └── wishlistService.js     # 3 funciones puras (sin MongoDB)
    └── tests/
        ├── reviewService.test.js
        └── wishlistService.test.js
```

> **Punto clave:** No hay base de datos en este proyecto. Solo se testea la **lógica pura** de las funciones. Los tests funcionan sin conexión a Internet y sin ningún `.env`.

---

## Bloque 1 · Teoría: Tests Unitarios (15 min)

### ¿Qué es un test unitario?

Un test unitario verifica que una **función pequeña** devuelve el resultado correcto para una entrada dada. No necesita Internet, ni base de datos, ni variables de entorno.

```
función recibe datos → test comprueba el resultado esperado
```

---

### ¿Por qué merece la pena?

**Sin tests:**
- Los errores aparecen en producción (delante del usuario)
- Un cambio rompe cosas que parecían no relacionadas
- El código da miedo de tocar

**Con tests:**
- Los errores se detectan antes de subir el código
- Se puede refactorizar con confianza
- El código se documenta solo: los tests explican qué hace cada función

---

### Qué se testea y qué no

**Se testea:**
- Lógica de negocio (cálculos, filtros, validaciones, ordenaciones)
- Funciones puras que reciben datos y devuelven datos

**No se testea:**
- Express (el framework)
- MongoDB / Prisma (la base de datos)
- Librerías externas

> **Mensaje clave:** Si tienes que conectarte a algo externo para que el test funcione, la función no es pure y el test no es unitario.

---

### Flujo TDD (Test Driven Development)

```
1. Escribir el test
   ↓
2. El test falla (la función no existe aún)
   ↓
3. Implementar la función
   ↓
4. El test pasa ✅
   ↓
5. Refactorizar si es necesario
```

---

## Bloque 2 · Instalar Jest (10 min)

```bash
npm install
npm test
```

### Configuración de ES Modules con Jest

Ya está configurado en `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/.bin/jest"
  }
}
```

> **Explicar:** El flag `--experimental-vm-modules` le dice a Node que Jest puede manejar archivos con `import`/`export`.

---

## Bloque 3 · Tests de Reviews: 5 Funciones Puras (25 min)

Abrir `src/services/reviewService.js`. Las 5 funciones puras:

| # | Función | Qué hace |
| :--- | :--- | :--- |
| 1 | `calculateAverage(ratings)` | Media aritmética de un array |
| 2 | `filterByMinRating(reviews, min)` | Filtra por rating mínimo |
| 3 | `createReviewObject(...)` | Crea y valida un objeto de review |
| 4 | `sortReviews(reviews, order)` | Ordena por rating asc/desc |
| 5 | `getMovieWithMostReviews(reviews)` | Devuelve el movieId con más entradas |

Abrir `src/tests/reviewService.test.js` y recorrer los tests uno a uno. Después de explicar cada función, ejecutar:

```bash
npm test
```

Mostrar que todos los tests pasan en <1 segundo, sin conexión a nada.

---

### Anatomía de un test

```js
test('descripción clara del comportamiento esperado', () => {
    const result = miFuncion(datosDePrueba);  // Llamada
    expect(result).toBe(valorEsperado);        // Comprobación
});
```

---

### `describe` — Agrupar tests relacionados

```js
describe('calculateAverage', () => {
    test('calcula la media correctamente', () => { ... });
    test('devuelve 0 si el array está vacío', () => { ... });
});
```

En la salida del terminal los tests aparecen agrupados bajo el nombre del `describe`.

---

## Bloque 4 · Tests de Wishlist (20 min)

Abrir `src/tests/wishlistService.test.js`. Tres funciones puras:

- `addMovieToList(list, movieId)` — no añade duplicados, no muta el original
- `removeMovieFromList(list, movieId)` — elimina sin mutar
- `isMovieInList(list, movieId)` — devuelve booleano

> **Pregunta para la clase:** *"¿Por qué comprobamos que no se muta el array original?"*
> Respuesta: para evitar efectos secundarios inesperados cuando la función se llama desde varios sitios.

---

### Matchers importantes

| Matcher | Uso | Ejemplo |
| :--- | :--- | :--- |
| `toBe` | Igualdad simple | `expect(9).toBe(9)` |
| `toEqual` | Igualdad de objetos | `expect(obj).toEqual({ id: 1 })` |
| `toContain` | El array incluye un valor | `expect(['a']).toContain('a')` |
| `toHaveLength` | Longitud del array | `expect([1,2]).toHaveLength(2)` |
| `toBeDefined` | No es `undefined` | `expect(review.createdAt).toBeDefined()` |
| `toBeNull` | Es null | `expect(result).toBeNull()` |
| `not.toContain` | El array no incluye | `expect(arr).not.toContain('x')` |

---

## Bloque 5 · Casos de Error + IA (20 min)

Mostrar cómo testear que una función **lanza un error**:

```js
test('lanza error si el rating es mayor que 10', () => {
    expect(() => createReviewObject('movie1', 'user1', 11)).toThrow('El rating debe estar entre 1 y 10');
});
```

> **Punto clave:** Para testear errores hay que envolver la llamada en una función flecha: `expect(() => fn()).toThrow()`.

---

### Prompt de IA para revisar tests

```
Te paso un test unitario en Jest.

Quiero que me digas:
- si el test realmente comprueba el comportamiento correcto
- si falta algún caso de prueba
- qué mejorarías

No quiero que reescribas el test completo.
Solo explicación.

describe('addMovieToList', () => {
    test('añade una película a la lista', () => {
        const result = addMovieToList(['movie1'], 'movie2');
        expect(result).toHaveLength(2);
    });
});
```

---

## ✅ Resumen Final

- [ ] Entiendo qué es un test unitario
- [ ] Sé instalar y configurar Jest con ES Modules
- [ ] Sé usar `test`, `describe` y `expect`
- [ ] Conozco los matchers: `toBe`, `toEqual`, `toContain`, `toHaveLength`, `toThrow`
- [ ] Sé testear funciones puras sin depender de la base de datos
- [ ] Entiendo qué es TDD y el ciclo rojo → verde → refactor

---

## 🔜 Próxima Clase

Con los fundamentos de testing cubiertos, la siguiente sesión se centrará en **preparar la API para producción**:
- variables de entorno seguras
- deploy en Railway o Render
- gestión de entornos (development / production)

---

### Unit test — sin dependencias externas

Un test unitario verifica que una función devuelve el resultado correcto para una entrada dada. No necesita Internet, ni base de datos, ni variables de entorno.

```
función recibe datos → test comprueba el resultado
```

```js
// Ejemplo de función pura (reviewService.js)
export const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((acc, r) => acc + r, 0) / ratings.length;
};

// Su test unitario
test('calcula la media', () => {
    expect(calculateAverage([8, 9, 10])).toBe(9);
});
```

---

### Integration test — con base de datos real

Un test de integración verifica que la función funciona con la base de datos real. Necesita conexión, y hay que conectar/desconectar antes y después.

```js
// Función con DB (reviewServiceDB.js)
export const createReview = async (data) => {
    const review = new Review(data);
    return await review.save();
};

// Su test de integración
test('createReview guarda en MongoDB', async () => {
    const review = await createReview({ movieId: 'test', userId: 'u1', rating: 9 });
    expect(review._id).toBeDefined(); // el _id lo asigna MongoDB
});
```

---

### Qué NO se testea nunca

- Express (el framework)
- Mongoose / Prisma en sí (ya los testean sus autores)
- Librerías externas

> **Mensaje clave:** Si tienes que conectarte a algo externo para que el test pase, ya no es un unit test — es un integration test.

---

### Flujo TDD (Test Driven Development)

```
1. Escribir el test
   ↓
2. El test falla (la función no existe aún)
   ↓
3. Implementar la función
   ↓
4. El test pasa ✅
   ↓
5. Refactorizar si es necesario
```

---

## Bloque 2 · Instalar Jest (10 min)

```bash
npm install
npm run test:unit   # ← empezamos por aquí, sin necesitar .env
```

### Configuración de ES Modules con Jest

Ya está configurado en `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/.bin/jest",
    "test:unit": "node --experimental-vm-modules node_modules/.bin/jest --testPathPattern='src/tests/[^/]+\\.test'",
    "test:integration": "node --experimental-vm-modules node_modules/.bin/jest --testPathPattern='integration'"
  }
}
```

> **Explicar:** `--testPathPattern` es un regex que filtra qué archivos de test se ejecutan. Los de `integration/` solo corren cuando lo pedimos explícitamente.

---

## Bloque 3 · Tests Unitarios: 5 Funciones Puras (25 min)

Abrir `src/services/reviewService.js`. Hay **5 funciones puras** — todas se pueden testear sin base de datos:

| # | Función | Qué hace |
| :--- | :--- | :--- |
| 1 | `calculateAverage(ratings)` | Media aritmética de un array |
| 2 | `filterByMinRating(reviews, min)` | Filtra por rating mínimo |
| 3 | `createReviewObject(...)` | Crea y valida un objeto de review |
| 4 | `sortReviews(reviews, order)` | Ordena por rating asc/desc |
| 5 | `getMovieWithMostReviews(reviews)` | Devuelve el movieId con más entradas |

Abrir `src/tests/reviewService.test.js` y recorrer los tests uno a uno.

```bash
npm run test:unit
```

**Mostrar la salida del terminal** — todos los tests pasan en <1 segundo, sin conexión a nada.

---

### Anatomía de un test

```js
test('descripción clara del comportamiento esperado', () => {
    const result = miFuncion(datosDePrueba);  // Llamada
    expect(result).toBe(valorEsperado);        // Comprobación
});
```

---

### `describe` — Agrupar tests relacionados

```js
describe('calculateAverage', () => {
    test('calcula la media correctamente', () => { ... });
    test('devuelve 0 si el array está vacío', () => { ... });
});
```

En la salida del terminal, los tests aparecen agrupados bajo el nombre del `describe`.

---

## Bloque 4 · Tests de Wishlist (15 min)

Abrir `src/tests/wishlistService.test.js`. Tres funciones puras:

- `addMovieToList(list, movieId)` — no añade duplicados, no muta el original
- `removeMovieFromList(list, movieId)` — elimina sin mutar
- `isMovieInList(list, movieId)` — booleano

> **Pregunta para la clase:** *"¿Por qué comprobamos que no se muta el array original?"*
> Respuesta: para evitar efectos secundarios inesperados en funciones que se llaman desde varios sitios.

---

### Matchers importantes

| Matcher | Uso | Ejemplo |
| :--- | :--- | :--- |
| `toBe` | Igualdad simple | `expect(9).toBe(9)` |
| `toEqual` | Igualdad de objetos | `expect(obj).toEqual({ id: 1 })` |
| `toContain` | El array incluye un valor | `expect(['a']).toContain('a')` |
| `toHaveLength` | Longitud del array | `expect([1,2]).toHaveLength(2)` |
| `toBeDefined` | No es `undefined` | `expect(review.createdAt).toBeDefined()` |
| `toBeNull` | Es null | `expect(getMovieWithMostReviews([])).toBeNull()` |
| `toThrow` | La función lanza error | `expect(() => fn()).toThrow()` |
| `not.toContain` | El array no incluye | `expect(arr).not.toContain('x')` |

---

## Bloque 5 · Tests de Integración con MongoDB (25 min)

Ahora abrimos `src/tests/integration/reviewServiceDB.test.js`.

### Lo que cambia respecto a los unit tests

```js
// Unit test — sin setup
test('calcula la media', () => {
    expect(calculateAverage([8, 9, 10])).toBe(9);
});

// Integration test — necesita setupde conexión
beforeAll(async () => {
    await connectDB();     // conectar antes de todos los tests
});

afterAll(async () => {
    await Review.deleteMany({ movieId: TEST_MOVIE_ID }); // limpiar datos de test
    await disconnectDB();  // desconectar al final
});

test('createReview guarda en MongoDB', async () => {
    const review = await createReview({ ... });
    expect(review._id).toBeDefined();
});
```

---

### Preparar el .env para ejecutarlos

```bash
cp .env.example .env
# Añadir la connection string de Atlas
```

```bash
npm run test:integration
```

**Mostrar en directo** cómo el test:
1. Conecta a MongoDB Atlas
2. Crea un documento de test
3. Lo lee, actualiza y borra
4. Limpia los datos de test al final con `deleteMany`

> **Punto clave:** Siempre se usa un `TEST_MOVIE_ID` único para no contaminar los datos reales. Y siempre se limpia en `afterAll`.

---

### Uso de IA para revisar tests

```
Te paso un test de integración en Jest.

Quiero que me digas:
- si el test realmente comprueba el comportamiento correcto
- si falta limpiar datos de prueba
- qué mejorarías

No quiero que reescribas el test completo.
Solo explicación.
```

---

## ✅ Resumen Final

- [ ] Entiendo la diferencia entre test unitario y test de integración
- [ ] Sé cuándo usar `npm run test:unit` y cuándo `npm run test:integration`
- [ ] Sé usar `test`, `describe` y `expect`
- [ ] Conozco los matchers: `toBe`, `toEqual`, `toContain`, `toHaveLength`, `toThrow`
- [ ] Entiendo `beforeAll` y `afterAll` para gestionar la conexión a la BD
- [ ] Sé limpiar los datos de test con `deleteMany` en `afterAll`

Con los fundamentos de testing cubiertos, la siguiente sesión se centrará en **preparar la API para producción**:
- variables de entorno seguras
- deploy en Railway o Render
- gestión de entornos (development / production)
