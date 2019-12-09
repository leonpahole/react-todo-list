import React from "react";
import moment from "moment";

import taskStyles from "../../styles/tasks.module.css";

const DATE_FORMAT = "DD. MM. YYYY HH:mm";

function TaskDetails(props) {
  let deadlineText = "No deadline";
  let reminderText = "No reminder";

  if (props.deadline) {
    const deadlineMoment = moment(props.deadline);
    const deadlineInThePast = deadlineMoment.isBefore(moment());

    deadlineText = deadlineInThePast === true ? "Was due " : "Due ";

    deadlineText +=
      deadlineMoment.fromNow() +
      " (" +
      deadlineMoment.format(DATE_FORMAT) +
      ")";
  }

  if (props.reminder) {
    const reminderMoment = moment(props.reminder);
    const reminderInThePast = reminderMoment.isBefore(moment());

    reminderText = reminderInThePast === true ? "Reminded " : "Reminder ";

    reminderText +=
      reminderMoment.fromNow() +
      " (" +
      reminderMoment.format(DATE_FORMAT) +
      ")";
  }

  return (
    <div>
      <span className={taskStyles.detailsRow}>
        Created {moment(props.createdAt).fromNow()}
      </span>
      <span className={taskStyles.detailsRow}>{deadlineText}</span>
      <span className={taskStyles.detailsRow}>{reminderText}</span>
    </div>
  );
}

export default TaskDetails;
