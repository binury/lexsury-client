import React from 'react';
import { Container } from 'reactstrap';

const TreasureChest = props => (
  <Container id="treasurebox">
    <input
      type="checkbox"
      id="top-checkbox"
      checked={props.activated}
      style={props.isDone ? { opacity: 0 } : {}}
    />
    <label
      htmlFor="top-checkbox"
      id="treasurechest"
      style={props.isDone ? { opacity: 0 } : {}}
    >
      <div
        id="treasurechest-top"
        style={props.isDone ? { opacity: 0 } : {}}
      />
    </label>
    <div
      id="treasurechest-bottom"
      style={props.isDone ? { opacity: 0 } : {}}
    />
    <div
      id="treasurechest-bg"
      style={props.isDone ? { opacity: 0 } : {}}
    />
    {props.children}
  </Container>
);
export default TreasureChest;
