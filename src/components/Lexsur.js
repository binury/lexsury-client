/* eslint-disable spaced-comment,react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { QRCode } from 'react-qr-svg';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';

import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';
// import SignUpBootstrap from './SignUpBootstrap';
// import Login from './Login';

const phraseWordStyle = {
  textTransform: 'capitalize',
  fontSize: '1rem',
  fontWeight: 'bold',
  textAlign: 'center',
  display: 'inline-block',
  marginBottom: 0,
};

const joinBadgeStyle = {
  backgroundColor: '#FFF',
  position: 'fixed',
  bottom: '20%',
  left: 0,
  zIndex: 999,
  paddingLeft: '3em',
};

@observer
class Lex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestionText: 'Enter a question',
      questions: [],
      roomName: props.store.roomName,
    };
  }

  render() {
    return (
      <div>
        <QuestionForm sock={this.props.store.sock} />
        <QuestionList
          questions={this.props.store.questions}
          sock={this.state.socket}
          roomName={this.state.roomName}
          store={this.props.store}
        />
        <Container
          id="join-badge"
          style={joinBadgeStyle}
          className="d-none d-sm-none d-md-inline d-lg-inline d-xl-inline col-sm-4"
        >
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: '150px' }}
            value={`http://lxsr.us/${this.state.roomName}`}
          />
          <p className="lead mt-4">
            Join this Lexsur @
          </p>
          <Container
            className="d-flex justify-content-between mt-4 ml-0"
            style={{
              width: '200px',
              border: '1px solid black',
              borderRadius: '1em',
              position: 'relative',
              left: '-1em',
            }}
            fluid
          >
            <p
              className="lead font-weight-bold"
              style={{ position: 'absolute', top: '-1.5em', marginLeft: '1.1em' }}
            >
              www.lxsr.us
            </p>
            <p style={phraseWordStyle}>
              {this.state.roomName.split(',')[0]}
            </p>
            <p style={phraseWordStyle}>
              {this.state.roomName.split(',')[1]}
            </p>
            <p style={phraseWordStyle}>
              {this.state.roomName.split(',')[2]}
            </p>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Lex;

Lex.propTypes = {
  store: PropTypes.instanceOf(Object).isRequired,
};
