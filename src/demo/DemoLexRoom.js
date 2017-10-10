/* eslint-disable no-unused-vars,react/no-multi-comp */
import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import HomeOutline from 'react-icons/lib/ti/home-outline';
import ArrowMaximize from 'react-icons/lib/ti/arrow-maximise';
import * as screenfull from 'screenfull';

import Socket from './DemoSocket';
import Lexsur from './DemoLexsur';
import Admin from './DemoAdmin';
import DemoLexStore from './DemoLexStore';

const URL = (process.env.NODE_ENV === 'production') ? process.env.PUBLIC_URL : 'http://localhost:3030';

const navStyle = {
  display: 'flex',
  fontSize: '1rem',
  justifyContent: 'center',
};

const liStyle = {
  display: 'inline-block',
  position: 'relative',
  paddingRight: '2.5em',
};

/*
  * FLAGS
 */
const POLLS_ENABLED = false;

@observer
class DemoLexRoom extends React.Component {
  constructor({ roomName }) {
    super();
    this.state = {
      roomName,
      sock: new Socket(),
      lexstore: new DemoLexStore({ roomName }),
    };

    if (screenfull.enabled) screenfull.on('change', this.state.lexstore.toggleFullScreen);
  }
  render() {
    const SockedLex = observer(() => (
      <Lexsur sock={this.state.sock} store={this.state.lexstore} />
    ));

    const WrappedAdmin = () => (
      <Admin sock={this.state.sock} store={this.state.lexstore} />
    );

    const toggleFullscreen = () => {
      if (screenfull.enabled) screenfull.toggle();
    };

    // Admin
    return (
      <div>
        <Router basename={'/demo'}>
          <div>
            <ul style={navStyle}>
              <li style={Object.assign({ marginRight: 'auto' }, navStyle)}>
                <a href="/dashboard"><HomeOutline style={{ fontSize: '25px' }} /></a>
              </li>
              <li style={liStyle}><NavLink
                to="/admin"
                activeClassName="active"
              >Admin</NavLink>
              </li>
              <li style={liStyle}><NavLink
                exact
                to="/"
                activeClassName="active"
              >Presentation</NavLink>
              </li>
              {POLLS_ENABLED ? <li style={liStyle}><NavLink
                to="/poll"
                activeClassName="active"
              >Poll</NavLink>
              </li> : null
              }
            </ul>
            <Route exact path="/" component={SockedLex} />
            <Route path="/admin" component={WrappedAdmin} />
          </div>
        </Router>
        <ArrowMaximize
          className={'d-none d-md-block d-lg-block d-xl-block'}
          style={{
            color: '#000',
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 999,
          }}
          size={30}
          onClick={toggleFullscreen}
        />
      </div>
    );
  }
}


export default DemoLexRoom;

DemoLexRoom.propTypes = {
  roomName: PropTypes.string.isRequired,
};
