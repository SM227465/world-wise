import { useState } from 'react';
import BackButton from '../back-btn/BackButton';
import Button from '../button/Button';
import styles from './Form.module.css';

const Form = () => {
  const [cityName, setCityName] = useState('');
  //   const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <input
          id='date'
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toISOString().split('T')[0]}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type='primary' onClick={() => {}}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
};

export default Form;
