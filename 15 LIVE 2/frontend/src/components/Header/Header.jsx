import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ user, token }) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Sprint 15</p>
        <h1 className={styles.title}>Movie Auth App</h1>
      </div>

      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link className={styles.link} to="/login">
          Login
        </Link>
        <Link className={styles.link} to="/register">
          Register
        </Link>
        <Link className={styles.link} to="/admin">
          Admin
        </Link>
      </nav>

      <div className={styles.status}>
        <span>{user ? user.email : 'Invitado'}</span>
        <span>{token ? 'Sesion activa' : 'Sin token'}</span>
      </div>
    </header>
  );
}

export default Header;
