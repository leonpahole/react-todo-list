import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Provider, Client, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { GET_TODO_LISTS, GET_TAGS } from "./graphql/queries";

const cache = cacheExchange({
  updates: {
    Mutation: {
      createTodoList: ({ createTodoList: newTodoList }, _args, cache) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            data.todoLists.unshift(newTodoList);
            return data;
          } else {
            return null;
          }
        });
      },
      updateTodoList: ({ updateTodoList: updatedTodoList }, _args, cache) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            const updatedTodoListIndex = data.todoLists.findIndex(
              todoList => todoList.id === updatedTodoList.id
            );

            if (updatedTodoListIndex > -1) {
              data.todoLists[updatedTodoListIndex] = updatedTodoList;
            }

            return data;
          } else {
            return null;
          }
        });
      },
      deleteTodoList: ({ deleteTodoList: deletedTodoList }, _args, cache) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            data.todoLists = data.todoLists.filter(
              todoList => todoList.id !== deletedTodoList.id
            );

            return data;
          } else {
            return null;
          }
        });
      },
      addTasksToTodoList: (
        { addTasksToTodoList: todoListWithAddedTask },
        _args,
        cache
      ) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            const todoListWithAddedTaskIndex = data.todoLists.findIndex(
              todoList => todoList.id === todoListWithAddedTask.id
            );

            if (todoListWithAddedTaskIndex > -1) {
              data.todoLists[
                todoListWithAddedTaskIndex
              ] = todoListWithAddedTask;
            }

            return data;
          } else {
            return null;
          }
        });
      },
      updateTaskInTodoList: (
        { updateTaskInTodoList: updatedTask },
        _args,
        cache
      ) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            for (let i = 0; i < data.todoLists.length; i++) {
              const updatedTaskIndex =
                data.todoLists[i].tasks.find(
                  task => task.id === updatedTask.id
                ) != null;

              if (updatedTaskIndex > -1) {
                data.todoLists[i].tasks[updatedTaskIndex] = updatedTask;
              }
            }

            return data;
          } else {
            return null;
          }
        });
      },
      deleteTasksFromTodoList: (
        { deleteTasksFromTodoList: todoListWithDeletedTask },
        _args,
        cache
      ) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            const todoListWithDeletedTaskIndex = data.todoLists.findIndex(
              todoList => todoList.id === todoListWithDeletedTask.id
            );

            if (todoListWithDeletedTaskIndex > -1) {
              data.todoLists[
                todoListWithDeletedTaskIndex
              ] = todoListWithDeletedTask;
            }

            return data;
          } else {
            return null;
          }
        });
      },
      createTag: ({ createTodoList: newTag }, _args, cache) => {
        cache.updateQuery({ query: GET_TAGS }, data => {
          if (data !== null) {
            data.tags.unshift(newTag);
            return data;
          } else {
            return null;
          }
        });
      },
      addTagsToTodoList: (
        { addTagsToTodoList: updatedTodoList },
        _args,
        cache
      ) => {
        if (_args.tags != null && _args.tags.length > 0) {
          cache.updateQuery({ query: GET_TAGS }, data => {
            if (data !== null) {
              data.tags.unshift(
                updatedTodoList.tags[updatedTodoList.tags.length - 1]
              );
              return data;
            } else {
              return null;
            }
          });
        }

        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            const updatedTodoListIndex = data.todoLists.findIndex(
              todoList => todoList.id === updatedTodoList.id
            );

            if (updatedTodoListIndex > -1) {
              data.todoLists[updatedTodoListIndex] = updatedTodoList;
            }

            return data;
          } else {
            return null;
          }
        });
      },
      deleteTagsFromTodoList: (
        { deleteTagsFromTodoList: updatedTodoList },
        _args,
        cache
      ) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            const updatedTodoListIndex = data.todoLists.findIndex(
              todoList => todoList.id === updatedTodoList.id
            );

            if (updatedTodoListIndex > -1) {
              data.todoLists[updatedTodoListIndex] = updatedTodoList;
            }

            return data;
          } else {
            return null;
          }
        });
      },
      addTagsToTask: ({ addTagsToTask: updatedTask }, _args, cache) => {
        if (_args.tags != null && _args.tags.length > 0) {
          cache.updateQuery({ query: GET_TAGS }, data => {
            if (data !== null) {
              data.tags.unshift(updatedTask.tags[updatedTask.tags.length - 1]);
              return data;
            } else {
              return null;
            }
          });
        }

        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            for (let i = 0; i < data.todoLists.length; i++) {
              const updatedTaskIndex =
                data.todoLists[i].tasks.find(
                  task => task.id === updatedTask.id
                ) != null;

              if (updatedTaskIndex > -1) {
                data.todoLists[i].tasks[updatedTaskIndex] = updatedTask;
              }
            }

            return data;
          } else {
            return null;
          }
        });
      },
      deleteTagsFromTask: (
        { deleteTagsFromTask: updatedTask },
        _args,
        cache
      ) => {
        cache.updateQuery({ query: GET_TODO_LISTS }, data => {
          if (data !== null) {
            for (let i = 0; i < data.todoLists.length; i++) {
              const updatedTaskIndex =
                data.todoLists[i].tasks.find(
                  task => task.id === updatedTask.id
                ) != null;

              if (updatedTaskIndex > -1) {
                data.todoLists[i].tasks[updatedTaskIndex] = updatedTask;
              }
            }

            return data;
          } else {
            return null;
          }
        });
      }
    }
  }
});

const client = new Client({
  url: "http://localhost:4000",
  exchanges: [dedupExchange, cache, fetchExchange]
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
