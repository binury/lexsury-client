/* eslint-disable no-return-assign */
import React from 'react';
import axios from 'axios';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Container,
} from 'reactstrap';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

const token = window.localStorage.getItem('LEXSECRET');

// eslint-disable-next-line no-unused-vars
function genNewRoom() {
  if (!token) {
    window.location += 'login';
    return;
  }
  axios.post(`${URL}/room`, {}, {
    headers: { Authorization: token },
  })
  .then(res => window.location = `/room/${res.data.name}`)
  .catch(err => console.log(`There was an error: ${err}`));
}

class RoomJoinButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <Container>
        <Button
          color="dark"
          size="lg"
          outline
          onClick={this.toggle}
        >{this.props.buttonLabel}</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Lets get started!</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do
              Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
export default RoomJoinButton;
