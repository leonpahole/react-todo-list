import React, { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import commonStyles from "../styles/common.module.css";

import { useAsync } from "react-async-hook";
import useConstant from "use-constant";

function EditableField(props) {
  const [inputValue, setInputValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);

  let wrapperClasses = [commonStyles.editableFieldWrapper];

  if (isEditing) {
    wrapperClasses.push(commonStyles.editableFieldEditing);
  }

  const onValueSet = inputValue => {
    props.onValueSet && props.onValueSet(inputValue);
  };

  const debouncedValue = useConstant(() =>
    AwesomeDebouncePromise(
      onValueSet,
      props.debounceTime != null ? props.debounceTime : 500
    )
  );

  useAsync(debouncedValue, [inputValue]);

  const onValueChange = async e => {
    setInputValue(e.target.value);

    props.onValueChange && props.onValueChange(e.target.value);

    await debouncedValue(inputValue);
  };

  const onKeyDown = e => {
    props.onKeyDown && props.onKeyDown(e);

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      props.onEnterPress && props.onEnterPress();
    }
  };

  return (
    <div className={wrapperClasses.join(" ")}>
      <input
        className={commonStyles.editableField}
        placeholder={props.placeholder}
        type={props.inputType || "text"}
        value={inputValue}
        onChange={onValueChange}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default EditableField;
