import { Outlet } from 'react-router-dom';
import Logo from '../logo/Logo';
// import NavBar from '../navbar/NavBar';
import styles from './Sidebar.module.css';
import AppNav from '../app-nav/AppNav';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* <p>List of cities</p> */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by world-wise Inc
        </p>
      </footer>
    </div>
  );
};

export default Sidebar;
