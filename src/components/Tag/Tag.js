import React, { Component } from "react";

class Tag extends Component {
  render() {
    return (
      <span
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "5px",
          display: "inline-block",
          fontWeight: "bold",
          fontSize: "11pt",
          ...this.props.style
        }}
      >
        {this.props.title}
      </span>
    );
  }
}

export default Tag;
