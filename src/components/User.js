import React, { Component } from "react";

//import "../modal.css";
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ex: null
    };
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.setState({
      ex: this.props.ex
    });
  }

  onEdit() {
    console.log("Exercise to EDIT: " + this.state.ex._id);
    window.location = "/edit/" + this.state.ex.id;
  }

  render() {
    const { onEdit, onDeletee } = this.props;
    return (
      <div
        className="card text-white bg-primary mb-3"
        style={{
          minWidth: "20rem",
          margin: "1rem"
        }}
      >
        <div className="card-header">
          {" "}
          {this.state.ex != null && this.state.ex != undefined
            ? "ID: " + this.state.ex.id
            : ""}{" "}
        </div>{" "}
        <div className="card-body">
          <h3 className="card-title">
            {" "}
            {this.state.ex != null && this.state.ex != undefined
              ? this.state.ex.employee_name.length > 15
                ? this.state.ex.employee_name.slice(0, 12) + "..."
                : this.state.ex.employee_name
              : ""}{" "}
          </h3>{" "}
          <h4 className="card-title">
            {" "}
            {this.state.ex != null && this.state.ex != undefined
              ? "SALARY: " + this.state.ex.employee_salary
              : ""}{" "}
          </h4>{" "}
          <p className="card-text">
            {" "}
            {this.state.ex != null && this.state.ex != undefined
              ? "AGE: " + this.state.ex.employee_age
              : ""}{" "}
          </p>
          <div
            className="btn-group"
            style={{
              float: "right"
            }}
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => this.onEdit()}
            >
              Edit{" "}
            </button>{" "}
            <button
              type="button"
              onClick={() =>
                onDeletee(this.state.ex != null ? this.state.ex : 0)
              }
              className="btn btn-danger"
            >
              Delete{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default User;
