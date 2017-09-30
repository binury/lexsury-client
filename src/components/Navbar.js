import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

// const normal = { display: 'inline-block', position: 'relative', };
// const hidden = { display: 'none', };
// const liStyle = (window.location.href.includes('room')) ? hidden : normal;
const emblem = {
  color: 'white',
  fontSize: '2em',
  fontFamily: 'Shrikhand',
  letterSpacing: '.25rem',
  textShadow: '0 0 20px #4a4848, 5px 5px 0 #292b2a',
  paddingLeft: '0.25em',
  position: 'relative',
};

// TODO: We should collapse when an item is clicked too
// since we're using a router the page doesn't reload
// TODO: Hide in presentation view
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
              <span id="emblem" style={emblem}>Lexsury</span>
            </Link>
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
                <Link class="nav-link" to="/contact">Contact</Link>
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

