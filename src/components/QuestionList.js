/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format, isBefore } from 'date-fns';
import { CSSTransitionGroup } from 'react-transition-group';
import { Button, Container } from 'reactstrap';
import { QRCode } from 'react-qr-svg';
import VoteButton from './VoteButton';
import * as Avatar from '../assets/avatars';
import Shapes from './Shapes';

const listStyle = {
};

// TODO
// eslint-disable-next-line no-unused-vars
const colors = [
  '#FFD700',
  '#FFF8DC',
  '#DB7093',
  '#C2B7FE',
  '#95A9FF',
];

export default class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByDate: false,
      roomName: this.props.roomName,
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
        <Container class="text-align-center">
          <Shapes />
          <p id="no-questions-msg" className="lead">
            No questions have been asked yet.
            Be the first one!
          </p>
          <i className="iphone">
            <QRCode
              bgColor="#343A3F"
              fgColor="#FFF"
              level="Q"
              style={{ width: '80%', marginLeft: '0.85em' }}
              value={`http://lxsr.us/${this.state.roomName}`}
            />
          </i>
        </Container>
      );
    }
    const sortDate = (x, y) => isBefore(new Date(y.date), new Date(x.date)) ? -1 : 1; // eslint-disable-line no-confusing-arrow
    const sortVotes = (x, y) => y.votes.length - x.votes.length;
    const questions = this.props.questions
      .sort(this.state.sortByDate ? sortDate : sortVotes)
      .map(question => (
        <li style={{ padding: '1.25em' }} key={question.id}>
          <div className="question">
            <div className="avatar-container">
              <img src={Avatar.ChillDude} width="150px" height="150px" alt="avatar" />
            </div>
            <p className="timestamps">
              {format(new Date(question.date), 'H:mm:ss')}
            </p>
            <p>
              <span className="authors">{question.author}</span> asks:
            </p>
            <p className="questions">{question.text}</p>
            <p>
              <span className="votes">{question.votes.length}</span>
              <VoteButton qid={question.id} sock={this.props.sock} />
            </p>
          </div>
        </li>
      ));
    return (
      <Container id="questions-container" fluid>
        <Button
          className="mt-3"
          color="dark"
          outline
          onClick={() => this.toggleDateSort()}
        >
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
  roomName: PropTypes.instanceOf(String).isRequired,
};
