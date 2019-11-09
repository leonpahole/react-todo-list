import React, { Component } from "react";
import Modal from "react-modal";

import TodoListModal from "../components/TodoList/TodoListModal";
import TodoList from "../components/TodoList/TodoList";

class TodoListUnit extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      addTaskInputText: "",
      showTaskDetails: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.taskChecked = this.taskChecked.bind(this);
    this.addTaskInputOnChange = this.addTaskInputOnChange.bind(this);
    this.taskDescriptionClicked = this.taskDescriptionClicked.bind(this);
    this.toggleTaskDetails = this.toggleTaskDetails.bind(this);

    Modal.setAppElement("#root");
  }

  taskChecked(checkedTaskInfo) {
    this.props.taskChecked({
      todoListID: this.props.id,
      ...checkedTaskInfo
    });
  }

  taskDescriptionClicked() {
    this.openModal();
  }

  toggleTaskDetails() {
    this.setState({
      showTaskDetails: !this.state.showTaskDetails
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  addTaskInputOnChange(e) {
    console.log("aaaa");
    this.setState({
      addTaskInputText: e.target.value
    });

    if (e.target.value != null && e.target.value.length > 0) {
      this.openModal();
    }
  }

  render() {
    return (
      <React.Fragment>
        <TodoList
          id={this.props.id}
          title={this.props.title}
          editClicked={this.openModal}
          infoClicked={this.toggleTaskDetails}
          crossClicked={this.props.todoListDeleted}
          tasks={this.props.tasks}
          tags={this.props.tags}
          taskChecked={this.props.taskChecked}
          taskDescriptionClicked={this.taskDescriptionClicked}
          wrapEllipsis={true}
          showTaskDetails={this.state.showTaskDetails}
          deleteClicked={this.props.taskDeleted}
        ></TodoList>

        <TodoListModal
          id={this.props.id}
          isOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          title={this.props.title}
          tasks={this.props.tasks}
          tags={this.props.tags}
          addTaskInputInitialText={this.state.addTaskInputText}
          editTitle={this.props.editTitle}
          editTaskDescription={this.props.editTaskDescription}
          taskDeleted={this.props.taskDeleted}
          addTask={this.props.addTask}
          taskChecked={this.props.taskChecked}
          todoListDeleted={this.props.todoListDeleted}
        ></TodoListModal>
      </React.Fragment>
    );
  }
}

export default TodoListUnit;
