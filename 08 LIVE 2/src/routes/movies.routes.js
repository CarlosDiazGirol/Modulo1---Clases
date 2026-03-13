// src/routes/movies.routes.js
// Rutas CRUD Completo

import express from 'express';
import { moviesController } from '../controllers/movies.controller.js';

const router = express.Router();

// Read
router.get('/', moviesController.getMovies);
router.get('/:id', moviesController.getMovieById);

// Create
router.post('/', moviesController.createMovie);

// Update
router.put('/:id', moviesController.updateMovie);

// Delete
router.delete('/:id', moviesController.deleteMovie);

export default router;
