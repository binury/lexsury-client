/* eslint-disable no-return-assign */
import React from 'react';
import axios from 'axios';
import RoomJoinForm from '../components/RoomJoinForm';

const token = window.localStorage.getItem('LEXSECRET');

// TODO: Port number of URI may need revisiting
function Home() {
  function genNewRoom() {
    if (!token) {
      window.location += 'login';
      return;
    }
    axios.post(`http://${window.location.hostname}:3030/rooms`, {}, {
      headers: { Authorization: token },
    })
    .then(res => window.location += `room/${res.data.name}`)
    .catch(err => console.log(`There was an error: ${err}`));
  }
  return (
    <div>
      <RoomJoinForm />
      <button onClick={genNewRoom}>Create a new presentation</button>
    </div>
  );
}
export default Home;
