import React from "react";
import Notification from "./components/Notification";
import { successNotification } from './reducers/notificationReducer'
import { errorNotification } from './reducers/notificationReducer'
import { initializeNotification } from './reducers/notificationReducer'
import { loginUser } from "./reducers/userReducer"
import { connect } from 'react-redux'
import { blogInitialization} from './reducers/blogReducer'
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogService"
import { initializeUser } from "./reducers/userReducer"
import Blogs from "./components/Blogs"
import LoggedInHeader from "./components/LoggedInHeader"
import Togglable from "./components/Toggle"
import NewBlog from './components/NewBlog'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newTitle: "",
      newUrl: "",
    }
  }

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

  // Tätä ei itseasiassa käytä kuin yksi komponentti joten se voisi yhtä hyvin olla NewBlog.js sisällä
  // mutta otin tämän PropTypes harjoituksena
  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
    if (this.props.loggedIn === false) {
    return (
      <div>
      <Notification />      
      <LoginForm />
      </div>
    );
    }
    return(
      <div>
        <Notification />  
        <LoggedInHeader />
        <Togglable buttonLabel="Add new blog">
        <NewBlog handleFieldChange={this.handleFieldChange} newTitle={this.state.newTitle} newUrl={this.state.newUrl} />
        </Togglable>
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
  { successNotification, errorNotification, initializeNotification, loginUser, blogInitialization, initializeUser, }
)(App)