import React, { Component } from 'react';
import UserSelector from './UserSelector.jsx';
import UserAddressDetails from './UserAddressDetails.jsx';

class UserDetails extends Component {
  render() {
    const { users, onChange, selectedUser, selectedUserId } = this.props;
    return (
      <div>
        <h1> User Posts and Comments </h1>
        <div className="row">
          <div className="col-6">
            <UserSelector onChange={onChange} users={users} value={selectedUserId} />
          </div>
          <div className="col-6">
            <div className="panel">
              <UserAddressDetails user={selectedUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;