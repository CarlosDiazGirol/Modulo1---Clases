// src/routes/movies.routes.js
// La capa de ROUTES define los ENDPOINTS y qué función del controlador los maneja.

import express from 'express';
import { moviesController } from '../controllers/movies.controller.js';

const router = express.Router();

// Definimos las rutas GET (R - Read de CRUD)
router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovieById);

export default router;
