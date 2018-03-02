import React, { Component } from 'react';
import Router from './services/Router';
import DeviceListContainer from './DeviceListContainer.jsx';
import LoginFormContainer from './LoginFormContainer.jsx';

class RouterContainer extends Component {
  constructor(props) {
    super(props);

    // TODO: boot the router with the current hash
    let hash = window.location.hash.substr(1) || '/';
    this.state = {
      targetRoute: hash,
    };


    this.router = {
      '': <LoginFormContainer />,
      '/': <LoginFormContainer />,
      '/home': <DeviceListContainer />
    };
    this.defaultRoute = '/';

    this.onChangeRequest = this.onChangeRequest.bind(this);
    Router.subscribe(this.onChangeRequest);
  }
  onChangeRequest(next) {
    this.setState({
      targetRoute: next || this.defaultRoute
    });
  }

  render() {
    return this.router[this.state.targetRoute];
  }
}

export default RouterContainer;