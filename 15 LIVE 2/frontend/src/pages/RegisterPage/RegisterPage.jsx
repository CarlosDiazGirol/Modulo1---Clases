import { useState } from 'react';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './RegisterPage.module.css';

function RegisterPage() {
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
    // TODO en clase: dispatch(registerThunk(formData)) y navegar al login.
    event.preventDefault();
    setError('Falta conectar register con Redux Toolkit.');
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Register</p>
        <h2 className={styles.title}>Crear una cuenta</h2>

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
            Registrarme
          </button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
