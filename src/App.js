import React, { Component } from "react";
import "./styles/App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./layouts/Header";

class App extends Component {
  render() {
    return (
      <div className="flex flex-column items-center">
        <Header></Header>
        <Dashboard></Dashboard>
      </div>
    );
  }
}

export default App;
