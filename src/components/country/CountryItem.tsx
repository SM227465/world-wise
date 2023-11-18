import Country from '../../interfaces/country';
import styles from './CountryItem.module.css';
interface Props {
  country: Country;
}

const CountryItem = (props: Props) => {
  const { country } = props;
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.name}</span>
    </li>
  );
};

export default CountryItem;
