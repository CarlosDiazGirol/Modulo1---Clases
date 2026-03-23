// src/routes/cart.routes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getCartController, addItemController, checkoutController } from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getCartController);
router.post('/items', authMiddleware, addItemController);
router.post('/checkout', authMiddleware, checkoutController);

export default router;
