import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

// const normal = { display: 'inline-block', position: 'relative', };
// const hidden = { display: 'none', };
// const liStyle = (window.location.href.includes('room')) ? hidden : normal;
const token = window.localStorage.getItem('LEXSECRET');
const routeName = !token ? 'Signup' : 'Logout';

const emblem = {
  fontSize: '2em',
  fontFamily: 'Shrikhand',
  letterSpacing: '.25rem',
  textShadow: '0 0 20px #4a4848, 5px 5px 0 #292b2a',
  paddingLeft: '0.25em',
  position: 'relative',
};

// TODO: We should collapse when an item is clicked too
// since we're using a router the page doesn't reload
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar class="navbar-expand-sm navbar-dark" color="dark" toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">
            <span id="emblem" style={emblem}>Lexsury</span>
          </NavbarBrand>
          <Collapse
            class="navbar-toggleable-md"
            isOpen={this.state.isOpen}
            navbar
          >
            <Nav class="mr-auto" navbar>
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
                <Link class="nav-link" to={`/${routeName.toLowerCase()}`}>{routeName}</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

