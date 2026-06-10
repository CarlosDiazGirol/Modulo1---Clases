import { useEffect, useState } from 'react';
import { getReviewsByMovieId } from '../../api/reviews';
import StatusMessage from '../StatusMessage/StatusMessage';
import styles from './ReviewList.module.css';

function ReviewList({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReviews() {
      try {
        setLoading(true);
        setError('');
        const data = await getReviewsByMovieId(movieId);
        setReviews(data);
      } catch (fetchError) {
        setError('No se pudieron cargar las reviews.');
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [movieId]);

  if (loading) {
    return <StatusMessage title="Cargando reviews" description="Consultando opiniones de usuarios..." />;
  }

  if (error) {
    return <StatusMessage title="Error al cargar reviews" description={error} variant="error" />;
  }

  if (reviews.length === 0) {
    return (
      <StatusMessage
        title="Sin reviews"
        description="La pelicula existe, pero todavia no tiene valoraciones."
      />
    );
  }

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Reviews</h3>
      <div className={styles.list}>
        {reviews.map((review) => (
          <article key={review._id ?? `${review.userId}-${review.movieId}`} className={styles.card}>
            <p className={styles.rating}>Rating: {review.rating}/10</p>
            <p className={styles.comment}>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ReviewList;
