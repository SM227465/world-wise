import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import City from '../interfaces/city';
const BASE_URL = 'http://localhost:8000';

interface CitiesContextType {
  isLoading: boolean;
  cities: City[];
}

const CitiesContext = createContext<CitiesContextType>({
  isLoading: false,
  cities: [],
});

interface Props {
  children: ReactNode;
}

const CitiesProvider = (props: Props) => {
  const { children } = props;
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL + '/cities');
        const data = await res.json();
        // console.log('Cities', data);

        setCities(data);
      } catch (error) {
        console.log('Error in fetch cities', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return <CitiesContext.Provider value={{ cities, isLoading }}>{children}</CitiesContext.Provider>;
};

const useCities = () => {
  const context = useContext(CitiesContext);

  if (context === undefined) {
    throw new Error('CitiesContext was used outside of the CitiesProvider');
  }

  return context;
};

export { CitiesProvider, useCities };
