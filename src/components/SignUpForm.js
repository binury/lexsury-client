/* eslint-disable no-return-assign */
import React from 'react';
import Axios from 'axios';
import generate from 'project-name-generator';

const formStyle = {
  display: 'inline-flex',
  fontSize: '1.5rem',
  justifyContent: 'center',
  flexDirection: 'column',
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: '',
      emailValid: false,
      passwordConfirmed: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.randomizeDisplayName = this.randomizeDisplayName.bind(this);
  }

  randomizeDisplayName(e) {
    e.preventDefault();
    const capitalize = word => (word[0].toUpperCase() + word.slice(1));
    const displayName = generate({
      words: 2,
      number: false,
      alliterative: true,
    }).raw.map(capitalize).join('');
    this.setState({ displayName });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });

    function validateEmail(email) {
      const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]){2,}$/;
      return reg.test(email);
    }
    if (name === 'email') this.setState({ emailValid: validateEmail(value) });
    else if (name === 'confirmPassword') this.setState({ passwordConfirmed: this.state.password === value });
  }


  handleSubmit(event) {
    event.preventDefault();
    const hostname = window.location.hostname;
    const port = window.location.port;
    const payload = {
      displayName: this.state.displayName.trim(),
      firstName: this.state.displayName.trim(),
      lastName: this.state.displayName.trim(),
      email: this.state.email.trim(),
      password: this.state.password.trim(),
      dob: this.state.dob,
    };
    Axios
    .post(`http://${hostname}:3030/user`, payload)
    .then(() => {
      Axios.post(
        `http://${hostname}:3030/authentication`,
        Object.assign(payload, { strategy: 'local' },
      ))
      .then((res) => {
        localStorage.setItem('LEXSECRET', res.data.accessToken);
      })
      .then(() => {
        window.location = `http://${hostname}:${port}`;
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
        <label htmlFor="displayName">Handle</label>
        <input
          type="text"
          name="displayName"
          value={this.state.displayName}
          onChange={this.handleChange}
        />
        <button onClick={this.randomizeDisplayName}>Randomize</button>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        <label htmlFor="dob">Birthday</label>
        <input
          type="date"
          name="dob"
          value={this.state.dob}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Sign Up"
          disabled={
            !this.state.emailValid
            || !this.state.displayName
            || !this.state.password
            || !this.state.dob
            || !this.state.passwordConfirmed
          }
        />
      </form>
    );
  }
}

export default SignUpForm;

