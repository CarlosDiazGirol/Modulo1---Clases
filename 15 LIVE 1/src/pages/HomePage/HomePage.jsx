import { useEffect, useState } from 'react';
import { getMovies } from '../../api/movies';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './HomePage.module.css';

function HomePage({ cartCount, setCartCount }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  function handleAddToCart() {
    setCartCount(cartCount + 1);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 1</p>
        <h2 className={styles.title}>Estado duplicado en varios componentes</h2>
        <p className={styles.copy}>
          El contador de carrito y el usuario ya se comparten, pero ahora mismo suben y bajan
          por props.
        </p>
      </section>

      <StatusMessage
        title="Problema real"
        description="HomePage modifica el carrito y Header lo muestra. LoginPage cambia usuario y Header tambien lo necesita."
      />

      <MovieGrid movies={movies} onAddToCart={handleAddToCart} />
    </main>
  );
}

export default HomePage;
