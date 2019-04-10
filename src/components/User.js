/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  render() {
    const { user } = this.props

    if (user === null || user === undefined) {
      return null
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog._id}>
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { userId } = props

  if (state.users === null) {
    return { user: null }
  }

  return {
    user: state.users.find(user => user.id === userId),
  }
}

export default connect(mapStateToProps)(User)
