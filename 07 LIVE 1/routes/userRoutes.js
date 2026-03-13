import express from 'express';

const router = express.Router();

const users = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana@example.com',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    email: 'carlos@example.com',
    role: 'user'
  },
  {
    id: 3,
    name: 'María López',
    email: 'maria@example.com',
    role: 'user'
  }
];

router.get('/users', (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

router.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `Usuario con ID ${userId} no encontrado`
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

export default router;