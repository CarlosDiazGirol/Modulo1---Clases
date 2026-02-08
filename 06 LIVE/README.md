# Ejercicio: Geolocalización + APIs del Tiempo

## Descripción
Este ejercicio práctico demuestra el uso de **APIs asíncronas**, **callbacks**, **navigator.geolocation** y **manejo de estados de carga** mediante una aplicación del tiempo que obtiene tu ubicación GPS, la convierte en un nombre de ciudad/barrio, y muestra el pronóstico meteorológico.

## APIs Utilizadas

### 1. Navigator Geolocation API
- **¿Qué es?** API del navegador para obtener coordenadas GPS del dispositivo
- **Endpoint:** `navigator.geolocation.getCurrentPosition()`
- **Requiere:** Permiso del usuario (por privacidad y seguridad)
- **Retorna:** Latitud, longitud y precisión en metros

### 2. Nominatim API (OpenStreetMap)
- **¿Qué es?** API gratuita de reverse geocoding
- **Endpoint:** `https://nominatim.openstreetmap.org/reverse`
- **Función:** Convierte coordenadas (lat, lon) en nombres legibles (Madrid, Moratalaz, España)
- **Requiere:** Header User-Agent en la petición

### 3. Open-Meteo API
- **¿Qué es?** API meteorológica gratuita sin necesidad de API key
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Función:** Proporciona datos del tiempo actual y pronóstico de 5 días
- **Datos:** Temperatura, humedad, viento, cobertura de nubes, códigos WMO

## Conceptos que se practican

### Callbacks y Asincronía
- **Callbacks tradicionales:** Funciones que se ejecutan cuando una operación asíncrona termina
- **Callback Hell:** Anidación de callbacks (3 niveles: GPS → Ubicación → Tiempo)
- **then/catch:** Manejo de promesas con fetch API
- **Operaciones secuenciales:** Cada API depende del resultado de la anterior

### ¿Por qué es importante la Asincronía?
JavaScript es **single-threaded** (un solo hilo de ejecución). Sin asincronía:
- ❌ El navegador se congelaría esperando respuestas de APIs (pueden tardar segundos)
- ❌ El usuario no podría interactuar con la página
- ❌ La experiencia sería horrible

Con asincronía:
- ✅ El código sigue ejecutándose mientras espera respuestas
- ✅ La interfaz permanece responsive
- ✅ Podemos manejar múltiples operaciones simultáneas

### Destructuring
- Extraer coordenadas: `const { latitude, longitude, accuracy } = position.coords`
- Extraer datos de APIs: `const { address, display_name } = data`
- Simplificar acceso a datos anidados

### URLSearchParams
- Construir query strings de forma limpia
- Evitar concatenación manual de URLs
- Codificación automática de parámetros

## La Importancia del Spinner (Loading State)

### ¿Por qué es CRÍTICO mostrar un spinner?

#### 1. **Feedback Visual**
- El usuario necesita saber que algo está pasando
- Sin spinner, parece que la app está rota o colgada
- Las APIs pueden tardar 1-5 segundos (o más con conexión lenta)

#### 2. **Experiencia de Usuario (UX)**
- **Con spinner:** "Ok, está cargando... espero un momento"
- **Sin spinner:** "¿Está roto? ¿Hago clic otra vez?" → Usuario frustrado

#### 3. **Operaciones Asíncronas Múltiples**
En este ejercicio hay **3 operaciones asíncronas secuenciales**:
```
[Spinner ON] → GPS (2-3s) → [Spinner OFF]
[Spinner ON] → Nominatim (1-2s) → [Spinner OFF]
[Spinner ON] → Open-Meteo (1-2s) → [Spinner OFF]
```

#### 4. **Estados de la Aplicación**
```javascript
IDLE → LOADING → SUCCESS → SHOW_DATA
  ↓      ↓          ↓
Hidden  Spinner   Content
                    
Si falla:
IDLE → LOADING → ERROR → SHOW_ERROR_MESSAGE
```

#### 5. **Prevenir Clics Múltiples**
- Mientras el spinner está visible, se puede deshabilitar el botón
- Evita que el usuario lance la misma petición 10 veces

