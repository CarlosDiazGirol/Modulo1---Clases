import { useState } from 'react';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    // TODO en clase: dispatch(loginThunk(formData)) con preventDefault.
    event.preventDefault();
    setError('Falta conectar login con Redux Toolkit.');
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Login</p>
        <h2 className={styles.title}>Iniciar sesion</h2>

        {error && <StatusMessage title="Pendiente de conectar" description={error} variant="error" />}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@thebridge.com"
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
            />
          </label>

          <button className={styles.button} type="submit">
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
