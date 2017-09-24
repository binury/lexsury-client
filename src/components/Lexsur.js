/* eslint-disable spaced-comment,react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import ArrowMaximize from 'react-icons/lib/ti/arrow-maximise';
import { QRCode } from 'react-qr-svg';
import {
  Button,
  Col, Container, Modal, ModalBody, ModalFooter,
  ModalHeader,
} from 'reactstrap';

import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import SignUpBootstrap from './SignUpBootstrap';
// import SignUpBootstrap from './SignUpBootstrap';
// import Login from './Login';

const phraseWordStyle = {
  textTransform: 'capitalize',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'inline-block',
  marginBottom: 0,
};

/////////////////////////////////
////////////.FLAGS.//////////////
/////////////////////////////////
const NOTIFICATIONS_ENABLED = false;
/////////////////////////////////

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

const joinBadgeStyle = {
  backgroundColor: '#FFF',
  position: 'fixed',
  bottom: '20%',
  left: 0,
  zIndex: 999,
  paddingLeft: '3em',
};

function toggleFullscreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen ||
    docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}

const sendBrowserNotification = (msg) => {
  if (typeof msg !== 'undefined') {
    Notification.requestPermission(() => new Notification(msg));
  }
};

class Lex extends React.Component {
  constructor(props) {
    super(props);
    const roomName = window.location.pathname.split('/')[2];
    this.state = {
      newQuestionText: 'Enter a question',
      questions: [],
      roomName,
      users: [], // Unused
      socket: props.sock,
    };
    this.updateQuestions = this.updateQuestions.bind(this);
    this.setId = this.setId.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.state.socket.initSocket(this.updateQuestions, this.setId, this.updateUsers);
    console.log(`We are at :${this.state.roomName}.`);
  }

  setId(newId) {
    this.setState({
      userId: newId,
    });
    console.log(newId);
  }

  updateQuestions(newQuestions) {
    if (newQuestions.length === 0) {
      return;
    }
    this.setState({
      questions: newQuestions,
    });
    /*
     This relies on the newQs arg to be sorted by ID
     if this changes the code will break and instead
     should be sorted manually before dereferencing the array.
    */
    if (NOTIFICATIONS_ENABLED) {
      const newQ = newQuestions[newQuestions.length - 1];
      sendBrowserNotification(`${newQ.author} asks:${newQ.text}`);
    }
  }

  updateUsers(newUsers) {
    this.setState({
      users: newUsers,
    });
    console.log(newUsers);
  }

  render() {
    if (!localStorage.LEXSECRET) return <AuthModal />;
    return (
      <div>
        <ArrowMaximize
          style={{
            color: '#000',
            position: 'absolute',
            top: 0,
            right: 0,
          }}
          size={30}
          onClick={toggleFullscreen}
        />
        <QuestionForm sock={this.state.socket} />
        <QuestionList
          questions={this.state.questions}
          users={this.state.users}
          sock={this.state.socket}
          roomName={this.state.roomName}
        />
        <Container
          id="join-badge"
          style={joinBadgeStyle}
          className="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline col-sm-4"
        >
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: '150px' }}
            value={`http://lxsr.us/${this.state.roomName}`}
          />
          <p className="lead mt-4">
            Join this Lexsur @
          </p>
          <Container
            className="d-flex justify-content-between mt-4 ml-0"
            style={{
              width: '200px',
              border: '1px solid black',
              borderRadius: '1em',
              position: 'relative',
              left: '-1em',
            }}
            fluid
          >
            <p
              className="lead font-weight-bold"
              style={{ position: 'absolute', bottom: '0.5em', marginLeft: '1.1em' }}
            >
              www.lxsr.us
            </p>
            <p style={phraseWordStyle}>
              {this.state.roomName.split(',')[0]}
            </p>
            <p style={phraseWordStyle}>
              {this.state.roomName.split(',')[1]}
            </p>
            <p style={phraseWordStyle}>
              {this.state.roomName.split(',')[2]}
            </p>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Lex;

Lex.propTypes = {
  sock: PropTypes.instanceOf(Object).isRequired,
};
