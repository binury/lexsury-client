import React from 'react';
import { Link } from 'react-router-dom';


const navBarStyle = {
  background: 'black',
  color: 'white',
  padding: '.1em', // 1em
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '1.0rem', // 1.6
  lineHeight: '.45',
  WebkitPaddingStart: '0px',
};

const normal = {
  display: 'inline-block',
  position: 'relative',
};

const hidden = {
  display: 'none',
};

const liStyle = (window.location.href.includes('room')) ? hidden : normal;
const token = window.localStorage.getItem('LEXSECRET');
const routeName = !token ? 'Signup' : 'Logout';

const emblem = {
  fontSize: '2em',
  fontFamily: 'Shrikhand',
  letterSpacing: '.25rem',
  textShadow: '0 0 20px #4a4848, 5px 5px 0 #292b2a',
  paddingLeft: '0.25em',
  position: 'relative',
};

const Navbar = () =>
  (
    <div style={navBarStyle}>
      <span id="emblem" style={emblem}>Lexsury</span>
      <ul style={navStyle}>
        <li style={normal}><Link to="/">Home</Link></li>
        <li style={normal}>Features</li>
        <li style={normal}>Pricing</li>
        <li style={normal}>Dashboard</li>
        <li style={liStyle}><Link to={`/${routeName.toLowerCase()}`}>{routeName}</Link></li>
      </ul>
    </div>
  );

export default Navbar;
