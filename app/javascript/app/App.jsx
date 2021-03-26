import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Header from './Header'
import PostsList from '../features/posts/PostsList'
import NewPost from '../features/posts/NewPost'
import Post from '../features/posts/Post'
import EditPost from '../features/posts/EditPost'

function App () {
  return (
    <Router>
      <div className="BlogApp">
        <div className="container">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <PostsList postsType="remote" />
                  <PostsList postsType="local" />
                </React.Fragment>
              )}
            />
            <Route exact path="/posts/new" component={NewPost} />
            <Route exact path="/posts/:postId" component={Post} />
            <Route exact path="/posts/:postId/edit" component={EditPost} />
            <Redirect to="/" />
          </Switch>
        </div>
        <footer className="blog-footer">
          <p>
            Blog built with Rails and React.js
          </p>
        </footer>
      </div>
    </Router>
  )
}

export default App
