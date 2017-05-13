import React from 'react';

function Rooms(props) {
  if (!props.rooms) { return <h3>No rooms active. Why don't you create one?</h3>; }
  const roomList = props.rooms.map(room => <li>{room.name}</li>);
  return (
    <ul>{roomList}</ul>
  );
}
export default Rooms;
