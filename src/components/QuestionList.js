/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CSSTransitionGroup } from 'react-transition-group';
import { Button, Container } from 'reactstrap';
import VoteButton from './VoteButton';

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
};

const colors = [
  '#FFD700',
  '#FFF8DC',
  '#DB7093',
  '#C2B7FE',
  '#95A9FF',
];

const questionStyle = {
  // border: '2px solid black',
  background: colors[Math.floor(Math.random() * 5)],
  borderRadius: '0.6em',
  color: '#343A3F',
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
    if (this.props.questions.length === 0) {
      return (
        <div style={{ margin: '5em' }}>
          <h3>No questions have been asked yet
          <span role="img" aria-label="sad cat face"> 😿 </span>
          </h3>
          <h2>Be the first one!</h2>
        </div>
      );
    }
    const sortDate = (x, y) => moment(y.date).isBefore(x.date) ? -1 : 1; // eslint-disable-line no-confusing-arrow
    const sortVotes = (x, y) => y.votes.length - x.votes.length;
    const questions = this.props.questions
      .sort(this.state.sortByDate ? sortDate : sortVotes)
      .map(question => (
        <li key={question.id}>
          <blockquote style={questionStyle} className="question blockquote">
            <p className="timestamps">
              {moment(question.date).format('HH:mm:ss')}
            </p>
            <p>
              <span className="authors">{question.author}</span> asks:
            </p>
            <p className="questions">{question.text}</p>
            <p>
              <span className="votes">{question.votes.length}</span>
              <VoteButton qid={question.id} sock={this.props.sock} />
            </p>
          </blockquote>
        </li>
      ));
    return (
      <Container id="questions-container">
        <Button color="dark" outline onClick={() => this.toggleDateSort()}>
          {this.state.sortByDate ? 'Best' : 'Newest'}
        </Button>
        <ul style={listStyle} id="questions-list">
          <CSSTransitionGroup
            transitionName="questions"
            transitionEnterTimeout={2500}
            transitionLeaveTimeout={300}
            transitionAppearTimeout={500}
          >
            {questions}
          </CSSTransitionGroup>
        </ul>
      </Container>
    );
  }
}

QuestionList.propTypes = {
  questions: PropTypes.instanceOf(Array).isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
