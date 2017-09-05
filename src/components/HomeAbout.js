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
  <Container id="home-about" fluid>
    <Row>
      <h1 className="display-3">How it works</h1>
    </Row>
    <CardDeck>
      <Card>
        <CardBlock>
          <Plus
            style={{ color: '#B0F566', fontSize: '18vw' }}
          />
          <CardTitle>Create a new Lexsur</CardTitle>
          <CardText>
            {`You'll need to create a free account first but once you do it's as easy as clicking the button above.`}
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
            {`Look for the code to join your Lexsur on the right side. Have your audience visit that URL; it will look something like lxsr.us/XYZ123. While you are presenting, users are able to ask questions and show support for the questions of other audience members.`}
          </CardText>
        </CardBlock>
      </Card>
      <Card>
        <Msgs
          style={{ color: '#F2BB2A', fontSize: '18vw' }}
        />
        <CardTitle>Connect with your audience</CardTitle>
        <CardText >
          {`Once your presentation(s) are complete, you can address the audience's questions. This is your chance to shine! Use this time to solicit value feedback and build lasting connections.`}
        </CardText>
      </Card>
    </CardDeck>
  </Container>
);

export default HomeAbout;
