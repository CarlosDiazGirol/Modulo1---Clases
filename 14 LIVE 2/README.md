# Sprint 14 · Live 2 — Custom Hooks, Formularios y Navegación

> **Objetivo de la Clase**
> Reutilizar lógica con custom hooks, construir formularios controlados, gestionar correctamente `onSubmit` y `preventDefault`, y usar `useRef` y `useNavigate` en una SPA real.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Repaso del fetch actual y duplicación de lógica | 15 min |
| 2 | Extraer `useMovies`, `useMovie` y `useReviews` | 25 min |
| 3 | Formularios controlados con `value` y `onChange` | 20 min |
| 4 | `onSubmit`, `preventDefault`, `useNavigate` | 20 min |
| 5 | `useRef`, autofocus e IA | 10 min |

---

## 🎒 Antes de Empezar

- [ ] Proyecto del Live 1 funcionando
- [ ] Axios operativo contra `http://localhost:3000`
- [ ] Routing ya configurado
- [ ] `npm install` ejecutado

---

## 📂 Estructura del Proyecto

```bash
14 LIVE 2/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   ├── axios.js
    │   ├── auth.js
    │   ├── movies.js
    │   └── reviews.js
    ├── hooks/
    │   ├── useMovie.js
    │   ├── useMovies.js
    │   └── useReviews.js
    ├── components/
    │   ├── Header/
    │   ├── Footer/
    │   ├── Layout/
    │   ├── MovieCard/
    │   ├── MovieGrid/
    │   ├── ReviewList/
    │   └── StatusMessage/
    ├── pages/
    │   ├── HomePage/
    │   ├── MovieDetailPage/
    │   ├── LoginPage/
    │   ├── RegisterPage/
    │   └── NotFoundPage/
    └── router/
        └── AppRouter.jsx
```

---

## Objetivos de Aprendizaje

- Entender qué es un custom hook
- Extraer lógica reutilizable
- Crear hooks como `useMovies`, `useMovie`, `useReviews`
- Crear formularios controlados
- Entender `value` y `onChange`
- Entender `onSubmit`
- Entender `event.preventDefault()`
- Diferenciar `onClick` vs `onSubmit`
- Validar datos en cliente
- Usar `useRef` para autofocus
- Usar `useNavigate` para redirecciones

---

## Continuidad con el Live 1

Este proyecto parte del consumo de API ya funcional.

Ahora aparecen dos problemas reales:

- la lógica de fetch se repite
- los formularios aún no están bien construidos

Archivos dejados intencionalmente a medias para el live coding:

- `src/hooks/useMovies.js`
- `src/hooks/useMovie.js`
- `src/hooks/useReviews.js`
- `src/pages/LoginPage/LoginPage.jsx`
- `src/pages/RegisterPage/RegisterPage.jsx`

---

## Bloque 1 · Si repites lógica, crea un hook (15 min)

Regla mental:

```txt
Si repites fetch + loading + error -> crea un custom hook
```

En este proyecto se repite lógica en:

- `HomePage`
- `MovieDetailPage`
- `ReviewList`

---

## Bloque 2 · Estructura de un Custom Hook (25 min)

Un custom hook suele encapsular:

- `useState`
- `useEffect`
- llamada a API
- retorno de datos y estados

Hooks previstos:

- `useMovies()`
- `useMovie(movieId)`
- `useReviews(movieId)`

---

## Bloque 3 · Formularios Controlados (20 min)

Cada input debe tener:

```jsx
value={formData.email}
onChange={handleChange}
```

Regla:

- React controla el valor
- el input deja de ser independiente

---

## Bloque 4 · Submit Correcto (20 min)

Forma correcta:

```jsx
<form onSubmit={handleSubmit}>
  <button type="submit">Enviar</button>
</form>
```

### `preventDefault`

Evita la recarga y mantiene el comportamiento SPA.

### `onClick` vs `onSubmit`

- `onClick` -> acciones sueltas
- `onSubmit` -> formularios

El proyecto deja un ejemplo intencionalmente mejorable para corregirlo con el grupo.

---

## Bloque 5 · useRef, useNavigate e IA (10 min)

### `useRef`

- referencia directa al DOM
- no provoca re-render
- útil para autofocus

### `useNavigate`

- redirigir tras login
- redirigir tras registro

### Prompt para IA

```txt
Estoy creando un custom hook en React para hacer fetch.
Quiero saber si está bien estructurado y si hay algo que debería mejorar.

No quiero que me lo reescribas, solo explicación.
```

---

## Tareas de Preparación para el Profesor

- Preparar lógica duplicada de fetch
- Crear páginas de login y register incompletas
- Dejar inputs sin controlar
- Preparar un ejemplo donde se usa mal `onClick` en un formulario
- Dejar hooks creados pero sin implementar

---

## Puntos Clave a Enfatizar

- los hooks reutilizan lógica, no UI
- si repites fetch, extrae
- un formulario debe usar `onSubmit`
- sin `preventDefault` la app se recarga
- el formulario debe funcionar con Enter
- `useRef` sirve para acceder al DOM
- `useNavigate` permite redirecciones tras acciones

---

## ✅ Resumen Final

- [ ] Entiendo qué es un custom hook
- [ ] Sé extraer lógica repetida
- [ ] Sé crear formularios controlados
- [ ] Sé cuándo usar `onSubmit`
- [ ] Entiendo `preventDefault`, `useRef` y `useNavigate`

---

## Conexión con Sprint 3

El siguiente paso será trabajar con:

- estado global
- Redux Toolkit
- autenticación real
- carrito y wishlist
