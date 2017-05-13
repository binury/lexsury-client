import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Rooms from './Rooms';
import LexRoom from './LexRoom';

const Presentation = () => (
  <div>
    <h2>Presentation</h2>
  </div>
);
/* const Rooms = ({ match }) => (
  <ul>
    <li><Link to="/room/test1">Test1</Link></li>
    <li><Link to="/room/test2">Test2</Link></li>
    <li><Link to="/room/test3">Test3</Link></li>
  </ul>
  );*/
const Navigation = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/presentation">Presentation</Link></li>
        <li><Link to="/rooms">Active Lexsurs</Link></li>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/presentation" component={Presentation} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/room/:name" component={LexRoom} />
      </ul>
    </div>
  </Router>
);
export default Navigation;
