import React from 'react';
import PropTypes from 'prop-types';
/* import Socket from './Socket';*/
import './styles/App.css';
import Navigation from './components/Navigation';
/* import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';*/

function App(props) {
  return (
    <Navigation url={props.url} />
  );
}

App.propTypes = {
  url: PropTypes.string.isRequired,
};

export default App;

