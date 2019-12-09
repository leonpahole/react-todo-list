import React from "react";
import tagStyles from "../../styles/tags.module.css";

function Tag(props) {
  let classes = [tagStyles.tag];
  if (props.classes) {
    classes = classes.concat(props.classes);
  }

  return <span className={classes.join(" ")}>{props.title}</span>;
}

export default Tag;
