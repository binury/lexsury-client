// TODO
/* eslint-disable no-unused-vars,quotes */
import React from 'react';
import {
  Card, CardBlock, CardDeck, CardText, CardTitle, Container,
  Row,
} from 'reactstrap';
import Plus from 'react-icons/lib/ti/plus-outline';
import Msg from 'react-icons/lib/ti/message-typing';
import Msgs from 'react-icons/lib/ti/messages';

const HomeAbout = () => (
  <Container id="about" fluid>
    <Row class="justify-content-center">
      <h1 className="display-3" id="how">How it works</h1>
    </Row>
    <CardDeck>
      <Card>
        <CardBlock>
          <Plus
            style={{ color: '#B0F566', fontSize: '18vw' }}
          />
          <CardTitle>Create a new Lexsur</CardTitle>
          <CardText>
            {`You'll need to create a free account first but once you do it's truly as easy as clicking the button above. You'll then be automatically taken directly into your own personal Lexsur.`}
          </CardText>
        </CardBlock>
      </Card>
      <Card>
        <CardBlock>
          <Msg
            style={{ color: '#95A9FF', fontSize: '18vw' }}
          />
          <CardTitle>Users join on their devices</CardTitle>
          <CardText>
            {`See those three words? That's your unique phrase to give the audience to join your new room. Visit lxsr.us or scan the QR code to join in. While you are presenting, users are able to ask questions and show support for the questions of other audience members.`}
          </CardText>
        </CardBlock>
      </Card>
      <Card>
        <Msgs
          style={{ color: '#F2BB2A', fontSize: '18vw' }}
        />
        <CardTitle>Connect with your audience</CardTitle>
        <CardText >
          {`Once your presentation is complete you can turn your focus to questions that were collected while you were speaking. This is your chance to shine! Use this time to solicit feedback and build lasting connections.`}
        </CardText>
      </Card>
    </CardDeck>
  </Container>
);

export default HomeAbout;
