import React, { Component } from "react";

//import "../modal.css";
class Exercise extends Component {
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
    window.location = "/edit/" + this.state.ex._id;
  }

  render() {
    const { onEdit, onDelete } = this.props;
    return (
      <div
        className="card text-white bg-primary mb-3"
        style={{
          minWidth: "20rem",
          margin: "1rem"
        }}
      >
        <div className="card-header">
          {this.state.ex != null ? this.state.ex.username : ""}
        </div>
        <div className="card-body">
          <h4 className="card-title">
            {this.state.ex != null ? this.state.ex.date.substring(0, 10) : ""}
          </h4>
          <p className="card-text">
            {this.state.ex != null ? this.state.ex.description : ""}
          </p>
          <p className="card-text">
            {this.state.ex != null ? this.state.ex.duration + " mins" : ""}
          </p>
          <div
            className="btn-group"
            style={{ float: "right" }}
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => this.onEdit()}
            >
              Edit
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Exercise;
