# Sprint 09 · Live 1 — Bases de Datos con Supabase y SQL

> **Objetivo de la Clase**
> Entender qué es la persistencia de datos, crear una base de datos real en Supabase (PostgreSQL) y aprender a manipularla con consultas SQL básicas.
> En esta clase **no se conecta el backend**. La conexión con Prisma será en el Live 2.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: persistencia y bases de datos | 20 min |
| 2 | Crear proyecto en Supabase | 10 min |
| 3 | Crear tabla `movies` con SQL | 20 min |
| 4 | Insertar y consultar datos | 20 min |
| 5 | Crear tabla `users` | 10 min |
| 6 | IA para revisar SQL + Preguntas | 10 min |

---

## 🎒 Antes de Empezar

Verifica que tienes listo:
- [ ] Cuenta activa en [Supabase](https://supabase.com)
- [ ] Cuenta en GitHub
- [ ] Cuenta en ChatGPT o Gemini

---

## Bloque 1 · Teoría (20 min)

### 1.1 ¿Qué es la persistencia de datos?

Explica la diferencia entre datos en memoria y datos persistentes:

```js
// ❌ Datos en MEMORIA — desaparecen cuando el servidor se reinicia
const movies = [
  { id: 1, title: "Matrix" }
];
```

```
✅ Datos en BASE DE DATOS — se mantienen aunque el servidor se apague
```

**El problema con el array que hemos usado hasta ahora:**
Cada vez que reiniciamos el servidor con `npm run dev`, la lista de películas vuelve al estado inicial. Cualquier película creada, eliminada o modificada desaparece.

---

### 1.2 ¿Qué es una Base de Datos Relacional?

Una base de datos organiza los datos en **tablas**. Cada tabla tiene filas y columnas.

| id | title | year |
| :--- | :--- | :--- |
| 1 | Matrix | 1999 |
| 2 | Interstellar | 2014 |

- **Fila** → un registro (una película concreta).
- **Columna** → una propiedad del registro (el título, el año...).

---

### 1.3 ¿Qué es PostgreSQL?

PostgreSQL es el motor de base de datos relacional que usaremos. Es:
- Open source y muy usado en backends profesionales.
- El motor que usa **Supabase** internamente.
- El que conectaremos más adelante al backend con **Prisma**.

---

### 1.4 ¿Qué es Supabase?

Supabase es una plataforma que nos da:
- Una base de datos **PostgreSQL** real y gratuita para proyectos de aprendizaje.
- Un **panel visual** para ver las tablas.
- Un **editor SQL** donde escribiremos nuestras consultas.
- APIs automáticas (que no usaremos hoy, pero están disponibles).

> Hoy trabajaremos exclusivamente en el **SQL Editor** de Supabase.

---

## Bloque 2 · Crear el Proyecto en Supabase (10 min)

1. Ve a [supabase.com](https://supabase.com) e inicia sesión.
2. Haz clic en **"New Project"**.
3. Configura el proyecto:
   - **Name:** `movies-api` (o el nombre que prefieras).
   - **Database Password:** guárdala en un lugar seguro — la necesitarás en la siguiente clase.
   - **Region:** selecciona la más cercana a Europa.
4. Espera a que el proyecto se aprovisione (~1-2 minutos).
5. Una vez activo, ve al menú lateral izquierdo → **SQL Editor**.

---

## Bloque 3 · Crear la Tabla `movies` (20 min)

Abre el **SQL Editor** de Supabase y copia la siguiente consulta. Ve explicando cada línea:

```sql
-- Eliminamos la tabla si ya existe (útil para empezar de cero en clase)
DROP TABLE IF EXISTS movies;

-- Creamos la tabla movies
CREATE TABLE movies (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  director   VARCHAR(255),
  year       INTEGER,
  rating     DECIMAL(3, 1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Puntos a explicar línea a línea:**

| Elemento | Qué es |
| :--- | :--- |
| `SERIAL PRIMARY KEY` | Número entero que se autoincrementa. Identifica cada fila de forma única. |
| `VARCHAR(255)` | Texto de longitud variable, máximo 255 caracteres. |
| `NOT NULL` | Este campo es obligatorio. No puede quedar vacío. |
| `INTEGER` | Número entero sin decimales. |
| `DECIMAL(3, 1)` | Número con decimales. Ej: `8.5`. |
| `TIMESTAMPTZ` | Fecha y hora con zona horaria. |
| `DEFAULT NOW()` | Si no se indica un valor, se guarda la fecha y hora actuales. |

> **Tip para el live coding:** elimina el contenido de la consulta y escríbela desde cero con los alumnos, preguntando qué tipo de dato creen que debería tener cada campo.

---

## Bloque 4 · Insertar y Consultar Datos (20 min)

### 4.1 INSERT — Insertar datos

```sql
-- Insertamos varias películas de una sola vez
INSERT INTO movies (title, director, year, rating) VALUES
  ('Matrix',         'Lana & Lilly Wachowski', 1999, 8.7),
  ('Interstellar',   'Christopher Nolan',      2014, 8.6),
  ('Inception',      'Christopher Nolan',      2010, 8.8),
  ('Fight Club',     'David Fincher',           1999, 8.8),
  ('Dune',           'Denis Villeneuve',        2021, 7.9);
```

> Pregunta a los alumnos: *"¿Por qué no estamos indicando el campo `id` ni `created_at`?"*
> Respuesta: porque los gestiona automáticamente la base de datos.

---

### 4.2 SELECT — Consultar datos

```sql
-- Seleccionar todas las películas
SELECT * FROM movies;

-- Seleccionar solo algunos campos
SELECT title, year FROM movies;

-- Filtrar por año
SELECT * FROM movies WHERE year > 2000;

-- Filtrar por director
SELECT * FROM movies WHERE director = 'Christopher Nolan';

-- Ordenar por rating de mayor a menor
SELECT * FROM movies ORDER BY rating DESC;

-- Limitar el número de resultados
SELECT * FROM movies LIMIT 3;
```

---

### 4.3 UPDATE — Actualizar datos

```sql
-- Actualizar el rating de una película
UPDATE movies
SET rating = 9.0
WHERE id = 1;
```

---

### 4.4 DELETE — Eliminar datos

```sql
-- Eliminar una película por id
DELETE FROM movies WHERE id = 5;
```

> **Importante:** Siempre usar `WHERE` en `UPDATE` y `DELETE`. Sin `WHERE` se modifican **todas** las filas.

---

## Bloque 5 · Crear la Tabla `users` (10 min)

Esta tabla no se usará hoy, pero la prepararemos para cuando implementemos autenticación.

```sql
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Puntos a explicar:**

| Elemento | Qué es |
| :--- | :--- |
| `UNIQUE` | El valor de esta columna no puede repetirse. Dos usuarios no pueden tener el mismo email. |
| `password` | Aquí **nunca** guardaremos la contraseña en texto plano. En clases futuras veremos cómo cifrarla con `bcrypt`. |

---

## Bloque 6 · IA para Revisar SQL (10 min)

Muestra a los alumnos cómo usar la IA para aprender de sus consultas.

**Prompt de ejemplo:**
```
Te paso una consulta SQL para crear una tabla en PostgreSQL.

Quiero que me digas si la estructura es correcta.

Si no está bien dime:
- qué errores tiene
- qué mejorarías
- por qué

No la reescribas completa, solo explícamela.

[Pegar la consulta CREATE TABLE aquí]
```

---

## ✅ Resumen Final

Al terminar la clase, los alumnos deben haber aprendido:

- [ ] Por qué los arrays en memoria no son suficientes para aplicaciones reales.
- [ ] Qué es una base de datos relacional (tablas, filas, columnas).
- [ ] Qué es PostgreSQL y Supabase.
- [ ] Cómo crear una tabla con `CREATE TABLE`.
- [ ] Cómo insertar datos con `INSERT INTO`.
- [ ] Cómo consultar datos con `SELECT`, `WHERE`, `ORDER BY`.
- [ ] Cómo actualizar y eliminar datos con `UPDATE` y `DELETE`.

---

## 🔜 Próxima Clase (Live 2)

Conectaremos esta base de datos con nuestro backend de Express usando **Prisma**:

- Instalar y configurar Prisma.
- Definir los modelos (equivalente a nuestras tablas).
- Reemplazar el array de datos por consultas reales a Supabase.
- Añadir middlewares: `notFound` y `errorHandler`.
