import React, { useState } from "react";

import TodoListContainer from "./TodoListContainer";
import TodoListHeader from "./TodoListHeader";
import TagList from "../Tag/TagList";
import TaskList from "../Task/TaskList";

function TodoList(props) {
  const { id, title, tasks, tags } = props.todoList;

  const [showTaskDetails, setShowTaskDetails] = useState(false);
  return (
    <TodoListContainer>
      <TodoListHeader
        title={title}
        onEdit={props.onTodoListEdit}
        onMoreInfo={() => setShowTaskDetails(!showTaskDetails)}
        onDelete={() => props.onTodoListDelete && props.onTodoListDelete(id)}
      ></TodoListHeader>

      <TagList tags={tags}></TagList>

      <br></br>
      <TaskList
        tasks={tasks}
        onUpdate={props.onTaskUpdate}
        onDescriptionClick={props.onTaskDescriptionClicked}
        showDetails={showTaskDetails}
        onDelete={taskID =>
          props.onTaskDelete && props.onTaskDelete(id, taskID)
        }
      ></TaskList>
    </TodoListContainer>
  );
}

export default TodoList;
