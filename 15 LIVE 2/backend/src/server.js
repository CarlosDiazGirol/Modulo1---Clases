import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { meController } from './controllers/auth.controller.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Auth API running' });
});

app.use('/api/auth', authRouter);
app.get('/api/me', authMiddleware, meController);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    ok: false,
    error: error.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
