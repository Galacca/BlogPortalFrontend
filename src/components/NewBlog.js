import React from "react";
import { connect } from "react-redux";
import { addBlog } from "../reducers/blogReducer"

class NewBlog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      newTitle: "",
      newUrl: "",
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){

    const createBlog = (event) => {
      event.preventDefault()
      this.props.addBlog(this.state.newTitle, this.state.newUrl, this.props.user.name)
    }
 
  return (
    <form onSubmit={createBlog}>
        Title:
        <input
         name={"newTitle"}
         type={"text"}
         value={this.newTitle}
         onChange={this.handleFieldChange} />
        URL:
        <input
         name={"newUrl"}
         type={"text"}
         value={this.newUrl}
         onChange={this.handleFieldChange} />
        <p />
        <button type="submit">Save</button>
      </form>
  )
}

}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const connectedNewBlog = connect(
  mapStateToProps,
  { addBlog }
)(NewBlog);


export default connectedNewBlog;