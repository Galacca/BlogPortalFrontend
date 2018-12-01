import React from "react";
import { connect } from "react-redux";

class Notification extends React.Component {
  
  styleSelector = (style) => {
    
    let styleToReturn = {
      border: "solid",
      padding: 10,
      borderWidth: 1
    }

    if (style === "neutral")
    {
      styleToReturn = {
        border: "solid",
        padding: 10,
        borderWidth: 1
      }
      return styleToReturn
    }
    else if (style === "error")
    {
      styleToReturn = {
        color: "red",
        border: "solid",
        padding: 10,
        borderWidth: 1
      }
      
      return styleToReturn
    }
    else if (style === "success")
    {
      styleToReturn = {
        color: "green",
        border: "solid",
        padding: 10,
        borderWidth: 1
      }
      return styleToReturn
    }
  }

  render() {
    const style = this.styleSelector(this.props.style)
    return <div style={style}>{this.props.notification}</div>;
  }
}

const mapStateToProps = state => {
  return {
    notification: state.notification.message,
    style: state.notification.style
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;
