import gql from "graphql-tag";

export const TAG_FRAGMENT = gql`
  fragment CompleteTag on Tag {
    id
    color
    title
  }
`;

export const TASK_FRAGMENT = gql`
  fragment CompleteTask on Task {
    id
    deadline
    description
    reminder
    createdAt
    state
    tags {
      ...CompleteTag
    }
  }

  ${TAG_FRAGMENT}
`;

export const TODO_LIST_FRAGMENT = gql`
  fragment CompleteTodoList on TodoList {
    title
    id
    tags {
      ...CompleteTag
    }
    tasks {
      ...CompleteTask
    }
  }

  ${TASK_FRAGMENT}
`;
