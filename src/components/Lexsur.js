import React from 'react';
import PropTypes from 'prop-types';

import '../styles/App.css';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

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
        <h2>{this.state.roomid}</h2>
        <QuestionForm sock={this.state.socket} />
        <QuestionList
          questions={this.state.questions}
          users={this.state.users}
          sock={this.state.socket}
        />
      </div>
    );
  }
}

export default Lex;

Lex.propTypes = {
  sock: PropTypes.instanceOf(Object).isRequired,
};
