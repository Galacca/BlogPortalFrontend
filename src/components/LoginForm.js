/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { inputPassword, inputUsername, loginUser } from '../reducers/userReducer'
import { errorNotification } from '../reducers/notificationReducer'


class LoginForm extends React.Component {
      handleUsernameFieldChange = (event) => {
        this.props.inputUsername(event.target.value)
      }

      handlePasswordFieldChange = (event) => {
        this.props.inputPassword(event.target.value)
      }

      login = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username: this.props.user,
            password: this.props.password,
          })
          this.props.loginUser(this.props.user, user.name, user.id)
          window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
          blogService.setToken(user.token)
        } catch (exception) {
          this.props.errorNotification('Invalid username or password.', 5)
        }
      }

      render() {
        return (

          <form onSubmit={this.login}>
            <div>
    Username:

              <input
                type="text"
                name="username"
                onChange={this.handleUsernameFieldChange}
              />


    Password:
              <input
                type="password"
                name="password"
                onChange={this.handlePasswordFieldChange}
              />

            </div>
            <button type="submit">Kirjaudu</button>


          </form>

        )
      }
}

const mapStateToProps = state => ({
  user: state.user.user,
  password: state.user.password,
  name: state.user.name,
})

const connectedLoginForm = connect(
  mapStateToProps,
  {
    inputUsername, inputPassword, loginUser, errorNotification,
  },
)(LoginForm)

export default connectedLoginForm
