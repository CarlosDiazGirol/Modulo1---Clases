import { useState } from 'react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './HomePage.module.css';

function HomePage() {
  const [movies] = useState([]);
  const [loading] = useState(false);
  const [error] = useState('');

  // TODO en clase:
  // 1. importar useEffect
  // 2. llamar a getMovies()
  // 3. gestionar loading, error y datos

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 1</p>
        <h2 className={styles.title}>Consumir peliculas desde una API real</h2>
        <p className={styles.copy}>
          El objetivo es sustituir el mock por datos del backend y entender el flujo completo
          de asincronía en React.
        </p>
      </section>

      {loading && (
        <StatusMessage
          title="Cargando peliculas"
          description="Esperando respuesta del backend..."
        />
      )}

      {error && <StatusMessage title="Ha ocurrido un error" description={error} variant="error" />}

      {!loading && !error && <MovieGrid movies={movies} />}
    </main>
  );
}

export default HomePage;
