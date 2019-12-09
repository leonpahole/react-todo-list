import gql from "graphql-tag";
import { TASK_FRAGMENT, TODO_LIST_FRAGMENT } from "./fragments";

export const CREATE_TODO_LIST = gql`
  mutation CreateTodoList($title: String!) {
    createTodoList(title: $title) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const UPDATE_TODO_LIST = gql`
  mutation UpdateTodoList($todoListID: ID!, $title: String!) {
    updateTodoList(id: $todoListID, title: $title) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const DELETE_TODO_LIST = gql`
  mutation DeleteTodoList($todoListID: ID!) {
    deleteTodoList(id: $todoListID) {
      id
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($todoListID: ID!, $description: String!) {
    addTasksToTodoList(
      id: $todoListID
      tasks: [{ description: $description }]
    ) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $taskID: ID!
    $description: String
    $reminder: DateTime
    $deadline: DateTime
    $status: TaskState
  ) {
    updateTaskInTodoList(
      id: $taskID
      description: $description
      reminder: $reminder
      deadline: $deadline
      state: $status
    ) {
      ...CompleteTask
    }
  }

  ${TASK_FRAGMENT}
`;

export const DELETE_TASK_IN_TODO_LIST = gql`
  mutation DeleteTask($todoListID: ID!, $taskID: ID!) {
    deleteTasksFromTodoList(id: $todoListID, taskIDs: [$taskID]) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const ADD_TAG_TO_TODO_LIST = gql`
  mutation AddTagToTodoList($todoListID: ID!, $tagID: ID!) {
    addTagsToTodoList(id: $todoListID, tagIDs: [$tagID]) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const CREATE_AND_ADD_TAG_TO_TODO_LIST = gql`
  mutation AddTagToTodoList(
    $todoListID: ID!
    $tagTitle: String!
    $tagColor: String!
  ) {
    addTagsToTodoList(
      id: $todoListID
      tags: [{ title: $tagTitle, color: $tagColor }]
    ) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const REMOVE_TAG_FROM_TODO_LIST = gql`
  mutation RemoveTagFromTodoList($todoListID: ID!, $tagID: ID!) {
    deleteTagsFromTodoList(id: $todoListID, tagIDs: [$tagID]) {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const ADD_TAG_TO_TASK = gql`
  mutation AddTagToTask($taskID: ID!, $tagID: ID!) {
    addTagsToTask(id: $taskID, tagIDs: [$tagID]) {
      ...CompleteTask
    }
  }

  ${TASK_FRAGMENT}
`;

export const CREATE_AND_ADD_TAG_TO_TASK = gql`
  mutation AddTagToTask($taskID: ID!, $tagTitle: String!, $tagColor: String!) {
    addTagsToTask(id: $taskID, tags: [{ title: $tagTitle, color: $tagColor }]) {
      ...CompleteTask
    }
  }

  ${TASK_FRAGMENT}
`;

export const REMOVE_TAG_FROM_TASK = gql`
  mutation RemoveTagFromTask($taskID: ID!, $tagID: ID!) {
    deleteTagsFromTask(id: $taskID, tagIDs: [$tagID]) {
      ...CompleteTask
    }
  }

  ${TASK_FRAGMENT}
`;
