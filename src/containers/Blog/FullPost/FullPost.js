import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  deletePostHandler = () => {
    axios.delete('/posts/' + this.state.loadedPost.id).then((response) => {
      console.log(response);
    });
  };

  loadData = () => {
    if (this.props.match.params.id) {
      if (
        this.state.loadedPost === null ||
        this.state.loadedPost.id != this.props.match.params.id
      ) {
        axios.get('/posts/' + this.props.match.params.id).then((response) => {
          this.setState({ loadedPost: response.data });
        });
      }
    }
  };

  componentDidMount(prevProps, prevState, snapshot) {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadData();
  }

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
