// src/services/cart.service.js
import { prisma } from '../lib/prisma.js';

// Obtiene el carrito ACTIVE del usuario.
// Si no existe, lo crea automáticamente.
export const getCart = async (userId) => {
    let cart = await prisma.cart.findFirst({
        where: { userId, status: 'ACTIVE' },
        include: { items: true }
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId },
            include: { items: true }
        });
    }

    return cart;
};

// Añade un producto al carrito.
// Si el producto ya estaba en el carrito, suma la cantidad en lugar de duplicar.
export const addItem = async (userId, productId, quantity) => {
    const cart = await getCart(userId);

    const existingItem = await prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId }
    });

    if (existingItem) {
        return prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity }
        });
    }

    return prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity }
    });
};

// Realiza el checkout:
// 1. Obtiene el carrito activo
// 2. Calcula el total (precio fijo de 10€ por unidad — simplificado para la clase)
// 3. Crea el Order
// 4. Cambia el carrito a CHECKED_OUT
export const checkout = async (userId) => {
    const cart = await prisma.cart.findFirst({
        where: { userId, status: 'ACTIVE' },
        include: { items: true }
    });

    if (!cart) throw new Error('No hay carrito activo');
    if (cart.items.length === 0) throw new Error('El carrito está vacío');

    // Precio fijo para simplificar la clase.
    // En producción: consultar prisma.product para obtener el precio real de cada item.
    const total = cart.items.reduce((acc, item) => acc + item.quantity * 10, 0);

    const order = await prisma.order.create({
        data: { userId, total }
    });

    await prisma.cart.update({
        where: { id: cart.id },
        data: { status: 'CHECKED_OUT' }
    });

    return order;
};
