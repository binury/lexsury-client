import React from 'react';
import Socket from '../Socket';

const socket = new Socket();
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
    socket.nick(this.state.author);
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
    socket.ask({ text: this.state.question });
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
export default QuestionForm;
