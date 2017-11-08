import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import ContactForm from '../pages/Contact';
import Emblem from '../assets/emblem-hires.png';

// TODO: We should collapse when an item is clicked too
// since we're using a router the page doesn't reload
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  close = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const token = window.localStorage.getItem('LEXSECRET');
    const routeName = !token ? 'Signup' : 'Logout';
    return (
      <div hidden={this.state.isFullscreen}>
        <Navbar
          class="navbar-expand-sm navbar-dark"
          color="dark"
          expand="md"
          hidden={window.location.pathname.includes('lxr')}
        >
          <NavbarBrand>
            <Link class="nav-link" to="/">
              <img
                src={Emblem}
                alt="Lexsury"
                style={{ width: '12rem' }}
              />
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse
            class="navbar-toggleable-md"
            isOpen={this.state.isOpen}
            navbar
          >
            <Nav navbar>
              <NavItem hidden>
                <Link class="nav-link" to="/pricing">Pricing</Link>
              </NavItem>
              <NavItem hidden>
                <Link class="nav-link" to="/features">Features</Link>
              </NavItem>
              <NavItem onClick={this.close}>
                <Link class="nav-link" to="/dashboard">Dashboard</Link>
              </NavItem>
              <NavItem onClick={this.close}>
                <ContactForm />
              </NavItem>
              <NavItem onClick={this.close}>
                <Link class="nav-link" to={`/${routeName.toLowerCase()}`}>{routeName}</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

