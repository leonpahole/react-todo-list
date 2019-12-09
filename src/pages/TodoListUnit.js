import React, { useState } from "react";
import Modal from "react-modal";

import TodoListModal from "../components/TodoList/TodoListModal";
import TodoList from "../components/TodoList/TodoList";

import {
  DELETE_TASK_IN_TODO_LIST,
  UPDATE_TASK,
  UPDATE_TODO_LIST,
  ADD_TAG_TO_TODO_LIST,
  ADD_TAG_TO_TASK,
  REMOVE_TAG_FROM_TASK,
  REMOVE_TAG_FROM_TODO_LIST,
  CREATE_TASK,
  CREATE_AND_ADD_TAG_TO_TASK,
  CREATE_AND_ADD_TAG_TO_TODO_LIST
} from "../graphql/mutations";
import { useMutation } from "urql";

function useMutationCallback(query) {
  const [, mutation] = useMutation(query);

  const action = React.useCallback(
    (...args) => {
      mutation(...args);
    },
    [mutation]
  );

  return [action];
}

Modal.setAppElement("#root");

function TodoListUnit(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const [deleteTask] = useMutationCallback(DELETE_TASK_IN_TODO_LIST);
  const [createTask] = useMutationCallback(CREATE_TASK);
  const [updateTask] = useMutationCallback(UPDATE_TASK);
  const [updateTodoList] = useMutationCallback(UPDATE_TODO_LIST);
  const [addTagToTodoList] = useMutationCallback(ADD_TAG_TO_TODO_LIST);
  const [createAndAddTagToTodoList] = useMutationCallback(
    CREATE_AND_ADD_TAG_TO_TODO_LIST
  );
  const [removeTagFromTodoList] = useMutationCallback(
    REMOVE_TAG_FROM_TODO_LIST
  );
  const [addTagToTask] = useMutationCallback(ADD_TAG_TO_TASK);
  const [createAndAddTagToTask] = useMutationCallback(
    CREATE_AND_ADD_TAG_TO_TASK
  );
  const [removeTagFromTask] = useMutationCallback(REMOVE_TAG_FROM_TASK);

  return (
    <React.Fragment>
      <TodoList
        todoList={props.todoList}
        onTodoListEdit={openModal}
        onTodoListDelete={props.onDelete}
        onTaskUpdate={(id, updateInfo) => {
          updateTask({ taskID: id, ...updateInfo });
        }}
        onTaskDescriptionClicked={openModal}
        onTaskDelete={(id, taskID) =>
          deleteTask({ todoListID: id, taskID: taskID })
        }
      ></TodoList>

      <TodoListModal
        todoList={props.todoList}
        isOpen={modalOpen}
        onModalClose={closeModal}
        allTags={props.allTags}
        /* */
        onTodoListDelete={props.onDelete}
        onTodoListUpdate={(id, updateInfo) => {
          updateTodoList({ todoListID: id, ...updateInfo });
        }}
        onTodoListTagToggle={(id, tag, selected) => {
          selected
            ? removeTagFromTodoList({ todoListID: id, tagID: tag.id })
            : addTagToTodoList({ todoListID: id, tagID: tag.id });
        }}
        onTodoListTagAdd={(id, tag) => {
          createAndAddTagToTodoList({
            todoListID: id,
            tagTitle: tag.title,
            tagColor: "color"
          });
        }}
        onTaskDelete={(id, taskID) =>
          deleteTask({ todoListID: id, taskID: taskID })
        }
        onTaskUpdate={(id, updateInfo) => {
          updateTask({ taskID: id, ...updateInfo });
        }}
        onTaskTagToggle={(id, tag, selected) => {
          selected
            ? removeTagFromTask({ taskID: id, tagID: tag.id })
            : addTagToTask({ taskID: id, tagID: tag.id });
        }}
        onTaskTagAdd={(id, tag) => {
          createAndAddTagToTask({
            taskID: id,
            tagTitle: tag.title,
            tagColor: "color"
          });
        }}
        onTaskAdd={(id, description) =>
          createTask({ todoListID: id, description })
        }
      ></TodoListModal>
    </React.Fragment>
  );
}

export default TodoListUnit;
