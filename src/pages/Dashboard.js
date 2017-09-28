import React from 'react';
import { Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Rooms from '../components/Rooms';
import Profile from '../components/Profile';
import Keys from '../components/Keys';
import { checkAndPurgeGuestToken } from '../helpers';

const Dashboard = () => {
  const token = window.localStorage.getItem('LEXSECRET');
  if (!token) return <Redirect to="/signup" />;
  if (checkAndPurgeGuestToken()) return null;
  return (
    <Container id="dashboard" fluid>
      <Col id="db-rooms">
        <h4>My Lexsurs</h4>
        <Rooms />
      </Col>
      <Col id="db-invites">
        <Keys />
      </Col>
      <Col id="db-profile">
        <h4>Profile</h4>
        <Profile />
      </Col>
      <Col id="db-billing" class="col-12">
        <h4>Billing</h4>
        <p>Exclusive Beta Subscriber</p>
      </Col>
    </Container>
  );
};
export default Dashboard;
