import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Rooms from './Rooms';
import LexRoom from './LexRoom';
import Login from './Login';

// CSS is shit; i'm sorry- i tried
const containerStyle = { display: 'block' };
const navStyle = {
  display: 'flex',
  fontSize: '1.6rem',
  justifyContent: 'space-around',
  // TODO
};

const liStyle = {
  display: 'inline-block',
};

// TODO : Extend Login to conditionally render Logout
// TODO : Expose URL prop of nav to children
const Navigation = props => (
  <Router history={history}>
    <div style={containerStyle}>
      <ul style={navStyle}>
        <li style={liStyle}><Link to="/login">Login</Link></li>
        <li style={liStyle}><Link to="/">Home</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/room/:name" component={LexRoom} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);
export default Navigation;
