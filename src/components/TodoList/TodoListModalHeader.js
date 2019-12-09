import React from "react";

import EditableField from "../EditableField";

import todoListModalStyles from "../../styles/todo-list-modal.module.css";
import commonStyles from "../../styles/common.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";

function TodoListModalHeader(props) {
  const iconClasses = [commonStyles.clickable, todoListModalStyles.icon];

  return (
    <React.Fragment>
      <div className={todoListModalStyles.iconWrapper}>
        <FontAwesomeIcon
          className={iconClasses.join(" ")}
          icon={faTrash}
          onClick={props.onDelete}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className={iconClasses.join(" ")}
          onClick={props.onClose}
          icon={faTimes}
        ></FontAwesomeIcon>
      </div>
      <h2>
        <EditableField
          value={props.title}
          onValueSet={props.onTitleUpdate}
        ></EditableField>
      </h2>
    </React.Fragment>
  );
}

export default TodoListModalHeader;
