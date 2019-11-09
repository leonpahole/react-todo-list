import React, { Component } from "react";
import EditableField from "../EditableField";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class AddTaskInput extends Component {
  constructor() {
    super();

    this.state = {
      editableFieldReset: new Date().getTime(),
      newTaskDescription: "",
      addButtonDisabled: true
    };

    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  descriptionChanged(value) {
    this.setState({
      newTaskDescription: value,
      addButtonDisabled: value == null || value.length === 0
    });
  }

  addTask() {
    if (this.props.addTask) {
      this.props.addTask(this.state.newTaskDescription);
    }

    this.setState({
      editableFieldReset: new Date().getTime(),
      newTaskDescription: "",
      addButtonDisabled: true
    });
  }

  render() {
    return (
      <div style={{ display: "flex", marginTop: "40px" }}>
        <EditableField
          key={this.state.editableFieldReset}
          value={""}
          valueChanged={this.descriptionChanged}
          placeholder="Add a new task"
        ></EditableField>
        <button
          style={{
            border: "none",
            cursor: "pointer",
            backgroundColor: "white"
          }}
          disabled={this.state.addButtonDisabled}
          onClick={this.addTask}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    );
  }
}

export default AddTaskInput;
