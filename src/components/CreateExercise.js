import React, { Component } from "react";
import { tsImportEqualsDeclaration } from "@babel/types";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      description: "",
      duration: "",
      date: new Date(),
      users: []
    };

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    let tusers;
    axios
      .get("http://localhost:3001/users")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          users: [],
          username: ""
        });
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
    console.log("username: " + this.state.username);
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
    console.log("description: " + this.state.description);
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
    console.log("duration: " + this.state.duration);
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
    console.log("date: " + this.state.date);
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("submiting: ");
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    //console.log(exercise);

    axios
      .post("http://localhost:3001/exercises", exercise)
      .then(res => console.log(res.data + ":::" + res.status))
      .catch(err => console.log(err));

    //window.location = "/";
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col-lg-8" onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Create Exercise</legend>

              <div className="form-group">
                <label for="username">Username</label>
                <select
                  className="form-control"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  id="username"
                >
                  {this.state.users != []
                    ? this.state.users.map(user => (
                        <option key={user} value={user}>
                          {user}
                        </option>
                      ))
                    : console.log("no user")}
                </select>
              </div>

              <div className="form-group">
                <label for="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="2"
                  onChange={this.onChangeDescription}
                ></textarea>
              </div>

              <div className="form-group">
                <label for="duration">Duration in minutes</label>
                <input
                  className="form-control"
                  id="duration"
                  type="text"
                  placeholder="Enter duration"
                  onChange={this.onChangeDuration}
                />
              </div>

              <div className="form-group">
                <label>Date </label>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                </div>
              </div>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateExercise;
