/* eslint-disable no-return-assign */
import React from 'react';
import axios from 'axios';
import RoomJoinForm from '../components/RoomJoinForm';

const homeStyle = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const joinStyle = {
  margin: '3em',
  fontSize: 'xx-large',
};

const token = window.localStorage.getItem('LEXSECRET');
function Home() {
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
  return (
    <div style={homeStyle}>
      <button style={joinStyle} onClick={genNewRoom}>
        Start a new Lexsur
      </button>
      <p>- OR -</p>
      <RoomJoinForm />
    </div>
  );
}
export default Home;
