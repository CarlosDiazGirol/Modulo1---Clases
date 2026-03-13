# Clase 08 - Completando el CRUD: POST, PUT y DELETE

## 🎯 Objetivos de Aprendizaje
Al finalizar esta clase, serás capaz de:
- Implementar el CRUD completo (**Create, Read, Update, Delete**).
- Trabajar con `req.body` para recibir datos del cliente.
- Usar Postman para probar endpoints que no sean GET.
- Gestionar códigos de estado HTTP apropiados (**201, 404**).
- Completar una API profesional siguiendo la arquitectura en capas.

## ⏱️ Tiempo Estimado
- **Explicación + Live Coding:** 1h 30min
- **Dudas:** 30min

## 🛠️ Herramientas necesarias
- **Postman** (o similar como Thunder Client o Insomnia).
- El proyecto finalizado del **Live 1**.

## 🏗️ Operaciones a implementar

| Operación | Método | Ruta | Descripción |
| :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/movies` | Crea una nueva película. |
| **Update** | `PUT` | `/movies/:id` | Actualiza los datos de una película existente. |
| **Delete** | `DELETE`| `/movies/:id` | Elimina una película de la "base de datos". |

## 🚀 Flujo de Trabajo en Clase

1. **Service:** Añadir lógica de manipulación de arrays.
2. **Controller:** Leer `req.body` y llamar al Service.
3. **Route:** Registrar los nuevos métodos HTTP.
4. **Postman:** Probar el envío de JSON.

### Ejemplo de JSON para POST
```json
{
  "title": "Dune",
  "year": 2021,
  "director": "Denis Villeneuve"
}
```

---
**Nota Importante:** `app.use(express.json())` es **obligatorio** en `app.js` para que el backend pueda leer el body de las peticiones.
