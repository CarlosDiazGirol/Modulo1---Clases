// src/services/wishlistService.js
// Funciones puras — no dependen de MongoDB ni de ninguna librería externa.

/**
 * Añade una película a la lista. No añade duplicados.
 * @param {string[]} list - Lista actual de movieIds
 * @param {string} movieId
 * @returns {string[]} - Nueva lista con la película añadida
 */
export const addMovieToList = (list, movieId) => {
    if (list.includes(movieId)) return list;
    return [...list, movieId];
};

/**
 * Elimina una película de la lista.
 * @param {string[]} list - Lista actual de movieIds
 * @param {string} movieId
 * @returns {string[]} - Nueva lista sin la película
 */
export const removeMovieFromList = (list, movieId) => {
    return list.filter(id => id !== movieId);
};

/**
 * Comprueba si una película está en la lista.
 * @param {string[]} list
 * @param {string} movieId
 * @returns {boolean}
 */
export const isMovieInList = (list, movieId) => {
    return list.includes(movieId);
};
