import { products } from '../../data/products';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  // TODO en clase: obtener productId desde la URL con useParams.
  const product = products[0];

  return (
    <main className={styles.page}>
      <p className={styles.label}>Detalle</p>
      <h2 className={styles.title}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.meta}>Categoria: {product.category}</p>
      <p className={styles.meta}>Precio: {product.price} EUR</p>
    </main>
  );
}

export default ProductDetailPage;
