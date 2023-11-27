import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthGuard = (props: Props) => {
  const { children } = props;

  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const location = useLocation();

  if (!cookies?.accessToken) {
    return <Navigate to='/login' replace state={location.pathname} />;
  }

  return cookies?.accessToken ? children : null;
};

export default AuthGuard;
