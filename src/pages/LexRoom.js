/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Link, MemoryRouter } from 'react-router-dom';
import Socket from '../Socket';
import Lexsur from '../components/Lexsur';
import Admin from '../components/Admin';
import Presentation from '../components/Presentation';
import Poll from '../components/Poll';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const navStyle = {
  display: 'flex',
  fontSize: '1.6rem',
  justifyContent: 'space-around',
  // TODO
};

const liStyle = {
  display: 'inline-block',
};

// TODO: Redirect to anon user here?
// TODO: Fullscreen button
const LexRoom = ({ match }) => {
  const roomName = match.params.name;
  const sock = new Socket(window.localStorage.getItem('LEXSECRET'), roomName);
  const sockedLex = () => (
    <Lexsur sock={sock} />
  );
  const sockedQuestions = () => (
    <QuestionList sock={sock} />
  );
  const sockedForm = () => (
    <QuestionForm sock={sock} />
  );
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
            <Route path="/poll" component={Poll} />
          </div>
        </MemoryRouter>
      </div>
    );
  }
  return sockedLex();
};
export default LexRoom;
