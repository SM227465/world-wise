import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import City from '../interfaces/city';
const BASE_URL = 'http://localhost:8000';

interface CitiesContextType {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  getCity: (id: number) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType>({} as CitiesContextType);

interface Props {
  children: ReactNode;
}

const CitiesProvider = (props: Props) => {
  const { children } = props;
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({} as City);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL + '/cities');
        const data = await res.json();

        setCities(data);
      } catch (error) {
        console.log('Error in fetch cities', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(BASE_URL + `/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      console.log('Error in fetch city', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error('CitiesContext was used outside of the CitiesProvider');
  }

  return context;
};

export { CitiesProvider, useCities };
