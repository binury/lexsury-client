import React from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

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
      url: `${URL}/room`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: window.localStorage.getItem('LEXSECRET'),
      },
    }).then((newRooms) => {
      this.setState({
        isLoading: false,
        rooms: newRooms.data.data,
      });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <p>{"You haven't created any rooms yet"}</p>;
    }
    // TODO: Change interactivity if room has expired
    return (
      <ul>{this.state.rooms.map(room => <li key={room.id}> <Link to={`/room/${room.name}`}>{room.name}</Link> </li>)}</ul>
    );
  }
}
export default Rooms;
