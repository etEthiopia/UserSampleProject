import React, { Component } from "react";
import axios from "axios";
import Exercise from "./Exercise";
import { Link } from "react-router-dom";

class Exercises extends Component {
  constructor() {
    super();
    this.state = {
      exercises: []
    };
    var modal = document.getElementById("myModal"),
      body = document.getElementsByTagName("body"),
      container = document.getElementById("myContainer"),
      btnOpen = document.getElementById("myBtn"),
      btnClose = document.getElementById("closeModal");
    // (btnOpen.onclick = function() {
    //   (modal.className = "Modal is-visuallyHidden"),
    //     setTimeout(function() {
    //       (container.className = "MainContainer is-blurred"),
    //         (modal.className = "Modal");
    //     }, 100),
    //     (container.parentElement.className = "ModalOpen");
    // }),
    //   (btnClose.onclick = function() {
    //     (modal.className = "Modal is-hidden is-visuallyHidden"),
    //       (body.className = ""),
    //       (container.className = "MainContainer"),
    //       (container.parentElement.className = "");
    //   }),
    //   (window.onclick = function(e) {
    //     e.target == modal &&
    //       ((modal.className = "Modal is-hidden"),
    //       (body.className = ""),
    //       (container.className = "MainContainer"),
    //       (container.parentElement.className = ""));
    //   });
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/exercises")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            exercises: response.data.map(exercise => exercise)
          });
        }
      })
      .catch(err => console.log(err));
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      fullname: this.state.fullname
    };

    console.log(user);

    axios
      .post("http://localhost:3001/users", user)
      .then(res => console.log(res.data + ":::" + res.status));

    //window.location = "/";
  }

  render() {
    return (
      <div className="col-lg-12">
        <div className="row">
          {this.state.exercises.map(exercise => (
            <Exercise ex={exercise} />
          ))}
        </div>
      </div>
    );
  }
}

export default Exercises;
