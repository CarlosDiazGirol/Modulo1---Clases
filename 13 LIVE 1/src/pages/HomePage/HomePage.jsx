import Header from '../../components/Header/Header';
import HeroCard from '../../components/HeroCard/HeroCard';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.grid}>
        <HeroCard
          tag="React"
          title="Interfaces basadas en componentes"
          description="Cada parte de la UI se puede separar en piezas pequeñas y reutilizables."
        />

        <HeroCard
          tag="JSX"
          title="HTML dentro de JavaScript"
          description="JSX permite escribir la estructura visual de forma cercana al HTML tradicional."
        />

        <HeroCard
          tag="Props"
          title="Datos de padre a hijo"
          description="Las props son la base para comunicar componentes y reutilizar lógica visual."
        />
      </section>
    </main>
  );
}

export default HomePage;
