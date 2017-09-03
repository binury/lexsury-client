/* eslint-disable quotes */
import React from 'react';
import RoomJoinButton from '../components/RoomJoinButton';
import RoomJoinForm from '../components/RoomJoinForm';
import Shapes from '../components/Shapes';
import HomeHeader from '../components/HomeHeader';

const homeStyle = {
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  minHeight: '900px',
};

// Just for funs :)
const prompts = [
  `I've been meaning to ask you something for a long time now...`,
  `Meeting à gogo`,
  `I hope someone shows up this time!`,
  `As if everyone wasn't on their phone already`,
];
const randomPrompt = prompts[Math.floor(Math.random() * 3)]; // eslint-disable-line no-unused-vars

function Home() {
  return (
    <div id="homecontainer" style={homeStyle}>
      <Shapes />
      <HomeHeader />
      <p id="clickprompt">{}</p>
      <RoomJoinButton />
      <RoomJoinForm />
    </div>
  );
}
export default Home;
