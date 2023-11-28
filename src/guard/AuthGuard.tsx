import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthGuard = (props: Props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    if (!cookies?.accessToken) {
      navigate('/login', { replace: true });
    }
  }, []);

  return cookies?.accessToken ? children : null;
};

export default AuthGuard;
