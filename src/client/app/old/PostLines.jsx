import React, { Component } from 'react';
import PostComments from './PostComments.jsx';

class PostLines extends Component {
  render() {
    const { posts, userId, pageLength, currentPage } = this.props;
    let from = currentPage * pageLength;
    let to = from + pageLength - 1;
    let pageLines = posts.filter((post, idx) => idx >= from && idx <= to);

    return pageLines.map(post =>
      <div key={post.postId} className="card">
        <div className="card-body">
          <h5>{post.title}</h5>
          {post.body}
          <PostComments comments={post.comments} />
        </div>
      </div>
    );
  }
}

export default PostLines;