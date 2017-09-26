/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import HomeOutline from 'react-icons/lib/ti/home-outline';
import ArrowMaximize from 'react-icons/lib/ti/arrow-maximise';
import * as Axios from 'axios';
import decode from 'jwt-decode';
import * as screenfull from 'screenfull';

import Socket from '../Socket';
import Lexsur from '../components/Lexsur';
import Admin from '../components/Admin'; // TODO: Not yet implemented
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';
import RoomJoinForm from '../components/RoomJoinForm';
import ObservableLexStore from '../components/LexStore';
import { getToken } from '../helpers';

const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

const navStyle = {
  display: 'flex',
  fontSize: '1rem',
  justifyContent: 'center',
};

const liStyle = {
  display: 'inline-block',
  position: 'relative',
  paddingRight: '2.5em',
};

/*
  * FLAGS
 */
const POLLS_ENABLED = false;

const LexRoom = ({ match }) => {
  const roomName = match.params.name;
  const sock = new Socket(getToken(), roomName);
  const lexstore = new ObservableLexStore({ roomName });

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

  if (!getToken()) return <Redirect to="/signup" />;

  const SockedLex = observer(() => (
    <Lexsur sock={sock} store={lexstore} />
  ));

  const WrappedAdmin = () => (
    <Admin sock={sock} store={lexstore} />
  );

  // Not yet implemented
  const sockedQuestions = () => (
    <QuestionList sock={sock} />
  );

  // Not yet implemented
  const sockedForm = () => (
    <QuestionForm sock={sock} />
  );

  if (screenfull.enabled) screenfull.on('change', lexstore.toggleFullScreen);
  function toggleFullscreen() {
    if (screenfull.enabled) screenfull.toggle();
  }

  lexstore.isRoomOwner = (async () => {
    const userId = decode(getToken()).userId;
    const room = await Axios.get(`${URL}/room?name=${roomName}`, {
      headers: { Authorization: getToken() },
    });
    return room.data.data[0].creatorId === userId;
  })();

  // Admin
  if (lexstore.isRoomOwner) {
    return (
      <div>
        <Router basename={`/lxr/${match.params.name}`}>
          <div>
            <ul style={navStyle}>
              <li style={Object.assign({ marginRight: 'auto' }, navStyle)}>
                <a href="/dashboard"><HomeOutline style={{ fontSize: '25px' }} /></a>
              </li>
              <li style={liStyle}><NavLink to="/admin" activeClassName="active">Admin</NavLink></li>
              <li style={liStyle}><NavLink exact to="/" activeClassName="active">Presentation</NavLink>
              </li>
              { POLLS_ENABLED ?
                <li style={liStyle}><NavLink to="/poll" activeClassName="active">Poll</NavLink></li> :
                null
              }
            </ul>
            <Route exact path="/" component={SockedLex} />
            <Route path="/admin" component={WrappedAdmin} />
          </div>
        </Router>
        <ArrowMaximize
          className={'d-none d-md-block d-lg-block d-xl-block'}
          style={{
            color: '#000',
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 999,
          }}
          size={30}
          onClick={toggleFullscreen}
        />
      </div>
    );
  }

  // Not Hotdog TODO
  return (
    <div>
      <Router basename={`/lxr/${match.params.name}`}>
        <div>
          <ul style={navStyle}>
            <li style={Object.assign({ marginRight: 'auto' }, navStyle)}>
              <a href="/dashboard">
                <HomeOutline style={{ fontSize: '25px' }} />
              </a>
            </li>
            <li style={liStyle}><NavLink exact to="/" activeClassName="active">Presentation</NavLink>
            </li>
            { POLLS_ENABLED ?
              <li style={liStyle}><NavLink to="/poll" activeClassName="active">Poll</NavLink></li> :
              null
            }
          </ul>
          <Route exact path="/" component={SockedLex} />
        </div>
      </Router>
    </div>
  );
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
