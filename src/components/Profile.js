import React from 'react';
// import { Link } from 'react-router-dom';

const axios = require('axios');

// Client development server runs on different port than actual backend server
const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

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
          Invitations Remaining: {this.state.profile.invitations}
        </li>
      </ul>
    );
  }
}
export default Profile;

