/* eslint-disable no-return-assign */
import React from 'react';
import Proptypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Container,
} from 'reactstrap';
import RoomCreateForm from './RoomCreateForm';

class RoomJoinButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('go')) {
      this.toggle();
    }
  }

  toggle = () => {
    const token = window.localStorage.getItem('LEXSECRET');
    if (!token) {
      window.location.assign('/signup');
      return;
    }
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <Container>
        <Button
          color="dark"
          size="lg"
          onClick={this.toggle}
          block
          class="mb-5 mb-sm-0"
        >{this.props.buttonLabel}</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Create a new Lexsur</ModalHeader>
          <ModalBody>
            <RoomCreateForm />
          </ModalBody>
          <ModalFooter hidden>
            #EIGHT_TOES
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

RoomJoinButton.propTypes = {
  buttonLabel: Proptypes.string.isRequired,
};

export default RoomJoinButton;
