import React from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm';

const signUpStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};
const SignUp = () => (
  <div id="signupcontainer" style={signUpStyle}>
    <h2>{'Create your profile'}</h2>
    <Link to="/login">
        Already using the Lexsury?
      <br />
      Login here instead.
      </Link>
    <SignUpForm />
  </div>
);
export default SignUp;
