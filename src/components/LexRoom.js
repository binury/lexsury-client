import React from 'react';
import Socket from '../Socket';
import '../App.css';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

const socket = new Socket();

class Lex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Anonymous', // TODO
      userId: '', // This initialization is required
      newQuestionText: 'Enter a question',
      questions: [],
      users: [],
      props,
    };
    this.updateQuestions = this.updateQuestions.bind(this);
    this.setId = this.setId.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    socket.initSocket(this.updateQuestions, this.setId, this.updateUsers);
    console.log(`We are at :${  props.location.pathname}`);
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
