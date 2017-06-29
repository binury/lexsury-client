import React from 'react';
import PropTypes from 'prop-types';

function VoteButton(props) {
  const id = props.qid;
  function handleVote(e) {
    e.preventDefault();
    props.sock.vote({ id });
  }
  return (
    <button onClick={handleVote}>
      Vote
    </button>
  );
}

export default VoteButton;

VoteButton.propTypes = {
  qid: PropTypes.string.isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
