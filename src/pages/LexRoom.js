/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Link, MemoryRouter } from 'react-router-dom';
import Socket from '../Socket';
import Lexsur from '../components/Lexsur';
import Admin from '../components/Admin';
import Presentation from '../components/Presentation';
import Poll from '../components/Poll';

const navStyle = {
  display: 'flex',
  fontSize: '1.6rem',
  justifyContent: 'space-around',
  // TODO
};

const liStyle = {
  display: 'inline-block',
};

// TODO: Redirect to anon user here?
// TODO: Fullscreen button
const LexRoom = () => (
  <MemoryRouter>
    <div>
      <ul style={navStyle}>
        <li style={liStyle}><Link to="/admin" >Admin</Link> </li>
        <li style={liStyle}><Link to="/presentation">Presentation</Link> </li>
        <li style={liStyle}><Link to="/poll" >Poll</Link> </li>
      </ul>
      <Route path="/lexsur" component={Lexsur} />
      <Route path="/admin" component={Admin} />
      <Route path="/presentation" component={Presentation} />
      <Route path="/poll" component={Poll} />
    </div>
  </MemoryRouter>
  );
export default LexRoom;
