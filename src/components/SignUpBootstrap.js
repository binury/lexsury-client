/* eslint-disable */
import React from 'react';
import {
  Col, Button, Form, FormGroup, Label, Input, FormText,
  Container,
} from 'reactstrap';

export default class SignUpBootstrap extends React.Component {
  render() {
    return (
      <Container>
      <Form>
        <FormGroup row>
          <Label for="email" sm={2}>Email *</Label>
          <Col sm={8}>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="wubalub@dub.dub"
              required
            />
          </Col>
        </FormGroup>
        <FormText color="muted">
          Your privacy is important to us. No unsolicited emails. Ever.
        </FormText>
        <FormGroup row>
          <Label for="password" sm={2}>Password *</Label>
          <Col sm={8}>
            <Input
              type="password"
              name="password"
              id="password"
              required
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="bio" sm={2}>Bio</Label>
          <Col sm={8}>
            <Input
              type="textarea"
              name="text"
              id="bio"
              placeholder="In 140 characters or less, tell other participants about you. Go!"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="newsletter" sm={2}>Email updates</Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="newsletter" />{' '}
                Keep me in the loop about Lexsury happenings.
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </Container>
    );
  }
}
