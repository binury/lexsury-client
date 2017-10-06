/* eslint-disable */
import React from 'react';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import ContactForm from '../components/ContactForm';

class Contact extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modal: false,
      dropdown: false,
      messageSent: false,
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });
  onSent = () => this.setState({ messageSent: true });

  render () {
    const SuccessMsg = () => <Container>Thank you!<br />We have received your message and will be in touch shortly</Container>;
    return (
      <Container>
        <a onClick={this.toggle} className="nav-link">Contact</a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader
            toggle={this.toggle}
            style={{borderBottom: 'none'}}
          >How can we help?</ModalHeader>
          <ModalBody>
            {this.state.messageSent ? <SuccessMsg/> : <ContactForm onSent={this.onSent}/>}
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default Contact;
