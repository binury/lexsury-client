/* eslint-disable no-unused-vars */
// TODO
import React from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input,
  Label, UncontrolledTooltip,
} from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { URL } from '../helpers';

class RoomCreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      descr: '',
      public: true, // TODO MANY MANY Things
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  genNewRoom = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem('LEXSECRET');
    axios.post(`${URL}/room`, this.state, {
      headers: { Authorization: token },
    })
    // eslint-disable-next-line no-return-assign
      .then(res => this.setState({ roomCreated: res.data.name }))
    // window.location = `/lxr/${res.data.name}`)
      .catch(err => console.log(`There was an error: ${err}`));
  };


  render() {
    if (this.state.roomCreated) {
      return <Redirect to={{ pathname: `/lxr/${this.state.roomCreated}/admin` }} />;
    }
    return (
      <Container fluid>
        <Form
          onSubmit={this.genNewRoom}
        >
          <FormGroup>
            <Col sm={10}>
              <label htmlFor="title">Title *</label>
              <Input
                id="title"
                ref={(input) => { this.title = input; }}
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="A Meeting of Ricks"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <label htmlFor="descr">Description</label>
              <Input
                ref={(input) => { this.descr = input; }}
                type="text"
                name="descr"
                value={this.state.descr}
                onChange={this.handleChange}
                placeholder="Decide which Rick among us is the greatest"
              />
            </Col>
          </FormGroup>
          <FormGroup check>
            <Col sm={6}>
              <Label for="public" check>
                <Input
                  type="checkbox"
                  name="public"
                  id="public"
                  checked={this.state.public}
                  disabled
                />{' '}Public
              </Label>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={{ size: 12, offset: 2 }}>
              <Button
                className="btn btn-lg col-xs-12 fun btn-block"
              >
                <span>Lex a go-go!</span>
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default RoomCreateForm;
