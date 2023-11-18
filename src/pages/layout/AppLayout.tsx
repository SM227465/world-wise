import Map from '../../components/map/Map';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './AppLayout.module.css';
const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      {/* <User /> */}
    </div>
  );
};

export default AppLayout;
