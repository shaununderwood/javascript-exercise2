import React, { Component } from 'react';

class PostLine extends Component {
  render() {
    const { title, body } = this.props;
    return (
      <li className="post__line">
        <p className="post__username">user_id:{post.userId}</p>
        <p className="post__title">title: {post.title} <span>...</span></p>
        <p className="post__body">body: {post.body}<span>...</span></p>
      </li>
    );
  }
}

export default PostLine;