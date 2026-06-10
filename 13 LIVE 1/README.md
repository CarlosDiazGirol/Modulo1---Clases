# Sprint 13 · Live 1 — Primer Proyecto con React + Vite

> **Objetivo de la Clase**
> Entender qué es React, cómo se organiza un proyecto frontend moderno y cómo construir una primera SPA basada en componentes, JSX, props y CSS Modules.

---

## ⏱️ Timing Sugerido

| Bloque | Contenido | Tiempo |
| :--- | :--- | :--- |
| 1 | Teoría: qué es React, qué es una SPA y por qué Vite | 20 min |
| 2 | Explorar la estructura del proyecto creado con Vite | 15 min |
| 3 | Crear componentes y entender JSX | 20 min |
| 4 | Props + composición de componentes | 20 min |
| 5 | CSS Modules + revisión de estructura con IA | 15 min |

---

## 🎒 Antes de Empezar

- [ ] Node.js 18+ instalado
- [ ] Cuenta de GitHub disponible
- [ ] Cuenta de ChatGPT disponible
- [ ] Cuenta de Google disponible para Gemini o NotebookLM
- [ ] Ejecutar `npm install`

---

## 📂 Estructura del Proyecto

```bash
13 LIVE 1/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header/
    │   │   ├── Header.jsx
    │   │   └── Header.module.css
    │   └── HeroCard/
    │       ├── HeroCard.jsx
    │       └── HeroCard.module.css
    ├── pages/
    │   └── HomePage/
    │       ├── HomePage.jsx
    │       └── HomePage.module.css
    └── router/
        └── AppRouter.jsx
```

---

## Objetivos de Aprendizaje

- Entender qué es React
- Entender qué es una SPA
- Crear un proyecto con Vite
- Comprender la estructura de un proyecto React
- Entender qué es un componente
- Entender JSX
- Importar y exportar componentes
- Usar props básicas
- Introducir CSS Modules
- Usar IA como apoyo para revisar estructura

---

## Bloque 1 · Qué es React y qué es una SPA (20 min)

### React

React es una librería para construir interfaces de usuario.

Ideas clave:

- Está basada en componentes
- Permite pensar la UI como piezas reutilizables
- Usa un enfoque declarativo: describimos qué queremos renderizar

### SPA

SPA significa **Single Page Application**.

Características:

- La página no se recarga completamente
- Cambia el contenido dinámicamente
- La navegación ocurre dentro de la propia aplicación

> **Mensaje clave:** React no "pinta pantallas sueltas"; compone interfaces a partir de componentes pequeños.

---

## Bloque 2 · Crear Proyecto con Vite (15 min)

Comando de referencia para explicar en clase:

```bash
npm create vite@latest
```

Explicar:

- Vite crea la base del proyecto
- El servidor de desarrollo es muy rápido
- El arranque es instantáneo

En este ejercicio ya dejaremos el proyecto base preparado para poder centrarnos en React.

Scripts importantes:

```bash
npm install
npm run dev
```

---

## Bloque 3 · Estructura del Proyecto (20 min)

Explicar la responsabilidad de cada carpeta:

- `src/`: todo el código de la aplicación
- `components/`: piezas reutilizables
- `pages/`: pantallas o vistas completas
- `router/`: punto de entrada para la navegación

### Flujo de render

```txt
main.jsx -> App.jsx -> AppRouter -> Page -> Components
```

> **Punto clave:** separar por responsabilidad hace que el proyecto escale mejor y sea más fácil de mantener.

---

## Bloque 4 · Componentes, JSX y Props (20 min)

### Qué es un componente

Un componente es una función que devuelve UI.

Ejemplo mental:

```jsx
function MiComponente() {
  return <h1>Hola</h1>;
}
```

### Qué es JSX

JSX permite escribir una sintaxis parecida a HTML dentro de JavaScript.

Diferencias importantes con HTML:

- `class` pasa a ser `className`
- Las expresiones dinámicas van entre llaves: `{ }`

### Props

Las props permiten pasar información de un componente padre a un hijo.

Flujo:

```txt
Padre -> props -> Hijo
```

Durante el live coding:

1. Revisar `HeroCard`
2. Explicar qué props recibe
3. Cambiar los textos desde `HomePage`
4. Mostrar cómo una misma pieza se reutiliza varias veces

---

## Bloque 5 · CSS Modules + IA (15 min)

### CSS Modules

Ventajas:

- Estilos aislados por componente
- Menos colisiones de nombres
- Más fácil escalar

En el proyecto ya aparece esta idea con:

- `Header.module.css`
- `HeroCard.module.css`
- `HomePage.module.css`

### Prompt para IA

```txt
Te paso la estructura de mi proyecto React.
Quiero que me digas si está bien organizada para escalar.

Si no está bien dime:
- qué cambiarías
- por qué
- cómo mejorarlo

No me des código, solo explicación.
```

---

## Tareas de Preparación para el Profesor

- Crear proyecto con Vite
- Limpiar archivos innecesarios
- Preparar estructura base con `components/`, `pages/` y `router/`
- Dejar `HeroCard` como componente base para el live coding
- Pedir a los alumnos que identifiquen qué partes pertenecen a página y cuáles a componente reutilizable

---

## Puntos Clave a Enfatizar

- React es una librería para construir interfaces
- La UI se descompone en componentes
- Una SPA no recarga toda la página
- JSX mezcla estructura visual con JavaScript
- Las props sirven para comunicar padre e hijo
- CSS Modules ayudan a escalar sin pisar estilos
- La estructura del proyecto importa desde el inicio

---

## ✅ Resumen Final

- [ ] Entiendo qué es React
- [ ] Sé qué es una SPA
- [ ] Sé crear un proyecto con Vite
- [ ] Entiendo la estructura `src/components/pages/router`
- [ ] Sé qué es un componente
- [ ] Entiendo JSX y props

---

## Conexión con la Siguiente Clase

En el Live 2 se trabajará sobre esta misma base para añadir:

- `useState`
- listas dinámicas
- routing completo
- layout compartido
