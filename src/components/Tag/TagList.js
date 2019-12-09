import React from "react";

import Tag from "./Tag";

import tagStyles from "../../styles/tags.module.css";

function TagList(props) {
  if (props.tags == null || props.tags.length === 0) {
    return null;
  }

  let classes = [];

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <div className={classes} onClick={props.onClick}>
      {props.tags.map(tag => (
        <Tag
          key={tag.id}
          classes={[tagStyles.separatedTag, tagStyles.tagMarginWrap].join(" ")}
          title={tag.title}
        ></Tag>
      ))}
    </div>
  );
}

export default TagList;
