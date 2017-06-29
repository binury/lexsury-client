import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from './VoteButton';

const QuestionList = (props) => {
  if (!props.questions) { return null; }
  const listItems = props.questions.sort((x, y) => y.votes.length - x.votes.length)
    .map(question =>
      (<li key={question.id}>
        {props.users[question.author]} asks {question.text}
        <VoteButton qid={question.id} sock={props.sock} /> {question.votes.length} </li>),
    );
  return (
    <ul>{listItems}</ul>
  );
};

export default QuestionList;

QuestionList.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
