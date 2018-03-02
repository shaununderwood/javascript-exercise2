import React from "react";

export default class LabelInput extends React.Component {
  render() {
    return (
      <div className="label-input">
        <label>{this.props.label}</label>
        <input className="form-control" {...this.props} />
      </div>
    );
  }
};
