import * as React from 'react';
import * as styles from './message-list.module.scss';
import PropTypes from 'prop-types';
import MessageComposer from '../MessageComposer';
import axios from 'axios';

const MessageList = ({ messages, me, recipient, refreshList, type }) => {
  const [myMessages, setMyMessages] = React.useState([]);

  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  React.useEffect(() => {
    setMyMessages(
      messages.filter(
        message =>
          (type == 'All' &&
            ((message.donor == me && message.recipient == recipient) ||
              (message.recipient == me && message.donor == recipient))) ||
          (type == 'Inbox' &&
            message.recipient == me &&
            message.donor == recipient) ||
          (type == 'Sent' &&
            message.donor == me &&
            message.recipient == recipient)
      )
    );
    scrollToBottom();
  }, [recipient, messages, type]);

  const handleMessageClick = id => {
    axios.delete('http://localhost:8000/chat/' + id).then(() => refreshList());
  };
  return (
    <div className={styles.container}>
      <div className={styles.messageContainer} ref={messagesEndRef}>
        {myMessages.map(message => (
          <div
            key={message.id}
            className={[
              styles.messageWrapper,
              message.donor == me ? styles.sent : styles.receive,
            ].join(' ')}
          >
            <p className={styles.title}>{message.title}</p>
            <p className={styles.body}>{message.body}</p>
            <div className={styles.controls}>
              <img
                src="/email-remove-delete.svg"
                width="15px"
                onClick={() => handleMessageClick(message.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <MessageComposer
        refreshList={refreshList}
        me={me}
        recipient={recipient}
      />
    </div>
  );
};

MessageList.propTypes = {
  messages: PropTypes.array,
  me: PropTypes.string,
  recipient: PropTypes.string,
  refreshList: PropTypes.func,
  type: PropTypes.string,
};

export default MessageList;
