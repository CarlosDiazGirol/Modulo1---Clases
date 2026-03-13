import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'El servidor está funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime() // segundos que lleva el servidor corriendo
  });
});

export default router;