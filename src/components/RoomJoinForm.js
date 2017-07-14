import React from 'react';
import axios from 'axios';


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
      url: `http://${window.location.hostname}:3030/rooms?name=${this.state.roomname}`, // TODO
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
        <input
          type="text"
          name="roomname"
          value={this.state.roomname}
          onChange={this.handleChange}
          placeholder="Enter Lexsur Code"
        />
        <button>Join</button>
      </form>
    );
  }
}

export default RoomJoinForm;
