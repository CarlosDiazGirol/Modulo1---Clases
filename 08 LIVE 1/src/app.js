// src/app.js
import express from 'express';
import moviesRouter from './routes/movies.routes.js';

const app = express();

// Middleware para entender JSON (aunque hoy no lo usemos para leer el body, es buena práctica tenerlo)
app.use(express.json());

// Registro de rutas
// Todas las rutas de películas tendrán el prefijo /movies
app.use('/movies', moviesRouter);

// Ruta por defecto
app.get('/', (req, res) => {
    res.json({
        message: "Bienvenido a la Movie API profesional",
        check_out: "/movies"
    });
});

export default app;
