import React from 'react';
import PropTypes from 'prop-types';
import ArrowMaximize from 'react-icons/lib/ti/arrow-maximise';

import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
// FLAG

const msgNotifications = false;


const joinBadgeStyle = {
  backgroundColor: '#FFF',
  position: 'fixed',
  bottom: 0,
  left: 0,
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

const newMsg = msg => Notification.requestPermission(() => new Notification(msg || 'New Question'));

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
    this.setState({
      questions: newQuestions,
    });

    if (msgNotifications) {
      newMsg();
    }
  }

  updateUsers(newUsers) {
    this.setState({
      users: newUsers,
    });
    console.log(newUsers);
  }

  render() {
    if (!localStorage.LEXSECRET) return <h1>Unauthorized</h1>; // TODO Redirect to home
    return (
      <div>
        <ArrowMaximize
          style={{
            color: '#FFF',
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
        />
        <div
          id="join-badge"
          style={joinBadgeStyle}
          className="d-none d-sm-block d-md-block d-lg-block d-xl-block"
        >
          Join in @ lxsr.us/{this.state.roomName}
        </div>
      </div>
    );
  }
}

export default Lex;

Lex.propTypes = {
  sock: PropTypes.instanceOf(Object).isRequired,
};
