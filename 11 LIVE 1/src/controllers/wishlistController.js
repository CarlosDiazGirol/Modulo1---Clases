// src/controllers/wishlistController.js
import * as wishlistService from '../services/wishlistService.js';

export const addToWishlist = async (req, res) => {
    try {
        const { userId, movieId } = req.body;
        if (!userId || !movieId) {
            return res.status(400).json({ ok: false, error: 'userId y movieId son obligatorios' });
        }
        const item = await wishlistService.addToWishlist(userId, movieId);
        res.status(201).json({ ok: true, data: item });
    } catch (error) {
        res.status(400).json({ ok: false, error: error.message });
    }
};

export const getWishlistByUser = async (req, res) => {
    try {
        const items = await wishlistService.getWishlistByUser(req.params.userId);
        res.json({ ok: true, data: items });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const item = await wishlistService.removeFromWishlist(req.params.id);
        if (!item) return res.status(404).json({ ok: false, error: 'Elemento no encontrado' });
        res.json({ ok: true, message: 'Eliminado de la wishlist' });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
