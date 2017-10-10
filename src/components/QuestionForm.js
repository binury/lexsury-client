import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  Button, Col, Container, Form, FormGroup, Input,
  Label,
} from 'reactstrap';
import Socket from '../Socket';
import { URL } from '../helpers';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      userId: this.props.uid,
      question: '',
      socket: this.props.sock,
      anonymous: false,
    };
  }

  componentDidMount() {
    const setName = res => this.setState({ author: res.data.data[0].displayName });
    Axios.get(`${URL}/user`, {
      headers: { Authorization: localStorage.LEXSECRET },
    }).then(setName);
  }

  handleBlur = () => {
    // console.log(event.target.name + ' ' + event.target.value)
    this.state.socket.nick(this.state.author);
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.socket.ask(this.state.question, this.state.anonymous);
    this.setState({ question: '' });
  };

  render() {
    return (
      <Container class="d-md-none d-lg-none d-xl-none mt-3">
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
                maxLength={255}
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
                placeholder="To whom should we attribute the question?"
                maxLength={32}
              />
            </Col>
          </FormGroup>
          <FormGroup row class="align-items-center">
            <Col xs={4}>
              <Button color="dark">Ask!</Button>
            </Col>
            <Col xs={7}>
              <Label check>
                <Input
                  type="checkbox"
                  name="anonymous"
                  checked={this.state.anonymous}
                  onChange={this.handleChange}
                />{' '}
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
  sock: PropTypes.instanceOf(Socket).isRequired,
};
