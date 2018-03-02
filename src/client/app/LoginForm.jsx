import React from "react";
import LabelInput from "./LabelInput.jsx";

export default class LoginForm extends React.Component {

  render() {
    const { email, password, onSubmit, onChange, onReset, disabled } = this.props;
    return (
      <form>
        <div className="row">
          <div className="col-4" style={{ 'margin': 'auto' }}>
            <h3>Login</h3>
            <LabelInput value={email} onChange={onChange} name="email" disabled={disabled} label="Email Address" autoFocus />
            <LabelInput value={password} onChange={onChange} name="password" disabled={disabled} label="Password" />
            <div style={{ textAlign: 'center' }}>
              <a href="">Forgot Password?</a>
            </div>
            <button style={{ margin: 'auto', display: 'block' }} disabled={disabled} className="btn btn-danger" onClick={onSubmit}>Login</button>
            <button style={{ margin: 'auto', display: 'block' }} disabled={!disabled} className="btn btn-warning" onClick={onReset}>Reset</button>
          </div>
        </div>
      </form>
    );
  }
}