import React, { Component } from "react";

import todoListStyles from "../../styles/todo-list.module.css";

class TodoListContainer extends Component {
  render() {
    return (
      <div className={todoListStyles.container}>{this.props.children}</div>
    );
  }
}

export default TodoListContainer;
