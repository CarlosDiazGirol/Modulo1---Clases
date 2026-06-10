import express from 'express';
import { checkoutOrderController } from '../controllers/orders.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, checkoutOrderController);

export default router;
