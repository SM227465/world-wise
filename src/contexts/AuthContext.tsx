import { createContext, useContext, useReducer } from 'react';
import { userLogin } from '../services/auth.service';
import ReducerAction2 from '../interfaces/reducerAction2';

interface AuthContextType {
  isAuthenticated: boolean;
  user: null | User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface LoginResponse {
  success: boolean;
  token: {
    access: string;
    refresh: string | null;
  };
  user: User;
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

interface ReducerInitialState {
  user: null | User;
  isAuthenticated: boolean;
}

const AuthContext = createContext({} as AuthContextType);

const initialState: ReducerInitialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state: ReducerInitialState, action: ReducerAction2) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
};

interface Props {
  children: React.ReactNode;
}
const AuthProvider = (props: Props) => {
  const { children } = props;
  const [{ user, isAuthenticated }, dispatch] = useReducer<
    React.Reducer<ReducerInitialState, ReducerAction2>
  >(reducer, initialState);

  const login = async (email: string, password: string) => {
    const res = (await userLogin({ email, password })) as LoginResponse;
    console.log('login', res);
    dispatch({ type: 'login', payload: res });
  };
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
