import { createContext, useContext, useState } from 'react';
import { axiosNoAuthInstance } from '../services/axios.config';
import { AxiosError } from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user: null | User;
  responseError: string;
  isloading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setResponseError: (errorMessage: string) => void;
}

interface User {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  _id: string;
  __v: number;
}

const AuthContext = createContext({} as AuthContextType);

interface Props {
  children: React.ReactNode;
}
const AuthProvider = (props: Props) => {
  const { children } = props;
  const [user, setUser] = useState({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [isloading, setIsLoding] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoding(true);

    try {
      const res = await axiosNoAuthInstance.post('/api/v1/users/login', { email, password });
      const data = res.data;
      if (data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setResponseError(error.response?.data.message);
      }
    } finally {
      setIsLoding(false);
    }
  };
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, responseError, setResponseError, isloading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext was used outside AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
