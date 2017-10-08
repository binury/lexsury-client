import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemText } from 'reactstrap';
import RoomCard from './RoomCard';
import { URL } from '../helpers';
import RoomCreateButton from './RoomCreateButton';

const axios = require('axios');
const decode = require('jwt-decode');

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
      url: `${URL}/room?creatorId=${claims.userId}&$sort[createdAt]=-1`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: token,
      },
    }).then(({ data }) => {
      this.setState({
        isLoading: false,
        rooms: data.data,
      });
    });
  }

  deleteRoom = (id) => {
    console.log(`Deleting room: ${id}`);
    // eslint-disable-next-line no-unreachable
    const token = window.localStorage.getItem('LEXSECRET');
    axios({
      method: 'delete',
      url: `${URL}/room/${id}`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: token,
      },
    }).then((newRooms) => {
      console.log(newRooms);
      this.fetchRooms();
    });
  };

  render() {
    if (this.state.isLoading) {
      return <p>{'Fetching…'}</p>;
    }
    if (this.state.rooms.length < 1) {
      return (
        <ListGroup>
          <ListGroupItem
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <ListGroupItemText>
              {'You haven\'t created any Lexsurs yet!'}
              <br />
              {'Ready to try one out?'}
            </ListGroupItemText>
            <div style={{ maxWidth: '200px' }}>
              <RoomCreateButton buttonLabel="Create a Lexsur" />
            </div>
          </ListGroupItem>
        </ListGroup>
      );
    }
    // TODO: Change interactivity if room has expired
    return (
      <ListGroup class="d-block">
        {this.state.rooms.map(room => (
          <RoomCard
            roomInfo={room}
            handler={this.deleteRoom}
          />
        ))}
      </ListGroup>
    );
  }
}
export default Rooms;
