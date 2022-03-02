import * as React from 'react';
import * as styles from './user-list.module.scss';
import PropTypes from 'prop-types';

const UserList = ({ me, users, onChangeRecipient, selected }) => {
  return (
    <div className={styles.container}>
      <div className={styles.myInfo}>{me}</div>
      {users &&
        users.map(user =>
          user.username != me && user.username != '' ? (
            <button
              key={user.username}
              onClick={() => onChangeRecipient(user.username)}
              className={user.username == selected ? styles.active : ''}
            >
              <img src="/UserIcon.png" width="25px" />
              <div className={styles.text}>{user.username}</div>
            </button>
          ) : (
            ''
          )
        )}
    </div>
  );
};

UserList.propTypes = {
  me: PropTypes.string,
  users: PropTypes.array,
  onChangeRecipient: PropTypes.func,
  selected: PropTypes.string,
};

export default UserList;
