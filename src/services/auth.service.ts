import { axiosNoAuthInstance } from '../configs/axios.config';

export const userLogin = async (payload: object) => {
  try {
    return await axiosNoAuthInstance.post('/api/v1/users/login', payload);
  } catch (error) {
    return error;
  }
};
