// src/services/reviewService.js
// ✅ FUNCIONES PURAS — no dependen de MongoDB ni de ninguna librería externa.
// No necesitan .env. Se pueden testear directamente con: npm run test:unit

// 1 ─ Calcula la media de un array de ratings
export const calculateAverage = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return sum / ratings.length;
};

// 2 ─ Filtra reviews cuyo rating sea mayor o igual al mínimo
export const filterByMinRating = (reviews, minRating) => {
    return reviews.filter(r => r.rating >= minRating);
};

// 3 ─ Crea y valida un objeto de review SIN guardarlo en la base de datos
export const createReviewObject = (movieId, userId, rating, comment = '') => {
    if (!movieId || !userId || !rating) {
        throw new Error('movieId, userId y rating son obligatorios');
    }
    if (rating < 1 || rating > 10) {
        throw new Error('El rating debe estar entre 1 y 10');
    }
    return { movieId, userId, rating, comment, createdAt: new Date().toISOString() };
};

// 4 ─ Ordena reviews por rating ('asc' o 'desc')
export const sortReviews = (reviews, order = 'desc') => {
    return [...reviews].sort((a, b) =>
        order === 'asc' ? a.rating - b.rating : b.rating - a.rating
    );
};

// 5 ─ Devuelve el movieId que tiene más reviews en el array
export const getMovieWithMostReviews = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const counts = reviews.reduce((acc, r) => {
        acc[r.movieId] = (acc[r.movieId] || 0) + 1;
        return acc;
    }, {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};
