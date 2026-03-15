// src/controllers/auth.controller.js
// Gestiona las peticiones de las rutas de autenticación

import { authService } from '../services/auth.service.js';

// POST /login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ ok: false, error: 'Email y password son obligatorios' });
        }

        const token = await authService.login(email, password);
        res.json({ ok: true, token });

    } catch (error) {
        // Usamos 401 para no revelar si el email existe o no
        res.status(401).json({ ok: false, error: error.message });
    }
};

// GET /profile — ruta protegida (cualquier usuario autenticado)
const getProfile = (req, res) => {
    // req.user fue añadido por authMiddleware
    res.json({
        ok: true,
        data: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }
    });
};

// GET /admin — ruta solo para administradores
const getAdmin = (req, res) => {
    res.json({
        ok: true,
        message: `Bienvenido al panel de admin, ${req.user.email}`
    });
};

export const authController = { login, getProfile, getAdmin };
