import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import LinkedIn from 'react-icons/lib/fa/linkedin-square';
import Github from 'react-icons/lib/fa/github-alt';
import { URL } from '../helpers';

const OAUTH_ENABLE = true;
const OAuthButtons = () => (
  <Container
    class="mt-3 justify-content-center"
    hidden={!OAUTH_ENABLE}
    fluid
  >
    <Row className="justify-content-around">
      <a
        href={`${URL}/auth/linkedin`}
        className="btn btn-primary btn-lg btn-block col-5"
      >
        <LinkedIn class="mr-1 pb-1" style={{ fontSize: '24px' }} />
        LinkedIn
      </a>
      <a
        href={`${URL}/auth/github`}
        className="btn btn-dark btn-lg btn-block col-5 mt-0"
      >
        <Github class="mr-1 pb-1" style={{ fontSize: '24px' }} />
        Github
      </a>
    </Row>
    <Row className="justify-content-center align-items-end">
      <Col
        id="or-container"
        className="col-5"
      >
        <hr id="or-hr" />
        <div id="or" style={{ backgroundColor: '#FFF' }}>or</div>
      </Col>
    </Row>
  </Container>
);

export default OAuthButtons;

