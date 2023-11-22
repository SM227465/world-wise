import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCities } from '../../contexts/CitiesContext';
import Spinner from '../spinner/Spinner';
import styles from './City.module.css';
import BackButton from '../back-btn/BackButton';

const City = () => {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = useCities();

  const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(date)
    );
  };

  useEffect(() => {
    getCity(Number(id));
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
