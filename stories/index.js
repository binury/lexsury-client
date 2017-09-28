/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Container } from 'reactstrap';
import { storiesOf } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/styles/App.scss';
// import { action } from '@storybook/addon-actions';
import AvatarPicker from '../src/components/AvatarPicker';
import QuestionForm from '../src/components/QuestionForm';
import QuestionList from '../src/components/QuestionList';

storiesOf('AvatarSelection', module).add('v1', () => <AvatarPicker />);
storiesOf('Mobile Question Modal', module).add('v1', () => (
  <Container >
    <AvatarPicker />
    <QuestionForm />
  </Container>
));

const testQuestions = [
  { author: 'Author 1', text: 'This is a test', votes: [1, 2, 3] },
  { author: 'Author 2', text: 'This is a test', votes: [1, 2] },
  { author: 'Author 3', text: 'This is a test', votes: [1] },
];
storiesOf('Questions', module).add('v1', () => (
  <QuestionList questions={testQuestions} />
));
