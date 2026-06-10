import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 2</p>
        <h2 className={styles.title}>Autenticacion real con backend y Redux</h2>
        <p className={styles.copy}>
          El objetivo es conectar login, register, token y proteccion de rutas.
        </p>
      </section>

      <StatusMessage
        title="Flujo esperado"
        description="Register crea usuario, login devuelve JWT y la UI cambia segun el estado global."
      />
    </main>
  );
}

export default HomePage;
