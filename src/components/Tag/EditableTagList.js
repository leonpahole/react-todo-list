import React, { useState } from "react";

import TagList from "./TagList";
import Dropdown from "../Dropdown";

import commonStyles from "../../styles/common.module.css";

function EditableTagList(props) {
  const tagsSelected = props.allTags.map(tag => {
    return {
      ...tag,
      selected:
        props.selectedTags.find(tagOfTodoList => tag.id === tagOfTodoList.id) !=
        null
    };
  });

  const [dropDownOpen, setDropDownOpen] = useState(false);

  console.log(dropDownOpen);
  return (
    <div className={commonStyles.editableTagsWrapper}>
      <div className={commonStyles.editableTagList}>
        <TagList tags={props.selectedTags}></TagList>
      </div>
      <Dropdown
        key={tagsSelected.join("")}
        itemName="tag"
        list={tagsSelected}
        onItemToggle={props.onTagToggle}
        onItemAddAndSelect={props.onTagAdd}
        onOpen={setDropDownOpen}
        initialListOpen={dropDownOpen}
      />
    </div>
  );
}

export default EditableTagList;
