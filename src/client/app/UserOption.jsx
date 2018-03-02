import React, { Component } from 'react';

class UserOption extends Component {
  render() {
    const { user } = this.props;
    if (!user) return;
    return <option value={user.id}>{user.name}</option>;
  }
}

export default UserOption;