import styles from './HeroCard.module.css';

function HeroCard({ title, description, tag }) {
  return (
    <article className={styles.card}>
      <span className={styles.tag}>{tag}</span>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default HeroCard;
