import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Exercises from "./components/Exercises";
import Users from "./components/Users";
import EditExercise from "./components/EditExercise";
import EditUser from "./components/EditUser";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    console.log("rendered");
    return (
      <Router>
        <Navbar />
        <Route path="/" exact component={Users} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/user" component={CreateUser} />
      </Router>
    );
  }
}

export default App;
