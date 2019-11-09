import React, { Component } from "react";
import "../styles/App.css";

import TodoListUnit from "./TodoListUnit";
import AddTodoList from "../components/TodoList/AddTodoList";
import DropdownMultiple from "../components/DropDownMultiple";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      location: [
        {
          id: 0,
          title: "New York",
          selected: false,
          key: "location"
        },
        {
          id: 1,
          title: "Dublin",
          selected: false,
          key: "location"
        },
        {
          id: 2,
          title: "California",
          selected: false,
          key: "location"
        },
        {
          id: 3,
          title: "Istanbul",
          selected: false,
          key: "location"
        },
        {
          id: 4,
          title: "Izmir",
          selected: false,
          key: "location"
        },
        {
          id: 5,
          title: "Oslo",
          selected: false,
          key: "location"
        },
        {
          id: 6,
          title: "Zurich",
          selected: false,
          key: "location"
        }
      ],
      fruit: [
        {
          id: 0,
          title: "Apple",
          selected: false,
          key: "fruit"
        },
        {
          id: 1,
          title: "Orange",
          selected: false,
          key: "fruit"
        },
        {
          id: 2,
          title: "Grape",
          selected: false,
          key: "fruit"
        },
        {
          id: 3,
          title: "Pomegranate",
          selected: false,
          key: "fruit"
        },
        {
          id: 4,
          title: "Strawberry",
          selected: false,
          key: "fruit"
        }
      ],
      todoLists: [
        {
          title: "Todo list 1",
          id: "ck2jkduvp001g0760y3vp1b4i",
          tags: [
            {
              title: "Tag 1",
              color: "Color 1",
              id: "ck2jkduvr001h0760czxxth3v"
            },
            {
              title: "Tag 2",
              color: "Color 2",
              id: "ck2jkid8v002a0760zn8a8grc"
            },
            {
              title: "Tag 3",
              color: "tag3 color",
              id: "ck2jl13ej003f0760jfjklbe3"
            },
            {
              title: "Tag 3",
              color: "tag3 color",
              id: "ck2jl18ex003o0760q3p7tnxj"
            }
          ],
          tasks: [
            {
              id: "ck2jkduvu001i0760bbeuk3x9",
              deadline: null,
              description: "Task 1 description",
              reminder: null,
              createdAt: "2019-11-03T22:25:42.805Z",
              state: "InProgress",
              tags: []
            },
            {
              id: "ck2jl2f5q003x0760jhw9j7db",
              deadline: null,
              description: "Testtt insert",
              reminder: null,
              createdAt: "2019-11-03T22:44:48.828Z",
              state: "InProgress",
              tags: []
            }
          ]
        },
        {
          title: "Task 2 updated",
          id: "ck2jkid8s00290760ka44q51k",
          tags: [
            {
              title: "Tag 2",
              color: "Color 2",
              id: "ck2jkid8v002a0760zn8a8grc"
            }
          ],
          tasks: [
            {
              id: "ck2jkid8x002b07607x0lbo7v",
              deadline: null,
              description: "asdfg",
              reminder: null,
              createdAt: "2019-11-03T22:29:13.227Z",
              state: "Finished",
              tags: [
                {
                  id: "ck2jkid8v002a0760zn8a8grc",
                  color: "Color 2",
                  title: "Tag 2"
                }
              ]
            },
            {
              id: "ck2jkid8z002c07602zyh6g1e",
              deadline: null,
              description: "Task 3 description",
              reminder: null,
              createdAt: "2019-11-03T22:29:13.227Z",
              state: "InProgress",
              tags: []
            }
          ]
        }
      ]
    };

    this.addTodoList = this.addTodoList.bind(this);
    this.todoListDeleted = this.todoListDeleted.bind(this);
    this.taskDeleted = this.taskDeleted.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.editTaskDescription = this.editTaskDescription.bind(this);
    this.addTask = this.addTask.bind(this);
    this.taskChecked = this.taskChecked.bind(this);
  }

  addTodoList(todoListTitle) {
    this.setState({
      todoLists: [
        {
          title: todoListTitle,
          id: todoListTitle,
          tags: [],
          tasks: []
        },
        ...this.state.todoLists
      ]
    });
  }

  todoListDeleted(todoListID) {
    this.setState({
      todoLists: this.state.todoLists.filter(
        todoList => todoList.id !== todoListID
      )
    });
  }

  taskDeleted(todoListID, taskID) {
    let todoListIndex = this.state.todoLists.findIndex(
      todoList => todoList.id === todoListID
    );

    if (todoListIndex > -1) {
      let newTodoLists = this.state.todoLists.slice();

      newTodoLists[todoListIndex] = {
        ...newTodoLists[todoListIndex],
        tasks: newTodoLists[todoListIndex].tasks.filter(
          task => task.id !== taskID
        )
      };

      this.setState({
        todoLists: newTodoLists
      });
    }
  }

  editTitle(todoListID, newTitle) {
    let todoListIndex = this.state.todoLists.findIndex(
      todoList => todoList.id === todoListID
    );

    if (todoListIndex > -1) {
      let newTodoLists = this.state.todoLists.slice();

      newTodoLists[todoListIndex].title = newTitle;

      this.setState({
        todoLists: newTodoLists
      });
    }
  }

  editTaskDescription(todoListID, taskID, newDescription) {
    const todoListIndex = this.state.todoLists.findIndex(
      todoList => todoList.id === todoListID
    );

    if (todoListIndex > -1) {
      const taskIndex = this.state.todoLists[todoListIndex].tasks.findIndex(
        task => task.id === taskID
      );

      if (taskIndex > -1) {
        let newTodoLists = this.state.todoLists.slice();
        newTodoLists[todoListIndex].tasks[
          taskIndex
        ].description = newDescription;

        this.setState({
          todoLists: newTodoLists
        });
      }
    }
  }

  addTask(todoListID, newTaskDescription) {
    const todoListIndex = this.state.todoLists.findIndex(
      todoList => todoList.id === todoListID
    );

    if (todoListIndex > -1) {
      let newTodoLists = this.state.todoLists.slice();
      newTodoLists[todoListIndex].tasks.push({
        id: newTaskDescription,
        deadline: null,
        description: newTaskDescription,
        reminder: null,
        createdAt: "2019-11-03T22:29:13.227Z",
        state: "InProgress",
        tags: []
      });

      this.setState({
        todoLists: newTodoLists
      });
    }
  }

  taskChecked(todoListID, taskID, taskCheckedState) {
    const todoListIndex = this.state.todoLists.findIndex(
      todoList => todoList.id === todoListID
    );

    if (todoListIndex > -1) {
      const taskIndex = this.state.todoLists[todoListIndex].tasks.findIndex(
        task => task.id === taskID
      );

      if (taskIndex > -1) {
        let newTodoLists = this.state.todoLists.slice();
        newTodoLists[todoListIndex].tasks[taskIndex].state = taskCheckedState
          ? "Finished"
          : "InProgress";

        this.setState({
          todoLists: newTodoLists
        });
      }
    }
  }

  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
  };

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => (item.selected = false));
    temp[id].selected = true;
    this.setState({
      [key]: temp
    });
  };

  render() {
    return (
      <React.Fragment>
        <DropdownMultiple
          titleHelper="Location"
          title="Select location"
          list={this.state.location}
          toggleItem={this.toggleSelected}
        />

        <AddTodoList addTodoList={this.addTodoList}></AddTodoList>
        <div
          className="flex flex-wrap items-start"
          style={{ width: "100%", flexFlow: "row wrap" }}
        >
          {this.state.todoLists.map(todoList => (
            <TodoListUnit
              key={todoList.id}
              id={todoList.id}
              title={todoList.title}
              tags={todoList.tags}
              tasks={todoList.tasks}
              todoListDeleted={this.todoListDeleted}
              taskDeleted={this.taskDeleted}
              editTitle={this.editTitle}
              editTaskDescription={this.editTaskDescription}
              addTask={this.addTask}
              taskChecked={this.taskChecked}
            ></TodoListUnit>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
