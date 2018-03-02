import React, { Component } from 'react';
import PostLines from './PostLines.jsx'
import Pagination from './Pagination.jsx';

class UserPosts extends Component {
  render() {
    return (
      <div>
        <Pagination {...this.props} />
        <PostLines {...this.props} />
      </div>
    );
  }
}

export default UserPosts;