/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Notification from './components/Notification'
import { successNotification, errorNotification, initializeNotification } from './reducers/notificationReducer'
import { loginUser, initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { blogInitialization } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import blogService from './services/blogService'
import Blogs from './components/Blogs'
import LoggedInHeader from './components/LoggedInHeader'
import Togglable from './components/Toggle'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'
import BlogRow from './components/BlogRow'


class App extends React.Component {
  componentDidMount() {
    this.props.initializeNotification()
    this.props.blogInitialization()
    this.props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.loginUser(user.username, user.name, user.id)
      blogService.setToken(user.token)
    } else {
      this.props.initializeUser()
    }
  }

  render() {
    // PropType aiheuttaa turhaa motkotusta kun tämä ehtii olla undefined muutaman millisekunnin
    // joten pistetään eslint hiljaiseksi.
    // eslint-disable-next-line react/prop-types
    if (this.props.loggedIn === false) {
      return (
        <div>
          <Notification />
          <LoginForm />
        </div>
      )
    }

    return (
      <div>
        <Notification />
        <Router>
          <div>
            <Link to="/">Blogs </Link>
            <Link to="/users">Users</Link>
            <LoggedInHeader />

            <Togglable buttonLabel="Add new blog">
              <NewBlog />
            </Togglable>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <u><h2>Blogs</h2></u>
                  <p />
                  {this.props.blogs
                    .sort((blogA, blogB) => {
                      if (blogA.likes > blogB.likes) return -1
                      if (blogA.likes < blogB.likes) return 1
                      return 0
                    })
                    .map(blog => <BlogRow blog={blog} key={blog.id} />)}

                </div>
              )}
            />

            <Route
              path="/blogs/:id"
              render={
                ({ match, history }) => (
                  <Blogs
                    blogId={match.params.id}
                    history={history}
                  />
                )}
            />

            <Route exact path="/users" render={() => <Users />} />

            <Route
              path="/users/:id"
              render={
                ({ match }) => <User userId={match.params.id} />
              }
            />

          </div>
        </Router>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  blogs: state.blogs,
})

App.propTypes = {
  initializeNotification: PropTypes.func.isRequired,
  blogInitialization: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  initializeUser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    successNotification,
    errorNotification,
    initializeNotification,
    loginUser,
    blogInitialization,
    initializeUser,
    initializeUsers,
  },
)(App)
