import express from 'express';

const router = express.Router();

const products = [
  {
    id: 1,
    name: 'Laptop HP',
    price: 899.99,
    category: 'Electrónica',
    stock: 15
  },
  {
    id: 2,
    name: 'Mouse Logitech',
    price: 29.99,
    category: 'Accesorios',
    stock: 50
  },
  {
    id: 3,
    name: 'Teclado Mecánico',
    price: 129.99,
    category: 'Accesorios',
    stock: 30
  },
  {
    id: 4,
    name: 'Monitor Samsung 27"',
    price: 299.99,
    category: 'Electrónica',
    stock: 20
  }
];

router.get('/products', (req, res) => {  
  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

router.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Producto con ID ${productId} no encontrado`
    });
  }
  res.json({
    success: true,
    data: product
  });
});

export default router;