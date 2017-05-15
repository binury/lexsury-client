import React from 'react';
import Socket from '../Socket';
const socket = new Socket();

function VoteButton(props) {
  const id = props.qid;
  function handleVote(e) {
    e.preventDefault();
    socket.vote({ id });
  }
  return (
    <button onClick={handleVote}>
      Vote
    </button>
  );
}
export default VoteButton;
