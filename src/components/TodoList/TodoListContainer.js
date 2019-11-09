import React, { Component } from "react";

class TodoListContainer extends Component {
  render() {
    return (
      <div
        className="ba br3 pl4 pr3 pv3 b--light-silver"
        style={{
          margin: "15px",
          paddingBottom: "40px",
          width: "400px",
          flex: "auto"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default TodoListContainer;
