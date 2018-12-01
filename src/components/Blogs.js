import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../reducers/userReducer"
import blogService from '../services/blogService'

class BlogList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false,
        };
        
      }

      toggleVisibility = () => {
        this.setState({ visible: !this.state.visible });
      };

    logOut = (event) => {
        event.preventDefault()
          window.localStorage.removeItem('loggedBlogappUser')
          this.props.logoutUser(this.props.user.name)
        }

    authorizeForDelete = (blogUser) => {
        if (blogUser === this.props.user.id )
        {
          return true
        }
        else if (blogUser === undefined)
        {
          return true
        }
        else
        {
          return false
        }
      }

      deleteBlog = async (id, title) => {
        const result = window.confirm("Poistetaanko käyttäjän tiedot?")
        if(result)
        try{
          blogService.remove(id)
        this.setState({ success: `Blog '${title}' deleted.`})
        this.handleErrorAndSuccess("success")
        }
        catch(exception)
        {
        this.setState({ error: `Failed to delete blog.` + exception.message})
        this.handleErrorAndSuccess("error")
        }
      }

      updateBlog = async (targetId, currentLikes, targetTitle) => {
        try{
        const object = {
          likes: currentLikes + 1
        }
        blogService.update(targetId, object)
        this.setState({ success: `Blog '${targetTitle}' liked.`})
        this.handleErrorAndSuccess("success")
      }
      catch(exception) {
        this.setState({ error: `Failed to update blog.` + exception.message})
        this.handleErrorAndSuccess("error")
      }
      }

    render(){
        const hideWhenVisible = { display: this.state.visible ? "none" : "" };
        const showWhenVisible = { display: this.state.visible ? "" : "none" };
        const {blog} = this.props
        let deleteButton


        if (this.authorizeForDelete(blog.user) === true) {
            deleteButton = <button onClick={() => this.deleteBlog(blog.id, blog.title)}>Delete</button>
          }

    return (
        <div>
        <div style={hideWhenVisible}>
          <h3 onClick={this.toggleVisibility}>{blog.title} by {blog.author}</h3>
        </div>
        <div style={showWhenVisible}>
          <h3 onClick={this.toggleVisibility}>{blog.title} by {blog.author}</h3>
          <h4>
          URL: {blog.url} <p />
          Likes: {blog.likes} <button onClick={() => this.updateBlog(blog.id, blog.likes, blog.title)}>Like</button><p />
          User who added: {blog.user}
          <p />
          {deleteButton}
          </h4>
        </div>
      </div>
      )
          }    

}
  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  const connectedBlogList = connect(
    mapStateToProps,
    { logoutUser, }
  )(BlogList);
  

  export default connectedBlogList;