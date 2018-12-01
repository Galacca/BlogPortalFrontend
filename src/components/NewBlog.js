import React from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { addBlog } from "../reducers/blogReducer"

class NewBlog extends React.Component {

  static propTypes = {
    handleFieldChange: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    newUrl: PropTypes.string.isRequired,
  }

  
  render(){
    let {
      handleFieldChange,
      newTitle,
      newUrl
    } = this.props;

    const createBlog = (event) => {
      event.preventDefault()
      this.props.addBlog(newTitle, newUrl, this.props.user.name)
    }
 
  return (
    <form onSubmit={createBlog}>
        Title:
        <input
         name={"newTitle"}
         type={"text"}
         value={newTitle}
         onChange={handleFieldChange} />
        URL:
        <input
         name={"newUrl"}
         type={"text"}
         value={newUrl}
         onChange={handleFieldChange} />
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