import React from 'react';
import { Container } from 'reactstrap';
import { observer } from 'mobx-react';
import QuestionsList from './QuestionList';

/*
 TODO: If users land on this page without having first visited presentation
 there is no Lexsur to initialize the socket and therefore nothing to show them
 need to brainstorm architecture of rework using LexStore
*/
export default observer(props => (
  <Container>
    <QuestionsList
      store={props.store}
      sock={props.sock}
      admin
    />
  </Container>
));
