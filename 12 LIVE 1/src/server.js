// src/server.js
import 'dotenv/config';
import express from 'express';
import cartRouter from './routes/cart.routes.js';

const app = express();

app.use(express.json());

app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🛒 Cart API en http://localhost:${PORT}`);
    console.log(`   GET  /api/cart           → ver carrito`);
    console.log(`   POST /api/cart/items     → añadir producto`);
    console.log(`   POST /api/cart/checkout  → checkout`);
});
