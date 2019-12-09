import React, { useState } from "react";
import moment from "moment";

import EditableField from "../EditableField";
import TaskStatus from "../../enums/taskStatus.enum";

import taskStyles from "../../styles/tasks.module.css";

function useStatus(initialTaskStatus = TaskStatus.IN_PROGRESS, onStatusUpdate) {
  const [checked, setChecked] = useState(
    initialTaskStatus === TaskStatus.FINISHED
  );

  const toggleChecked = () => {
    const newChecked = !checked;
    const newStatus = newChecked ? TaskStatus.FINISHED : TaskStatus.IN_PROGRESS;

    setChecked(newChecked);

    if (onStatusUpdate) {
      onStatusUpdate(newStatus);
    }
  };

  return [checked, toggleChecked];
}

function useReminder(checked, reminder, deadline) {
  const now = moment();

  const isReminderActive =
    !checked && reminder != null && moment(reminder).isBefore(now);

  let reminderText = null;
  if (isReminderActive && deadline != null) {
    const deadlineFromNow = moment(deadline).fromNow();

    if (moment(deadline).isAfter(now)) {
      reminderText = "Due " + deadlineFromNow;
    } else {
      reminderText = "Was due " + deadlineFromNow;
    }
  }

  return [isReminderActive, reminderText];
}

function TaskLine(props) {
  let descriptionClasses = [taskStyles.taskDescription];

  const [checked, toggleChecked] = useStatus(
    props.status,
    props.onStatusUpdate
  );

  if (checked) {
    descriptionClasses.push(taskStyles.taskCompleted);
  }

  const [isReminderActive, reminderText] = useReminder(
    checked,
    props.reminder,
    props.deadline
  );

  let reminderElement = null;

  if (isReminderActive) {
    descriptionClasses.push(taskStyles.reminderActive);
    reminderElement = (
      <span className={taskStyles.reminderText}>{reminderText}</span>
    );
  }

  let descriptionElement = null;

  if (props.isEditable) {
    descriptionElement = (
      <EditableField
        onValueSet={description =>
          props.onDescriptionUpdate && props.onDescriptionUpdate(description)
        }
        value={props.description}
      ></EditableField>
    );
  } else {
    descriptionElement = (
      <div
        className={descriptionClasses.join(" ")}
        onClick={props.onDescriptionClick}
      >
        <span>{props.description}</span>
        {reminderElement}
      </div>
    );
  }

  return (
    <div className={taskStyles.taskLine}>
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleChecked}
        className={taskStyles.checkbox}
      />
      {descriptionElement}
    </div>
  );
}

export default TaskLine;
