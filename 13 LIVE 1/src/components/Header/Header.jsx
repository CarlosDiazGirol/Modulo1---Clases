import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>Sprint 13</p>
      <h1 className={styles.title}>React desde cero</h1>
      <p className={styles.copy}>
        Primera toma de contacto con componentes, JSX, props y estructura de proyecto.
      </p>
    </header>
  );
}

export default Header;
