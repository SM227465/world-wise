import styles from './NoCityMessage.module.css';

interface Props {
  message: string;
}

const NoCityMessage = (props: Props) => {
  const { message } = props;

  return (
    <p className={styles.message}>
      <span role='img'>👋</span> {message}
    </p>
  );
};

export default NoCityMessage;
