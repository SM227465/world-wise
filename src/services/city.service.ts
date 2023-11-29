import { axiosAuthInstance } from '../configs/axios.config';
import { NewCity } from '../interfaces/city';

export const getCities = async () => {
  try {
    return await axiosAuthInstance.get('/api/v1/cities');
  } catch (error) {
    return error;
  }
};

export const addCity = async (city: NewCity) => {
  try {
    return await axiosAuthInstance.post('/api/v1/cities', city);
  } catch (error) {
    return error;
  }
};

export const getCity = async (cityId: string) => {
  try {
    return await axiosAuthInstance.get(`/api/v1/cities${cityId}`);
  } catch (error) {
    return error;
  }
};
