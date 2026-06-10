import styles from './ProductCard.module.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className={styles.card}>
      <p className={styles.category}>{product.category}</p>
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price} EUR</p>
      <button className={styles.button} type="button" onClick={() => onAddToCart(product.id)}>
        Anadir al carrito
      </button>
    </article>
  );
}

export default ProductCard;
