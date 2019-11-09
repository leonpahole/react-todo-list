import React, { Component, useCallback } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

class EditableField extends Component {
  constructor(props) {
    super();

    this.state = {
      initialValue: props.value || "",
      editedValue: props.value || "",
      editMode: false
    };

    this.editStart = this.editStart.bind(this);
    this.editStop = this.editStop.bind(this);
    this.valueChanged = this.valueChanged.bind(this);
    this.editValue = this.editValue.bind(this);

    this.debounceHandler = AwesomeDebouncePromise(this.editValue, 500);
  }

  editStart() {
    this.setState({
      editMode: true
    });
  }

  editStop() {
    this.setState({
      editMode: false
    });
  }

  valueChanged(e) {
    this.setState({
      editedValue: e.target.value
    });

    if (this.props.valueChanged) {
      this.props.valueChanged(e.target.value);
    }

    this.debounceHandler();
  }

  editValue() {
    if (this.props.editValue) {
      this.props.editValue(this.state.editedValue);
    }
  }

  render() {
    let borderColor = "#DCDCDC";

    if (this.state.editMode === true) {
      borderColor = "black";
    }
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "1px solid " + borderColor,
          marginBottom: "2px"
        }}
      >
        <input
          placeholder={this.props.placeholder}
          type={this.props.inputType || "text"}
          value={this.state.editedValue}
          onChange={this.valueChanged}
          onFocus={this.editStart}
          onBlur={this.editStop}
          style={{
            border: "none",
            width: "100%",
            ...this.props.style
          }}
        />
      </div>
    );
  }
}

export default EditableField;
