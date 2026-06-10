import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange() {
    // TODO en clase: convertir el formulario en controlado con name, value y onChange.
  }

  async function handleSubmit(event) {
    // TODO en clase: usar preventDefault y enviar formData real.
    if (event) {
      setError('');
    }

    try {
      await loginUser({
        email: 'demo@demo.com',
        password: '123456',
      });
      navigate('/');
    } catch (submitError) {
      setError('Login incorrecto o backend no disponible.');
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Login</p>
        <h2 className={styles.title}>Acceder a la aplicacion</h2>

        {error && <StatusMessage title="No se pudo iniciar sesion" description={error} variant="error" />}

        <form className={styles.form}>
          <label className={styles.field}>
            <span>Email</span>
            <input ref={emailInputRef} type="email" name="email" placeholder="tu@email.com" />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input type="password" name="password" placeholder="******" />
          </label>

          <button className={styles.button} type="button" onClick={handleSubmit}>
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
