import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import cartRouter from './routes/cart.routes.js';
import ordersRouter from './routes/orders.routes.js';
import productsRouter from './routes/products.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    ok: false,
    error: error.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
