/* eslint-disable */
import React from 'react';
import Axios from 'axios';
import {
  Col, Button, Form, FormGroup, Label, Input, FormText,
  Container,
} from 'reactstrap';

/////////////////////////////////
////////////.FLAGS.//////////////
/////////////////////////////////
const OAUTH_ENABLE = false;
/////////////////////////////////

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

export default class SignUpBootstrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      bio: '',
      optin: true,
      emailValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });

    function validateEmail(email) {
      const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]){2,}$/;
      return reg.test(email);
    }

    if (name === 'email') {
      this.setState({ emailValid: validateEmail(value) });
    } else if (name === 'confirmPassword') {
      this.setState(
        { passwordConfirmed: this.state.password === value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      // TODO: Maybe just trim as needed and pass state object?
      displayName: ( this.state.displayName.trim() || 'Anonymous' ),
      email: this.state.email.trim(),
      password: this.state.password,
      bio: this.state.bio,
      optin: this.state.optin,
    };
    Axios.post(`${URL}/user`, payload).then(() => {
      Axios.post(
        `${URL}/authentication`,
        Object.assign(payload, { strategy: 'local' },
        )).then((res) => {
        localStorage.setItem('LEXSECRET', res.data.accessToken);
      }).then(() => {
        window.location.assign('/welcome');
      });
    }).catch(err => console.error(err));
  }

  render() {
    return (
      <Container class="col-xs-10 col-sm-8 col-md-8 col-lg-9 col-xl-9">
      <Form
        onSubmit={this.handleSubmit}
        encType="application/json"
      >
        <FormGroup class={OAUTH_ENABLE ? 'd-inline' : 'd-none'} row>
          <Col sm="6">
            <Button outline color="primary">
              Facebook
            </Button>
          </Col>
          <Col sm="6">
            <Button outline>
              Github
            </Button>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="displayName" sm={2} hidden>Handle</Label>
          <Col sm={8}>
          <Input
            type="text"
            name="displayName"
            placeholder="username"
            value={this.state.displayName}
            onChange={this.handleChange}
          />
          </Col>
          <FormText class="col-md-6" color="muted">
            Displayed alongside your submissions.
          </FormText>
        </FormGroup>

        <FormGroup row>
          <Label for="email" sm={2} hidden>Email *</Label>
          <Col sm={8}>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </Col>
          <FormText class="col-md-8" color="muted">
            We value privacy. No unsolicited emails. Ever.
          </FormText>
        </FormGroup>

        <FormGroup row shape={{ size: 'auto' }}>
          <Label for="password" sm={2} hidden>Password *</Label>
          <Col sm={8}>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row hidden>
          <Label for="bio" sm={2} hidden>Bio</Label>
          <Col sm={8}>
            <Input
              type="textarea"
              name="bio"
              id="bio"
              placeholder="In 140 characters or less, tell other participants about you. Go!"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row hidden>
          <Label for="optin" sm={2} hidden>Email updates</Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="optin"
                  id="optin"
                  checked={this.state.optin}
                  onChange={this.handleChange}
                />{' '}
                Keep me in the loop about Lexsury happenings
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button size="lg" color="dark" block>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Container>
    );
  }
}
