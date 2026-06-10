# Sprint 14 · Live 1 — React + API Real con Axios y useEffect

> **Objetivo de la Clase**
> Entender cómo conectar un frontend React con una API real, hacer peticiones HTTP con Axios y gestionar asincronía con `useEffect`, incluyendo estados de carga y error.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: API, petición HTTP y flujo frontend-backend | 15 min |
| 2 | Crear y explicar la instancia de Axios | 20 min |
| 3 | `useEffect` y diferencia entre render y efecto | 20 min |
| 4 | Cargar listado y detalle desde API real | 20 min |
| 5 | Loading, error e IA para debug | 15 min |

---

## 🎒 Antes de Empezar

- [ ] Proyecto del Sprint 13 funcionando
- [ ] Backend levantado en `http://localhost:3000`
- [ ] `npm install` ejecutado
- [ ] Postman disponible de forma opcional

---

## 📂 Estructura del Proyecto

```bash
14 LIVE 1/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   ├── axios.js
    │   └── movies.js
    ├── components/
    │   ├── Header/
    │   ├── Footer/
    │   ├── Layout/
    │   ├── MovieCard/
    │   ├── MovieGrid/
    │   └── StatusMessage/
    ├── pages/
    │   ├── HomePage/
    │   ├── MovieDetailPage/
    │   └── NotFoundPage/
    └── router/
        └── AppRouter.jsx
```

---

## Objetivos de Aprendizaje

- Entender qué es una API
- Entender qué es una petición HTTP
- Usar Axios para consumir datos
- Crear una instancia de Axios
- Entender `useEffect`
- Diferenciar render vs efecto
- Gestionar `loading` y `error`
- Separar llamadas a API en archivos propios
- Usar IA para debug

---

## Preparación del Ejercicio

El proyecto ya deja preparada la transición desde el sprint anterior:

- se elimina el mock local
- se crea `src/api/`
- los componentes ya esperan datos reales
- Axios queda sin terminar de configurar
- `useEffect` queda pendiente de implementar

Archivos pensados para construir en directo:

- `src/api/axios.js`
- `src/api/movies.js`
- `src/pages/HomePage/HomePage.jsx`
- `src/pages/MovieDetailPage/MovieDetailPage.jsx`

---

## Bloque 1 · Qué es una API (15 min)

### API

Una API expone datos o acciones para que otro sistema los consuma.

En esta clase:

```txt
React -> petición HTTP -> backend local -> respuesta JSON
```

### Petición HTTP

- el cliente pide datos
- el servidor responde
- React actualiza su estado con esa respuesta

> **Punto clave:** el frontend no "lee la base de datos"; habla con el backend.

---

## Bloque 2 · Axios e Instancia Compartida (20 min)

### Por qué Axios

- sintaxis cómoda
- configuración centralizada
- evita repetir `baseURL`

### Archivo `api/axios.js`

Se prepara para centralizar:

- `baseURL`
- headers comunes
- futuras configuraciones

Ejemplo de objetivo final:

```js
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});
```

---

## Bloque 3 · useEffect y Asincronía (20 min)

### Idea mental

```txt
Render -> pinta UI
useEffect -> ejecuta lógica externa
```

`useEffect` se usa aquí para:

- llamar a la API
- esperar la respuesta
- actualizar estado

Estados a explicar:

- `loading`
- `error`
- `data`

---

## Bloque 4 · Listado y Detalle desde API (20 min)

Endpoints sugeridos del backend del curso:

- `GET /movies`
- `GET /movies/:id`

Flujo completo:

```txt
componente -> useEffect -> función API -> respuesta -> setState -> render
```

En el proyecto:

- `HomePage` cargará el listado
- `MovieDetailPage` cargará una película concreta

---

## Bloque 5 · Loading, Error e IA (15 min)

Estados visuales a trabajar:

- mientras carga -> mensaje de loading
- si falla -> mensaje de error
- si todo va bien -> renderizar datos

### Prompt para IA

```txt
Estoy haciendo una petición con axios dentro de useEffect en React.
Quiero que revises si estoy manejando correctamente loading, error y datos.

No quiero que me lo reescribas, solo que me expliques posibles fallos.
```

---

## Tareas de Preparación para el Profesor

- Tener backend funcionando
- Crear `api/axios.js`
- Preparar `getMovies` sin terminar
- Dejar componentes listos para datos reales
- Comentar el mock anterior

---

## Puntos Clave a Enfatizar

- una API expone datos
- Axios simplifica las peticiones HTTP
- `useEffect` ocurre después del render
- render y efecto no son lo mismo
- `loading`, `error` y `data` forman el flujo base
- `api/` concentra llamadas HTTP
- `components/` se queda en la UI

---

## ✅ Resumen Final

- [ ] Entiendo cómo consumir una API real
- [ ] Entiendo para qué sirve Axios
- [ ] Sé por qué usar `useEffect`
- [ ] Sé gestionar `loading` y `error`

---

## Conexión con la Siguiente Clase

En el Live 2 se trabajará sobre esta misma base para añadir:

- custom hooks
- formularios controlados
- `preventDefault`
- `useRef`
- `useNavigate`
