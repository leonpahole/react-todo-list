import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTimes,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

class TodoListHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <div>
            <FontAwesomeIcon
              style={{ marginRight: "15px", cursor: "pointer" }}
              onClick={this.props.editClicked}
              icon={faEdit}
            />
            <FontAwesomeIcon
              style={{ marginRight: "15px", cursor: "pointer" }}
              onClick={this.props.infoClicked}
              icon={faInfoCircle}
            />
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              onClick={this.props.crossClicked}
              icon={faTrash}
            />
          </div>
        </div>
        <div>
          <h2
            onClick={this.props.editClicked}
            style={{
              margin: "unset",
              marginTop: "10px",
              marginBottom: "15px",
              cursor: "pointer",
              wordBreak: "break-word"
            }}
          >
            {this.props.title}
          </h2>
        </div>
      </React.Fragment>
    );
  }
}

export default TodoListHeader;
