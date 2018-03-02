import React, { Component } from 'react';

class Debugger extends Component {
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
      </div>
    );
  }
}
export default Debugger;
