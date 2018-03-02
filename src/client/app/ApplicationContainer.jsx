import React, { Component } from 'react';
import ApplicationLayoutContainer from './ApplicationLayoutContainer.jsx';
import API from './services/api';
import promiscuous from 'promiscuous';

class ApplicationContainer extends Component {
  constructor(props) {
    super(props);
    this.api = new API({});
    this.state = {
      users: [],
      posts: [],
      comments: [],
      selectedUserId: 0,
      selectedUser: '',

      // vars for pagination
      // TODO: put this state with the component, and just pass userPosts
      userPosts: [],
      fromPage: 0,
      pageLength: 4, // 4 posts per page
      currentPage: 0,
    };
    this.onChange = this.onChange.bind(this);
  }
  changeUser(userId) {
    this.setState({
      selectedUserId: userId,
      selectedUser: this.getUserObject(this.state.users, userId),
      userPosts: this.state.posts.filter(post => post.userId == userId)
    });
  }
  onChange(e) {
    if (e.target.name === 'user') {
      this.changeUser(e.target.value);
      return;
    }
    if (e.target.name === 'pageButton') {
      this.setState({
        currentPage: parseInt(e.target.id)
      });
      return;
    }
  }
  getUserObject(users, userId) {
    let selectedUser = '';
    users.some(user => ('' + user.id) == userId ? selectedUser = user : false);
    return Object.assign({}, selectedUser);
  }
  componentDidMount() {
    let self = this;
    let promises = [];
    promises.push(
      this.api.getUsers().then(
        data => {
          self.setState({ users: data })
          return { name: 'users', data: data };
        },
        // TODO handle this correctly
        e => console.log(e)
      )
    );

    promises.push(
      this.api.getPosts().then(
        data => {
          self.setState({ posts: data })
          return { name: 'posts', data: data };
        },
        // TODO handle this correctly
        e => console.log(e)
      )
    );

    promises.push(
      this.api.getComments().then(
        data => {
          self.setState({ comments: data })
          return { name: 'comments', data: data };
        },
        // TODO handle this correctly
        e => console.log(e)
      )
    );

    return promiscuous.all(promises).then(
      results => {
        let posts = results.filter(dataset => dataset.name === 'posts')[0].data;
        let comments = results.filter(dataset => dataset.name === 'comments')[0].data;
        let users = results.filter(dataset => dataset.name === 'users')[0].data;

        // copy the comments over to their respective posts
        let postMap = {};
        posts.map(post => postMap[post.id] = Object.assign({}, post));
        comments.map(comment => postMap[comment.postId].comments = [].concat((postMap[comment.postId].comments || []), [Object.assign({}, comment)]));
        let commentedPosts = [];
        Object.keys(postMap).forEach(post => commentedPosts.push(postMap[post]));
        self.setState({
          posts: commentedPosts,
        });

        self.changeUser(1);
      }
    );
  }

  render() {
    let onChange = this.onChange;
    return <ApplicationLayoutContainer {...this.state} onChange={onChange} />;
  }
}

export default ApplicationContainer;