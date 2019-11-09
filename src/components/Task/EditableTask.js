import React, { Component } from "react";
import TagList from "../Tag/TagList";
import TaskDetails from "./TaskDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditableField from "../EditableField";

class EditableTask extends Component {
  constructor(props) {
    super();

    this.taskChecked = this.taskChecked.bind(this);

    this.state = {
      checked: props.state === "Finished"
    };
  }

  taskChecked(e) {
    const newValue =
      this.state.checked === true || this.state.checked === "on" ? false : true;

    this.setState({
      checked: newValue
    });

    if (this.props.taskChecked) {
      this.props.taskChecked(this.props.id, newValue);
    }
  }

  render() {
    let wrapStyle = {
      overflowWrap: "break-word",
      wordWrap: "break-word",
      hyphens: "auto"
    };

    if (this.props.wrapEllipsis === true) {
      wrapStyle = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      };
    }

    let taskDetails;

    if (this.props.showTaskDetails === true) {
      taskDetails = (
        <TaskDetails
          tags={this.props.tags}
          createdAt={this.props.createdAt}
          deadline={this.props.deadline}
          reminder={this.props.reminder}
        ></TaskDetails>
      );
    }

    let textDecoration = {};
    if (this.props.state === "Finished") {
      textDecoration = { textDecoration: "line-through" };
    }

    return (
      <div
        style={{ width: "100%" }}
        className="todo-list-task flex justify-between"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start"
            }}
          >
            <input
              type="checkbox"
              checked={this.state.checked}
              onChange={this.taskChecked}
              style={{ display: "inline-block" }}
            />
            <EditableField
              style={{ ...textDecoration }}
              editValue={newDescription =>
                this.props.editTaskDescription(this.props.id, newDescription)
              }
              value={this.props.description}
            ></EditableField>
          </div>

          {taskDetails}
        </div>

        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            justifyContent: "flex-end"
          }}
          className="task-icons-wrap"
        >
          <FontAwesomeIcon
            onClick={() => this.props.deleteClicked(this.props.id)}
            icon={faTrash}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    );
  }
}

export default EditableTask;
