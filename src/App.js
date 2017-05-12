import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

class Socketz {
  constructor() {
    this.io = io('localhost:3030');
    this.id = this.io.id;
    this.initSocket = this.initSocket.bind(this);
    this.ask = this.ask.bind(this);
    this.nick = this.nick.bind(this);
  }
  initSocket(callback, idhandler, userhandler) {
    this.io.on('assignment', idhandler);
    this.io.on('newQuestion', callback);
    this.io.on('newUser', userhandler);
  }
  ask(question) { this.io.emit('questionAsked', question); }
  nick(newName) { this.io.emit('nameChanged', newName); }
  vote(newVote) { this.io.emit('voteCast', newVote); }
}
const Socket = new Socketz();

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.author,
      userId: this.props.uid,
      question: '',
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlur() {
    // console.log(event.target.name + ' ' + event.target.value)
    Socket.nick(this.state.author);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Socket.ask({ text: this.state.question });
    this.setState({ question: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="author">
          Name:
          <input
            ref={(input) => { this.nameInput = input; }}
            type="text" name="author" value={this.state.author}
            onChange={this.handleChange} onBlur={this.handleBlur}
          />
        </label>
        <label htmlFor="question">
          Question:
          <input
            ref={(input) => { this.qInput = input; }}
            type="text" name="question" value={this.state.question}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function VoteButton(props) {
  const id = props.qid;
  function handleVote(e) {
    e.preventDefault();
    Socket.vote({
      id,
    });
  }
  return (
    <button onClick={handleVote}>
      Vote
    </button>
  );
}
function QuestionList(props) {
  const questions = props.questions;
  const users = props.users;
  if (!questions) {
    return null;
  }
  const listItems = questions.map(question =>
    <li key={question.id}>
      {`${users[question.author]}\t asks \t${question.text}`}
      <VoteButton qid={question.id} />
      {question.votes.length}
    </li>,
  );
  return (
    <ul>{listItems}</ul>
  );
}


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
    Socket.initSocket(this.updateQuestions, this.setId, this.updateUsers);
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
