# Ejercicio: Promesas, Asincronía y Fetch API

## 📚 Descripción

Este ejercicio práctico enseña los fundamentos de la **programación asíncrona en JavaScript** a través de 10 ejercicios progresivos que comparan dos métodos de manejar promesas: `.then()/.catch()` vs `async/await`.

## Objetivos de Aprendizaje

Al completar este ejercicio, entenderás:
1. **Qué son las promesas** y por qué existen
2. **Cómo funciona la asincronía** en JavaScript
3. **Diferencias entre .then() y async/await**
4. **Qué es fetch** y cómo usarlo
5. **Por qué async/await + try/catch** es la forma moderna recomendada

---

## ¿Qué son las Promesas?

### Definición

Una **Promesa** es un objeto que representa el **resultado futuro** de una operación asíncrona. Es literalmente una "promesa" de que eventualmente tendrás un resultado (éxito o error).

### ¿Por qué existen?

Antes de las promesas (pre-ES2015), JavaScript solo tenía **callbacks** para manejar código asíncrono, lo que creaba el infame **"callback hell"**:

### Estados de una Promesa

Una promesa puede estar en 3 estados:

| Estado | Descripción | ¿Qué significa? |
|--------|-------------|-----------------|
| **pending** | Pendiente | La operación aún está ejecutándose |
| **fulfilled** | Cumplida | La operación fue exitosa (resolve) |
| **rejected** | Rechazada | La operación falló (reject) |


## ¿Qué es Fetch?

### Definición

`fetch()` es una **API del navegador** que permite hacer peticiones HTTP (GET, POST, PUT, DELETE) a servidores. Es la forma moderna de hacer AJAX.

### Características

- ✅ Retorna una **Promesa**
- ✅ Más simple que XMLHttpRequest (la forma antigua)
- ✅ Soporta async/await
- ✅ Basado en estándares web
- ⚠️ No rechaza errores HTTP (4xx, 5xx) por defecto

## Método 1 .then()

**Ventajas:**
- ✅ Compatible con navegadores antiguos
- ✅ Fácil de entender para operaciones simples

**Desventajas:**
- ⚠️ Encadenamiento puede volverse difícil de leer
- ⚠️ Callback hell en casos complejos
- ⚠️ Manejo de errores disperso

### Método 2: async/await

**Ventajas:**
- ✅ Código limpio y lineal (parece código síncrono)
- ✅ Fácil de leer y mantener
- ✅ try/catch centralizado
- ✅ Debugging más sencillo

**Desventajas:**
- ⚠️ Requiere ES2017+ (muy adoptado actualmente)
- ⚠️ Solo funciona en funciones `async`

---

## ¿Por qué elegir async/await + try/catch?

- Razón 1: Legibilidad
- Razón 2: Manejo de Errores Centralizado
- Razón 3: Debugging. Con async/await puedes usar **breakpoints** normales y ver el flujo paso a paso. Con .then() el debugging es más complicado.
- Razón 4: Condicionales

## 📂 Estructura del Ejercicio

```
├── index.html      # 10 ejercicios interactivos
├── README.md       # Esta documentación
├── css/
│   └── styles.css  # Estilos B/N minimalistas
└── js/
    └── script.js   # Implementaciones de los 10 ejercicios
```

## 10 Ejercicios Incluidos

### Nivel Básico
1. **Crear Promesa** - `new Promise()` con `setTimeout`
2. **Fetch con .then()** - JSONPlaceholder API
3. **Fetch con async/await** - Random User API

### Comparación
4. **Dog CEO** - Misma API, dos métodos lado a lado

### APIs Diversas
5. **Advice Slip** - Consejos aleatorios
6. **JokeAPI** - Chistes de programación

### Avanzado
7. **Secuencial** - Operaciones una tras otra
8. **Promise.all()** - Operaciones en paralelo
9. **Manejo de Errores** - Error 404 capturado
10. **Promise.race()** - La más rápida gana

---

## APIs Gratuitas Utilizadas

Todas las APIs usadas **NO requieren API key** ni registro:

| API | URL | Uso |
|-----|-----|-----|
| JSONPlaceholder | `jsonplaceholder.typicode.com` | Posts, users, comments fake |
| Random User | `randomuser.me/api/` | Usuarios aleatorios con fotos |
| Dog CEO | `dog.ceo/api/` | Imágenes de perros |
| Advice Slip | `api.adviceslip.com/advice` | Consejos aleatorios |
| JokeAPI | `v2.jokeapi.dev/joke/Programming` | Chistes de programación |

---

## Buenas Prácticas
- 1. Siempre verificar response.ok
- 2. Usar try/catch con async/await
- 3. Mostrar estados de carga
- 4. Usar Promise.all() para operaciones paralelas

## Recursos Adicionales

### Documentación Oficial
- [MDN: Promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN: async/await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)

### Tutoriales Recomendados
- [JavaScript.info: Promesas](https://javascript.info/promise-basics)
- [JavaScript.info: Async/Await](https://javascript.info/async-await)
- [JavaScript.info: Fetch](https://javascript.info/fetch)

### Listas de APIs Públicas
- [Public APIs](https://github.com/public-apis/public-apis) - Lista masiva de APIs gratuitas
- [RapidAPI](https://rapidapi.com/) - Marketplace de APIs