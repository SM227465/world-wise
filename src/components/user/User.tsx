import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './User.module.css';

const User = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.user}>
      <img src={user?.avatar || 'https://i.pravatar.cc/300'} alt={user?.firstName} />
      <span>Welcome, {user?.firstName}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default User;
