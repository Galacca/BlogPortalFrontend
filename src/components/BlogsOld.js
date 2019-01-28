import React from "react";
import { connect } from "react-redux";
import { voteBlog } from "../reducers/blogReducer"
import { deleteBlog } from "../reducers/blogReducer"

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
      
      remove = (id, title) => {
        this.props.deleteBlog(id, title)
        //this.context.history.push('/')
      }

    render(){
        const hideWhenVisible = { display: this.state.visible ? "none" : "" };
        const showWhenVisible = { display: this.state.visible ? "" : "none" };
        const {blog} = this.props
        let deleteButton


        if (this.authorizeForDelete(blog.user) === true) {
            deleteButton = <button onClick={() => this.remove(blog.id, blog.title)}>Delete</button>
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
          Likes: {blog.likes} <button onClick={() => this.props.voteBlog(blog.id, blog.likes, blog.title)}>Like</button><p />
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
    { voteBlog, deleteBlog, }
  )(BlogList);
  

  export default connectedBlogList;