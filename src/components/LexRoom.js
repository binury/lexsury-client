import React from 'react';
import Socket from '../Socket';
import '../App.css';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';


class Lex extends React.Component {
  constructor(props) {
    super(props);
    const roomName = this.props.location.pathname.split('/')[2]; // lol
    this.state = {
      username: 'Anonymous', // TODO
      userId: '', // This initialization is required
      newQuestionText: 'Enter a question',
      questions: [],
      users: [],
      roomid: roomName,
      socket: new Socket(`${roomName}`),
    };
    this.updateQuestions = this.updateQuestions.bind(this);
    this.setId = this.setId.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.state.socket.initSocket(this.updateQuestions, this.setId, this.updateUsers);
    console.log(`We are at :${props.location.pathname}`);
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
    return (
      <div>
        <h2>{this.state.roomid}</h2>
        <QuestionForm author={this.state.username} sock={this.state.socket} />
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
