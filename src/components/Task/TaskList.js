import React, { Component } from "react";
import Task from "./Task";

class TaskList extends Component {
  render() {
    if (this.props.tasks == null || this.props.tasks.length === 0) {
      return <span>No tasks yet.</span>;
    }

    return (
      <div style={this.props.style || {}}>
        {this.props.tasks.map(task => (
          <Task
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
            deleteClicked={this.props.deleteClicked}
          ></Task>
        ))}
      </div>
    );
  }
}

export default TaskList;
