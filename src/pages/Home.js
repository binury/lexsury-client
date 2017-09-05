/* eslint-disable quotes */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import RoomJoinButton from '../components/RoomJoinButton';
import RoomJoinForm from '../components/RoomJoinForm';
import Shapes from '../components/Shapes';
import HomeHeader from '../components/HomeHeader';
// import HomeAbout from '../components/HomeAbout';

// Just for funs :)
const prompts = [
  `I've been meaning to ask you something for a long time now...`,
  `Meeting à gogo`,
  `I hope someone shows up this time!`,
  `As if everyone wasn't on their phone already`,
];
const randomPrompt = prompts[Math.floor(Math.random() * 3)]; // eslint-disable-line no-unused-vars

// TODO ---OR--- seperator
// TODO <HomeAbout />

function Home() {
  return (
    <Container class="d-flex-inline align-items-center flex-xs-column">
      <Shapes />
      <Row class="align-self-start">
        <HomeHeader />
      </Row>
      <p id="clickprompt">{}</p>
      <Row class="justify-content-center align-items-center">
        <Col xs={7} md={3}>
          <RoomJoinButton />
        </Col>
        <Col xs={7} md={4}>
          <div id="or-container">
            <hr id="or-hr" />
            <div id="or">or</div>
          </div>
        </Col>
        <Col xs={7} md={4}>
          <RoomJoinForm />
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
