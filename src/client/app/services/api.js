import Promise from 'promiscuous';
import getJSON from 'get-json';

const C = {
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
  USERS: 'https://jsonplaceholder.typicode.com/users',
  COMMENTS: 'https://jsonplaceholder.typicode.com/comments',
};
class API {
  constructor(config) {
    this.data = {
      users: [],
      posts: [],
      comments: []
    };
  }
  getData(url) {
    // not using redux right now as just started on that topic
    // so this api is just a singlton for source of truth

    return new Promise(function (resolve) {
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data));
    });
  }
  getUsers() {
    return this.getData(C.USERS);
  }
  getComments(postId) {
    return this.getData(C.COMMENTS);
  }
  getPosts(userId) {
    return this.getData(C.POSTS);
  }
}

export default function (config) {
  return new API(config);
};
