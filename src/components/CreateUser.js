import React, { Component } from "react";
import axios from "axios";
class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      age: 0,
      fullname: ""
    };
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
    //console.log("username: " + this.state.username);
  }
  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    });
    //console.log("username: " + this.state.username);
  }
  onChangeFullname(e) {
    this.setState({
      fullname: e.target.value
    });
    //console.log("fullname: " + this.state.fullname);
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      age: this.state.age,
      salary: this.state.salary,
      name: this.state.fullname
    };

    console.log(user);

    axios
      .post("http://dummy.restapiexample.com/api/v1/create", user)
      .then(res => {
        alert("User successfully Created");
        window.location = "/";
      });

    //window.location = "/";
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col-md-5" onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Create User</legend>

              <div className="form-group">
                <label for="fullname">Name</label>
                <input
                  className="form-control"
                  id="fullname"
                  type="text"
                  placeholder="Enter Name"
                  onChange={this.onChangeFullname}
                />
              </div>

              <div className="form-group">
                <label for="salary">Salary</label>
                <input
                  className="form-control"
                  id="salary"
                  type="number"
                  placeholder="Enter Salary"
                  onChange={this.onChangeSalary}
                />
              </div>

              <div className="form-group">
                <label for="age">Age</label>
                <input
                  className="form-control"
                  id="age"
                  type="number"
                  placeholder="Enter Age"
                  onChange={this.onChangeAge}
                />
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

export default CreateUser;
