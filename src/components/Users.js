/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Users extends React.Component {
  render() {
    if (this.props.users === null) {
      return null
    }
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th />
              <th>blogs</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(u => (
              <tr key={u.id}>
                <td><Link to={`users/${u.id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
})

export default connect(mapStateToProps)(Users)
