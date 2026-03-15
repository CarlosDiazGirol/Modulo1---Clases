// ========================================
// EJERCICIO: GEOLOCALIZACIÓN + API TIEMPO
// APIs usadas:
// 1. Navigator Geolocation (GPS del navegador)
// 2. Nominatim / OpenStreetMap (Reverse Geocoding)
// 3. Open-Meteo (Datos meteorológicos)
// ========================================

// ============ CONFIGURACIÓN ============
const OPEN_METEO_API = "https://api.open-meteo.com/v1/forecast";

// ============ ELEMENTOS DEL DOM ============
const btnObtenerUbicacion = document.getElementById("btnObtenerUbicacion");
const loadingLocation = document.getElementById("loadingLocation");
const errorLocation = document.getElementById("errorLocation");
const infoUbicacion = document.getElementById("infoUbicacion");

const loadingWeather = document.getElementById("loadingWeather");
const errorWeather = document.getElementById("errorWeather");
const weatherContainer = document.getElementById("weatherContainer");

// Coordenadas
const latitudElement = document.getElementById("latitud");
const longitudElement = document.getElementById("longitud");
const precisionElement = document.getElementById("precision");

// Tiempo actual
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const cloudCover = document.getElementById("cloudCover");
const apparentTemp = document.getElementById("apparentTemp");

// Pronóstico
const forecastContainer = document.getElementById("forecastContainer");

// ============ FUNCIONES AUXILIARES ============

/**
 * Muestra/oculta loading
 */
function toggleLoading(loadingElement, show) {
  loadingElement.classList.toggle("hidden", !show);
}

/**
 * Muestra error
 */
function mostrarError(errorElement, mensaje) {
  errorElement.textContent = `❌ ${mensaje}`;
  errorElement.classList.remove("hidden");

  setTimeout(() => {
    errorElement.classList.add("hidden");
  }, 5000);
}

/**
 * Obtiene el ícono según el código meteorológico
 * WMO Weather interpretation codes
 */
function obtenerIconoTiempo(weatherCode) {
  const weatherIcons = {
    0: "☀️", // Clear sky
    1: "🌤️", // Mainly clear
    2: "⛅", // Partly cloudy
    3: "☁️", // Overcast
    45: "🌫️", // Fog
    48: "🌫️", // Depositing rime fog
    51: "🌦️", // Drizzle: Light
    53: "🌦️", // Drizzle: Moderate
    55: "🌦️", // Drizzle: Dense
    61: "🌧️", // Rain: Slight
    63: "🌧️", // Rain: Moderate
    65: "🌧️", // Rain: Heavy
    71: "🌨️", // Snow fall: Slight
    73: "🌨️", // Snow fall: Moderate
    75: "🌨️", // Snow fall: Heavy
    77: "❄️", // Snow grains
    80: "🌦️", // Rain showers: Slight
    81: "🌧️", // Rain showers: Moderate
    82: "⛈️", // Rain showers: Violent
    85: "🌨️", // Snow showers: Slight
    86: "🌨️", // Snow showers: Heavy
    95: "⛈️", // Thunderstorm
    96: "⛈️", // Thunderstorm with hail
    99: "⛈️", // Thunderstorm with heavy hail
  };

  return weatherIcons[weatherCode] || "🌡️";
}

/**
 * Obtiene descripción según código meteorológico
 */
function obtenerDescripcionTiempo(weatherCode) {
  const descriptions = {
    0: "Cielo despejado",
    1: "Principalmente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna ligera",
    53: "Llovizna moderada",
    55: "Llovizna densa",
    61: "Lluvia ligera",
    63: "Lluvia moderada",
    65: "Lluvia intensa",
    71: "Nevada ligera",
    73: "Nevada moderada",
    75: "Nevada intensa",
    77: "Granizo",
    80: "Chubascos ligeros",
    81: "Chubascos moderados",
    82: "Chubascos violentos",
    85: "Nevadas ligeras",
    86: "Nevadas intensas",
    95: "Tormenta",
    96: "Tormenta con granizo",
    99: "Tormenta fuerte con granizo",
  };

  return descriptions[weatherCode] || "Desconocido";
}

/**
 * Formatea fecha a día de la semana
 */
function formatearFecha(fecha) {
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const date = new Date(fecha);
  return dias[date.getDay()];
}

// ============ GEOLOCALIZACIÓN ============

/**
 * PASO 1: Obtener ubicación del usuario con navigator.geolocation
 * Demuestra: API del navegador, Promises para usar con async/await
 */
function obtenerUbicacionGPS() {
  return new Promise((resolve, reject) => {
    // Verificar si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      reject(new Error("Tu navegador no soporta geolocalización"));
      return;
    }

    // Opciones de geolocalización
    const options = {
      enableHighAccuracy: true, // Mayor precisión
      timeout: 10000, // 10 segundos de timeout
      maximumAge: 0, // No usar caché
    };

    // Obtener posición actual
    navigator.geolocation.getCurrentPosition(
      // Callback de éxito
      (position) => {
        resolve(position);
      },
      // Callback de error
      (error) => {
        let mensaje = "Error al obtener ubicación";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            mensaje = "Permiso de ubicación denegado";
            break;
          case error.POSITION_UNAVAILABLE:
            mensaje = "Información de ubicación no disponible";
            break;
          case error.TIMEOUT:
            mensaje = "Tiempo de espera agotado";
            break;
        }

        reject(new Error(mensaje));
      },
      options,
    );
  });
}

/**
 * PASO 2: Obtener nombre de la ubicación (ciudad, barrio) usando coordenadas
 * API: Nominatim (OpenStreetMap) - Reverse Geocoding
 * Demuestra: fetch con async/await, destructuring
 */
