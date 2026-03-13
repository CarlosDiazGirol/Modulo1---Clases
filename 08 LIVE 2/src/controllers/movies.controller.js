// src/controllers/movies.controller.js
// Handlers CRUD Completo (Controller)

import { moviesService } from '../services/movies.service.js';

const getMovies = (req, res) => {
    const data = moviesService.getAllMovies();
    res.json({ ok: true, data });
};

const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    const movie = moviesService.getMovieById(id);
    if (!movie) return res.status(404).json({ ok: false, message: "No encontrada" });
    res.json({ ok: true, data: movie });
};

/** 
 * POST /movies (CREATE)
 */
const createMovie = (req, res) => {
    const { title, year, director } = req.body;
    
    // Validación rápida
    if (!title || !year) {
        return res.status(400).json({ ok: false, message: "Título y año son obligatorios" });
    }

    const newMovie = moviesService.createMovie({ title, year, director });
    res.status(201).json({ ok: true, data: newMovie });
};

/** 
 * PUT /movies/:id (UPDATE)
 */
const updateMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedMovie = moviesService.updateMovie(id, req.body);

    if (!updatedMovie) {
        return res.status(404).json({ ok: false, message: "Película no encontrada" });
    }

    res.json({ ok: true, data: updatedMovie });
};

/** 
 * DELETE /movies/:id (DELETE)
 */
const deleteMovie = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = moviesService.deleteMovie(id);

    if (!deleted) {
        return res.status(404).json({ ok: false, message: "Película no encontrada" });
    }

    res.json({ ok: true, message: "Película eliminada correctamente" });
};

export const moviesController = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
