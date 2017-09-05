import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

function VoteButton(props) {
  const id = props.qid;
  function handleVote(e) {
    e.preventDefault();
    props.sock.vote(id);
  }
  return (
    <Button color="dark" outline onClick={handleVote}>
      ❤
    </Button>
  );
}

export default VoteButton;

VoteButton.propTypes = {
  qid: PropTypes.number.isRequired,
  sock: PropTypes.instanceOf(Object).isRequired,
};
