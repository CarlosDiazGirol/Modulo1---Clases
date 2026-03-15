// src/controllers/movies.controller.js
// El controller gestiona req y res. La lógica real vive en el service.

import { moviesService } from '../services/movies.service.js';

const getMovies = async (req, res, next) => {
    try {
        const data = await moviesService.getAllMovies();
        res.json({ ok: true, data });
    } catch (error) {
        next(error);
    }
};

const getMovieById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await moviesService.getMovieById(id);

        if (!movie) {
            return res.status(404).json({ ok: false, error: 'Movie not found' });
        }

        res.json({ ok: true, data: movie });
    } catch (error) {
        next(error);
    }
};

const createMovie = async (req, res, next) => {
    try {
        const newMovie = await moviesService.createMovie(req.body);
        res.status(201).json({ ok: true, data: newMovie });
    } catch (error) {
        next(error);
    }
};

const updateMovie = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const updated = await moviesService.updateMovie(id, req.body);
        res.json({ ok: true, data: updated });
    } catch (error) {
        // Prisma lanza un error específico si el registro no existe (P2025)
        if (error.code === 'P2025') {
            return res.status(404).json({ ok: false, error: 'Movie not found' });
        }
        next(error);
    }
};

const deleteMovie = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        await moviesService.deleteMovie(id);
        res.json({ ok: true, message: 'Movie deleted' });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ ok: false, error: 'Movie not found' });
        }
        next(error);
    }
};

export const moviesController = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
