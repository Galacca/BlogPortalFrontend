/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Link } from 'react-router-dom'

class BlogRow extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { blog } = this.props

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

    return (
      <div style={blogStyle}>
        <div>
          <Link to={`blogs/${blog.id}`}>
            {blog.title}
            {' '}
            {blog.author}
            {' '}
            {blog.user}
            {' '}
          </Link>
        </div>
      </div>
    )
  }
}

export default BlogRow
