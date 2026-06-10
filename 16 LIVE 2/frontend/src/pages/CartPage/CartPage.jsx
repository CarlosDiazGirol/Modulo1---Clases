import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkoutOrder } from '../../api/orders';
import CartSummary from '../../components/CartSummary/CartSummary';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import { clearCart } from '../../store/slices/cartSlice';
import styles from './CartPage.module.css';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout() {
    try {
      setLoading(true);
      setError('');
      const order = await checkoutOrder();
      dispatch(clearCart());
      navigate('/checkout/success', { state: { order } });
    } catch (checkoutError) {
      setError('No se pudo completar el checkout.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Carrito</p>
        <h2 className={styles.title}>Cierre del flujo de compra</h2>
      </section>

      {error && <StatusMessage title="Error en checkout" description={error} variant="error" />}

      {items.length === 0 ? (
        <StatusMessage title="Carrito vacio" description="Anade productos antes de comprar." />
      ) : (
        <section className={styles.layout}>
          <div className={styles.list}>
            {items.map((item) => (
              <article key={item.id} className={styles.item}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.quantity}>Cantidad: {item.quantity}</p>
                <p className={styles.price}>Precio: {item.price} EUR</p>
              </article>
            ))}
          </div>

          <CartSummary items={items} onCheckout={handleCheckout} loading={loading} />
        </section>
      )}
    </main>
  );
}

export default CartPage;
