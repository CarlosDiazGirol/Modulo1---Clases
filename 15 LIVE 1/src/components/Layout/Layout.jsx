import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.css';

function Layout({ user, cartCount }) {
  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <Header user={user} cartCount={cartCount} />
        <Outlet context={{ user, cartCount }} />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
