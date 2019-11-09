import React, { Component } from "react";
import Tag from "./Tag";

class TagList extends Component {
  render() {
    if (this.props.tags == null || this.props.tags.length === 0) {
      return null;
    }

    return (
      <div style={this.props.style || {}}>
        {this.props.tags.map((tag, key) => (
          <Tag
            key={key}
            style={{ marginRight: "10px", ...this.props.tagStyle }}
            title={tag.title}
          ></Tag>
        ))}
      </div>
    );
  }
}

export default TagList;
