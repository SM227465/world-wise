import City from './city';

export default interface ReducerInitialState {
  cities: City[];
  isLoading: boolean;
  currentCity: City;
  error: string;
}
