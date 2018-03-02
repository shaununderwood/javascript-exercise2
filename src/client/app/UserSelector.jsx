import React, { Component } from 'react';
import UserOption from './UserOption.jsx';

class UserSelector extends Component {
  render() {
    const { users, onChange } = this.props;
    return (
      <select name="user" onChange={onChange}>
        {users.map(user =>
          <UserOption key={user.id} user={user} />
        )}
      </select>
    );
  }
}

export default UserSelector;