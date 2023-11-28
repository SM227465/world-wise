import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import City from '../../interfaces/city';
import { getCities } from '../../services/city.service';
import CityItem from '../city-item/CityItem';
import NoCityMessage from '../no-city-message/NoCityMessage';
import Spinner from '../spinner/Spinner';
import styles from './CityList.module.css';

const CityList = () => {
  // const { cities, isLoading } = useCities();
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCityList = async () => {
      setIsLoading(true);

      const res = (await getCities()) as AxiosResponse;
      if (res?.data?.success) {
        console.log('Here', res.data?.cities);
        setCities(res.data?.cities);
      }

      setIsLoading(false);
    };
    getCityList();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <NoCityMessage message='Add your first city by clicking on a city on the map' />;
  }

  return (
    <ul className={styles.city}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
};

export default CityList;
