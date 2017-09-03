import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { Container } from 'reactstrap';
import SignUpBootstrap from '../components/SignUpBootstrap';

const responseFacebook = (response) => {
  console.log(response);
};


const SignUp = () => (
  <Container id="signupcontainer">
    <h2>Create your profile</h2>
    <p className="text-center">
      <Link to="/login">
        Already using the Lexsury? Login here instead.
      </Link>
    </p>
    <SignUpBootstrap />
    <FacebookLogin
      appId="355492078214495"
      fields="name,email,picture"
      callback={responseFacebook}
    />
  </Container>
);
export default SignUp;
