import React from 'react';
import Axios from 'axios';
import {
  Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, Label,
  Row,
} from 'reactstrap';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      window.location = `${process.env.PUBLIC_URL}`;
    })
    .catch(err => console.error(err)); // Invalid login or 500 ?
  }

  // loginError() {} TODO

  render() {
    return (
      <Container
        class="d-flex align-items-center flex-column"
      >
        <Form
          onSubmit={this.handleSubmit}
          encType="application/json"
        >
          <Row>
            <Col>
              <Button outline color="primary">
                Facebook
              </Button>
            </Col>
            <Col>
              <Button outline>
                Github
              </Button>
            </Col>
          </Row>
          <Row>
            <InputGroup>
              <Label htmlFor="email" hidden>Email</Label>
              <InputGroupAddon>@</InputGroupAddon>
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
            <InputGroup>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button size="lg" color="dark" block>Login</Button>
              </Col>
            </InputGroup>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default Login;