async function obtenerNombreUbicacion(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Weather-App-Exercise", // Nominatim requiere User-Agent
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // Extraer información de dirección
    const { address, display_name } = data;

    return {
      ciudad:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "Ubicación desconocida",
      barrio: address.suburb || address.neighbourhood || address.quarter || "",
      pais: address.country || "",
      nombreCompleto: display_name,
    };
  } catch (error) {
    console.warn("No se pudo obtener el nombre de la ubicación:", error);
    // Devolver valores por defecto
    return {
      ciudad: "Ubicación no disponible",
      barrio: "",
      pais: "",
    };
  }
}

/**
 * PASO 3: Obtener datos del tiempo usando las coordenadas
 * Demuestra: fetch con parámetros, async/await
 */
async function obtenerTiempo(lat, lon) {
  // Construir URL con parámetros
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,cloud_cover",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: 5,
  });

  const url = `${OPEN_METEO_API}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al obtener el tiempo: ${error.message}`);
  }
}

/**
 * FUNCIÓN PRINCIPAL: Coordina geolocalización + nombre ubicación + API del tiempo
 * Demuestra: async/await, try/catch, manejo de múltiples operaciones asíncronas secuenciales
 */
async function obtenerUbicacionYTiempo() {
  // Limpiar errores previos
  errorLocation.classList.add("hidden");
  errorWeather.classList.add("hidden");
  infoUbicacion.classList.add("hidden");
  weatherContainer.classList.add("hidden");

  // Mostrar loading de ubicación
  toggleLoading(loadingLocation, true);

  try {
    // PASO 1: Obtener geolocalización
    console.log("📍 Solicitando ubicación...");
    const position = await obtenerUbicacionGPS();

    // DESTRUCTURING: Extraer coordenadas
    const { latitude, longitude, accuracy } = position.coords;

    console.log(`✅ Ubicación obtenida: ${latitude}, ${longitude}`);

    // Mostrar coordenadas
    latitudElement.textContent = latitude.toFixed(6);
    longitudElement.textContent = longitude.toFixed(6);
    precisionElement.textContent = `${Math.round(accuracy)} metros`;

    // PASO 2: Obtener nombre de la ubicación
    console.log("🏙️ Obteniendo nombre de ubicación...");
    const ubicacion = await obtenerNombreUbicacion(latitude, longitude);

    // Mostrar nombre de ubicación
    document.getElementById("ciudad").textContent = ubicacion.ciudad;
    document.getElementById("pais").textContent = ubicacion.pais;
    document.getElementById("barrio").textContent =
      ubicacion.barrio || "Barrio no disponible";

    console.log(`✅ Ubicación: ${ubicacion.ciudad}, ${ubicacion.pais}`);

    infoUbicacion.classList.remove("hidden");
    toggleLoading(loadingLocation, false);

    // PASO 3: Obtener tiempo con las coordenadas
    toggleLoading(loadingWeather, true);
    console.log("🌤️ Consultando el tiempo...");

    const weatherData = await obtenerTiempo(latitude, longitude);

    console.log("✅ Datos del tiempo obtenidos:", weatherData);

    // Renderizar datos del tiempo
    renderizarTiempo(weatherData);

    toggleLoading(loadingWeather, false);
    weatherContainer.classList.remove("hidden");
  } catch (error) {
    console.error("❌ Error:", error);

    // Determinar qué loading ocultar y dónde mostrar el error
    if (infoUbicacion.classList.contains("hidden")) {
      // Error en geolocalización
      toggleLoading(loadingLocation, false);
      mostrarError(errorLocation, error.message);
    } else {
      // Error en API del tiempo
      toggleLoading(loadingWeather, false);
      mostrarError(errorWeather, error.message);
    }
  }
}

// ============ RENDERIZADO ============

/**
 * Renderiza los datos del tiempo en el DOM
 */
function renderizarTiempo(data) {
  // DESTRUCTURING de datos actuales
  const {
    temperature_2m,
    relative_humidity_2m,
    apparent_temperature,
    weather_code,
    wind_speed_10m,
    cloud_cover,
  } = data.current;

  // Tiempo actual
  weatherIcon.textContent = obtenerIconoTiempo(weather_code);
  temperature.textContent = `${Math.round(temperature_2m)}°C`;
  weatherDescription.textContent = obtenerDescripcionTiempo(weather_code);

  // Detalles
  windSpeed.textContent = `${Math.round(wind_speed_10m)} km/h`;
  humidity.textContent = `${relative_humidity_2m}%`;
  cloudCover.textContent = `${cloud_cover}%`;
  apparentTemp.textContent = `${Math.round(apparent_temperature)}°C`;

  // Pronóstico 5 días
  renderizarPronostico(data.daily);
}

/**
 * Renderiza el pronóstico de 5 días
 */
function renderizarPronostico(dailyData) {
  const { time, weather_code, temperature_2m_max, temperature_2m_min } =
    dailyData;

  const html = time
    .map((fecha, index) => {
      const dia = formatearFecha(fecha);
      const icon = obtenerIconoTiempo(weather_code[index]);
      const tempMax = Math.round(temperature_2m_max[index]);
      const tempMin = Math.round(temperature_2m_min[index]);

      return `
            <div class="forecast-day">
                <div class="forecast-date">${dia}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temp">${tempMax}°</div>
                <div class="forecast-temp-range">${tempMin}° mín</div>
            </div>
        `;
    })
    .join("");

  forecastContainer.innerHTML = html;
}

// ============ EVENT LISTENERS ============

btnObtenerUbicacion.addEventListener("click", obtenerUbicacionYTiempo);
