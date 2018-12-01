import React from "react";
import Notification from "./components/Notification";
import { successNotification } from './reducers/notificationReducer'
import { initializeNotification } from './reducers/notificationReducer'
import { loginUser } from "./reducers/userReducer"
import { connect } from 'react-redux'
import { blogInitialization} from './reducers/blogReducer'
import { blogSort } from './reducers/blogReducer'
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogService"
import { initializeUser } from "./reducers/userReducer"
import Blogs from "./components/Blogs"


class App extends React.Component {

  componentDidMount() {
    this.props.initializeNotification()
    this.props.blogInitialization()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    this.props.loginUser(user.username, user.name, user.id)
    blogService.setToken(user.token)
  }
  else {
    this.props.initializeUser()
  }
  } 

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
    if (this.props.loggedIn === false) {
    return (
      <div>
      <Notification />      
      <LoginForm handleLoginFieldChange={this.handleFieldChange} />
      </div>
    );
    }
    return(
      <div>
        <Notification />  
        {this.props.blogs
        .sort((blogA, blogB) => {
          if (blogA.likes > blogB.likes) return -1;
          if (blogA.likes < blogB.likes) return 1;
          return 0;
        })
        .map(blog => 
          <Blogs blog={blog} key={blog.id} />
          )}
      </div>
    )
  }
  }

  const mapStateToProps = state => {
    return {
      loggedIn: state.user.loggedIn,
      blogs: state.blogs
    };
  };

export default connect(
  mapStateToProps,
  { successNotification, initializeNotification, loginUser, blogInitialization, initializeUser, blogSort }
)(App)