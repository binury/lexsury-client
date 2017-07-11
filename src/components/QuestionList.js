/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import VoteButton from './VoteButton';

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
};

const questionStyle = {
  border: '2px solid #af5f5f',
  backgroundImage: 'linear-gradient( 135deg, #F97794 0%, #623AA2 100%)',
  borderRadius: '0.6em',
  color: 'white',
  padding: '1.1em',
};

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
          <blockquote style={questionStyle}>
            <p>
              {moment(question.date).format('HH:mm:ss')}
            </p>
            <p>
              {question.author} asks
            </p>
            <p>{question.text}</p>
            <p>
              <VoteButton qid={question.id} sock={this.props.sock} />
              {question.votes.length}
            </p>
          </blockquote>
        </li>
      ));
    return (
      <div>
        <button onClick={() => this.toggleDateSort()}>
          {this.state.sortByDate ? 'Best' : 'Newest'}
        </button>
        <ul style={listStyle}>{questions}</ul>
      </div>
    );
  }
}

QuestionList.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