## ¿Por qué el Navegador Pide Permiso de Ubicación?
### Razones de Privacidad y Seguridad

#### 1. **Datos Sensibles**
Tu ubicación GPS es información **altamente sensible**:
- Revela dónde vives, trabajas, estudias
- Permite rastreo de movimientos
- Puede usarse para robo, acoso, o publicidad invasiva

#### 2. **Protección del Usuario**
El navegador actúa como **guardián de tu privacidad**:
- Solo sitios con permiso explícito pueden acceder
- El usuario puede denegar o revocar el permiso en cualquier momento
- HTTPS es obligatorio (excepto localhost) para evitar interceptación

#### 3. **Regulaciones Legales**
- **GDPR (Europa):** Requiere consentimiento explícito para datos de ubicación
- **Privacidad por diseño:** Los navegadores deben proteger datos personales por defecto

#### 4. **Transparencia**
El navegador muestra:
- ✅ Qué sitio está pidiendo acceso
- ✅ Qué tipo de permiso (ubicación precisa)
- ✅ Opciones: "Permitir" o "Bloquear"

### Buenas Prácticas
- ✅ Pedir permiso solo cuando el usuario lo activa (botón)
- ✅ Explicar POR QUÉ necesitas la ubicación
- ✅ Manejar el caso de denegación con gracia (mensaje claro)
- ✅ No pedir ubicación nada más cargar la página (agresivo)

## Estructura de Archivos

```
├── index.html          # Interfaz HTML con botón, spinners, cards
├── README.md          # Esta documentación
├── css/
│   ├── reset.css      # Reset CSS
│   └── styles.css     # Estilos B/N minimalistas + spinners
└── js/
    └── script.js      # Lógica: Callbacks, APIs, renderizado
```

## Funcionalidades

### Geolocalización
- Obtener coordenadas GPS con `navigator.geolocation`
- Mostrar latitud, longitud y precisión
- Manejo de errores (permiso denegado, timeout, no disponible)

### Reverse Geocoding
- Convertir coordenadas en nombre de ciudad
- Mostrar barrio/distrito
- Mostrar país
- Fallback si la API falla

### Pronóstico del Tiempo
- Temperatura actual y sensación térmica
- Humedad, viento, cobertura de nubes
- Pronóstico de 5 días con máximas/mínimas
- Íconos según código WMO (☀️, 🌧️, ⛈️, etc.)

### Estados Visuales
- **Loading:** Spinners mientras cargan datos
- **Success:** Mostrar datos en cards
- **Error:** Mensajes claros de error que desaparecen en 5 segundos

## Flujo de la Aplicación

```
1. Usuario clica "Obtener Mi Ubicación"
   ↓
2. [SPINNER ON] Pedir permiso de ubicación
   ↓
3. Usuario permite → Obtener GPS coords
   ↓
4. Mostrar coords en pantalla
   ↓
5. [SPINNER ON] Llamar a Nominatim con coords
   ↓
6. Mostrar "Madrid, Moratalaz, España"
   ↓
7. [SPINNER OFF ubicación]
   ↓
8. [SPINNER ON] Llamar a Open-Meteo con coords
   ↓
9. Procesar datos del tiempo
   ↓
10. Renderizar tiempo actual + pronóstico 5 días
    ↓
11. [SPINNER OFF tiempo] → FIN
```

## Manejo de Errores

### GPS
- **Permiso denegado:** Mensaje claro, no insistir
- **Timeout:** Comprobar conexión GPS/WiFi
- **No disponible:** Dispositivo sin GPS

### APIs Externas
- **HTTP Error:** Mostrar código de error
- **Network Error:** Comprobar conexión a internet
- **Timeout:** API caída o conexión lenta

## Recursos Adicionales

### APIs
- [Navigator Geolocation API](https://developer.mozilla.org/es/docs/Web/API/Geolocation_API)
- [Nominatim Usage Policy](https://operations.osmfoundation.org/policies/nominatim/)
- [Open-Meteo Documentation](https://open-meteo.com/en/docs)

### JavaScript
- [MDN: Callbacks](https://developer.mozilla.org/es/docs/Glossary/Callback_function)
- [MDN: Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN: Destructuring](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
