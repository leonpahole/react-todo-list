import React, { Component } from "react";
import EditableTask from "./EditableTask";

class EditableTaskList extends Component {
  render() {
    if (this.props.tasks == null || this.props.tasks.length === 0) {
      return <span>No tasks yet.</span>;
    }

    return (
      <div style={this.props.style || {}}>
        {this.props.tasks.map(task => (
          <EditableTask
            key={task.id}
            id={task.id}
            deadline={task.deadline}
            description={task.description}
            reminder={task.reminder}
            createdAt={task.createdAt}
            state={task.state}
            tags={task.tags}
            taskChecked={this.props.taskChecked}
            taskDescriptionClicked={this.props.taskDescriptionClicked}
            wrapEllipsis={this.props.wrapEllipsis}
            showTaskDetails={this.props.showTaskDetails}
            deleteClicked={this.props.taskDeleted}
            editTaskDescription={this.props.editTaskDescription}
          ></EditableTask>
        ))}
      </div>
    );
  }
}

export default EditableTaskList;
