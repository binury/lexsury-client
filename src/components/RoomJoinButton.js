/* eslint-disable no-return-assign */
import React from 'react';
import axios from 'axios';

const joinStyle = {
  maxWidth: '6em',
  fontSize: 'xx-large',
  marginTop: '.1em',
  padding: '.65em',
};

const token = window.localStorage.getItem('LEXSECRET');
function genNewRoom() {
  if (!token) {
    window.location += 'login';
    return;
  }
  axios.post(`${process.env.PUBLIC_URL}/room`, {}, {
    headers: { Authorization: token },
  })
  .then(res => window.location += `room/${res.data.name}`)
  .catch(err => console.log(`There was an error: ${err}`));
}

const RoomJoinButton = () => (
  <button style={joinStyle} onClick={genNewRoom}> Start Your Lexsur </button>
);
export default RoomJoinButton;
