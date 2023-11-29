import { useCities } from '../../contexts/CitiesContext';
import { City } from '../../interfaces/city';
import Country from '../../interfaces/country';
import CountryItem from '../country/CountryItem';
import NoCityMessage from '../no-city-message/NoCityMessage';
import Spinner from '../spinner/Spinner';
import styles from './CountryList.module.css';

const CountryList = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <NoCityMessage message='Add your first city by clicking on a city on the map' />;
  }

  const countries = cities.reduce((accumulator: Country[], currentCity: City) => {
    if (!accumulator.map((city) => city.name).includes(currentCity.country)) {
      return [...accumulator, { name: currentCity.country, emoji: currentCity.emoji }];
    } else {
      return accumulator;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.name} />
      ))}
    </ul>
  );
};

export default CountryList;
