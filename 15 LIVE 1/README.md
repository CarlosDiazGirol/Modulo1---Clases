# Sprint 15 · Live 1 — Estado Global con Redux Toolkit

> **Objetivo de la Clase**
> Entender qué es el estado global, cuándo merece la pena usarlo y cómo configurar Redux Toolkit en una aplicación React con `store`, `slices`, `Provider`, `useSelector` y `useDispatch`.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: estado local vs global | 15 min |
| 2 | Detectar el problema real de estado duplicado | 15 min |
| 3 | Configurar Redux Toolkit y `Provider` | 20 min |
| 4 | Crear slices de usuario y carrito | 25 min |
| 5 | `useSelector`, `useDispatch` e IA | 15 min |

---

## 🎒 Antes de Empezar

- [ ] Proyecto del sprint anterior funcionando
- [ ] Axios configurado
- [ ] React Router funcionando
- [ ] Instalar Redux Toolkit y React Redux

```bash
npm install
npm install @reduxjs/toolkit react-redux
```

---

## 📂 Estructura del Proyecto

```bash
15 LIVE 1/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
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
    │   ├── LoginPage/
    │   └── NotFoundPage/
    ├── router/
    │   └── AppRouter.jsx
    └── store/
        ├── store.js
        └── slices/
            ├── authSlice.js
            └── cartSlice.js
```

---

## Objetivos de Aprendizaje

- Entender qué es estado global
- Saber cuándo usarlo
- Introducción a Redux Toolkit
- Configurar `store`
- Crear `slices`
- Usar `Provider`
- Usar `useSelector`
- Usar `useDispatch`
- Diferenciar estado local vs global
- Usar IA para revisar estructura

---

## Preparación del Ejercicio

El proyecto parte sin Redux resuelto:

- estado de usuario disperso
- contador de carrito duplicado
- componentes que necesitan la misma información
- estructura de `store/` creada pero incompleta

Archivos pensados para construir en directo:

- `src/store/store.js`
- `src/store/slices/authSlice.js`
- `src/store/slices/cartSlice.js`
- `src/main.jsx`
- `src/components/Header/Header.jsx`
- `src/pages/LoginPage/LoginPage.jsx`

---

## Bloque 1 · Qué es Estado Global (15 min)

Estado global es información compartida entre varios componentes.

Ejemplos típicos:

- usuario logueado
- carrito
- tema
- wishlist

### Regla mental

```txt
Si varios componentes necesitan el mismo dato -> probablemente es global
```

---

## Bloque 2 · El Problema Real (15 min)

En este proyecto ya se ve el síntoma:

- `Header` muestra usuario y carrito
- `LoginPage` cambia usuario
- `HomePage` añade items al carrito

Sin estado global:

- aparece prop drilling
- se duplica lógica
- mantener sincronía se vuelve incómodo

---

## Bloque 3 · Redux Toolkit (20 min)

### Flujo mental

```txt
UI -> dispatch -> reducer -> store -> UI
```

### `configureStore`

Se usa para crear el store y conectar reducers.

### `createSlice`

Cada slice define:

- estado inicial
- reducers
- actions generadas automáticamente

---

## Bloque 4 · Slices de Auth y Cart (25 min)

Slices previstos:

- `authSlice`: usuario actual
- `cartSlice`: contador de carrito

Puntos a explicar:

- reducers síncronos
- acciones pequeñas y claras
- una sola fuente de verdad

---

## Bloque 5 · Provider, Selector y Dispatch (15 min)

### `Provider`

Envuelve la app y hace el store disponible.

### `useSelector`

Lee datos globales.

### `useDispatch`

Envía acciones al store.

### Prompt para IA

```txt
Estoy usando Redux Toolkit en mi proyecto React.
Quiero que revises si la estructura de mi store y slices tiene sentido.

No quiero código, solo explicación.
```

---

## Puntos Clave a Enfatizar

- el estado global evita prop drilling
- Redux Toolkit simplifica Redux clásico
- `configureStore` crea el store
- `createSlice` agrupa estado y acciones
- `Provider` conecta React con Redux
- `useSelector` lee
- `useDispatch` escribe
- `useState` es local, Redux es global

---

## ✅ Resumen Final

- [ ] Entiendo qué es estado global
- [ ] Sé cuándo usar Redux
- [ ] Sé configurar un store
- [ ] Sé leer y modificar estado global

---

## Conexión con la Siguiente Clase

En el Live 2 se trabajará:

- autenticación real
- async con Redux
- login y register
- JWT
- rutas protegidas
