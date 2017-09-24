/* eslint-disable spaced-comment */
import React from 'react';
import Axios from 'axios';
import {
  Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, Label,
  Row,
} from 'reactstrap';
import Mail from 'react-icons/lib/ti/mail';
import { Link } from 'react-router-dom';
import OAuthButtons from './OAuthButtons';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: this.props.redirect || '/?welcomeback',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    Axios.post(`${URL}/authentication`, {
      strategy: 'local',
      email: this.state.email,
      password: this.state.password,
      responseType: 'json',
    })
    .then((res) => {
      localStorage.setItem('LEXSECRET', res.data.accessToken);
      window.location = this.state.redirect;
    })
    .catch(err => console.error(err)); // Invalid login or 500 ?
  }

  // loginError() {} TODO

  render() {
    return (
      <Container
        class="d-flex align-items-center flex-column"
      >
        <h1>Sign in to Lexsury</h1>
        <Form
          id="sign-in-form"
          onSubmit={this.handleSubmit}
          encType="application/json"
          className="pb-3 pl-3 pr-3"
        >
          <OAuthButtons />
          <Row>
            <InputGroup>
              <Label htmlFor="email" hidden>Email</Label>
              <InputGroupAddon>
                <Mail style={{ color: '#343A3F' }} />
              </InputGroupAddon>
              <Input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="password" hidden>Password</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
            </InputGroup>
          </Row>
          <Row>
            <Col>
              <Button size="lg" color="dark" block>Login</Button>
            </Col>
          </Row>
        </Form>
        <Link to="/signup">
          {'New to Lexsury? Create an account.'}
        </Link>
      </Container>
    );
  }
}

export default Login;
