// src/tests/wishlistService.test.js
import {
    addMovieToList,
    removeMovieFromList,
    isMovieInList
} from '../services/wishlistService.js';

// ─────────────────────────────────────────────
// addMovieToList
// ─────────────────────────────────────────────
describe('addMovieToList', () => {

    test('añade una película a la lista', () => {
        const result = addMovieToList(['movie1'], 'movie2');
        expect(result).toHaveLength(2);
        expect(result).toContain('movie2');
    });

    test('no añade duplicados', () => {
        const result = addMovieToList(['movie1', 'movie2'], 'movie1');
        expect(result).toHaveLength(2);
    });

    test('funciona con una lista vacía', () => {
        const result = addMovieToList([], 'movie1');
        expect(result).toHaveLength(1);
        expect(result).toContain('movie1');
    });

    test('no muta la lista original', () => {
        const original = ['movie1'];
        addMovieToList(original, 'movie2');
        expect(original).toHaveLength(1);
    });

});

// ─────────────────────────────────────────────
// removeMovieFromList
// ─────────────────────────────────────────────
describe('removeMovieFromList', () => {

    test('elimina una película de la lista', () => {
        const result = removeMovieFromList(['movie1', 'movie2'], 'movie1');
        expect(result).not.toContain('movie1');
        expect(result).toHaveLength(1);
    });

    test('devuelve la misma lista si la película no estaba', () => {
        const result = removeMovieFromList(['movie1'], 'movie3');
        expect(result).toHaveLength(1);
    });

    test('devuelve array vacío si la lista tenía solo esa película', () => {
        const result = removeMovieFromList(['movie1'], 'movie1');
        expect(result).toHaveLength(0);
    });

    test('no muta la lista original', () => {
        const original = ['movie1', 'movie2'];
        removeMovieFromList(original, 'movie1');
        expect(original).toHaveLength(2);
    });

});

// ─────────────────────────────────────────────
// isMovieInList
// ─────────────────────────────────────────────
describe('isMovieInList', () => {

    test('devuelve true si la película está en la lista', () => {
        expect(isMovieInList(['movie1', 'movie2'], 'movie1')).toBe(true);
    });

    test('devuelve false si la película no está en la lista', () => {
        expect(isMovieInList(['movie1'], 'movie3')).toBe(false);
    });

    test('devuelve false para una lista vacía', () => {
        expect(isMovieInList([], 'movie1')).toBe(false);
    });

});
