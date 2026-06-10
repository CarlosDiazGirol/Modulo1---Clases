import prisma from '../lib/prisma.js';

export async function getCartByUser(userId) {
  return prisma.cartItem.findMany({
    where: { userId },
    orderBy: { productId: 'asc' },
  });
}

export async function addItemToCart(userId, productId, quantity) {
  // TODO en clase: si ya existe, sumar quantity en lugar de duplicar linea.
  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
}
