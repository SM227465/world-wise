import { Link } from 'react-router-dom';
import City from '../../interfaces/city';
import styles from './CityItem.module.css';

interface Props {
  city: City;
}

const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(date)
  );
};

const CityItem = (props: Props) => {
  const { city } = props;

  console.log(city.position);

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
