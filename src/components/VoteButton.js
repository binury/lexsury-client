import React from 'react';

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
