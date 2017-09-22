/* eslint-disable quotes */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import RoomCreateButton from '../components/RoomCreateButton';
import RoomJoinForm from '../components/RoomJoinForm';
import Shapes from '../components/Shapes';
import HomeHeader from '../components/HomeHeader';
import HomeAbout from '../components/HomeAbout';
import { checkAndPurgeGuestToken } from '../helpers';
import HomeHeaderArrow from '../components/HomeHeaderArrow';

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
  if (checkAndPurgeGuestToken()) return null;
  return (
    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Container
        class="d-flex-inline align-items-center flex-xs-column"
        id="home-section-1"
        fluid
      >
        <Shapes />
        <Row class="align-self-start">
          <HomeHeader />
          <HomeHeaderArrow />
        </Row>
        <p id="clickprompt">{}</p>
        <Row id="home-actions" class="justify-content-center align-items-end">
          <Col xs={10} sm={8} md={8} lg={4}>
            <RoomCreateButton buttonLabel={'Start your Lexsur'} />
          </Col>
          <Col
            id="or-container"
            class="col-5 col-lg-4 mb-5 mb-sm-0"
          >
            <hr id="or-hr" />
            <div id="or">or</div>
          </Col>
          <Col xs={10} sm={8} md={8} lg={4}>
            <RoomJoinForm />
          </Col>
        </Row>
      </Container>
      <HomeAbout />
    </Container>
  );
}
export default Home;
