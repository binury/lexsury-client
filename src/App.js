import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

class Socketz {
  constructor() {
    this.io = io('localhost:3030');
    this.id = this.io.id
    this.initSocket = this.initSocket.bind(this);
    this.ask = this.ask.bind(this);
    this.nick = this.nick.bind(this);
  }
  initSocket (callback, idhandler, userhandler) {
    this.io.on('assignment', idhandler)
    this.io.on('newQuestion', callback)
    this.io.on('newUser', userhandler)
  }
  ask (question) { this.io.emit('questionAsked', question) }
  nick (newName) { this.io.emit('nameChanged', newName) }
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
    this.handleBlur   = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlur(event) {
    // console.log(event.target.name + ' ' + event.target.value)
    Socket.nick(this.state.author)
  }

  handleChange(event) {
    const name = event.target.name;
    const value  = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Socket.ask({text:this.state.question});
    this.setState({question: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input ref={(input) => { this.nameInput = input }}
            type="text" name="author" value={this.state.author}
            onChange={this.handleChange} onBlur={this.handleBlur} />
        </label>
        <label>
          Question:
          <input ref={(input) => { this.qInput = input }}
            type="text" name="question" value={this.state.question}
            onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function QuestionList(props) {
  let questions = props.questions;
  let users = props.users
  if (!questions) {
    return null;
  }
  const listItems = questions.map((question) =>
    <li key={question.id}>{users[question.author] + '\t asks \t' + question.text}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}


class Lex extends Component {
  constructor() {
    super()
    this.state = {
      username: 'Anonymous', // TODO
      userId: '', // This initialization is required
      newQuestionText: 'Enter a question',
      questions: [],
      users: []
    }
    this.updateQuestions = this.updateQuestions.bind(this)
    this.setId = this.setId.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    Socket.initSocket(this.updateQuestions,this.setId,this.updateUsers)
  }
  updateQuestions (newQuestions) {
    this.setState({
      questions: newQuestions
    })
    console.log(newQuestions)
  }
  setId (newId) {
    this.setState({
      userId: newId
    })
    console.log(newId)
  }
  updateUsers (newUsers) {
    this.setState({
      users: newUsers
    })
    console.log(newUsers)
  }

  render() {
    return (
      <div>
        <QuestionForm author={this.state.username} />
        <QuestionList questions={this.state.questions} users={this.state.users}/>
      </div>
    );
  }
}

export default Lex;
