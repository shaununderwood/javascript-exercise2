import React, { Component } from 'react';

export default class InputLabelled extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <label>{this.props.label}</label>
          <input className="form-control" {...this.props} />
        </div>
      </div>
    );
  }
}