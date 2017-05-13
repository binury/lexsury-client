import React from 'react';
import Socket from '../Socket';
import '../App.css';
import Navigation from './Navigation';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const axios = require('axios');

const socket = new Socket();

class Lex extends React.Component {
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
    axios({
      method: 'get',
      url: 'http://localhost:3030/rooms',
    }).then(function (newRooms) {
      this.setState({ rooms: newRooms.data });
      // TODO How to make async renders?
    });
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
        <Navigation />
        <QuestionForm author={this.state.username} />
        <QuestionList questions={this.state.questions} users={this.state.users} />
      </div>
    );
  }
}

export default Lex;
