import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import { URL } './config/'; TODO
const URL = 'http://localhost:3030';

ReactDOM.render(
  <App url={URL} />,
  document.getElementById('root'),
);
