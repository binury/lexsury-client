/* eslint-disable prefer-const, prefer-template */
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import browserHistory from 'history';
import Home from '../pages/Home';
import Rooms from './Rooms';
import LexRoom from '../pages/LexRoom';
import Login from './Login';
import Logout from './Logout';
import SignUpForm from './SignUpForm';

// CSS is shit; i'm sorry- i tried
const containerStyle = { display: 'block' };
const navStyle = {
  display: 'flex',
  fontSize: '1.6rem',
  justifyContent: 'space-around',
  // TODO
};

const normal = {
  display: 'inline-block',
};

const hidden = {
  display: 'none',
};

let liStyle = (window.location.href.includes('room')) ? hidden : normal;
// TODO : Extend to conditionally render things
// TODO : Expose URL prop of nav to children
const token = window.localStorage.getItem('LEXSECRET');
const routeName = !token ? 'Login' : 'Logout';

const Navigation = () => (
  <Router history={browserHistory}>
    <div style={containerStyle}>
      <span>{process.env.NODE_ENV === 'development' ? 'DEVELOPMENT MODE' : ''}</span>
      <ul style={navStyle}>
        <li style={normal}><Link to="/">Home</Link></li>
        <li style={liStyle}><Link to={'/' + routeName.toLowerCase()}>{routeName}</Link></li>
        <li style={liStyle}><Link to="/signup">Sign Up</Link></li>
      </ul>
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
