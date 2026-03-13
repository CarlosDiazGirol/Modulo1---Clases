// src/controllers/movies.controller.js
// La capa de CONTROLLER gestiona la Comunicación HTTP (req, res).
// Llama al service y decide qué responder al cliente.

import { moviesService } from '../services/movies.service.js';

const getMovies = (req, res) => {
    const data = moviesService.getAllMovies();
    res.json({
        ok: true,
        data: data
    });
};

const getMovieById = (req, res) => {
    const id = parseInt(req.params.id);
    const movie = moviesService.getMovieById(id);

    if (!movie) {
        return res.status(404).json({
            ok: false,
            message: "Película no encontrada"
        });
    }

    res.json({
        ok: true,
        data: movie
    });
};

export const moviesController = {
    getMovies,
    getMovieById
};
