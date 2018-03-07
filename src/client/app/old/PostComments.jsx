import React, { Component } from 'react';

class PostComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.toggleShow = this.toggleShow.bind(this);
  }
  toggleShow() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const { comments } = this.props;
    if (comments && comments.length) {
      return (
        <div>
          <span className="pull-right" onClick={this.toggleShow}>Comments: <span className="badge badge-success">{comments.length}</span></span>
          <div className={this.state.show ? 'show-comments' : 'hide-comments'}>
            {comments.map(comment => <p className="comment__text"><span className="comment__email">{comment.email}</span>: {comment.body}</p>)}
          </div>
        </div>
      );
    }
    return <span className="pull-right">Comments: <span className="badge badge-secondary">0</span></span>
  }
}

export default PostComments;