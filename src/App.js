import React, { Component } from 'react';
import Socket from './Socket';
import './App.css';
import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';

const socket = new Socket();
class Lex extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Anonymous', // TODO
      userId: '', // This initialization is required
      newQuestionText: 'Enter a question',
      questions: [],
      users: [],
    };
    this.updateQuestions = this.updateQuestions.bind(this);
    this.setId = this.setId.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    socket.initSocket(this.updateQuestions, this.setId, this.updateUsers);
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
    console.log(newQuestions);
  }
  updateUsers(newUsers) {
    this.setState({
      users: newUsers,
    });
    console.log(newUsers);
  }

  render() {
    return (
      <div>
        <QuestionForm author={this.state.username} />
        <QuestionList questions={this.state.questions} users={this.state.users} />
      </div>
    );
  }
}

export default Lex;
