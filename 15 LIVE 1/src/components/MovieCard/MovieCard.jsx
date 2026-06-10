import styles from './MovieCard.module.css';

function MovieCard({ movie, onAddToCart }) {
  return (
    <article className={styles.card}>
      <p className={styles.meta}>
        {movie.director} · {movie.year}
      </p>
      <h2 className={styles.title}>{movie.title}</h2>
      <p className={styles.genre}>{movie.genre}</p>
      <button className={styles.button} type="button" onClick={() => onAddToCart(movie.id)}>
        Anadir al carrito
      </button>
    </article>
  );
}

export default MovieCard;
