# Sprint 13 · Live 2 — Estado, Listas y Routing en React

> **Objetivo de la Clase**
> Entender cómo gestionar estado con `useState`, renderizar listas dinámicas, configurar navegación con `react-router-dom` y construir una aplicación con `Layout` compartido.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Repaso del Live 1 + teoría de estado y render | 15 min |
| 2 | `useState` + buscador controlado | 25 min |
| 3 | Listas dinámicas con `map` y `key` | 20 min |
| 4 | Routing con `react-router-dom` | 20 min |
| 5 | `Layout`, `Link`, `NavLink`, `useParams` + IA | 10 min |

---

## 🎒 Antes de Empezar

- [ ] Tener completado el proyecto del Live 1
- [ ] Node.js 18+ instalado
- [ ] Ejecutar `npm install`
- [ ] Instalar `react-router-dom`

---

## 📂 Estructura del Proyecto

```bash
13 LIVE 2/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── products.js
    ├── components/
    │   ├── Header/
    │   │   ├── Header.jsx
    │   │   └── Header.module.css
    │   ├── Footer/
    │   │   ├── Footer.jsx
    │   │   └── Footer.module.css
    │   ├── Layout/
    │   │   ├── Layout.jsx
    │   │   └── Layout.module.css
    │   ├── ProductCard/
    │   │   ├── ProductCard.jsx
    │   │   └── ProductCard.module.css
    │   └── ProductGrid/
    │       ├── ProductGrid.jsx
    │       └── ProductGrid.module.css
    ├── pages/
    │   ├── HomePage/
    │   │   ├── HomePage.jsx
    │   │   └── HomePage.module.css
    │   ├── ProductDetailPage/
    │   │   ├── ProductDetailPage.jsx
    │   │   └── ProductDetailPage.module.css
    │   └── NotFoundPage/
    │       ├── NotFoundPage.jsx
    │       └── NotFoundPage.module.css
    └── router/
        └── AppRouter.jsx
```

---

## Objetivos de Aprendizaje

- Entender `useState`
- Crear un buscador
- Renderizar listas con `map`
- Usar `key` correctamente
- Configurar routing
- Entender `Layout` compartido
- Usar `Link` y `NavLink`
- Usar `useParams`
- Entender navegación en una SPA

---

## Continuidad con el Live 1

Este ejercicio parte del mismo enfoque del Live 1:

- estructura por carpetas
- componentes reutilizables
- CSS Modules

Ahora la aplicación deja de ser estática y pasa a ser interactiva.

Archivos dejados intencionalmente a medias para el live coding:

- `src/pages/HomePage/HomePage.jsx` -> filtrado con `search`
- `src/pages/ProductDetailPage/ProductDetailPage.jsx` -> `useParams` para leer el id

---

## Bloque 1 · Estado y Re-render (15 min)

### `useState`

`useState` permite guardar estado local en un componente.

Idea clave:

```txt
Estado cambia -> React vuelve a renderizar
```

Ejemplo mental:

```jsx
const [search, setSearch] = useState('');
```

Explicar:

- el valor actual
- la función actualizadora
- cada cambio provoca nuevo render

---

## Bloque 2 · Buscador Controlado (25 min)

Objetivo del live coding:

1. Conectar un `input` al estado
2. Guardar lo escrito por el usuario
3. Filtrar productos en tiempo real

Conceptos:

- input controlado
- `onChange`
- filtrado dinámico

El array de productos ya está preparado en `src/data/products.js`, pero la lógica de filtrado queda pendiente para construirla en clase.

---

## Bloque 3 · Listas Dinámicas (20 min)

Explicar:

- usar `map()` para transformar datos en UI
- cada elemento necesita una `key`
- la `key` debe ser estable y única

Componentes preparados para la sesión:

- `ProductCard`
- `ProductGrid`

> **Punto clave:** React no renderiza "arrays de datos"; renderiza arrays de componentes.

---

## Bloque 4 · Routing con React Router (20 min)

Instalación:

```bash
npm install
npm install react-router-dom
```

Conceptos a trabajar:

- `createBrowserRouter`
- `RouterProvider`
- rutas anidadas
- página detalle
- página 404

El archivo `src/router/AppRouter.jsx` queda intencionalmente incompleto para configurarlo en directo.

---

## Bloque 5 · Layout Compartido, Navegación y Params (10 min)

### Layout

El layout compartido tendrá:

- `Header`
- `Footer`
- `Outlet`

### Navegación

Comparar:

- `Link`: navegación simple
- `NavLink`: navegación con estado activo

### `useParams`

Se usará para obtener el `id` desde la URL en la página de detalle.

Flujo mental:

```txt
usuario -> click -> ruta -> componente -> render
```

---

## Tareas de Preparación para el Profesor

- Partir del proyecto del Live 1
- Añadir `react-router-dom`
- Preparar el array de productos
- Crear componentes base `ProductCard` y `ProductGrid`
- Dejar el routing sin terminar
- Eliminar la lógica de filtrado final para construirla con el grupo
- Dejar pendiente el uso de `params` en detalle

---

## Prompt para IA

```txt
Tengo este código en React con useState y map.
Quiero que me digas si hay errores o malas prácticas.

No me lo soluciones, solo explícamelo.
```

---

## Puntos Clave a Enfatizar

- `useState` guarda estado local
- un cambio de estado provoca re-render
- `map()` se usa para renderizar listas
- `key` es obligatoria
- React Router organiza la navegación en una SPA
- `Layout` evita repetir header y footer
- `useParams` conecta la URL con el componente

---

## ✅ Resumen Final

- [ ] Entiendo estado con `useState`
- [ ] Sé crear un buscador controlado
- [ ] Sé renderizar listas dinámicas con `map`
- [ ] Entiendo cómo configurar rutas
- [ ] Entiendo `Layout`, `Link`, `NavLink` y `useParams`

---

## Conexión con Sprint 2

El siguiente paso será trabajar con:

- datos reales desde API
- asincronía
- formularios reales
