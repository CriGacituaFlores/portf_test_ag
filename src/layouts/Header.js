import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  MenuItem,
  Snackbar,
} from 'material-ui';

import { retreiveAuth, removeAuth, getMe, setAuthIsLoading, setAuthError, setAuth } from '../actions/auth';
import { retrieveCredentials } from '../services/storage';


/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
// const Header = ({ history, location }) => (
class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      auth: null,
      snack: {
        message: null,
        type: null,
        open: false,
      }
    };
  }

  componentWillMount() {
    if (!this.state.auth || !this.state.auth.access_token) {
      this.props.setAuthIsLoading();
      retrieveCredentials().then((credentials) => {
        if (credentials._id && credentials.access_token) {
          this.setState({ auth: credentials });
          if (!this.props.auth || !this.props.auth.data) {
            this.props.setAuth(credentials);
          }
          if (this.props.location.pathname === '/login' || this.props.location.pathname === '/forgot' || this.props.location.pathname === '/signup') {
            console.log('Go home');
            console.log(this.props.auth.data);
            this.goTo('/home');
          }
        } else if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/forgot' && this.props.location.pathname !== '/signup') {
          this.props.setAuthError({ message: 'No credentials available' });
          console.log('Go login credentials');
          this.props.removeAuth();
          this.goTo('/login');
        }
      }).catch((err) => {
        this.props.setAuthError(err);
        console.log('Go login error');
        this.props.removeAuth();
        this.goTo('/login');
      });
    }
  }

  componentDidUpdate() {
    if (this.state.auth && this.state.auth.access_token) {
      if ((!this.props.me || !this.props.me.data) &&
        !(this.props.me.isLoading || this.props.me.error)) {
        this.props.getMe();
      }
    }
    if (this.props.me && this.props.me.error && this.props.me.error === 'Something went wrong getting user data' && this.props.location.pathname !== '/login') {
      console.log('Go login went wrong');
      this.props.removeAuth();
      this.goTo('/login');
    }
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  goTo = path => this.props.history.push(path);

  handleRequestClose = () => {
    this.setState({
      snack: {
        message: null,
        type: null,
        open: false,
      }
    });
  };

  renderAppBar = () => null;

  renderMenu = () => {
    if (this.props.me &&
      this.props.me.data &&
      this.props.me.data._id &&
      this.props.startupList &&
      this.props.startupList.data &&
      this.props.startupList.data.length) {
      return this.props.startupList.data.map(startup => (
        <MenuItem
          key={`startup-menu-${startup._id}`}
          onClick={() => {
            this.goTo(`/startups/${startup.name.split(' ')[0].toLowerCase()}`);
          }}
        >
          {startup.name}
        </MenuItem>
      ));
    }
    return null;
  }

  render() {
    return (
      <nav>
        {this.renderAppBar()}
        <Snackbar
          open={this.state.snack.open}
          message={this.state.snack.open}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </nav>
    );
  }
}

Header.propTypes = {
  setAuthIsLoading: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired,
  setAuthError: PropTypes.func.isRequired,
  removeAuth: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired,
  auth: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape({
      access_token: PropTypes.string
    }),
    error: PropTypes.string,
  }),
  me: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.shape({
      _id: PropTypes.string,
      username: PropTypes.string,
      role: PropTypes.string
    }),
    error: PropTypes.string,
  }),
  startupList: PropTypes.shape({
    isLoading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      map: PropTypes.func,
    })),
    error: PropTypes.string,
  }),
};

Header.defaultProps = {
  auth: null,
  me: null,
  startupList: null
};

const mapStateToProps = state => ({
  auth: state.auth,
  me: state.me,
  startupList: state.startupList,
});

const mapDispatchToProps = dispatch => ({
  getMe: () => dispatch(getMe()),
  retreiveAuth: () => dispatch(retreiveAuth()),
  removeAuth: () => dispatch(removeAuth()),
  setAuthIsLoading: () => dispatch(setAuthIsLoading()),
  setAuthError: error => dispatch(setAuthError(error)),
  setAuth: auth => dispatch(setAuth(auth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
