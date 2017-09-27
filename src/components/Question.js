import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { format } from 'date-fns';
import GoQuote from 'react-icons/lib/go/quote';
import GoHeart from 'react-icons/lib/go/heart';
import * as Avatar from '../assets/avatars';
import Socket from '../Socket';

const Question = (props) => {
  const question = props.question;
  const vote = () => props.sock.vote(question.id);
  return (
    <li key={question.id}>
      <div className="question mt-3">
        <div className="avatar-container">
          <img
            src={Avatar.ChillDude}
            width="150px"
            height="150px"
            alt="avatar"
          />
        </div>
        <p className="timestamps">
          {format(new Date(question.date), 'H:mm:ss')}
        </p>
        <p className="questions">
          <GoQuote />
          {question.text}
          <GoQuote style={{ transform: 'rotate(180deg)' }} />
        </p>
        <p style={{ display: 'inline' }}>
          <span className="authors">—{question.author}</span>
        </p>
        <p>
          <span className="votes">{question.votes.length || null}</span>
          <Button
            outline
            style={{ border: 0 }}
            onClick={vote}
          ><GoHeart /></Button>
        </p>
      </div>
    </li>
  );
};

Question.PropTypes = {
  sock: PropTypes.instanceOf(Socket).isRequired,
  question: PropTypes.object.isRequired,
  admin: PropTypes.bool,
};
Question.defaultProps = {
  admin: false,
};

export default Question;

