import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { getCookie } from '../helpers';

const Welcome = () => {
  // If this is an OAuth user we want to assign their cookie to storage
  const cookie = getCookie('lexsury-jwt');
  if (cookie) window.localStorage.setItem('LEXSECRET', cookie.value);
  // If this is a user who authed from a room we want to send them back
  // TODO: Should also work for returning users
  const lastRoom = window.localStorage.getItem('last_room_visited');
  if (lastRoom) {
    localStorage.removeItem('last_room_visited');
    return <Redirect to={{ pathname: `/lxr/${lastRoom}` }} />;
  }
  return (
    <Container>
      <Row>
        <Col shape={{ size: 'auto' }}>
          <h1 className="display-3" id="welcome">Welcome to Lexsury!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="features">
            <h2 className="lead" id="getStarted">
              How to: Using Lexsury in your presentation
            </h2>
          </a>
        </Col>
        <Col>
          <a href="features">
            <h2 className="lead" id="getTheMost">
              Tips: Gaining the most out of real-time audience interaction
            </h2>
          </a>
        </Col>
      </Row>
      <Row class="justify-content-center">
        <Col shape={{ size: 'auto' }}>
          <Link to="/?go" className="btn btn-dark btn-lg" role="button">
            Get Started
          </Link>
        </Col>
        <Col>
          <Link to="/features" className="btn btn-dark btn-lg" role="button">
            Learn More
          </Link>
        </Col>
      </Row>
      <Row>
        <hr />
      </Row>
      <Row>
        <Col shape={{ size: 'auto' }}>
          <h2>A message from the development team:</h2>
          <blockquote className="blockquote">
            {`
              Thank you for joining the Lexsury beta release. We are so excited to share our creation with you!
              Our vision is a world in which event organizers can have all of the best tools conveniently at hand.
              We want to help you evolve the disconnected and brief connection between audiences and speakers and provide more opportunities to build lasting partnerships.
              We thank you again for helping to make this vision a reality.
              If you'd like to provide feedback or have any concerns / questions we would love to hear from you.
            `}
          </blockquote>
          <footer className="blockquote-footer">Bin Ury, Founder</footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
