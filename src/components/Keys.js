import React from 'react';
import Axios from 'axios';
import {
  Button, Col, Container, Input, InputGroup, InputGroupButton, ListGroup,
  ListGroupItem,
  Modal, ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import Key from 'react-icons/lib/ti/key';
import TreasureChest from './TreasureChest';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

const keyStyle = {
  borderRadius: '50%',
  marginRight: '0.2em',
  fontSize: '5em',
};

class Keys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      isLoading: false,
      modal: false,
      newKey: '',
      newKeyURL: '',
      doneAnimating: false,
    };
    this.genKey = this.genKey.bind(this);
    this.toggle = this.toggle.bind(this);
    this.focusUrlInput = this.focusUrlInput.bind(this);
    this.animationIsDone = this.animationIsDone.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchKeys();
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  focusUrlInput() {
    console.log('Debugging.......');
    const field = this.keyBox;
    field.focus();
    field.setSelectionRange(0, field.value.length);
    console.log(Object.entries(this.keyBox));
    console.log(Object.entries(field));
    console.log(`The URL is ${field.value}`);
    document.execCommand('copy');
  }

  fetchKeys() {
    this.setState({ isLoading: true });
    Axios({
      method: 'get',
      url: `${URL}/invite`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: window.localStorage.getItem('LEXSECRET'),
      },
    }).then((keys) => {
      console.log(keys);
      this.setState({
        isLoading: false,
        keys: keys.data.data,
      });
    });
  }

  handleClick() {
    this.genKey().then(() => this.animationIsDone());
  }

  genKey() {
    return Axios({
      method: 'post',
      url: `${URL}/invite`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: window.localStorage.getItem('LEXSECRET'),
      },
    }).then(key => this.setState({
      keys: (this.state.keys.concat(key.data)),
      newKey: key.data.code,
      newKeyURL: `${URL}/?invite_code=${key.data.code}`,
    })).catch((error) => {
      // TODO: Refactor this for re-use
      if (!error.response) return;
      if (error.response.data.message.includes('remaining')) {
        alert('Sorry! You do not have any invitation codes left');
      } else {
        alert('Something went wrong. Please try again.');
      }
    });
  }

// eslint-disable-next-line class-methods-use-this
  animationIsDone() {
    console.log(this);
    console.log('Animation done');
    window.setTimeout(() => {
      console.log('Animation notificaiton');
      this.setState({
        animationIsDone: true,
      });
    }, 7000);
  }

  render() {
    if (this.state.isLoading) {
      return <p>{'…'}</p>;
    } else if (this.state.keys.length === 0) {
      return (
        <Container>
          <Row center>
            <h4>
              Invitation Keys
            </h4>
          </Row>
          <Button onClick={this.toggle} color="dark" outline>Generate</Button>
          <p>No keys</p>
        </Container>
      );
    }
    return (
      <Container fluid>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Generate a new invitation</ModalHeader>
          <ModalBody class="d-flex flex-column">
            <Row
              class="justify-content-center"
            >
              <TreasureChest
                activated={!!this.state.newKey}
                isDone={this.state.animationIsDone}
              >
                <Key
                  id="key"
                  className={`key-icons${this.state.doneAnimating ? ' wobble' : ''}`}
                  style={Object.assign({ color: this.state.newKey }, keyStyle)}
                />
              </TreasureChest>
            </Row>
            <Row className="no-gutters">
              <InputGroup hidden={!this.state.newKeyURL}>
                <Input
                  getRef={(input) => { this.keyBox = input; }}
                  value={this.state.newKeyURL}
                />
                <InputGroupButton
                  onClick={this.focusUrlInput}
                  role="button"
                  aria-label="Copy invitation link"
                  tabIndex={0}
                >Copy</InputGroupButton>
              </InputGroup>
            </Row>
            <Row class="justify-content-center">
              <Button
                onClick={this.handleClick}
                color="dark"
                outline
                hidden={this.state.newKeyURL}
              >Generate</Button>
            </Row>
          </ModalBody>
          <ModalFooter>
            Thank you for spreading the word!
          </ModalFooter>
        </Modal>
        <Row>
          <Col size={6} style={{ flexGrow: 'unset' }}>
            <h4>
              Invitation Keys
            </h4>
          </Col>
          <Col size={6}>
            <Button onClick={this.toggle} color="dark" outline>Generate</Button>
          </Col>
        </Row>
        <ListGroup class="d-flex flex-wrap flex-md-row flex-sm-column">
          {this.state.keys.map(key => (
            <ListGroupItem
              style={{ width: 'unset', border: 'none' }}
              disabled={key.redeemed}
            >
              <Key
                class="key-icons"
                style={Object.assign({ border: '1px solid', color: key.code }, keyStyle)}
              />
              <span style={{ textDecoration: key.redeemed ? 'line-through' : 'none' }}>
                {key.code}
              </span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}
export default Keys;

// {this.state.keys.map(key => <li>{key.code} - {key.redeemed ? 'Redeemed' : 'Pending'}</li>)}