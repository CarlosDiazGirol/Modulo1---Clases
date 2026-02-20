# Ejercicio: LocalStorage + Spread Operator + Destructuring

## Descripción
Este ejercicio práctico demuestra el uso de **LocalStorage**, **Spread Operator** y **Destructuring** en JavaScript mediante una aplicación de tienda online con carrito de compras.

## Conceptos que se practican

### LocalStorage
- Guardar datos del carrito en el navegador
- Persistir preferencias del usuario
- Recuperar datos entre sesiones

### Spread Operator (...)
- Copiar arrays sin mutar el original
- Combinar objetos y arrays
- Crear nuevos objetos con propiedades actualizadas
- Agregar elementos a arrays de forma inmutable

### Destructuring
- Extraer propiedades de objetos
- Extraer elementos de arrays
- Usar valores por defecto
- Destructuring en parámetros de funciones

## Funcionalidades

### Carrito de Compras
- Agregar productos al carrito
- Eliminar productos del carrito
- Calcular total automáticamente
- Guardar carrito en localStorage
- Recuperar carrito al recargar la página

## Estructura de Archivos

```
├── index.html              # Interfaz HTML
├── README.md              # Documentación original
├── README_EJERCICIO.md    # Esta documentación
├── css/
│   ├── reset.css          # Reset CSS
│   └── styles.css         # Estilos de la aplicación
└── js/
    ├── data.js            # DataLayer con productos y usuarios
    └── script.js          # Lógica de la aplicación
```

## Características Adicionales

## Conceptos Clave

### ¿Por qué usar Spread Operator?
- **Inmutabilidad**: No modifica los arrays/objetos originales
- **Legibilidad**: Código más claro y expresivo
- **Flexibilidad**: Fácil de combinar y copiar estructuras de datos

### ¿Por qué usar Destructuring?
- **Código más limpio**: Menos repetición
- **Legibilidad**: Variables con nombres claros
- **Valores por defecto**: Manejo seguro de propiedades opcionales

### ¿Por qué usar LocalStorage?
- **Persistencia**: Los datos sobreviven al cierre del navegador
- **Sin servidor**: No requiere backend
- **Rápido**: Acceso inmediato a los datos

## Limitaciones de LocalStorage

- Capacidad limitada (~5-10MB)
- Solo almacena strings (usar JSON.stringify/parse)
- Síncrono (puede bloquear la UI con datos grandes)
- No seguro para datos sensibles

## Recursos Adicionales

- [MDN: LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [MDN: Spread Operator](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN: Destructuring](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

---
