import prisma from '../lib/prisma.js';

export async function getCartByUser(userId) {
  return prisma.cartItem.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  });
}

export async function addItemToCart(userId, productId, quantity) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity,
      price: product.price,
      name: product.name,
    },
  });
}

export async function clearCartByUser(userId) {
  return prisma.cartItem.deleteMany({
    where: { userId },
  });
}
