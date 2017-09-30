/* eslint-disable prefer-const, prefer-template */
import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import browserHistory from 'history';
import Home from '../pages/Home';
import Rooms from './Rooms';
import LexRoom from '../pages/LexRoom';
import Login from './Login';
import Logout from './Logout';
import NavBar from './Navbar';
import SignUp from '../pages/SignUp';
import Features from '../pages/Features';
import Dashboard from '../pages/Dashboard';
import Pricing from '../pages/Pricing';
import Welcome from '../pages/Welcome';
import Contact from '../pages/Contact';

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollRestore = withRouter(ScrollToTop);

const Routes = () => (
  <Router history={browserHistory}>
    <div>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route path="/rooms" component={Rooms} />
      <Route exact path="/lxr/" component={LexRoom} />
      <ScrollRestore>
        <Route path="/lxr/:name" component={LexRoom} />
      </ScrollRestore>
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/signup" component={SignUp} />
      <Route path="/features" component={Features} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/contact" component={Contact} />
    </div>
  </Router>
);
export default Routes;
