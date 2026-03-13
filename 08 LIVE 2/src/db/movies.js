// src/db/movies.js
// Base de datos compartida

export let movies = [
    { 
        id: 1, 
        title: "Matrix", 
        year: 1999, 
        director: "Lana & Lilly Wachowski" 
    },
    { 
        id: 2, 
        title: "Interstellar", 
        year: 2014, 
        director: "Christopher Nolan" 
    }
];

// Función helper para simplificar actualización
export const setMovies = (newMovies) => {
    movies = newMovies;
};
