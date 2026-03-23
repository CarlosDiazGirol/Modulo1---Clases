// src/server.js
// Igual que el Live 1 + Swagger UI servido como archivos estáticos

import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import cartRouter from './routes/cart.routes.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

// Servir swagger.json como archivo estático (lo necesita docs/index.html)
app.use(express.static(join(__dirname, '..')));

// Swagger UI — docs/index.html cargado desde /api/docs
// En producción se puede desactivar con: if (process.env.NODE_ENV !== 'production')
app.use('/api/docs', express.static(join(__dirname, '../docs')));

app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🛒 Cart API en http://localhost:${PORT}`);
    console.log(`📚 Swagger UI:  http://localhost:${PORT}/api/docs`);
});
