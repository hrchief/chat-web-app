import * as React from 'react';
import * as styles from './sign-board.module.scss';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import PropTypes from 'prop-types';

const SignBoard = ({ handleLogin, handleSignup }) => {
  const [display, setDisplay] = React.useState(1);

  return (
    <div className={styles.container}>
      {display === 1 ? (
        <div>
          <h1>Sign In</h1>
          <LoginForm handleLogin={handleLogin} setDisplay={setDisplay} />
        </div>
      ) : (
        <div>
          <h1>Sign Up</h1>
          <SignupForm handleSignup={handleSignup} setDisplay={setDisplay} />
        </div>
      )}
    </div>
  );
};

SignBoard.propTypes = {
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
};

export default SignBoard;
