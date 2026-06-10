import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  function handleChange() {
    // TODO en clase: actualizar formData con e.target.name y e.target.value.
  }

  async function handleSubmit() {
    // TODO en clase: usar onSubmit + preventDefault + validacion previa.
    if (!formData.email) {
      setError('Completa el formulario antes de continuar.');
      return;
    }

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (submitError) {
      setError('No se pudo completar el registro.');
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Register</p>
        <h2 className={styles.title}>Crear una cuenta</h2>

        {error && <StatusMessage title="Error en el formulario" description={error} variant="error" />}

        <form className={styles.form}>
          <label className={styles.field}>
            <span>Nombre</span>
            <input type="text" name="name" placeholder="Ada Lovelace" />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input type="email" name="email" placeholder="ada@email.com" />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input type="password" name="password" placeholder="******" />
          </label>

          <button className={styles.button} type="button" onClick={handleSubmit}>
            Registrarme
          </button>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
