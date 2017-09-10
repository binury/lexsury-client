/* eslint-disable quotes */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import RoomCreateButton from '../components/RoomCreateButton';
import RoomJoinForm from '../components/RoomJoinForm';
import Shapes from '../components/Shapes';
import HomeHeader from '../components/HomeHeader';
import HomeAbout from '../components/HomeAbout';

// Just for funs :)
const prompts = [
  `I've been meaning to ask you something for a long time now...`,
  `Meeting à gogo`,
  `I hope someone shows up this time!`,
  `As if everyone wasn't on their phone already`,
];
const randomPrompt = prompts[Math.floor(Math.random() * 3)]; // eslint-disable-line no-unused-vars

// TODO ---OR--- seperator

function Home() {
  return (
    <Container>
      <Container
        class="d-flex-inline align-items-center flex-xs-column"
        id="home-section-1"
      >
        <Shapes />
        <Row class="align-self-start">
          <HomeHeader />
        </Row>
        <p id="clickprompt">{}</p>
        <Row class="justify-content-center align-items-center">
          <Col xs={6} md={6} lg={4}>
            <RoomCreateButton buttonLabel={'Start your Lexsur'} />
          </Col>
          <Col xs={10} md={8} lg={4} id="or-container">
            <hr id="or-hr" />
            <div id="or">or</div>
          </Col>
          <Col xs={8} md={8} lg={4}>
            <RoomJoinForm />
          </Col>
        </Row>
      </Container>
      <Container id="home-section-2">
        <HomeAbout />
      </Container>
    </Container>
  );
}
export default Home;
