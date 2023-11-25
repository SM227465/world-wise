import styles from './Message.module.css';

interface Props {
  message: string;
}

const Message = (props: Props) => {
  const { message } = props;
  return (
    <p className={styles.message}>
      <span role='img'>👋</span> {message}
    </p>
  );
};

export default Message;
