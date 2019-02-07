import React, { Component } from 'react'

export default class itembank extends Component {
  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.props.addItemSet()}> Add a new set</button>
      </div>
    )
  }
}
