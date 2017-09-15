/* eslint-disable no-unused-vars */
// TODO
import React from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input,
  Label, UncontrolledTooltip,
} from 'reactstrap';
import axios from 'axios';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production')
  ? process.env.PUBLIC_URL
  : 'http://localhost:3030';

class RoomCreateForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      descr: '',
      public: true, // TODO MANY MANY Things
    };
    this.handleChange = this.handleChange.bind(this);
    this.genNewRoom = this.genNewRoom.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  genNewRoom(event) {
    event.preventDefault();
    const token = window.localStorage.getItem('LEXSECRET');
    axios.post(`${URL}/room`, this.state, {
      headers: { Authorization: token },
    })
    // eslint-disable-next-line no-return-assign
      .then(res => window.location = `/lxr/${res.data.name}`)
      .catch(err => console.log(`There was an error: ${err}`));
  }


  render() {
    return (
      <Container fluid>
        <Form
          onSubmit={this.genNewRoom}
        >
          <FormGroup>
            <Col sm={6}>
              <UncontrolledTooltip
                placement="right"
                target="pop-title"
              >The title will be displayed at the top or your LXSR
            </UncontrolledTooltip>
              <label htmlFor="title">Title</label>
              <small id="pop-title" className="pop-marker">?</small>
              <Input
                id="title"
                ref={(input) => { this.title = input; }}
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="A Meeting of Ricks"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <UncontrolledTooltip
                placement="right"
                target="pop-descr"
              >
                {`The description is primarily for bookkeeping but will be shown
               in some informational areas.`}
              </UncontrolledTooltip>
              <label htmlFor="descr">Description</label>
              <small id="pop-descr" className="pop-marker">?</small>
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
              <UncontrolledTooltip
                placement="right"
                target="pop-public"
              >{`Public rooms are viewable by anyone who has the room code.
                Private rooms are available to subscribing members.`}
              </UncontrolledTooltip>
              <small id="pop-public" className="pop-marker">?</small>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={{ size: 12, offset: 2 }}>
              <Button
                class="col-xs-12"
                size="lg"
                color="dark"
                outline
                block
              >Lex a go-go
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}
export default RoomCreateForm;
