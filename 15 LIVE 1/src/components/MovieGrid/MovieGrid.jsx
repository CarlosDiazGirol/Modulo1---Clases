import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieGrid.module.css';

function MovieGrid({ movies, onAddToCart }) {
  return (
    <section className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}

export default MovieGrid;
