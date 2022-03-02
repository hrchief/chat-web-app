import * as React from 'react';
import * as styles from './nav-bar.module.scss';
import PropTypes from 'prop-types';

const NavBar = ({ user, handleLogout, handleType, type }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Django/React Chat app</div>
      <div className={styles.messagebox}>
        <button
          className={[styles.box, type == 'All' ? styles.active : ''].join(' ')}
          onClick={() => handleType('All')}
        >
          All
        </button>
        <button
          className={[styles.box, type == 'Inbox' ? styles.active : ''].join(
            ' '
          )}
          onClick={() => handleType('Inbox')}
        >
          Inbox
        </button>
        <button
          className={[styles.box, type == 'Sent' ? styles.active : ''].join(
            ' '
          )}
          onClick={() => handleType('Sent')}
        >
          Sent
        </button>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userControl}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func,
  handleType: PropTypes.func,
  type: PropTypes.string,
};

export default NavBar;
