import React from "react";
import Modal from "react-modal";
import TaskList from "../Task/TaskList";

import todoListModalStyles from "../../styles/todo-list-modal.module.css";
import TodoListModalHeader from "./TodoListModalHeader";
import EditableTagList from "../Tag/EditableTagList";
import EditableFieldWithButton from "../EditableFieldWithButton";

function TodoListModal(props) {
  const { id, title, tags, tasks } = props.todoList;

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onModalClose}
      contentLabel="Todo List Modal"
      className={todoListModalStyles.modal}
    >
      <TodoListModalHeader
        title={title}
        onDelete={() => props.onTodoListDelete && props.onTodoListDelete(id)}
        onClose={props.onModalClose}
        onTitleUpdate={title =>
          props.onTodoListUpdate && props.onTodoListUpdate(id, { title })
        }
      ></TodoListModalHeader>

      <EditableTagList
        allTags={props.allTags}
        selectedTags={tags}
        onTagToggle={(tag, selected) =>
          props.onTodoListTagToggle &&
          props.onTodoListTagToggle(id, tag, selected)
        }
        onTagAdd={tag =>
          props.onTodoListTagAdd && props.onTodoListTagAdd(id, tag)
        }
      ></EditableTagList>

      <TaskList
        tasks={tasks}
        className={todoListModalStyles.editableTaskListWrapper}
        onDelete={taskID =>
          props.onTaskDelete && props.onTaskDelete(id, taskID)
        }
        allTags={props.allTags}
        onUpdate={props.onTaskUpdate}
        onTagToggle={props.onTaskTagToggle}
        onTagAdd={props.onTaskTagAdd}
        isEditable={true}
      ></TaskList>

      <br></br>
      <EditableFieldWithButton
        placeholder="Add a new task"
        onConfirm={description =>
          props.onTaskAdd && props.onTaskAdd(id, description)
        }
      ></EditableFieldWithButton>
    </Modal>
  );
}

export default TodoListModal;
