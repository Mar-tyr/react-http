import React, { Component } from 'react';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch } from 'react-router-dom';
import NewPost from './NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact activeClassName="my-active">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true',
                  }}
                  exact
                  activeClassName="my-active"
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/new-post" component={NewPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
