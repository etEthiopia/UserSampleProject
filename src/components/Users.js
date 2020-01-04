import React, { Component } from "react";
import axios from "axios";
import Exercise from "./Exercise";
import User from "./User";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Pagination,
  Image,
  Badge,
  Button,
  Tabs,
  Tab,
  Modal,
  InputGroup,
  FormControl
} from "react-bootstrap";

import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
      searched: null,
      view: "",
      show: false,
      toDelete: 0,
      loadingtable: "Loading . . .",
      searchingText: "Searching",
      searchId: 0,
      searching: false
    };
    var modal = document.getElementById("myModal"),
      body = document.getElementsByTagName("body"),
      container = document.getElementById("myContainer"),
      btnOpen = document.getElementById("myBtn"),
      btnClose = document.getElementById("closeModal");
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onBack = this.onBack.bind(this);

    //this.onDeleteFu = this.onDeleteFu.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  onChangeId(e) {
    if (e.target.value > 0) {
      this.setState({
        searchId: e.target.value
      });
    } else {
      this.setState({
        searching: false
      });
    }
  }

  onBack() {
    this.setState({
      searching: false
    });
  }

  onSearch() {
    if (this.state.searchId > 0) {
      this.setState({
        searching: true,
        searched: null
      });
      axios
        .get(
          "	http://dummy.restapiexample.com/api/v1/employee/" +
            this.state.searchId,
          {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(response => {
          console.log("RESPONSE: " + JSON.stringify(response));
          if (response.data.id > 0) {
            this.setState({
              searched: response.data
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            searchingText: "User not Found"
          });
        });
    }
  }

  refreshList() {
    this.setState({
      exercises: []
    });
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees?_limit=200", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            exercises: response.data.map(exercise => exercise)
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loadingtable: "Connection Error Please Refresh Page"
        });
      });
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  onDelete() {
    axios
      .delete(
        "http://dummy.restapiexample.com/api/v1/delete/" + this.state.toDelete,
        {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        if (
          response.status == 200 &&
          response.data.success.text == "successfully! deleted Records"
        ) {
          alert("successfully deleted");
          this.refreshList();
          this.setState({
            show: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  handleShow() {
    this.setState({
      show: true
    });
    //this.state.show = true;
  }

  handleEdit(e) {
    console.log("EDIT : " + JSON.stringify(e));
    window.location = "/edit/" + e.id;
  }

  handleDelete = e => {
    console.log("DELETTE : " + JSON.stringify(e));
    if (e.id > 0) {
      this.setState({
        toDelete: e.id
      });
      console.log("e.id: " + this.state.toDelete);
      this.handleShow();
    } else {
      console.log("DELETTE ID < 0 : " + e.id);
    }
  };

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 200
      },
      {
        Header: "Name",
        accessor: "employee_name"
      },
      {
        Header: "Salary",
        accessor: "employee_salary",
        width: 500
      },
      {
        Header: "Age",
        accessor: "employee_age",
        width: 100
      },
      {
        Header: "",
        Cell: row => (
          <div
          // style={{
          //   width: "300"
          // }}
          >
            <div className="btn-group" role="group" aria-label="Basic example">
              <Button
                variant="warning"
                onClick={() => this.handleEdit(row.original)}
              >
                {" "}
                Edit{" "}
              </Button>{" "}
              <Button
                variant="danger"
                onClick={() => this.handleDelete(row.original)}
              >
                {" "}
                Delete{" "}
              </Button>{" "}
            </div>{" "}
          </div>
        )
      }
    ];
    return (
      <Container
        style={{
          marginTop: "50px"
        }}
      >
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Think Again </Modal.Title>{" "}
          </Modal.Header>{" "}
          <Modal.Body>
            Are you sure you want to delete this employee with ID:{" "}
            {this.state.toDelete}{" "}
          </Modal.Body>{" "}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              No{" "}
            </Button>{" "}
            <Button variant="primary" onClick={this.onDelete}>
              Yes{" "}
            </Button>{" "}
          </Modal.Footer>{" "}
        </Modal>{" "}
        <Row className="justify-content-md-center">
          <Col>
            {this.state.searching == true ? (
              <Button
                variant="outline-secondary"
                onClick={() => {
                  this.onBack();
                }}
              >
                Back
              </Button>
            ) : (
              ""
            )}
          </Col>
          <Col md="auto">
            <h3 className="text-right">
              Enter the Id of the employee to the Right
            </h3>
          </Col>
          <Col xs lg="3">
            <InputGroup className="mb-3">
              <FormControl
                aria-describedby="basic-addon1"
                onChange={this.onChangeId}
              />
              <InputGroup.Prepend>
                <Button
                  variant="outline-primary"
                  onClick={() => this.onSearch()}
                >
                  Search
                </Button>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.state.searching ? (
              <div>
                {this.state.searched == null ||
                this.state.searched == undefined ? (
                  <h2>{this.state.searchingText}</h2>
                ) : (
                  // <h2>{JSON.stringify(this.state.searched)}</h2>
                  <User
                    ex={this.state.searched}
                    key={this.state.searched.id}
                    onDeletee={this.handleDelete}
                  />
                )}
              </div>
            ) : (
              <Tabs defaultActiveKey="table" id="uncontrolled-tab-example">
                <Tab eventKey="table" title="Table View">
                  <Row>
                    <Col>
                      {this.state.exercises.length > 0 ? (
                        <ReactTable
                          columns={columns}
                          data={this.state.exercises}
                          filterable
                        ></ReactTable>
                      ) : (
                        <div>
                          <h1>{this.state.loadingtable}</h1>
                        </div>
                      )}
                    </Col>{" "}
                  </Row>{" "}
                </Tab>{" "}
                <Tab eventKey="grid" title="Grid View">
                  <Row>
                    <Col>
                      <div className="row">
                        {" "}
                        {this.state.exercises.length > 0 ? (
                          this.state.exercises
                            .slice(0, 100)
                            .map(exercise => (
                              <User
                                ex={exercise}
                                key={exercise.id}
                                onDeletee={this.handleDelete}
                              />
                            ))
                        ) : (
                          <h1>{this.state.loadingtable}</h1>
                        )}{" "}
                      </div>{" "}
                    </Col>{" "}
                  </Row>{" "}
                </Tab>{" "}
              </Tabs>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Users;
