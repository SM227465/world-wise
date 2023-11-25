import { useEffect, useState } from 'react';
import BackButton from '../back-btn/BackButton';
import Button from '../button/Button';
import styles from './Form.module.css';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { convertToEmoji } from '../../utils';
import Message from '../message/Message';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = () => {
  const [cityName, setCityName] = useState('');
  const [lat, lng] = useUrlPosition();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  console.log('Here2', isLoadingGeocoding);
  useEffect(() => {
    const getCitydata = async () => {
      try {
        setIsLoadingGeoCoding(true);
        setGeocodingError('');

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error('It does not seem to be a city. Please click somewhere else.');
        }

        setCityName(data.city || data.locality || '');
        // setCityName(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setGeocodingError(error?.message || 'An error occurred during geocoding');
        } else {
          setGeocodingError('An unknown error occurred during geocoding');
        }
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };

    getCitydata();
  }, [lat, lng]);

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
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
