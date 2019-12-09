import gql from "graphql-tag";
import { TAG_FRAGMENT, TODO_LIST_FRAGMENT } from "./fragments";

export const GET_TODO_LISTS = gql`
  {
    todoLists {
      ...CompleteTodoList
    }
  }

  ${TODO_LIST_FRAGMENT}
`;

export const GET_TAGS = gql`
  {
    tags {
      ...CompleteTag
    }
  }

  ${TAG_FRAGMENT}
`;
