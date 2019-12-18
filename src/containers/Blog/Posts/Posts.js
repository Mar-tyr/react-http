import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
  };

  postSelectedHandler = (selectedPostID) => {
    this.props.history.push('/posts/' + selectedPostID);
  };

  componentDidMount() {
    axios
      .get('/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        posts.forEach((post) => {
          post['author'] = 'Can Xia';
        });
        this.setState({ posts: posts });
      })
      .catch((err) => {
        // this.setState({ error: true });
      });
  }

  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={this.postSelectedHandler.bind(this, post.id)}
        />
      );
    });

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
