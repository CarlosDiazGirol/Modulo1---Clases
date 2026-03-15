// src/app.js
import express from 'express';
import moviesRouter from './routes/movies.routes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Rutas
app.use('/movies', moviesRouter);

// Middlewares de error — siempre al final
app.use(notFound);
app.use(errorHandler);

export default app;
