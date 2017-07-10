import React from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchRooms();
  }
  fetchRooms() {
    this.setState({ isLoading: true });
    axios({
      method: 'get',
      url: `http://${window.location.hostname}:3030/room`, // TODO
      timeout: 20000,
      responseType: 'json',
    }).then((newRooms) => {
      this.setState({
        isLoading: false,
        rooms: newRooms.data.data,
      });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <h1> Rooms go here :) </h1>;
    }
    return (
      <ul>{this.state.rooms.map(room => <li key={room.id}> <Link to={`/room/${room.name}`}>{room.name}</Link> </li>)}</ul>
    );
  }
}
export default Rooms;
