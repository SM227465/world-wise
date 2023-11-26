export default interface ReducerAction {
  type: 'loading' | 'city/loaded' | 'cities/loaded' | 'city/created' | 'city/deleted' | 'rejected';
  payload?: any;
}
