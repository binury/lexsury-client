import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

const qInputStyle = {
  display: 'block',
  width: '-webkit-fill-available',
  height: '2.9em',
  border: '1px solid black',
  background: 'white',
};
// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      userId: this.props.uid,
      question: '',
      socket: this.props.sock,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const setName = res => this.setState({ author: res.data.data[0].displayName });
    Axios.get(`${URL}/user`, {
      headers: { Authorization: localStorage.LEXSECRET },
    }).then(setName);
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
            style={qInputStyle}
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
            style={qInputStyle}
          />
        </label>
        <button>Send</button>
      </form>
    );
  }
}

export default QuestionForm;

QuestionForm.defaultProps = {
  uid: PropTypes.func,
};

QuestionForm.propTypes = {
  uid: PropTypes.func,
  sock: PropTypes.instanceOf(Object).isRequired,
};
