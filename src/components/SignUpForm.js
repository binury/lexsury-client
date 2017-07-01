/* eslint-disable no-return-assign */
import React from 'react';
import Axios from 'axios';

const formStyle = {
  display: 'inline-flex',
  fontSize: '1.5rem',
  justifyContent: 'center',
  flexDirection: 'column',
};
// TODO: Add register for new users
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      username: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    Axios
    .post(`http://${window.location.hostname}:3030/users`, payload)
    .then(() => {
      Axios.post(
        `http://${window.location.hostname}:3030/authentication`,
        Object.assign(payload, { strategy: 'local' },
      ))
      .then((res) => {
        localStorage.setItem('LEXSECRET', res.data.accessToken);
      })
      .then(() => {
        window.location = `http://${window.location.hostname}:3000/`;
      });
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <form
        style={formStyle}
        onSubmit={this.handleSubmit}
        encType="application/json"
      >
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="email">E-Mail</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default SignUpForm;

