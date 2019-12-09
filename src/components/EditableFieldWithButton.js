import React, { useState } from "react";
import EditableField from "./EditableField";

import commonStyles from "../styles/common.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function EditableFieldWithButton(props) {
  const [inputValue, setInputValue] = useState("");
  const [resetInput, setResetInput] = useState(new Date().getTime());

  const onConfirm = () => {
    if (inputValue && inputValue.length > 0 && props.onConfirm) {
      props.onConfirm(inputValue);
    }

    setInputValue("");
    setResetInput(new Date().getTime());
  };

  return (
    <div className={commonStyles.editableFieldWithButtonWrapper}>
      <EditableField
        key={resetInput}
        value={props.value || ""}
        onValueSet={value => setInputValue(value)}
        placeholder={props.placeholder}
        onEnterPress={() => {
          props.onEnterPress && props.onEnterPress(inputValue);
          onConfirm();
        }}
        debounceTime={0}
      ></EditableField>
      <button
        className={commonStyles.editableTaskIconButton}
        disabled={inputValue == null || inputValue.length === 0}
        onClick={() => {
          props.onClick && props.onClick(inputValue);
          onConfirm();
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}

export default EditableFieldWithButton;
