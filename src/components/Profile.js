import React from 'react';
import { Container } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { URL } from '../helpers';

const axios = require('axios');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.fetchProfile();
  }
  fetchProfile() {
    this.setState({ isLoading: true });
    axios({
      method: 'get',
      url: `${URL}/user`,
      timeout: 20000,
      responseType: 'json',
      headers: {
        Authorization: window.localStorage.getItem('LEXSECRET'),
      },
    }).then((profile) => {
      console.log(profile.data.data[0]);
      this.setState({
        isLoading: false,
        profile: profile.data.data[0],
      });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <p>{'…'}</p>;
    }
    return (
      <Container>
        <ul>
          <li>
            Email: {this.state.profile.email}
          </li>
          <li>
            Handle: {this.state.profile.displayName}
          </li>
          <li>
            First Name: {this.state.profile.firstName}
          </li>
          <li>
            Last Name: {this.state.profile.lastName}
          </li>
          <li>
            {this.state.profile.invitations > 0 ?
              `Invitations Remaining: ${this.state.profile.invitations}` :
              null
            }
          </li>
        </ul>
      </Container>
    );
  }
}
export default Profile;

