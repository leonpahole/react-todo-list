import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Datetime from "react-datetime";
import moment from "moment";

import TaskLine from "./TaskLine";
import TagList from "../Tag/TagList";
import TaskDetails from "./TaskDetails";

import taskStyles from "../../styles/tasks.module.css";
import commonStyles from "../../styles/common.module.css";
import "react-datetime/css/react-datetime.css";
import EditableTagList from "../Tag/EditableTagList";
require("moment/locale/en-gb");

function Task(props) {
  if (props.task == null) {
    return null;
  }

  let taskDetailsElement;

  const {
    description,
    createdAt,
    deadline,
    reminder,
    tags,
    state: status
  } = props.task;

  if (props.showDetails === true) {
    taskDetailsElement = (
      <TaskDetails
        createdAt={createdAt}
        deadline={deadline}
        reminder={reminder}
      ></TaskDetails>
    );
  }

  let editReminderAndDeadlineElement = null;

  let tagsElement = (
    <TagList className={taskStyles.tagListWrapper} tags={tags}></TagList>
  );

  if (props.isEditable === true) {
    const isValidDate = date =>
      date.isAfter(moment()) || moment().isSame(date, "day");

    editReminderAndDeadlineElement = (
      <React.Fragment>
        <div className={taskStyles.editDeadlineReminderWrapper}>
          <p className={taskStyles.editDeadlineReminderText}>Deadline</p>
          <Datetime
            value={deadline ? moment(deadline) : null}
            onChange={deadline =>
              props.onUpdate && props.onUpdate({ deadline: deadline.format() })
            }
            isValidDate={isValidDate}
            inputProps={{
              placeholder: "Set a deadline",
              className: taskStyles.editDeadlineReminderInput
            }}
          />
        </div>

        <div className={taskStyles.editDeadlineReminderWrapper}>
          <p className={taskStyles.editDeadlineReminderText}>Reminder</p>
          <Datetime
            value={reminder ? moment(reminder) : null}
            onChange={reminder =>
              props.onUpdate && props.onUpdate({ reminder: reminder.format() })
            }
            isValidDate={isValidDate}
            inputProps={{
              placeholder: "Set a reminder",
              className: taskStyles.editDeadlineReminderInput
            }}
          />
        </div>
      </React.Fragment>
    );

    tagsElement = (
      <EditableTagList
        allTags={props.allTags}
        selectedTags={tags}
        onTagToggle={props.onTagToggle}
        onTagAdd={props.onTagAdd}
      ></EditableTagList>
    );
  }

  return (
    <div className={taskStyles.taskWrapper}>
      <div className={taskStyles.taskLineWrapper}>
        <TaskLine
          key={status}
          isEditable={props.isEditable}
          status={status}
          description={description}
          reminder={reminder}
          deadline={deadline}
          onStatusUpdate={status =>
            props.onUpdate && props.onUpdate({ status })
          }
          onDescriptionClick={props.onDescriptionClick}
          onDescriptionUpdate={description =>
            props.onUpdate && props.onUpdate({ description })
          }
        ></TaskLine>
        {editReminderAndDeadlineElement}
        {taskDetailsElement}
        {tagsElement}
      </div>

      <FontAwesomeIcon
        onClick={props.onDelete}
        icon={faTrash}
        className={commonStyles.clickable}
      />
    </div>
  );
}

export default Task;
