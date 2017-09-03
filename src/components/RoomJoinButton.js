/* eslint-disable no-return-assign */
import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

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
  <Button
    color="dark"
    size="lg"
    outline
    onClick={genNewRoom}
  >Start Your Lexsur</Button>
);
export default RoomJoinButton;
