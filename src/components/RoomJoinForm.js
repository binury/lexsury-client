import React from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, FormGroup, Input } from 'reactstrap';


// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

class RoomJoinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word1: '',
      word2: '',
      word3: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value.toLowerCase(),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const roomname = Object.values(this.state).join(',');
    window.location = `/lxr/${roomname}`;
    /*
     CURRENTLY DISABLED
         We let the user join the room they entered and hope for the best
         we can't let them search through rooms safely yet, since we switched to
         Sequelize. The room object now contains users / messages / etc
    */
    axios({
      method: 'get',
      url: `${URL}/room?name=${roomname}`,
      timeout: 5000,
      responseType: 'json',
    })
    .then((roomData) => {
      if (roomData.data.total !== 0) { window.location = `/lxr/${roomname}`; }
    })
    .catch(err => console.error(err));
  }

  // loginError() {} TODO

  render() {
    return (
      <Container>
        <Form
          onSubmit={this.handleSubmit}
          encType="application/json"
        >
          <FormGroup row class="align-items-center" id="room-phrase">
            <Col>
              <label htmlFor="code-1" hidden>Code 1</label>
              <Input
                type="text"
                id="code-1"
                inputMode="verbatim"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                name="word1"
                value={this.state.word1}
                onChange={this.handleChange}
                placeholder="Secret"
                required
              />
            </Col>
            <Col>
              <label htmlFor="code-2" hidden>Code 2</label>
              <Input
                type="text"
                id="code-2"
                inputMode="verbatim"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                name="word2"
                value={this.state.word2}
                onChange={this.handleChange}
                placeholder="Room"
                required
              />
            </Col>
            <Col>
              <label htmlFor="code-3" hidden>Code 3</label>
              <Input
                type="text"
                id="code-3"
                inputMode="verbatim"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                name="word3"
                value={this.state.word3}
                onChange={this.handleChange}
                placeholder="Phrase"
                required
              />
            </Col>
          </FormGroup>
          <FormGroup row class="align-items-center mb-0">
            <Col>
              <Button
                color="dark"
                size="lg"
                block
              >Join in</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default RoomJoinForm;
