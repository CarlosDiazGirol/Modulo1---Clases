import StatusMessage from '../../components/StatusMessage/StatusMessage';
import styles from './AdminPage.module.css';

function AdminPage() {
  return (
    <main className={styles.page}>
      <p className={styles.label}>Admin</p>
      <h2 className={styles.title}>Ruta protegida</h2>
      <StatusMessage
        title="Acceso avanzado"
        description="Esta pagina debe depender del token y del rol del usuario."
      />
    </main>
  );
}

export default AdminPage;
