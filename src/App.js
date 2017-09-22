import React from 'react';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
import 'normalize.css';
import './styles/App.scss';
import Routes from './components/Routes';
import { checkAndStoreInvitation } from './helpers';

function App() {
  checkAndStoreInvitation();
  return (
    <Routes />
  );
}

export default App;
