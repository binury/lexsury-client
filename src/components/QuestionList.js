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
    if (!this.props.questions) { return null; }
    const voteItems = this.props.questions.sort((x, y) => y.votes.length - x.votes.length)
          .map(question =>
              (<li key={question.id}>
                {this.props.users[question.author]} asks {question.text}
                <VoteButton qid={question.id} sock={this.props.sock} /> {question.votes.length} </li>),
          );
    const dateItems = this.props.questions.sort((x, y) => y.date > x.date)
        .map(question =>
            (<li key={question.id}>
              {this.props.users[question.author]} asks {question.text}
              <VoteButton qid={question.id} sock={this.props.sock} /> { moment(question.date).format('YYYY MM DD HH:mm:ss') } </li>),
        );
    return (
        this.state.sortByDate ?
          <div><button onClick={() => this.toggleDateSort()}>Sort By Date</button><ul>{voteItems}</ul></div> :
          <div><button onClick={() => this.toggleDateSort()}>Sort By Votes</button><ul>{dateItems}</ul></div>
    );
  }
}

QuestionList.propTypes = {
  users: PropTypes.instanceOf(Object).isRequired,
  questions: PropTypes.instanceOf(Array).isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
