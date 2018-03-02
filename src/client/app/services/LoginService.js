import Promise from 'promiscuous';

class LoginService {
  constructor() {
    this.credentials = { token: '' };
  }
  login(credentials) {
    // TODO
    this.setCredentials({ token: 'logged in' });

    let deferred = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('TODO');
      }, 2000);
    });

    return deferred;
  }
  logout() {
    // TODO
  }
  setCredentials() {
    this.credentials = {
      token: '',
    };
  }
  getCredentials() {
    return this.credentials;
  }
  handleError(err) {
    return err.message;
  }
}
export default LoginService;
