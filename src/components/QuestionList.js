import React from 'react';
import VoteButton from './VoteButton';

const QuestionList = () => {
  if (!this.props.questions) { return null; }
  const listItems = this.props.questions.sort((x, y) => y.votes.length - x.votes.length)
    .map(question =>
      (<li key={question.id}>
        {this.props.users[question.author]} asks {question.text}
        <VoteButton qid={question.id} sock={this.props.sock} /> {question.votes.length} </li>),
    );
  return (
    <ul>{listItems}</ul>
  );
};
export default QuestionList;
