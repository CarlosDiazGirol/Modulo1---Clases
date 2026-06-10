import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header({ user, cartCount }) {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Sprint 15</p>
        <h1 className={styles.title}>Movie Catalog</h1>
      </div>

      <nav className={styles.nav}>
        <Link className={styles.link} to="/">
          Peliculas
        </Link>
        <Link className={styles.link} to="/login">
          Login
        </Link>
      </nav>

      <div className={styles.status}>
        <span>{user ? `Hola, ${user.email}` : 'Invitado'}</span>
        <span>Cart: {cartCount}</span>
      </div>
    </header>
  );
}

export default Header;
