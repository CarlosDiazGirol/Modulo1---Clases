import prisma from '../lib/prisma.js';
import { clearCartByUser, getCartByUser } from './cart.service.js';

export async function checkoutOrder(userId) {
  const cartItems = await getCartByUser(userId);

  if (cartItems.length === 0) {
    const error = new Error('Cart is empty');
    error.status = 400;
    throw error;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      total,
    },
  });

  await clearCartByUser(userId);

  return order;
}
