import axios from 'axios';
import { environment } from '../environment';

export const axiosNoAuthInstance = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
