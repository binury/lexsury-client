import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  Button, Col, Container, Form, FormGroup, Input,
  Label,
} from 'reactstrap';

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
      <Container class="d-lg-none d-xl-none">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row class="align-items-center">
            <Label htmlFor="question" hidden>Question</Label>
            <Col xs={12} md={8} lg={0}>
              <Input
                ref={(input) => { this.qInput = input; }}
                type="text"
                name="question"
                value={this.state.question}
                onChange={this.handleChange}
                placeholder="What would you like to ask?"
              />
            </Col>
          </FormGroup>
          <FormGroup row class="align-items-center">
            <Label htmlFor="author" hidden>Username</Label>
            <Col xs={12} md={8}>
              <Input
                ref={(input) => { this.nameInput = input; }}
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
            </Col>
          </FormGroup>
          <FormGroup row class="align-items-center">
            <Col xs={4}>
              <Button>Ask!</Button>
            </Col>
            <Col xs={7}>
              <Label check>
                <Input type="checkbox" id="anon" />{' '}
              Ask anonymously
            </Label>
            </Col>
          </FormGroup>
        </Form>
      </Container>
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
