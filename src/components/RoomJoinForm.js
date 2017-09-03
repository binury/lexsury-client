import React from 'react';
import axios from 'axios';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';


// TODO: Move to bootstrap form
const formStyle = {
  display: 'flex',
  fontSize: '1.5rem',
  justifyContent: 'center',
  flexDirection: 'column',
};

class RoomJoinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomname: '',
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
    axios({
      method: 'get',
      url: `/room?name=${this.state.roomname}`, // TODO
      timeout: 5000,
      responseType: 'json',
    })
    .then((roomData) => {
      if (roomData.data.total !== 0) { window.location += `room/${this.state.roomname}`; }
    })
    .catch(err => console.error(err));
  }

  // loginError() {} TODO

  render() {
    return (
      <form
        style={formStyle}
        onSubmit={this.handleSubmit}
        encType="application/json"
      >
        <InputGroup>
          <InputGroupAddon>#</InputGroupAddon>
          <Input
            type="text"
            name="roomname"
            value={this.state.roomname}
            onChange={this.handleChange}
            placeholder="Code"
            required // TODO Validation
          />
        </InputGroup>
        <Button
          color="dark"
          size="lg"
        >Join In</Button>
      </form>
    );
  }
}

export default RoomJoinForm;
