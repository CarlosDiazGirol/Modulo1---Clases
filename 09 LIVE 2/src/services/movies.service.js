// src/services/movies.service.js
// Los services ahora usan Prisma en lugar de un array en memoria

import prisma from '../lib/prisma.js';

const getAllMovies = () => {
    return prisma.movie.findMany({
        orderBy: { id: 'asc' }
    });
};

const getMovieById = (id) => {
    return prisma.movie.findUnique({
        where: { id }
    });
};

const createMovie = (data) => {
    return prisma.movie.create({ data });
};

const updateMovie = (id, data) => {
    return prisma.movie.update({
        where: { id },
        data
    });
};

const deleteMovie = (id) => {
    return prisma.movie.delete({
        where: { id }
    });
};

export const moviesService = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
