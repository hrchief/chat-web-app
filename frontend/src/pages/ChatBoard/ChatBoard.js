import * as React from 'react';
import * as styles from './chat-board.module.scss';
import PropTypes from 'prop-types';
import UserList from '../../components/UserList';
import MessageList from '../../components/MessageList';

const ChatBoard = ({ users, messages, me, refreshList, type }) => {
  const [recipient, setRecipient] = React.useState('');
  const onChangeRecipient = username => {
    setRecipient(username);
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainBody}>
        <UserList
          me={me}
          users={users}
          onChangeRecipient={onChangeRecipient}
          selected={recipient}
        />
        <MessageList
          messages={messages}
          me={me}
          recipient={recipient}
          refreshList={refreshList}
          type={type}
        />
      </div>
    </div>
  );
};

ChatBoard.propTypes = {
  users: PropTypes.array,
  messages: PropTypes.array,
  me: PropTypes.string,
  refreshList: PropTypes.func,
  type: PropTypes.string,
};

export default ChatBoard;
