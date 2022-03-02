import * as React from 'react';
import * as styles from './signup-form.module.scss';
import PropTypes from 'prop-types';

const SignupForm = ({ handleSignup, setDisplay }) => {
  const [userData, setUserData] = React.useState({
    username: '',
    password: '',
  });

  const handleChangeInput = e => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
          <button onClick={() => handleSignup(userData)}>Signup</button>
        </div>
        <div className={styles.formFooter}>
          Do you have already an account?
          <button onClick={() => setDisplay(1)}>Please Login!</button>
        </div>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  handleSignup: PropTypes.func,
  setDisplay: PropTypes.func,
};

export default SignupForm;
