import React from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');
const decode = require('jwt-decode');

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
    const token = window.localStorage.getItem('LEXSECRET');
    const claims = decode(token);
    this.setState({ isLoading: true });
    axios({
      method: 'get',
      url: `${URL}/room?creatorId=${claims.userId}`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: token,
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
      <ul>{this.state.rooms.map(room => <li key={room.id}> <Link to={`/lxr/${room.name}`}>{room.name}</Link> </li>)}</ul>
    );
  }
}
export default Rooms;
