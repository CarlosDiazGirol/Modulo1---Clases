# Ejercicio: Sticky Header & Modo Oscuro con LocalStorage

## Objetivos de aprendizaje

Este ejercicio demuestra:
- **Position: sticky** para crear un header que se mantiene fijo al hacer scroll
- **Modo oscuro** que persiste entre páginas usando localStorage
- **Navegación entre páginas** manteniendo las preferencias del usuario
- **Flexbox** para layouts responsivos (sin usar CSS Grid)
- **Destructuring** al renderizar productos desde un datalayer

## Estructura de archivos

```
├── index.html           # Página principal con productos
├── productos.html       # Página de productos e información
├── css/
│   └── styles.css       # Estilos con sticky y modo oscuro
├── js/
│   ├── data.js          # Datalayer con productos (separado)
│   └── script.js        # Lógica del modo oscuro y renderizado
└── README.md
```

## Conceptos clave

### 1. Position: Sticky
### 2. LocalStorage para modo oscuro
### 3. Flexbox
### 4. Destructuring

## Buenas prácticas aplicadas

- Código semántico y bien comentado
- Separación de concerns (HTML, CSS, JS, datos)
- Datalayer en archivo separado
- Variables CSS para temas
- Responsive design mobile-first