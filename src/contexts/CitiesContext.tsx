import { ReactNode, createContext, useContext, useEffect, useReducer } from 'react';
import City from '../interfaces/city';
import ReducerAction from '../interfaces/reducerAction';
import ReducerInitialState from '../interfaces/reducerInitialState';
const BASE_URL = 'http://localhost:8000';

interface CitiesContextType {
  error: string;
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  getCity: (id: number) => Promise<void>;
  createCity: (newCity: City) => Promise<void>;
  deleteCity: (cityId: number) => Promise<void>;
}

const initialState: ReducerInitialState = {
  cities: [],
  isLoading: false,
  currentCity: {} as City,
  error: '',
};

const CitiesContext = createContext<CitiesContextType>({} as CitiesContextType);

interface Props {
  children: ReactNode;
}

const reducer = (state: ReducerInitialState, action: ReducerAction): ReducerInitialState => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {} as City,
      };
  }
};

const CitiesProvider = (props: Props) => {
  const { children } = props;
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer<
    React.Reducer<ReducerInitialState, ReducerAction>
  >(reducer, initialState);

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(BASE_URL + '/cities');
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: 'There was an error in loading cities.' });
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id: number) => {
    if (id === currentCity.id) {
      return;
    }

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(BASE_URL + `/cities/${id}`);
      const data = await res.json();

      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error in loading city' });
    }
  };

  const createCity = async (newCity: City) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(newCity),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities`, options);
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error in creating a city' });
    }
  };

  const deleteCity = async (id: number) => {
    const options = {
      method: 'DELETE',
    };

    dispatch({ type: 'loading' });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, options);

      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error in deleteing city' });
    }
  };

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity, error }}
    >
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
