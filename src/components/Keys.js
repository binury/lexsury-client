import React from 'react';
import Axios from 'axios';
import { Button, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import Key from 'react-icons/lib/ti/key';

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

const keyStyle = {
  border: '1px solid',
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
    };
    this.genKey = this.genKey.bind(this);
  }

  componentDidMount() {
    this.fetchKeys();
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

  genKey() {
    Axios({
      method: 'post',
      url: `${URL}/invite`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: window.localStorage.getItem('LEXSECRET'),
      },
    }).then(key => this.setState({
      keys: (this.state.keys.concat(key.data)),
    })).catch((error) => {
      // TODO: Refactor this for re-use
      if (error.response.data.message.includes('remaining')) {
        alert('Sorry! You do not have any invitation codes left');
      } else {
        alert('Something went wrong. Please try again.');
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return <p>{'…'}</p>;
    } else if (this.state.keys.length === 0) {
      return (
        <Container>
          <Button onClick={this.genKey} color="dark" outline>Generate</Button>
          <p>No keys</p>;
        </Container>
      );
    }
    return (
      <Container fluid>
        <Row center>
          <h4>
            Invitation Keys
          </h4>
        </Row>
        <Row>
          <Button onClick={this.genKey} color="dark" outline>Generate</Button>
        </Row>
        <ListGroup class="d-flex flex-md-row flex-sm-column">
          {this.state.keys.map(key => (
            <ListGroupItem
              style={{ width: 'unset', border: 'none' }}
              disabled={key.redeemed}
            >
              <Key
                class="key-icons"
                style={Object.assign({ color: key.code }, keyStyle)}
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
