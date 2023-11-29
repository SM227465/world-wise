import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../back-btn/BackButton';
import Spinner from '../spinner/Spinner';
import styles from './City.module.css';
import { getCity } from '../../services/city.service';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { City } from '../../interfaces/city';

const City = () => {
  const { id } = useParams();
  // const { currentCity, getCity, isLoading } = useCities();
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({} as City);

  const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(date)
    );
  };

  useEffect(() => {
    // getCity(id);
    const getCurrentCity = async () => {
      if (!id) {
        return;
      }

      setIsLoading(true);

      const res = (await getCity(id)) as AxiosResponse;

      if (res?.data?.success) {
        toast(res?.data?.message);
        setCurrentCity(res.data.city);
      } else {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        toast(
          (res as any)?.response?.data?.message.split(':')[1].trim() || 'Something went wrong!'
        );
      }

      setIsLoading(false);
    };

    getCurrentCity();
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }

  const { emoji, cityName, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        {date && <p>{formatDate(date)}</p>}
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a href={`https://en.wikipedia.org/wiki/${cityName}`} target='_blank' rel='noreferrer'>
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
};

export default City;
