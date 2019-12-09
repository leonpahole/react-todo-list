import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/global.css";
import commonStyles from "../styles/common.module.css";
import dropdownStyles from "../styles/dropdown.module.css";
import {
  faCheck,
  faAngleDown,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";
import EditableFieldWithButton from "./EditableFieldWithButton";

function useDropdownList(initialState, items, itemName) {
  const [listOpen, setListOpen] = useState(initialState);
  const [listItems, setListItems] = useState(items);
  const [listHeader, setListHeader] = useState("");
  const [prevCount, setPrevCount] = useState("");

  const toggleListOpen = () => {
    setListOpen(!listOpen);
  };

  const toggleItem = (itemIndex, isSelected) => {
    const newItems = listItems.slice();
    newItems[itemIndex].selected = !isSelected;
    setListItems(newItems);
  };

  const addAndSelectItem = ({ title }) => {
    const newItems = listItems.slice();

    newItems.unshift({ title, selected: true });

    setListItems(newItems);
  };

  const count = listItems.filter(item => item.selected).length;

  if (count !== prevCount) {
    if (count === 0) {
      setListHeader(`Add a ${itemName}`);
    } else if (count === 1) {
      setListHeader(`${count} ${itemName} selected`);
    } else if (count > 1) {
      setListHeader(`${count} ${itemName}s selected`);
    }

    setPrevCount(count);
  }

  useEffect(() => {
    const addWindowListener = () => {
      window.addEventListener("click", toggleListOpen);
    };

    const removeWindowListener = () => {
      window.removeEventListener("click", toggleListOpen);
    };

    if (listOpen) {
      addWindowListener();
    } else {
      removeWindowListener();
    }

    return removeWindowListener;
  });

  return [
    listOpen,
    listItems,
    toggleListOpen,
    toggleItem,
    addAndSelectItem,
    listHeader
  ];
}

function Dropdown(props) {
  const { list, itemName, initialListOpen = false } = props;

  const [
    listOpen,
    listItems,
    toggleListOpen,
    toggleItem,
    addAndSelectItem,
    headerTitle
  ] = useDropdownList(initialListOpen, list, itemName);

  let listIcon = listOpen ? faAngleUp : faAngleDown;

  const toggleAndPropagateItem = (itemIndex, isSelected) => {
    toggleItem(itemIndex, isSelected);
    props.onItemToggle && props.onItemToggle(listItems[itemIndex], isSelected);
  };

  const addAndPropagateItem = ({ title }) => {
    addAndSelectItem({ title });
    props.onItemAddAndSelect && props.onItemAddAndSelect({ title });
  };

  const toggleListOpenAndPropagate = () => {
    toggleListOpen();
    props.onOpen && props.onOpen(!listOpen);
  };

  return (
    <div className={dropdownStyles.wrapper}>
      <div
        className={dropdownStyles.header}
        onClick={toggleListOpenAndPropagate}
      >
        <div className={dropdownStyles.headerTitle}>{headerTitle}</div>
        <FontAwesomeIcon
          className={dropdownStyles.headerIcon}
          icon={listIcon}
        />
      </div>
      {listOpen && (
        <ul className={dropdownStyles.list} onClick={e => e.stopPropagation()}>
          <li>
            <div className={dropdownStyles.inputWrapper}>
              <EditableFieldWithButton
                placeholder={props.placeholder || "New item"}
                onConfirm={title => addAndPropagateItem({ title })}
              ></EditableFieldWithButton>
            </div>
          </li>
          {listItems.map((item, itemIndex) => (
            <li
              className={dropdownStyles.listItem}
              key={itemIndex}
              onClick={() => toggleAndPropagateItem(itemIndex, item.selected)}
            >
              <span
                className={[
                  commonStyles.overflowEllipsis,
                  dropdownStyles.itemSpan
                ].join(" ")}
              >
                {item.title}
              </span>{" "}
              {item.selected && <FontAwesomeIcon icon={faCheck} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      timeOut: null,
      newItemValue: "",
      addItemButtonDisabled: true
    };
    this.close = this.close.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.newItemValueChanged = this.newItemValueChanged.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener("click", this.close);
      } else {
        window.removeEventListener("click", this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.close);
  }

  close(timeOut) {
    this.setState({
      listOpen: false
    });
  }

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter(function(a) {
      return a.selected;
    }).length;
    if (count === 0) {
      return { headerTitle: nextProps.title };
    } else if (count === 1) {
      return { headerTitle: `${count} ${nextProps.titleHelper} selected` };
    } else if (count > 1) {
      return { headerTitle: `${count} ${nextProps.titleHelper}s selected` };
    }
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  newItemValueChanged(e) {
    this.setState({
      newItemValue: e.target.value,
      addItemButtonDisabled:
        e.target.value == null || e.target.value.length === 0
    });
  }

  toggleItem(item, itemSelected) {
    if (this.props.toggleItem) {
      this.props.toggleItem(item, itemSelected);
    }
  }

  addItem() {
    if (this.state.newItemValue.length === 0) return;

    if (this.props.itemAddedAndSelected) {
      this.props.itemAddedAndSelected({ title: this.state.newItemValue });
    }

    this.setState({
      newItemValue: "",
      addItemButtonDisabled: true
    });
  }

  onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      this.addItem();
    }
  }

  render() {
    const { list, addItem } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen ? (
            <FontAwesomeIcon style={{ width: "30px" }} icon={faAngleUp} />
          ) : (
            <FontAwesomeIcon style={{ width: "30px" }} icon={faAngleDown} />
          )}
        </div>
        {listOpen && (
          <ul className="dd-list" onClick={e => e.stopPropagation()}>
            <li>
              <div
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <input
                  className="dd-list-item"
                  style={{ border: "none", width: "170px" }}
                  type="text"
                  onChange={this.newItemValueChanged}
                  value={this.state.newItemValue}
                  placeholder="Add a tag"
                  onKeyDown={this.onKeyDown}
                ></input>
                <button
                  style={{
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "white"
                  }}
                  disabled={this.state.addItemButtonDisabled}
                  onClick={this.addItem}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </li>
            {list.map(item => (
              <li
                className={"dd-list-item"}
                key={item.title}
                onClick={() => this.toggleItem(item, item.selected)}
              >
                <span
                  className={[
                    commonStyles.overflowEllipsis,
                    dropdownStyles.itemSpan
                  ].join(" ")}
                >
                  {item.title}
                </span>{" "}
                {item.selected && <FontAwesomeIcon icon={faCheck} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
*/

export default Dropdown;
