import React, { Component } from "react";
import Modal from "react-modal";
import TaskList from "../Task/TaskList";
import AddTaskInput from "../Task/AddTaskInput";
import TagList from "../Tag/TagList";
import EditableField from "../EditableField";
import EditableTaskList from "../Task/EditableTaskList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

class TodoListModal extends Component {
  constructor(props) {
    super();

    this.state = {
      editingTitle: false,
      title: props.title
    };

    this.toggleEditTitle = this.toggleEditTitle.bind(this);
    this.titleChanged = this.titleChanged.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.editTaskDescription = this.editTaskDescription.bind(this);
    this.taskDeleted = this.taskDeleted.bind(this);
    this.addTask = this.addTask.bind(this);
    this.todoListDeleted = this.todoListDeleted.bind(this);
  }

  toggleEditTitle() {
    this.setState({
      editingTitle: !this.state.editingTitle
    });
  }

  titleChanged(e) {
    this.setState({
      title: e.target.value
    });
  }

  editTitle(newValue) {
    if (this.props.editTitle) {
      this.props.editTitle(this.props.id, newValue);
    }
  }

  editTaskDescription(taskID, newValue) {
    if (this.props.editTaskDescription) {
      this.props.editTaskDescription(this.props.id, taskID, newValue);
    }
  }

  taskDeleted(taskID) {
    if (this.props.taskDeleted) {
      this.props.taskDeleted(this.props.id, taskID);
    }
  }

  addTask(newTaskDescription) {
    if (this.props.addTask) {
      this.props.addTask(this.props.id, newTaskDescription);
    }
  }

  todoListDeleted() {
    if (this.props.todoListDeleted) {
      this.props.todoListDeleted(this.props.id);
    }

    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        contentLabel="Task List Modal"
        style={{
          content: {
            top: "20%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -20%)",
            minWidth: "600px",
            ...this.props.style
          }
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <FontAwesomeIcon
            style={{ cursor: "pointer", marginRight: "15px" }}
            icon={faTrash}
            onClick={this.todoListDeleted}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            onClick={this.props.closeModal}
            style={{ cursor: "pointer" }}
            icon={faTimes}
          ></FontAwesomeIcon>
        </div>
        <h2>
          <EditableField
            value={this.props.title}
            editValue={this.editTitle}
          ></EditableField>
        </h2>

        <TagList
          style={{ marginBottom: "15px" }}
          tags={this.props.tags}
        ></TagList>

        <EditableTaskList
          editTaskDescription={this.editTaskDescription}
          tasks={this.props.tasks}
          taskDeleted={this.taskDeleted}
          taskChecked={(taskID, checkValue) =>
            this.props.taskChecked(this.props.id, taskID, checkValue)
          }
        ></EditableTaskList>
        <AddTaskInput addTask={this.addTask}></AddTaskInput>
      </Modal>
    );
  }
}

export default TodoListModal;
