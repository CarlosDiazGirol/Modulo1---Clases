// src/server.js
import 'dotenv/config';
import express from 'express';
import authRouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.use(authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🔐 Auth API corriendo en http://localhost:${PORT}`);
    console.log(`📡 Rutas disponibles:`);
    console.log(`   POST /login`);
    console.log(`   GET  /profile  (requiere token)`);
    console.log(`   GET  /admin    (requiere token + rol admin)`);
});
