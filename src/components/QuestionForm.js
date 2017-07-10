import React from 'react';
import PropTypes from 'prop-types';

const qInputStyles = {
  display: 'block',
  width: '-webkit-fill-available',
  height: '2.9em',
  border: '2px solid lightgray',
};

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: this.props.author,
      userId: this.props.uid,
      question: '',
      socket: this.props.sock,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBlur() {
    // console.log(event.target.name + ' ' + event.target.value)
    this.state.socket.nick(this.state.author);
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
    this.state.socket.ask(this.state.question);
    this.setState({ question: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="question">
          Q:
          <input
            ref={(input) => { this.qInput = input; }}
            type="text"
            name="question"
            value={this.state.question}
            onChange={this.handleChange}
            style={qInputStyles}
          />
        </label>
        <label htmlFor="author">
          N:
          <input
            ref={(input) => { this.nameInput = input; }}
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QuestionForm;

QuestionForm.defaultProps = {
  uid: PropTypes.func,
};

QuestionForm.propTypes = {
  author: PropTypes.string.isRequired,
  uid: PropTypes.func,
  sock: PropTypes.instanceOf(Object).isRequired,
};
