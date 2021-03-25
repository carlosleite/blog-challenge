import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from '../app/Header'
import PostsList from '../features/posts/PostsList'

function App () {
  return (
    <Router>
      <div className="BlogApp">
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <div className="container">
                <Header />

                <PostsList postsType="remote" />
                <PostsList postsType="local" />
              </div>

              <footer className="blog-footer">
                <p>
                  Blog built with Rails and React.js
                </p>
              </footer>
            </React.Fragment>
          )}
        />
      </div>
    </Router>
  )
}

export default App
