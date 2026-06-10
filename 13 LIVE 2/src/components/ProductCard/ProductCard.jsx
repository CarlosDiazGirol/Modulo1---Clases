import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <span className={styles.category}>{product.category}</span>
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{product.price} EUR</p>

      <Link className={styles.link} to={`/productos/${product.id}`}>
        Ver detalle
      </Link>
    </article>
  );
}

export default ProductCard;
