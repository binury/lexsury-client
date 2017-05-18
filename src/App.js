import React from 'react';
/* import Socket from './Socket';*/
import './App.css';
import Navigation from './components/Navigation';
/* import QuestionForm from './components/QuestionForm';
import QuestionList from './components/QuestionList';*/

function App(props) {
  return (
    <Navigation url={props.URL} />
  );
}

export default App;
