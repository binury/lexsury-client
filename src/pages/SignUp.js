import React from 'react';
import { Link } from 'react-router-dom';
// import FacebookLogin from 'react-facebook-login';
import { Col, Container, Row } from 'reactstrap';
import SignUpBootstrap from '../components/SignUpBootstrap';

// const responseFacebook = (response) => { console.log(response); };

// TODO: Add terms and conditions link
// TODO: This form should be designed with event organizers in mind

const SignUp = () => (
  <Container id="signupcontainer">
    <Row>
      <Col xs="8 mr-auto">
        <h2>
          Signup
        </h2>
      </Col>
      <Col>
        <Link class="btn btn-outline-info" role="button" to="/login"> Login </Link>
      </Col>
    </Row>
    <hr />
    <SignUpBootstrap />
  </Container>
);
export default SignUp;
