import React from "react";

import Task from "./Task";

import commonStyles from "../../styles/common.module.css";

function TaskList(props) {
  if (props.tasks == null || props.tasks.length === 0) {
    return <div className={commonStyles.italic}>No tasks yet.</div>;
  }

  let classes = [];

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <div className={classes.join(" ")}>
      {props.tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          showDetails={props.showDetails}
          onDescriptionClick={props.onDescriptionClick}
          onDelete={() => props.onDelete && props.onDelete(task.id)}
          allTags={props.allTags}
          onUpdate={updateInfo =>
            props.onUpdate && props.onUpdate(task.id, updateInfo)
          }
          onTagToggle={(tag, selected) =>
            props.onTagToggle && props.onTagToggle(task.id, tag, selected)
          }
          onTagAdd={tag => props.onTagAdd && props.onTagAdd(task.id, tag)}
          isEditable={props.isEditable}
        ></Task>
      ))}
    </div>
  );
}

export default TaskList;
