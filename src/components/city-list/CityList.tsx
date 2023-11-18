import { useCities } from '../../contexts/CitiesContext';
import CityItem from '../city-item/CityItem';
import NoCityMessage from '../no-city-message/NoCityMessage';
import Spinner from '../spinner/Spinner';
import styles from './CityList.module.css';

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <NoCityMessage message='Add your first city by clicking on a city on the map' />;
  }

  return (
    <ul className={styles.city}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
