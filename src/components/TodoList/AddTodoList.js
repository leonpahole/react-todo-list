import React, { Component } from "react";

import EditableField from "../EditableField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class AddTodoList extends Component {
  constructor() {
    super();

    this.state = {
      editableFieldReset: new Date().getTime(),
      todoListTitle: "",
      addButtonDisabled: true
    };

    this.todoListTitleChanged = this.todoListTitleChanged.bind(this);
    this.addTodoList = this.addTodoList.bind(this);
  }

  todoListTitleChanged(todoListTitle) {
    this.setState({
      todoListTitle: todoListTitle,
      addButtonDisabled: todoListTitle == null || todoListTitle.length === 0
    });
  }

  addTodoList() {
    if (this.props.addTodoList) {
      this.props.addTodoList(this.state.todoListTitle);
    }

    this.setState({
      editableFieldReset: new Date().getTime(),
      todoListTitle: "",
      addButtonDisabled: true
    });
  }

  render() {
    return (
      <h2 style={{ display: "flex" }}>
        <EditableField
          key={this.state.editableFieldReset}
          value={""}
          valueChanged={this.todoListTitleChanged}
          placeholder={"Create a todo list"}
        ></EditableField>
        <button
          style={{
            border: "none",
            cursor: "pointer",
            backgroundColor: "white"
          }}
          disabled={this.state.addButtonDisabled}
          onClick={this.addTodoList}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </h2>
    );
  }
}

export default AddTodoList;
