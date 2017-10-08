import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { URL } from '../helpers';

const OAUTH_ENABLE = true;
const OAuthButtons = () => (
  <Container
    class="mt-3 justify-content-center"
    hidden={!OAUTH_ENABLE}
    fluid
  >
    <Row className="justify-content-between">
      <a
        href={`${URL}/auth/linkedin`}
        className="btn btn-outline-primary btn-lg btn-block col-5"
      >LinkedIn</a>
      <a
        href={`${URL}/auth/github`}
        className="btn btn-outline-dark btn-lg btn-block col-5 mt-0"
      >Github</a>
    </Row>
    <Row className="justify-content-center align-items-end">
      <Col
        id="or-container"
        className="col-5"
      >
        <hr id="or-hr" />
        <div id="or">or</div>
      </Col>
    </Row>
  </Container>
);

export default OAuthButtons;

