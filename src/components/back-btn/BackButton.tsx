import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type='back'
      onClick={(event) => {
        event && event.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
