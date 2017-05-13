import React from 'react';
import VoteButton from './VoteButton';

class QuestionList extends React.Component {
  render() {
    if (!this.props.questions) { return null; }
    const listItems = this.props.questions.sort((x, y) => y.votes.length - x.votes.length)
    .map(question => <li key={question.id}> {this.props.users[question.author]} asks {question.text} <VoteButton qid={question.id} /> {question.votes.length} </li>);
    return (
      <ul>{listItems}</ul>
    );
  }
}
export default QuestionList;
