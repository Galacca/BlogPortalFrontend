import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../reducers/userReducer"

class LoggedInHeader extends React.Component {

    logOut = (event) => {
        event.preventDefault()
          window.localStorage.removeItem('loggedBlogappUser')
          this.props.logoutUser(this.props.user.name)
        }

    render(){
        if(this.props.user.loggedIn)
        return(
      <div>
        <h5>Logged in as: {this.props.user.name} </h5> <button onClick={this.logOut}>Logout</button>
      </div>
        )
        else
        return null
}
}

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  const connectedLoggedInHeader = connect(
    mapStateToProps,
    {logoutUser, }
  )(LoggedInHeader);
  

  export default connectedLoggedInHeader;


