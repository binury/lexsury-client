import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import SVGInline from 'react-svg-inline';
import ContactForm from '../pages/Contact';
import Emblem from '../assets/emblem-sm.svg';

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

  render() {
    const token = window.localStorage.getItem('LEXSECRET');
    const routeName = !token ? 'Signup' : 'Logout';
    return (
      <div hidden={this.state.isFullscreen}>
        <Navbar
          class="navbar-expand-sm navbar-dark"
          color="dark"
          toggleable
          hidden={window.location.pathname.includes('lxr')}
        >
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand>
            <Link class="nav-link" to="/">
              <SVGInline svg={Emblem} />
            </Link>
          </NavbarBrand>
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
              <NavItem>
                <Link class="nav-link" to="/dashboard">Dashboard</Link>
              </NavItem>
              <NavItem>
                <ContactForm />
              </NavItem>
              <NavItem>
                <Link class="nav-link" to={`/${routeName.toLowerCase()}`}>{routeName}</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

