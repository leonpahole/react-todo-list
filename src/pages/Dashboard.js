import React from "react";

import TodoListUnit from "./TodoListUnit";
import { GET_TODO_LISTS, GET_TAGS } from "../graphql/queries";
import { CREATE_TODO_LIST, DELETE_TODO_LIST } from "../graphql/mutations";
import { useMutation, useQuery } from "urql";

import dashboardStyles from "../styles/dashboard.module.css";
import EditableFieldWithButton from "../components/EditableFieldWithButton";

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

const Dashboard = () => {
  /* FETCH TODO LISTS */
  const [todoListsResult] = useQuery({
    query: GET_TODO_LISTS
  });
  const {
    data: todoListData,
    fetching: fetchingTodoLists,
    error: fetchingTodoListsError
  } = todoListsResult;

  /* FETCH TAGS */
  const [tagsResult] = useQuery({
    query: GET_TAGS
  });
  const {
    data: tagData,
    fetching: fetchingTags,
    error: fetchingTagsError
  } = tagsResult;

  const [, createTodoListMutation] = useMutation(CREATE_TODO_LIST);

  const createTodoList = React.useCallback(
    title => {
      createTodoListMutation({ title });
    },
    [createTodoListMutation]
  );

  const [deleteTodoList] = useMutationCallback(DELETE_TODO_LIST);

  if (fetchingTags || fetchingTodoLists) {
    return <p>Loading...</p>;
  }

  if (fetchingTagsError || fetchingTodoListsError) {
    return <p>Error!</p>;
  }

  return (
    <React.Fragment>
      <div className={dashboardStyles.dashboardWrapper}>
        <h2>TODO LIST APP</h2>
        <h2>
          <EditableFieldWithButton
            placeholder="Create a todo list"
            onConfirm={createTodoList}
          ></EditableFieldWithButton>
        </h2>
      </div>
      <div className={dashboardStyles.todoListUnitWrapper}>
        {todoListData.todoLists.map(todoList => (
          <TodoListUnit
            key={todoList.id}
            todoList={todoList}
            allTags={tagData.tags}
            onDelete={id => deleteTodoList({ todoListID: id })}
          ></TodoListUnit>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
