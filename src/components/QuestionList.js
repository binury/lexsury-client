/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import VoteButton from './VoteButton';

export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByDate: false,
    };
  }

  toggleDateSort() {
    const { sortByDate } = this.state;
    this.setState({
      sortByDate: !sortByDate,
    });
  }

  render() {
    if (!this.props.questions) {
      return null;
    }
    const sortDate = (x, y) => y.date > x.date;
    const sortVotes = (x, y) => y.votes.length - x.votes.length;
    const questions = this.props.questions
      .sort(this.state.sortByDate ? sortDate : sortVotes)
      .map(question => (
        <li key={question.id}>
          {moment(question.date).format('HH:mm:ss')}
          {this.props.users[question.author]} asks {question.text}
          <VoteButton qid={question.id} sock={this.props.sock} />
          {question.votes.length}
        </li>
      ));
    return (
      <div>
        <button onClick={() => this.toggleDateSort()}>
          {`Sort by: ${this.state.sortByDate ? 'Votes' : 'Time'}`}
        </button>
        <ul>{questions}</ul>
      </div>
    );
  }
}

QuestionList.propTypes = {
  users: PropTypes.instanceOf(Object).isRequired,
  questions: PropTypes.instanceOf(Array).isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
