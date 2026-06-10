import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>Sprint 13</p>
        <h1 className={styles.title}>React Shop Lab</h1>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/productos/react-1"
          className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          Ejemplo detalle
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
