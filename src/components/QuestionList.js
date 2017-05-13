import React from 'react';
import VoteButton from './VoteButton';

function QuestionList(props) {
  const questions = props.questions;
  const users = props.users;
  if (!questions) {
    return null;
  }
  const listItems = questions.map(question =>
    <li key={question.id}>
      {`${users[question.author]}\t asks \t${question.text}`}
      <VoteButton qid={question.id} />
      {question.votes.length}
    </li>,
  );
  return (
    <ul>{listItems}</ul>
  );
}
export default QuestionList;
