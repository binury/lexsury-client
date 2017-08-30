/* eslint-disable prefer-const, prefer-template */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import browserHistory from 'history';
import Home from '../pages/Home';
import Rooms from './Rooms';
import LexRoom from '../pages/LexRoom';
import Login from './Login';
import Logout from './Logout';
import Navbar from './Navbar';
import SignUpForm from './SignUpForm';

// CSS is shit; i'm sorry- i tried
const containerStyle = {
  display: 'block',
};

const Navigation = () => (
  <Router history={browserHistory}>
    <div style={containerStyle}>
      <Navbar />
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/room/:name" component={LexRoom} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={SignUpForm} />
    </div>
  </Router>
);
export default Navigation;
