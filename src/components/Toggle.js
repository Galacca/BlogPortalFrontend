/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react'

export default class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

    toggleVisibility = () => {
      this.setState({ visible: !this.state.visible })
    }

    render() {
      const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
      const showWhenVisible = { display: this.state.visible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button type="button" onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
          </div>
          <div style={showWhenVisible}>
            {this.props.children}
            <button type="button" onClick={this.toggleVisibility}>Cancel</button>
          </div>
        </div>
      )
    }
}
