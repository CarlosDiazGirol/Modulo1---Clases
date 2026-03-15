// src/services/wishlistService.js
import { Wishlist } from '../models/Wishlist.js';

// --- Operaciones con la base de datos ---

export const addToWishlist = async (userId, movieId) => {
    const item = new Wishlist({ userId, movieId });
    return await item.save();
};

export const getWishlistByUser = async (userId) => {
    return await Wishlist.find({ userId });
};

export const removeFromWishlist = async (id) => {
    return await Wishlist.findByIdAndDelete(id);
};

// --- Funciones puras (sin base de datos) ---
// Estas funciones serán testeadas con Jest en la siguiente clase

export const addMovieToList = (list, movieId) => {
    if (list.includes(movieId)) return list;
    return [...list, movieId];
};

export const removeMovieFromList = (list, movieId) => {
    return list.filter(id => id !== movieId);
};

export const isMovieInList = (list, movieId) => {
    return list.includes(movieId);
};
