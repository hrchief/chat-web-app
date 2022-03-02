import * as React from 'react';
import * as styles from './login-form.module.scss';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, setDisplay }) => {
  const [user, setUser] = React.useState({
    username: '',
    password: '',
  });

  const handleChangeInput = e => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.formControl}>
          <input
            placeholder="Username"
            name="username"
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.formControl}>
          <input
            placeholder="Password"
            name="password"
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.formControl}>
          <button onClick={() => handleLogin(user)}>Login</button>
        </div>
        <div className={styles.formFooter}>
          Don&apos;t you have an account?
          <button onClick={() => setDisplay(2)}>Please Register!</button>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  setDisplay: PropTypes.func,
};

export default LoginForm;
