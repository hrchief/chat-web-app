import * as React from 'react';
import * as styles from './message-composer.module.scss';
import axios from 'axios';
import PropTypes from 'prop-types';
import WebSocketInstance from '../../service/WebSocket';

const MessageComposer = ({ refreshList, me, recipient }) => {
  const [message, setMessage] = React.useState({
    donor: '',
    recipient: '',
    title: '',
    body: '',
  });

  const handleChangeInput = e => {
    let { name, value } = e.target;
    setMessage({ ...message, [name]: value });
  };

  const handleSendMessage = () => {
    WebSocketInstance.newChatMessage({
      from: message.donor,
      text: message.title,
    });
    axios
      .post('http://localhost:8000/api/message/', message)
      .then(() => refreshList());
  };

  React.useEffect(() => {
    setMessage({ ...message, donor: me, recipient: recipient });
  }, [recipient]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input placeholder="Title" name="title" onChange={handleChangeInput} />
        <div className={styles.donor}>
          <div className={styles.label}>Donor:</div>
          <input
            name="donor"
            onChange={handleChangeInput}
            value={me}
            disabled
          />
        </div>
        <div className={styles.recipient}>
          <div className={styles.label}>Recipient:</div>
          <input
            name="recipient"
            onChange={handleChangeInput}
            value={recipient}
            disabled
          />
        </div>
      </div>
      <div className={styles.content}>
        <input placeholder="Message" name="body" onChange={handleChangeInput} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

MessageComposer.propTypes = {
  refreshList: PropTypes.func,
  me: PropTypes.string,
  recipient: PropTypes.string,
};

export default MessageComposer;
