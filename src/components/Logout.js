import React from 'react';
import { Container, Row } from 'reactstrap';

/*
 TODO:
 Redirect after logout to proc RouteName (Nav) change
 react-router forceRefresh maybe
 */
export default () => {
  window.localStorage.removeItem('LEXSECRET');
  return (
    <Container class="d-flex align-items-center flex-column">
      <Row>
        <h2>You have been signed out</h2>
      </Row>
      <Row>
        <h4>Come back soon!</h4>
      </Row>
      <Row>
        <a className="btn btn-outline-dark" href="/login">
          <p>Log in again</p>
        </a>
      </Row>
    </Container>
  );
};
