import styles from './LoginPage.module.css';

function LoginPage({ setUser }) {
  function handleFakeLogin() {
    setUser({
      email: 'student@thebridge.com',
      role: 'USER',
    });
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Login</p>
        <h2 className={styles.title}>Todavia sin Redux</h2>
        <p className={styles.copy}>
          Este boton modifica usuario en un componente y Header depende del mismo dato.
        </p>
        <button className={styles.button} type="button" onClick={handleFakeLogin}>
          Simular login
        </button>
      </section>
    </main>
  );
}

export default LoginPage;
