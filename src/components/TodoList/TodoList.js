import React, { Component } from "react";

import TodoListContainer from "./TodoListContainer";
import TodoListHeader from "./TodoListHeader";
import TagList from "../Tag/TagList";
import TaskList from "../Task/TaskList";

class TodoList extends Component {
  render() {
    return (
      <TodoListContainer>
        <TodoListHeader
          title={this.props.title}
          editClicked={this.props.editClicked}
          infoClicked={this.props.infoClicked}
          crossClicked={() => this.props.crossClicked(this.props.id)}
        ></TodoListHeader>

        <TagList
          style={{ marginBottom: "15px" }}
          tags={this.props.tags}
        ></TagList>

        <TaskList
          tasks={this.props.tasks}
          taskChecked={(taskID, checkValue) =>
            this.props.taskChecked(this.props.id, taskID, checkValue)
          }
          taskDescriptionClicked={this.props.taskDescriptionClicked}
          wrapEllipsis={true}
          showTaskDetails={this.props.showTaskDetails}
          deleteClicked={taskID =>
            this.props.deleteClicked(this.props.id, taskID)
          }
        ></TaskList>
      </TodoListContainer>
    );
  }
}

export default TodoList;
