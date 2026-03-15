// backend/src/server.js
// Mismo servidor del Live 1 con tres middlewares de seguridad añadidos

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from './routes/auth.routes.js';

const app = express();

// --- MIDDLEWARES DE SEGURIDAD ---

// 1. Helmet: añade cabeceras HTTP de seguridad automáticamente
app.use(helmet());

// 2. CORS: permite que el frontend (diferente origen) acceda a la API
// En producción, sustituir origin por el dominio real del frontend
app.use(cors({
    origin: 'http://localhost:5500', // Live Server de VS Code
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Rate Limit: máximo 10 peticiones por minuto por IP
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 10,
    message: { ok: false, error: 'Demasiadas peticiones. Inténtalo en 1 minuto.' }
});
app.use(limiter);

// --- MIDDLEWARE JSON ---
app.use(express.json());

// --- RUTAS ---
app.use(authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🔐 Auth API (segura) en http://localhost:${PORT}`);
});
