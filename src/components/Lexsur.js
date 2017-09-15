/* eslint-disable spaced-comment */
import React from 'react';
import PropTypes from 'prop-types';
import ArrowMaximize from 'react-icons/lib/ti/arrow-maximise';
import { QRCode } from 'react-qr-svg';
import { Container } from 'reactstrap';

import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
import Login from './Login';

/////////////////////////////////
////////////.FLAGS.//////////////
/////////////////////////////////
const NOTIFICATIONS_ENABLED = false;
/////////////////////////////////

const joinBadgeStyle = {
  backgroundColor: '#FFF',
  position: 'fixed',
  bottom: '20%',
  left: 0,
  zIndex: 999,
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
    if (!localStorage.LEXSECRET) {
      return (
        <Container>
          <p className="lead">
            Please register or sign-in to join the Lexsur
          </p>
          <Login redirect={window.location.href} />
        </Container>
      );
    }
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
          <p className="lead">
            Join in on your devices
          </p>
          <p className="lead">
            www.lxsr.us
          </p>
          <p className="lead">
            {this.state.roomName.split(',').join(' ')}
          </p>
        </Container>
      </div>
    );
  }
}

export default Lex;

Lex.propTypes = {
  sock: PropTypes.instanceOf(Object).isRequired,
};
