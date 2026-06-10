import styles from './CartSummary.module.css';

function CartSummary({ items, onCheckout, loading }) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <aside className={styles.box}>
      <p className={styles.label}>Resumen</p>
      <p className={styles.line}>Items: {totalItems}</p>
      <p className={styles.line}>Total: {totalPrice.toFixed(2)} EUR</p>
      <button className={styles.button} type="button" onClick={onCheckout} disabled={loading}>
        {loading ? 'Procesando...' : 'Checkout'}
      </button>
    </aside>
  );
}

export default CartSummary;
