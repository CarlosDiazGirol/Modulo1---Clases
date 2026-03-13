// src/app.js
import express from 'express';
import moviesRouter from './routes/movies.routes.js';

const app = express();

// IMPORTANTE: Sin esto no funciona req.body
app.use(express.json());

// Registro de rutas
app.use('/movies', moviesRouter);

app.get('/', (req, res) => {
    res.json({ message: "API CRUD Completo Activa" });
});

export default app;
