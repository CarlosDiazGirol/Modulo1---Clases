// src/services/movies.service.js
// Lógica de negocio CRUD completo (Service)

import { movies, setMovies } from '../db/movies.js';

const getAllMovies = () => movies;

const getMovieById = (id) => movies.find(movie => movie.id === id);

/** 
 * Lógica para CREAR (C)
 */
const createMovie = (data) => {
    const newMovie = {
        id: Date.now(), // Simulación rudimentaria de ID único
        ...data 
    };
    movies.push(newMovie);
    return newMovie;
};

/** 
 * Lógica para ACTUALIZAR (U)
 */
const updateMovie = (id, data) => {
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return null;

    movies[movieIndex] = { ...movies[movieIndex], ...data };
    return movies[movieIndex];
};

/** 
 * Lógica para ELIMINAR (D)
 */
const deleteMovie = (id) => {
    const movieIndex = movies.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
};

export const moviesService = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
