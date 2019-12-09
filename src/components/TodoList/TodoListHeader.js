import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import todoListStyles from "../../styles/todo-list.module.css";
import commonStyles from "../../styles/common.module.css";

function TodoListHeader(props) {
  const iconClasses = [commonStyles.clickable, todoListStyles.headerIcon];

  return (
    <React.Fragment>
      <div className={todoListStyles.headerIconRow}>
        <FontAwesomeIcon
          className={iconClasses.join(" ")}
          onClick={props.onEdit}
          icon={faEdit}
        />
        <FontAwesomeIcon
          className={iconClasses.join(" ")}
          onClick={props.onMoreInfo}
          icon={faInfoCircle}
        />
        <FontAwesomeIcon
          className={iconClasses.join(" ")}
          onClick={props.onDelete}
          icon={faTrash}
        />
      </div>
      <div>
        <h2 onClick={props.onEdit} className={todoListStyles.headerTitle}>
          {props.title}
        </h2>
      </div>
    </React.Fragment>
  );
}

export default TodoListHeader;
