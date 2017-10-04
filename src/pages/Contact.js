/* eslint-disable */
import React from 'react';
import Axios from 'axios';
import { randomBytes } from 'crypto';
import {
  Col, Button, Form, FormGroup, Label, Input, FormText, Container, Alert,
} from 'reactstrap';


// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      name: '',
      html: '',
      errors: [],
      subject: 'Customer feedback from Lexsury',
    };
  }


  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    if (typeof event !== 'undefined') event.preventDefault();
    // Guest form will use random defaults
    if (this.state.quick) {
     
    }
    Axios.post(`${URL}/mailer`, this.state).then(() => {
      alert('Thanks for your feedback.');
    }).catch(error => {
      return;
      // TODO: Refactor this for re-use
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.data.errors) {
          this.setState({
            errors: error.response.data.errors.map(error => error.message),
            originIsInvite: false,
          });
        }
        if (process.env.NODE_ENV === 'development') {
          console.log(Object.values(error.response.data.errors));
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      }
      else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest
        // http.ClientRequest in node.js
        if (process.env.NODE_ENV === 'development') console.log(error.request);
        //this.setState({ error: 'something went wrong. wait a moment then retry.' });
      }
      else {
        // Something happened in setting up the request that triggered an Error
        if (process.env.NODE_ENV === 'development') console.log('Error', error.message);
      }
      if (process.env.NODE_ENV === 'development') console.log(error.config);
    });
  };


  render() {
    return (
      <Container
        id="sign-up-form"
        class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 justify-content-center"
        fluid
      >
      
      <Form
        onSubmit={this.handleSubmit}
        encType="application/json"
        hidden={this.state.quick}
      >
     
     
        <FormGroup
          row
          hidden={this.state.errors.length === 0}
        >
          <Alert class="col-md-8" color="warning">
            {this.state.errors.map(error => <strong>{error}</strong>)}
          </Alert>
        </FormGroup>

        <FormGroup row>
          <FormText
            class="col-md-8"
            color="muted"
          >
          <h2>Questions or Feedback?</h2>
          We love to get feedback from our customers to improve our services so that you can engage your audiences better.
          </FormText>
        </FormGroup>

        <FormGroup row>
          <Label for="from" sm={2} hidden>Email *</Label>
          <Col sm={8}>
            <Input
              type="email"
              name="from"
              id="from"
              placeholder="Email *"
              maxLength={128}
              value={this.state.from}
              onChange={this.handleChange}
              required={!this.state.quick}
            />
          </Col>
          <FormText
            class="col-md-8"
            color="muted"
          >
          </FormText>
        </FormGroup>


        <FormGroup row>
          <Label for="message" sm={2} hidden>Message</Label>
          <Col sm={8}>
            <Input
              type="textarea"
              name="html"
              id="message"
              placeholder="We'd love to hear about your experience with Lexusury."
              value={this.state.html}
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col class="col-auto">
            <Button size="lg" color="dark" block>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Container>
    );
  }
}
