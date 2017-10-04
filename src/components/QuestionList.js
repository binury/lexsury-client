/* eslint-disable max-len,react/jsx-no-bind */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { Button, Container } from 'reactstrap';
import { isBefore } from 'date-fns';
import { QRCode } from 'react-qr-svg';
import { observer } from 'mobx-react';
import Shapes from './Shapes';
import Question from './Question';

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

@observer
class QuestionList extends Component {
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
    if (this.props.store.questions.length === 0) {
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
              value={`http://lxsr.us/${this.props.store.roomName}`}
            />
          </i>
        </Container>
      );
    }
    const sortDate = (x, y) => isBefore(new Date(y.date), new Date(x.date)) ? -1 : 1; // eslint-disable-line no-confusing-arrow
    const sortVotes = (x, y) => y.votes.length - x.votes.length;
    const questions = this.props.store.validQuestions
      .sort(this.state.sortByDate ? sortDate : sortVotes)
      .map(question => (
        <Question
          question={question}
          sock={this.props.store.sock}
          admin={this.props.admin}
        />
      ));
    return (
      <Container id="questions-container" fluid>
        <Button
          className="mt-3"
          color="dark"
          outline
          onClick={() => this.toggleDateSort()}
          style={{ float: 'right' }}
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
  admin: PropTypes.bool,
};

QuestionList.defaultProps = {
  admin: false,
};

export default QuestionList;

