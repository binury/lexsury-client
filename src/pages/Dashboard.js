import React from 'react';
import { Col, Container } from 'reactstrap';
import Rooms from '../components/Rooms';
import Profile from '../components/Profile';

const Dashboard = () => (
  <Container id="dashboard">
    <Col id="db-rooms">
      <h4>My Lexsurs</h4>
      <Rooms />
    </Col>
    <Col id="db-profile">
      <h4>Profile</h4>
      <Profile />
    </Col>
    <Col id="db-billing">
      <h4>Billing</h4>
      <p>Exclusive Beta Subscriber</p>
    </Col>
  </Container>
);
export default Dashboard;
