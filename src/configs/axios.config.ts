import axios, { InternalAxiosRequestConfig } from 'axios';
import { environment } from '../environment';
import { Cookies } from 'react-cookie';

export const axiosNoAuthInstance = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAuthInstance = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuthInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
