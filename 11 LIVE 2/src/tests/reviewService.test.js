// src/tests/reviewService.test.js
// ✅ TESTS UNITARIOS — no necesitan base de datos
// Ejecutar con: npm run test:unit

import {
    calculateAverage,
    filterByMinRating,
    createReviewObject,
    sortReviews,
    getMovieWithMostReviews
} from '../services/reviewService.js';

// ─────────────────────────────────────────────
// 1. calculateAverage
// ─────────────────────────────────────────────
describe('calculateAverage', () => {

    test('calcula la media correctamente', () => {
        expect(calculateAverage([8, 9, 10])).toBe(9);
    });

    test('devuelve 0 si el array está vacío', () => {
        expect(calculateAverage([])).toBe(0);
    });

    test('devuelve 0 si ratings es null', () => {
        expect(calculateAverage(null)).toBe(0);
    });

    test('funciona con un solo valor', () => {
        expect(calculateAverage([7])).toBe(7);
    });

    test('calcula correctamente con decimales', () => {
        expect(calculateAverage([6, 7])).toBe(6.5);
    });

});

// ─────────────────────────────────────────────
// 2. filterByMinRating
// ─────────────────────────────────────────────
describe('filterByMinRating', () => {

    const reviews = [
        { movieId: 'movie1', rating: 5 },
        { movieId: 'movie2', rating: 8 },
        { movieId: 'movie3', rating: 9 }
    ];

    test('filtra reviews por rating mínimo', () => {
        expect(filterByMinRating(reviews, 8)).toHaveLength(2);
    });

    test('devuelve todas si el mínimo es 1', () => {
        expect(filterByMinRating(reviews, 1)).toHaveLength(3);
    });

    test('devuelve vacío si ninguna supera el mínimo', () => {
        expect(filterByMinRating(reviews, 10)).toHaveLength(0);
    });

});

// ─────────────────────────────────────────────
// 3. createReviewObject
// ─────────────────────────────────────────────
describe('createReviewObject', () => {

    test('crea un objeto de review correcto', () => {
        const review = createReviewObject('movie1', 'user1', 9, 'Great!');
        expect(review.movieId).toBe('movie1');
        expect(review.rating).toBe(9);
        expect(review.comment).toBe('Great!');
        expect(review.createdAt).toBeDefined();
    });

    test('usa string vacío como comment por defecto', () => {
        const review = createReviewObject('movie1', 'user1', 8);
        expect(review.comment).toBe('');
    });

    test('lanza error si el rating es mayor que 10', () => {
        expect(() => createReviewObject('movie1', 'user1', 11)).toThrow('El rating debe estar entre 1 y 10');
    });

    test('lanza error si movieId es null', () => {
        expect(() => createReviewObject(null, 'user1', 8)).toThrow('movieId, userId y rating son obligatorios');
    });

});

// ─────────────────────────────────────────────
// 4. sortReviews
// ─────────────────────────────────────────────
describe('sortReviews', () => {

    const reviews = [
        { movieId: 'movie1', rating: 6 },
        { movieId: 'movie2', rating: 9 },
        { movieId: 'movie3', rating: 7 }
    ];

    test('ordena de mayor a menor por defecto', () => {
        const result = sortReviews(reviews);
        expect(result[0].rating).toBe(9);
        expect(result[2].rating).toBe(6);
    });

    test('ordena de menor a mayor con order asc', () => {
        const result = sortReviews(reviews, 'asc');
        expect(result[0].rating).toBe(6);
        expect(result[2].rating).toBe(9);
    });

    test('no muta el array original', () => {
        sortReviews(reviews);
        expect(reviews[0].rating).toBe(6);
    });

});

// ─────────────────────────────────────────────
// 5. getMovieWithMostReviews
// ─────────────────────────────────────────────
describe('getMovieWithMostReviews', () => {

    test('devuelve el movieId con más reviews', () => {
        const reviews = [
            { movieId: 'movie1', rating: 8 },
            { movieId: 'movie1', rating: 9 },
            { movieId: 'movie2', rating: 7 }
        ];
        expect(getMovieWithMostReviews(reviews)).toBe('movie1');
    });

    test('devuelve null si el array está vacío', () => {
        expect(getMovieWithMostReviews([])).toBeNull();
    });

    test('funciona con un solo elemento', () => {
        expect(getMovieWithMostReviews([{ movieId: 'movie5', rating: 6 }])).toBe('movie5');
    });

});
