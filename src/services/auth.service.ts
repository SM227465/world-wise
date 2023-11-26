import { axiosNoAuthInstance } from './axios.config';

export const userLogin = async (payload: object) => {
  try {
    const res = await axiosNoAuthInstance.post('/api/v1/users/login', payload);
    return res;
  } catch (error) {
    return error;
  }
};
