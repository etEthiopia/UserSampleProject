import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

class EditUSer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      age: 0,
      fullname: "",
      id: 0
    };
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeFullname = this.onChangeFullname.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const url =
      "http://dummy.restapiexample.com/api/v1/employee/" +
      this.props.match.params.id;
    axios.get(url).then(response => {
      if (response.status == 200) {
        this.setState({
          salary: response.data.employee_salary,
          age: response.data.employee_age,
          fullname: response.data.employee_name,
          id: response.data.id
        });
      }
    });
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
      name: this.state.fullname,
      id: this.props.match.params.id
    };

    //console.log(exercise);

    axios
      .put(
        "http://dummy.restapiexample.com/api/v1/update/" +
          this.props.match.params.id,
        user
      )
      .then(res => {
        alert("User successfully Edited");
        window.location = "/";
      })
      .catch(err => console.log(err));
    //window.location = "/";
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col-md-5" onSubmit={this.onSubmit}>
            <fieldset>
              <legend>Edit User {this.props.match.params.id}</legend>

              <div className="form-group">
                <label for="fullname">Name</label>
                <input
                  className="form-control"
                  id="fullname"
                  type="text"
                  value={this.state.fullname}
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
                  value={this.state.salary}
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
                  value={this.state.age}
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

export default EditUSer;
