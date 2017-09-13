/* eslint-disable no-return-assign */
import React from 'react';
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
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('go')) {
      this.toggle();
    }
  }

  toggle() {
    // TODO: Anonymous registration of temporary user
    const token = window.localStorage.getItem('LEXSECRET');
    if (!token) {
      window.location.assign('/signup');
      return;
    }
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
          block
        >{this.props.buttonLabel}</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Lets get started!</ModalHeader>
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
export default RoomJoinButton;
