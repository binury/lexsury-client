import React from 'react';
import { Link } from 'react-router-dom';
// import FacebookLogin from 'react-facebook-login';
import { Col, Container, Row } from 'reactstrap';
import SignUpBootstrap from '../components/SignUpBootstrap';
import { getToken } from '../helpers';

// const responseFacebook = (response) => { console.log(response); };

// TODO: Add terms and conditions link
// TODO: This form should be designed with event organizers in mind

const SignUp = () => {
  if (getToken()) {
    window.location.assign('/dashboard');
    return null;
  }
  return (
    <Container id="signupcontainer" className="mt-5 mb-5">
      <Row>
        <Col xs="8 mr-auto">
          <h2>
            Signup
          </h2>
        </Col>
        <Col>
          <Link class="btn btn-outline-info" role="button" to="/login">
            Login </Link>
        </Col>
      </Row>
      <hr />
      <SignUpBootstrap />
    </Container>
  );
};
export default SignUp;
