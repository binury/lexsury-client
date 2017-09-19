/* eslint-disable */
import React from 'react';
import Axios from 'axios';
import { randomBytes } from 'crypto';
import {
  Col, Button, Form, FormGroup, Label, Input, FormText, Container, Alert,
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
      code: '',
      originIsInvite: false,
      emailValid: false,
      redirect: this.props.redirect || '/welcome', // TODO: Props val
      quick: this.props.quick || false,
      errors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentWillMount() {
    const urlParams = new window.URLSearchParams(window.location.search);
    if (urlParams.has('invite_code')) {
      const code = urlParams.get('invite_code');
      this.setState({ code, originIsInvite: true });
    }
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
    if (typeof event !== 'undefined') event.preventDefault();
    const payload = {
      // TODO: Maybe just trim as needed and pass state object?
      displayName: ( this.state.displayName.trim() || 'Anonymous' ),
      email: this.state.email.trim(),
      password: this.state.password,
      bio: this.state.bio,
      optin: this.state.optin,
      code: this.state.code,
    };
    // Guest form will use random defaults
    if (this.state.quick) {
      Object.assign(payload, {
        // Could cause issues if an email conflict occurred
        displayName: 'Guest',
        email: `${randomBytes(5).toString('hex')}@lxr.io`,
        password: randomBytes(8).toString('hex'),
      });
    }
    Axios.post(`${URL}/user`, payload).then(() => {
      Axios.post(
        `${URL}/authentication`,
        Object.assign(payload, { strategy: 'local' },
        )).then((res) => {
        localStorage.setItem('LEXSECRET', res.data.accessToken);
      }).then(() => {
        window.location = this.state.redirect;
      });
    }).catch(err => console.error(err));
  }

  componentDidMount() {
    if (this.state.quick) this.handleSubmit();
  }

  render() {
    return (
      <Container
        class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 justify-content-center"
        fluid
      >
        <p className="lead" hidden={!this.state.quick}>
          Determining shortest hyperspace route to your event's Lexsur…
        </p>
      <Form
        onSubmit={this.handleSubmit}
        encType="application/json"
        hidden={this.state.quick}
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

        <FormGroup
          row
          hidden={this.state.quick}
        >
          <p>
          {`Lexsury is set to launch January 2018.
          We know we can make a first impression only once, and want to be sure everything is ready before we blast off.
          In the meantime we still want to hear your feedback, so we have opened speaker registration to invited beta users.
          You may contact us to request an invitation.`}
          </p>
        </FormGroup>

        <FormGroup
          row
          hidden={this.state.errors.length === 0}
        >
          <Alert class="col-md-8" color="warning">
            {this.state.errors.map(error => <strong>{error}</strong>)}
          </Alert>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="displayName" sm={2} hidden>Handle</Label>
          <Col sm={8}>
          <Input
            type="text"
            name="displayName"
            placeholder="Username"
            value={this.state.displayName}
            onChange={this.handleChange}
          />
          </Col>
          <FormText class="col-md-8" color="muted">
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
              placeholder="Email *"
              value={this.state.email}
              onChange={this.handleChange}
              required={!this.state.quick}
            />
          </Col>
          <FormText
            class="col-md-8"
            color="muted"
          >
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
              placeholder="Password *"
              value={this.state.password}
              onChange={this.handleChange}
              required={!this.state.quick}
            />
          </Col>
        </FormGroup>

        <FormGroup row shape={{ size: 'auto' }}>
          <Label for="code" sm={2} hidden>Beta Key *</Label>
          <Col xs={5}>
            <Input
              type="text"
              name="code"
              id="code"
              placeholder="Beta Invite Key *"
              value={this.state.code}
              onChange={this.handleChange}
              required={!this.state.quick}
              hidden={this.state.originIsInvite}
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

        <FormGroup row
        >
          <Col class="col-auto">
            <Button size="lg" color="dark" block>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Container>
    );
  }
}
