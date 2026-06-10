import { useParams } from 'react-router-dom';
import { useState } from 'react';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './MovieDetailPage.module.css';

function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie] = useState(null);
  const [loading] = useState(false);
  const [error] = useState('');

  // TODO en clase:
  // 1. importar useEffect
  // 2. llamar a getMovieById(movieId)
  // 3. gestionar loading, error y movie

  if (loading) {
    return (
      <StatusMessage
        title="Cargando detalle"
        description={`Buscando la pelicula con id ${movieId}...`}
      />
    );
  }

  if (error) {
    return <StatusMessage title="No se pudo cargar la pelicula" description={error} variant="error" />;
  }

  if (!movie) {
    return (
      <StatusMessage
        title="Detalle preparado"
        description="La UI ya esta lista; falta conectar la llamada real al backend."
      />
    );
  }

  return (
    <main className={styles.page}>
      <p className={styles.label}>Detalle</p>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.meta}>
        {movie.director} · {movie.year} · {movie.genre}
      </p>
      <p className={styles.synopsis}>{movie.synopsis}</p>
    </main>
  );
}

export default MovieDetailPage;
