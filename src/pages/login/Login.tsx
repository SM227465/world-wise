import { FormEvent, useEffect, useState } from 'react';
import styles from './Login.module.css';
import NavBar from '../../components/navbar/NavBar';
import Button from '../../components/button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('sm227465@gmail.com');
  const [password, setPassword] = useState('test1234');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email && !password) {
      return;
    }

    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <NavBar />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input type='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary' onClick={() => {}}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
