import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand" href="#">
          User API Demo
        </Link>
        <button
          className="navbar-toggler"
          aria-expanded="false"
          aria-controls="navbarColor01"
          aria-label="Toggle navigation"
          type="button"
          data-target="#navbarColor01"
          data-toggle="collapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li to className="nav-item">
              <Link to="/" className="nav-link" href="#">
                Users
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/user" className="nav-link" href="#">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
