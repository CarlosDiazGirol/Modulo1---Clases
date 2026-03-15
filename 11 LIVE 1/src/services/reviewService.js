// src/services/reviewService.js
import { Review } from '../models/Review.js';

// --- Operaciones con la base de datos ---

export const createReview = async (data) => {
    const review = new Review(data);
    return await review.save();
};

export const getReviewsByMovie = async (movieId) => {
    return await Review.find({ movieId });
};

export const updateReview = async (id, data) => {
    return await Review.findByIdAndUpdate(id, data, { new: true });
};

export const deleteReview = async (id) => {
    return await Review.findByIdAndDelete(id);
};

// --- Funciones puras (sin base de datos) ---
// Estas funciones serán testeadas con Jest en la siguiente clase

export const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return sum / ratings.length;
};

export const filterByMinRating = (reviews, minRating) => {
    return reviews.filter(r => r.rating >= minRating);
};

export const createReviewObject = (movieId, userId, rating, comment = '') => {
    if (!movieId || !userId || !rating) {
        throw new Error('movieId, userId y rating son obligatorios');
    }
    if (rating < 1 || rating > 10) {
        throw new Error('El rating debe estar entre 1 y 10');
    }
    return { movieId, userId, rating, comment, createdAt: new Date().toISOString() };
};
