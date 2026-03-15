// src/routes/auth.routes.js
import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

// Ruta pública
router.post('/login', authController.login);

// Rutas protegidas — solo usuarios autenticados
router.get('/profile', authMiddleware, authController.getProfile);

// Ruta restringida — solo administradores
router.get('/admin', authMiddleware, requireRole('admin'), authController.getAdmin);

export default router;
