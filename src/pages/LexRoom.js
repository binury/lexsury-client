/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Link, MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import Socket from '../Socket';
import Lexsur from '../components/Lexsur';
import Admin from '../components/Admin'; // TODO: Not yet implemented
import Presentation from '../components/Presentation';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import RoomJoinForm from '../components/RoomJoinForm';

const navStyle = {
  display: 'flex',
  fontSize: '1.6rem',
  justifyContent: 'space-around',
};

const liStyle = {
  display: 'inline-block',
};

const LexRoom = ({ match }) => {
  const roomName = match.params.name;
  const sock = new Socket(window.localStorage.getItem('LEXSECRET'), roomName);

  if (!roomName) {
    return (
      <Container>
        <p className="lead">
          Enter the three-word-phrase provided by your presenter
        </p>
        <RoomJoinForm />
      </Container>
    );
  }
  localStorage.setItem('last_room_visited', roomName);

  const sockedLex = () => (
    <Lexsur sock={sock} />
  );

  // Not yet implemented
  const sockedQuestions = () => (
    <QuestionList sock={sock} />
  );

  // Not yet implemented
  const sockedForm = () => (
    <QuestionForm sock={sock} />
  );

  // Not yet implemented
  const roomOwner = false;
  if (roomOwner) {
    return (
      <div>
        <h1>{match.params.name}</h1>
        <MemoryRouter>
          <div>
            <ul style={navStyle}>
              <li style={liStyle}><Link to="/admin">Admin</Link></li>
              <li style={liStyle}><Link to="/presentation">Presentation</Link>
              </li>
              <li style={liStyle}><Link to="/poll">Poll</Link></li>
            </ul>
            <Route exact path="/" component={sockedLex} />
            <Route path="/admin" component={Admin} />
            <Route path="/presentation" component={Presentation} />
          </div>
        </MemoryRouter>
      </div>
    );
  }

  return sockedLex();
};

export default LexRoom;

LexRoom.defaultProps = {
  match: PropTypes.oneOfType([
    PropTypes.bool, // isExact
    PropTypes.object, // params -> name
    PropTypes.string, // path
    PropTypes.string, // url
  ]),
};

LexRoom.propTypes = {
  match: PropTypes.oneOfType([
    PropTypes.bool.isRequired, // isExact
    PropTypes.instanceOf(Object), // params -> name
    PropTypes.string.isRequired, // path
    PropTypes.string.isRequired, // url
  ]),
};
