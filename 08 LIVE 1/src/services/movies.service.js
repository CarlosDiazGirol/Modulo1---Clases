// src/services/movies.service.js
// La capa de SERVICE se encarga de la LÓGICA DE NEGOCIO y el acceso a los datos.
// No sabe nada de req o res.

import { movies } from '../db/movies.js';

/**
 * Obtiene todas las películas
 */
const getAllMovies = () => {
    return movies;
};

/**
 * Busca una película por su ID
 * @param {number} id 
 */
const getMovieById = (id) => {
    return movies.find(movie => movie.id === id);
};

export const moviesService = {
    getAllMovies,
    getMovieById
};
