/* eslint-disable no-unused-vars,react/no-multi-comp */
import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Col, Container, Modal, ModalBody,
  ModalFooter, ModalHeader,
} from 'reactstrap';
import { observer } from 'mobx-react';
import HomeOutline from 'react-icons/lib/ti/home-outline';
import ArrowMaximize from 'react-icons/lib/ti/arrow-maximise';
import * as Axios from 'axios';
import decode from 'jwt-decode';
import * as screenfull from 'screenfull';

import Socket from '../Socket';
import Lexsur from '../components/Lexsur';
import Admin from '../components/Admin'; // TODO: Not yet implemented
import RoomJoinForm from '../components/RoomJoinForm';
import ObservableLexStore from '../components/LexStore'; // TODO: Move this out of state
import { getToken } from '../helpers';
import SignUpBootstrap from '../components/SignUpBootstrap';

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

class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      signUp: false,
      guest: false,
    };
    this.toggle = this.toggle.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleGuest = this.toggleGuest.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('LEXSECRET');
    if (!token) this.toggle();
  }

  toggle() {
    // TODO: Anonymous registration of temporary user
    this.setState({
      modal: !this.state.modal,
    });
  }
  toggleSignUp() {
    // TODO: Anonymous registration of temporary user
    this.setState({
      signUp: !this.state.signUp,
    });
  }
  toggleGuest() {
    // TODO: Anonymous registration of temporary user
    this.setState({
      guest: !this.state.guest,
    });
  }

  render() {
    return (
      <Container>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Join the event</ModalHeader>
          <ModalBody class="d-flex justify-content-center">
            <Button
              color="primary"
              onClick={this.toggleSignUp}
            >Create your profile</Button>
            <Modal
              isOpen={this.state.signUp}
              toggle={this.toggleSignUp}
            >
              <ModalBody>
                <Container fluid>
                  <SignUpBootstrap redirect={window.location.href} />
                </Container>
              </ModalBody>
            </Modal>
            <Col xs={1} sm={2} md={3} lg={4} id="or-container" style={{ paddingBottom: '0.5em' }}>
              <hr id="or-hr" />
              <div id="or">or</div>
            </Col>
            <Button
              color="secondary"
              onClick={this.toggleGuest}
            >Join as guest</Button>
            <Modal
              isOpen={this.state.guest}
              toggle={this.guest}
            >
              <ModalBody>
                <Container fluid>
                  <SignUpBootstrap redirect={window.location.href} quick />
                </Container>
              </ModalBody>
            </Modal>
          </ModalBody>
          <ModalFooter hidden>
            #EIGHT_TOES
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

@observer
class LexRoom extends React.Component {
  constructor({ match }) {
    super();
    const roomName = match.params.name;
    this.state = {
      roomName,
      sock: new Socket(getToken(), roomName),
      lexstore: new ObservableLexStore({ roomName }),
      isLoading: false,
      error: '', // TODO: Handle errors related to fetch
    };

    if (screenfull.enabled) screenfull.on('change', this.state.lexstore.toggleFullScreen);

    this.fetchRoom = this.fetchRoom.bind(this);
  }

  componentDidMount() {
    this.fetchRoom();
  }

  isLoading() { this.setState({ isLoading: true }); }
  isDoneLoading() { this.setState({ isLoading: false }); }

  fetchRoom() {
    const token = getToken();
    if (!token || !this.state.roomName) {
      this.isDoneLoading();
      return;
    }
    const userId = decode(token).userId;
    this.isLoading();
    Axios.get(`${URL}/room?name=${this.state.roomName}`, { headers: { Authorization: token } })
      .then((room) => {
        if (room.data.total === 0) this.setState({ error: 'We could not find a Lexsur with that phrase. Try again.' });
        else this.state.lexstore.roomInfo = room.data.data[0];
        this.isDoneLoading();
      }).catch(error => this.setState({ error }));
  }

  render() {
    // TODO: Fancy loading message
    if (this.state.isLoading) return <div>Loading…</div>;

    // Unauthenticated User
    if (!getToken()) return <AuthModal />;

    // No roomName specified in URL
    if (!this.state.roomName) {
      return (
        <Container>
          <p className="lead">
            Enter the three-word-phrase provided by your presenter
          </p>
          <RoomJoinForm />
        </Container>
      );
    }

    // Error occurred when attempting to retrieve room information
    if (this.state.error !== '') return <Container>{this.state.error}</Container>;

    const SockedLex = observer(() => (
      <Lexsur sock={this.state.sock} store={this.state.lexstore} />
    ));

    const WrappedAdmin = () => (
      <Admin sock={this.state.sock} store={this.state.lexstore} />
    );

    const toggleFullscreen = () => {
      if (screenfull.enabled) screenfull.toggle();
    };

    // Admin
    if (this.state.lexstore.isRoomOwner) {
      return (
        <div>
          <Router basename={`/lxr/${this.state.roomName}`}>
            <div>
              <ul style={navStyle}>
                <li style={Object.assign({ marginRight: 'auto' }, navStyle)}>
                  <a href="/dashboard"><HomeOutline style={{ fontSize: '25px' }} /></a>
                </li>
                <li style={liStyle}><NavLink
                  to="/admin"
                  activeClassName="active"
                >Admin</NavLink>
                </li>
                <li style={liStyle}><NavLink
                  exact
                  to="/"
                  activeClassName="active"
                >Presentation</NavLink>
                </li>
                {POLLS_ENABLED ? <li style={liStyle}><NavLink
                  to="/poll"
                  activeClassName="active"
                >Poll</NavLink>
                </li> : null
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
        <Router basename={`/lxr/${this.state.roomName}`}>
          <div>
            <ul style={navStyle}>
              <li style={Object.assign({ marginRight: 'auto' }, navStyle)}>
                <a href="/dashboard">
                  <HomeOutline style={{ fontSize: '25px' }} />
                </a>
              </li>
              <li style={liStyle}><NavLink
                exact
                to="/"
                activeClassName="active"
              >Questions</NavLink>
              </li>
              {POLLS_ENABLED ? <li style={liStyle}><NavLink
                to="/poll"
                activeClassName="active"
              >Poll</NavLink>
              </li> : null
              }
            </ul>
            <Route exact path="/" component={SockedLex} />
          </div>
        </Router>
      </div>
    );
  }
}


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
