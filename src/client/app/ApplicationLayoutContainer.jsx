import React, { Component } from 'react';
import UserDetails from './UserDetails.jsx';
import UserPosts from './UserPosts.jsx';

class ApplicationLayoutContainer extends Component {
  render() {
    const { users, posts, comments, onChange, selectedUser, selectedUserId, currentPage, pageLength, userPosts } = this.props;

    return (
      <div className="container">
        <div>
          <UserDetails users={users} onChange={onChange} selectedUser={selectedUser} selectedUserId={selectedUserId} />
        </div>

        <div>
          <h2>Posts</h2>
          <div className="row">
            <div className="col-12">
              <UserPosts length={userPosts.length} currentPage={currentPage} pageLength={pageLength} onChange={onChange} posts={userPosts} />
            </div>
          </div>

        </div >
      </div >

    );
  }
}

export default ApplicationLayoutContainer;