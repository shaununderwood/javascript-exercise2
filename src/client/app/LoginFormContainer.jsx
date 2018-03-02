import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';
import LoginService from './services/LoginService';
import Router from './services/Router';

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.LoginService = new LoginService();
    this.Router = Router;

    this.state = {
      email: '',
      password: '',
      disabled: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.actions = {
      onChange: this.onChange,
      onSubmit: this.onSubmit,
      onReset: this.onReset
    };
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      disabled: !this.state.disabled
    });

    this.LoginService.login(this.state).then(
      () => {
        this.onReset();
        window.location = '#/home';
      },
      (e) => this.onError(e)
    );
  }
  onReset(e) {
    e ? e.preventDefault() : null;
    this.setState({
      disabled: !this.state.disabled
    });
  }
  componentDidMount() {
    // this.setState({
    //   email: 's@s.com',
    //   password: 'asdasd',
    //   disabled: false,
    // });
  }

  render() {
    return <LoginForm {...this.state} {...this.actions} />;
  }
}

export default LoginFormContainer;