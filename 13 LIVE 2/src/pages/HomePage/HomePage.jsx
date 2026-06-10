import { useState } from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { products } from '../../data/products';
import styles from './HomePage.module.css';

function HomePage() {
  const [search, setSearch] = useState('');

  // TODO en clase: filtrar por nombre o categoria usando search.
  const visibleProducts = products;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 2</p>
        <h2 className={styles.title}>Buscador, listas y navegación</h2>
        <p className={styles.copy}>
          El proyecto parte del Live 1 y ahora evoluciona a una SPA con estado local y rutas.
        </p>
      </section>

      <section className={styles.toolbar}>
        <label className={styles.label} htmlFor="search">
          Buscar producto
        </label>
        <input
          id="search"
          className={styles.input}
          type="text"
          placeholder="Escribe para filtrar..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <ProductGrid products={visibleProducts} />
    </main>
  );
}

export default HomePage;
