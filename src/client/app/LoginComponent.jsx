import React from 'react';
import { Component } from 'react'
import C from './CONSTANTS.JS';
import LoginService from './LoginService.js';
import InputLabelled from './InputLabelled.jsx';
import Debugger from './Debugger.jsx';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    let controls = ['handleInputChange', 'handleSubmit', 'reset', 'login'];
    this.linkControls(controls, this);
    this.LoginService = LoginService;
    this.C = C;
  }

  linkControls(controls, _self) {
    let self = _self || this;
    controls.map((v, i) => self[v] = self[v].bind(self));
  }

  componentWillMount() {
    // not used
  }

  login() {

    // check https://www.sitepoint.com/asynchronous-apis-using-fetch-api-es6-generators/
    // let loginResult = yield this.LoginService.attemptLogin(this.state);
    // if (loginResult.isLoggedIn) {
    //   alert('Banzai!')
    //   return;
    // } else {
    //   alert('Meh :/');
    //   return;
    // }

    let self = this;
    if (this.validateForm()) {
      this.LoginService.attemptLogin(this.state)
        .then(
          this.NavigationService.goto(self.C.UI_LIST_DEVICES)
        );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.login();
  }

  validateForm() {
    let msg = '';
    if (this.state.email === '') {
      msg = 'Email is required';
    } else if (this.state.password === '') {
      msg = 'Password is required';
    }
    return this.displayErrors(msg);
  }

  displayErrors(msg) {
    if (!msg) return true;
    alert(msg);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  reset(e) {
    if (e) e.preventDefault();
    this.setState({
      email: '',
      password: ''
    });
  }


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4" style={{ 'margin': 'auto' }}>

            <h3>Login</h3>
            <form onSubmit={this.handleSubmit}>

              <InputLabelled label="email" type="text" name="email" placeholder="" value={this.state.email} onChange={this.handleInputChange} />
              <InputLabelled label="password" type="password" name="password" placeholder="" value={this.state.password} onChange={this.handleInputChange} />

              <div style={{ textAlign: 'center' }}>
                <a href="">Forgot Password?</a>
              </div>

              <button style={{ margin: 'auto', display: 'block' }} className="btn btn-danger" type="submit">Login</button>
            </form>
          </div>
        </div>
        <Debugger state={this.state} />
      </div>
    );
  }
}

