// backend/src/routes/auth.routes.js
import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/requireRole.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/profile', authMiddleware, authController.getProfile);
router.get('/admin', authMiddleware, requireRole('admin'), authController.getAdmin);

export default router;
