import React, { Component } from "react";

import TagList from "../Tag/TagList";
import moment from "moment";

class TaskDetails extends Component {
  render() {
    return (
      <div style={{ marginTop: "7px" }}>
        <TagList
          tags={this.props.tags}
          style={{ marginBottom: "5px" }}
          tagStyle={{ padding: "3px", fontSize: "9pt" }}
        ></TagList>
        <span style={{ color: "gray", display: "block" }}>
          Created {moment(this.props.createdAt).fromNow()}
        </span>
        <span style={{ color: "gray", display: "block" }}>
          {this.props.deadline ? this.props.deadline : "No deadline"}
        </span>
        <span style={{ color: "gray", display: "block" }}>
          {this.props.reminder ? this.props.reminder : "No reminder"}
        </span>
      </div>
    );
  }
}

export default TaskDetails;
