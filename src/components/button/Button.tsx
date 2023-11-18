import styles from './Button.module.css';

interface Props {
  children: React.ReactNode;
  onClick: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: string;
}

const Button = (props: Props) => {
  const { children, onClick, type } = props;
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
