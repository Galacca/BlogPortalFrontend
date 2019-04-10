/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { connect } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  remove = (blogId, blogTitle) => {
    this.props.deleteBlog(blogId, blogTitle)
    this.props.history.push('/')
  }

  render() {
    const { blog } = this.props

    if (blog === null || blog === undefined) {
      return null
    }

    const contentStyle = {
      margin: 5,
    }

    const deletable = blog.user === undefined || blog.user === this.props.user.id

    return (
      <div>
        <h2>
          {blog.title}
          {' '}
          {blog.author}
          {' '}
        </h2>
        <div style={contentStyle} className="content">
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes}
            {' '}Likes{' '}
            <button onClick={() => this.props.voteBlog(blog.id, blog.likes, blog.title)}>Like</button>
          </div>
          {deletable && <div><button onClick={() => this.remove(blog.id, blog.title)}>Delete</button></div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { blogId } = props

  if (state.blogs === null) {
    return { blog: null }
  }

  return {
    blog: state.blogs.find(blog => blog.id === blogId),
    user: state.user,
  }
}

export default connect(mapStateToProps, {
  voteBlog, deleteBlog,
})(Blog)
