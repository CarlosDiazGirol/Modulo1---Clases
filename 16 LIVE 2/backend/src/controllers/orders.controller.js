import { checkoutOrder } from '../services/orders.service.js';

export async function checkoutOrderController(req, res, next) {
  try {
    const data = await checkoutOrder(req.user.id);
    res.status(201).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}
