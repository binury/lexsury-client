/* eslint-disable prefer-const, prefer-template */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import browserHistory from 'history';
import Home from '../pages/Home';
import Rooms from './Rooms';
import LexRoom from '../pages/LexRoom';
import Login from './Login';
import Logout from './Logout';
import NavBar from './Navbar';
import SignUp from '../pages/SignUp';
import Features from '../pages/Features';
import Dashboard from '../pages/Dashboard';
import Pricing from '../pages/Pricing';
import Welcome from '../pages/Welcome';

const Routes = () => (
  <Router history={browserHistory}>
    <div>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route path="/rooms" component={Rooms} />
      <Route exact path="/lxr/" component={LexRoom} />
      <Route path="/lxr/:name" component={LexRoom} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={SignUp} />
      <Route path="/features" component={Features} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/welcome" component={Welcome} />
    </div>
  </Router>
);
export default Routes;
