import { FormEvent, useEffect, useState } from 'react';
import BackButton from '../back-btn/BackButton';
import Button from '../button/Button';
import styles from './Form.module.css';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { convertToEmoji } from '../../utils';
import Message from '../message/Message';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

const Form = () => {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [lat, lng] = useUrlPosition();
  const [date, setDate] = useState<Date | null>(new Date());
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
        setCountry(data.countryName);
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

    if (lat && lng) {
      getCitydata();
    }
  }, [lat, lng]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      id: Number(Date.now()),
      cityName,
      country,
      emoji,
      date: String(date),
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate('/app/cities');
  };

  if (!lat && !lng) {
    return <Message message='Start by clicking somewhere on the map.' />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat='dd/MM/yyyy'
          id='date'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea id='notes' onChange={(event) => setNotes(event.target.value)} value={notes} />
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
