import React from 'react';

// import { render } from 'react-dom';
// import RouterContainer from './RouterContainer.jsx';
// class App extends React.Component {
//   render() {
//     return <RouterContainer />;
//   }
// }
// render(<App />, document.getElementById('app'));


import { render } from 'react-dom';
import API from './services/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.api = new API({});
    this.state = {
      users: [],
      posts: [],
      comments: [],
    };
  }
  componentDidMount() {
    let self = this;
    this.api.getUsers().then(
      data => {
        self.setState({ users: data })
      },
      // TODO handle this correctly
      e => console.log(e)
    );

    this.api.getPosts().then(
      data => {
        self.setState({ posts: data })
      },
      // TODO handle this correctly
      e => console.log(e)
    );

    this.api.getComments().then(
      data => {
        self.setState({ comments: data })
      },
      // TODO handle this correctly
      e => console.log(e)
    );


  }

  render() {

    const { users, posts, comments } = this.state;

    return (
      <div className="container">
        <div>
          <h1> User Posts and Comments </h1>
          <div className="row">
            <div className="col-6">
              <select name="user" onChange="updateSelectedUser">
                {users.map(user => (<option value="{user.id}">{user.name}</option>))}
              </select>
            </div>
            <div className="col-6">
              <div className="panel">
                <ul>
                  <li>Address: <address>{JSON.stringify(users[0])}</address></li>
                  <li>Website: <a href="#">website</a></li>
                  <li>Company Name: </li>
                  <li>Map Link: <a href="#">map-link</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2>Posts</h2>
          <div className="row">
            <div className="col-12">
              <ul className="post__holder">
                {/* {
                  posts.map(post => (
                    <li className="post__line">
                      <p className="post__username">user_id:{post.userId}</p>
                      <p className="post__title">title: {post.title} <span>...</span></p>
                      <p className="post__body">body: {post.body}<span>...</span></p>
                    </li>
                  ))
                } */}
              </ul>
              <ul className="paginator">
                <li>|&lt;</li>
                <li>&lt;</li>
                <li>&gt;</li>
                <li>&gt;|</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2>Comment</h2>
          <div className="row">
            <div className="col-12">
              <ul className="comment__holder">
                {
                  comments.map(comment => (
                    <li className="comment__line">
                      <p className="comment__header">
                        <span>name:{comment.name}</span>
                        <a href="mailto:{comment.email}">{comment.email}</a>
                      </p>
                      <p className="comment__body">{comment.body}</p>
                    </li>

                  ))
                }
              </ul>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

render(<App />, document.getElementById('app'));



