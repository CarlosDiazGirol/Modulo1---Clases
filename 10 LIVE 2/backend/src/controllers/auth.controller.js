// backend/src/controllers/auth.controller.js
import { authService } from '../services/auth.service.js';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ ok: false, error: 'Email y password son obligatorios' });
        }
        const token = await authService.login(email, password);
        res.json({ ok: true, token });
    } catch (error) {
        res.status(401).json({ ok: false, error: error.message });
    }
};

const getProfile = (req, res) => {
    res.json({ ok: true, data: { id: req.user.id, email: req.user.email, role: req.user.role } });
};

const getAdmin = (req, res) => {
    res.json({ ok: true, message: `Bienvenido al panel de admin, ${req.user.email}` });
};

export const authController = { login, getProfile, getAdmin };
