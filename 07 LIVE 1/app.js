import express from 'express';
import healthRoutes from './routes/healthRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido a la API de Express!',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      users: '/api/users'
    }
  });
});

app.use(healthRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.url} no existe en este servidor`,
    availableRoutes: ['/health', '/api/products', '/api/users']
  });
});

export default app;