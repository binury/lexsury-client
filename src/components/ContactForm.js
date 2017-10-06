/* eslint-disable */
import React from 'react';
import Axios from 'axios';
import {
  Col, Button, Form, FormGroup, Label, Input, Container, Alert
} from 'reactstrap';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production')
  ? process.env.PUBLIC_URL
  : 'http://localhost:3030';


export default class ContactForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      from: '',
      name: '',
      html: '',
      errors: [],
      reason: 'general',
      modal: false,
      dropdown: false,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (value.length > 255) return;
    this.setState({[name]: value});
  };

  handleSubmit = (event) => {
    if (typeof event !== 'undefined') {
      event.preventDefault();
    }
    let payload = Object.assign({
      subject: `Lexsury Contact Form: ${this.state.reason}`
    }, this.state);
    Axios.post(`${URL}/mailer`, payload).then(() => {
      this.props.onSent();
    }).catch(error => {
      return;
      // TODO: Refactor this for re-use
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.data.errors) {
          this.setState({
            errors: error.response.data.errors.map(error => error.message),
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
        if (process.env.NODE_ENV === 'development') {
          console.log(error.request);
        }
        //this.setState({ error: 'something went wrong. wait a moment then
        // retry.' });
      }
      else {
        // Something happened in setting up the request that triggered an Error
        if (process.env.NODE_ENV === 'development') {
          console.log('Error',
            error.message);
        }
      }
      if (process.env.NODE_ENV === 'development') {
        console.log(error.config);
      }
    });
  };
  render() {
    return (
      <Container
        class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 mx-auto justify-content-center"
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
            <Label for="message" sm={2} hidden>Message</Label>
            <Col sm={12}>
              <Input
                type="textarea"
                name="html"
                id="message"
                placeholder="Your message"
                value={this.state.html}
                onChange={this.handleChange}
                style={{
                  padding: '15px',
                  height: '5em',
                }}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="reason" sm={2} hidden>Message regarding</Label>
            <Col sm={5}>
              <select
                type=""
                name="reason"
                id="reason"
                value={this.state.reason}
                onChange={this.handleChange}
              >
                <option value="general">Saying Hi</option>
                <option value="inquiry">Question</option>
                <option value="issue">Issues</option>
              </select>
            </Col>

            <Label for="from" sm={2} hidden>Email *</Label>
            <Col sm={7}>
              <Input
                type="email"
                name="from"
                id="from"
                placeholder="Email"
                maxLength={128}
                value={this.state.from}
                onChange={this.handleChange}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col class="col-auto">
              <Button size="lg" color="dark" block>Send</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}
