// src/server.js
import 'dotenv/config';
import express from 'express';
import { connectDB } from './db/database.js';
import reviewRoutes from './routes/reviewRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';

const app = express();

app.use(express.json());

app.use(reviewRoutes);
app.use(wishlistRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Servidor en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Error al conectar con MongoDB:', error.message);
        process.exit(1);
    });
