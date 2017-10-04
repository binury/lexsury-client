/* eslint-disable react/void-dom-elements-no-children,react/no-danger,no-nested-ternary */
import React from 'react';
import { Button, Container, ListGroup, ListGroupItem } from 'reactstrap';
import { observer } from 'mobx-react';
import GoCheck from 'react-icons/lib/go/check';
import GoX from 'react-icons/lib/go/x';
import ToggleSwitch from '@trendmicro/react-toggle-switch';
import '@trendmicro/react-toggle-switch/dist/react-toggle-switch.css';

export default observer((props) => {
  const isDone = question => (question.hidden || question.archived);
  const awaitingMod = question => (props.store.roomInfo.moderationEnabled &&
      (question.approved === null && !isDone(question)));
  // Denied must be tested this way as question.approved can be null, 0, or false
  const isDenied = question => question.approved === false;
  const isLive = question => !isDone(question) && !awaitingMod(question) && !isDenied(question);
  const parseQuestions = filter => props.store.questions.filter(filter).map((question) => {
    const archive = () => props.sock.archive(question.id);
    const hide = () => props.sock.hide(question.id);
    const allow = () => props.sock.moderate({ id: question.id, approved: true });
    const deny = () => props.sock.moderate({ id: question.id, approved: false });
    console.log(question);
    return (
      <ListGroupItem action>
        <span
          className="question-controls"
          style={{ float: 'right' }}
          hidden={isDone(question)}
        >
          <Button
            outline
            style={{ border: 0 }}
            onClick={awaitingMod(question) ? allow : archive}
          ><GoCheck /></Button>
          <Button
            outline
            style={{ border: 0 }}
            onClick={awaitingMod(question) ? deny : hide}
          ><GoX /></Button>
        </span>
        <p>{question.author}</p>
        <p>{question.text}</p>
      </ListGroupItem>
    );
  });

  const questions = {
    done: parseQuestions(isDone),
    needReview: parseQuestions(awaitingMod),
    live: parseQuestions(isLive),
  };
  return (
    <Container>
      <Container className="d-flex justify-content-around">
        <p className="d-inline-block">
          {props.store.roomInfo.title || 'Untitled Room' }
        </p>
        <p className="d-inline-block">
          {props.store.roomInfo.descr || 'No description' }
        </p>
        <p className="d-inline-block">
          {`Join Phrase: ${props.store.roomInfo.name}`}
        </p>
      </Container>
      <Container className="d-flex justify-content-around flex-column-reverse flex-lg-row">
        <ListGroup class="d-inline-flex col-12 col-md-4 col-lg-4 col-xl-4">
          <p className="lead">
            Pending Moderation
            <ToggleSwitch
              style={{ marginLeft: '0.5em' }}
              checked={props.store.roomInfo.moderationEnabled}
              onChange={props.store.toggleModeration}
            />
          </p>
          {!props.store.roomInfo.moderationEnabled ? 'Questions will show live without needing review' :
            questions.needReview.length > 0 ? questions.needReview : 'There are no questions in need of approval'}
        </ListGroup>
        <ListGroup class="d-inline-flex col-12 col-lg-4 col-xl-4">
          <p className="lead">Inactive Questions</p>
          {questions.done.length > 0 ? questions.done : 'Hidden and archived questions will appear here'}
        </ListGroup>
        <ListGroup class="d-inline-flex col-12 col-lg-4 col-xl-4">
          <p className="lead">Live Questions</p>
          {questions.live.length > 0 ? questions.live : 'No questions are live yet'}
        </ListGroup>
      </Container>
    </Container>
  );
});
