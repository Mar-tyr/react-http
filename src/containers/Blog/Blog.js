import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from './FullPost/FullPost';
import NewPost from './NewPost/NewPost';
import axios from '../../axios';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostID: null,
    error: false,
  };

  postSelectedHandler = (selectedPostID) => {
    this.setState({ selectedPostID: selectedPostID });
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
        this.setState({ error: true });
      });
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went error!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={this.postSelectedHandler.bind(this, post.id)}
          />
        );
      });
    }
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostID} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
