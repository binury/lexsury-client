import React from 'react';
import { Col, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Rooms from '../components/Rooms';
import { checkAndPurgeGuestToken } from '../helpers';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'own', // [own, visited]
    };
  }
  render() {
    const token = window.localStorage.getItem('LEXSECRET');
    if (!token) return <Redirect to="/signup" />;
    if (checkAndPurgeGuestToken()) return null;
    return (
      <Container id="dashboard" fluid>
        <Col id="db-rooms">
          <Rooms />
        </Col>
      </Container>
    );
  }
}
export default Dashboard;
