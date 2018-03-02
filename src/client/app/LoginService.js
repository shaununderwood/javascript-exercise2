
let userData = {
};

class LoginService {
  constructor() {
    userData.email = '';
    userData.password = '';
  }
  attemptLogin(values) {
    // perform some secret source
    userData.email = values.email;
    userData.password = values.password;
    userData.sessionKeyData = true;

    return true;

    // this is pseudo-code
    let self = this;
    return Backend.post(url, data).then(result => {
      if (!result.errors) {
        self.setSessionKey(result.sessionKeyData);
        return true;
      }
    });
  }
  isLoggedIn() {
    return !!userData.sessionKeyData;
  }
  logout() {
    userData = {};
  }
  getSessionKey() {
    return userData.sessionKeyData;
  }
  setSessionKey(value) {
    userData.sessionKeyData = value;
  }
};

export default new LoginService();