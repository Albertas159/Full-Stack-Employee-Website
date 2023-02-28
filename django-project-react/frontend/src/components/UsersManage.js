import React, { Component } from "react";
import { variables } from "../Variables";
const data = JSON.parse(localStorage.getItem("authTokens"));

export class UsersManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userss: [],
      modalTitle: "",
      Username: "",
      
      Password: "",
      
      
      formErrors: {Username: '', Password: ''},
      UsernameValid: false,
      PasswordValid: false,
      formValid: false,
      
      UsersID: 0,

      UsersIDFilter: "",
      UsernameFilter: "",
      PasswordFilter: "",
      UserrWithoutFilter: [],
    };
  }

  FilterFn() {
    var UsersIDFilter = this.state.UsersIDFilter;
    var UsernameFilter = this.state.UsernameFilter;
    var PasswordFilter = this.state.PasswordFilter;

    var filteredData = this.state.UserrWithoutFilter.filter(function (el) {
      return (
        el.UsersID.toString()
          .toLowerCase()
          .includes(UsersIDFilter.toString().trim().toLowerCase()) &&
        el.Username.toString()
          .toLowerCase()
          .includes(UsernameFilter.toString().trim().toLowerCase()) &&
        el.Password.toString()
          .toLowerCase()
          .includes(PasswordFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ userss: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.UserrWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ userss: sortedData });
  }

  changeUsersIDFilter = (e) => {
    this.setState();
    this.state.UsersIDFilter = e.target.value;
    this.FilterFn();
  };
  changeUsernameFilter = (e) => {
    this.state.UsernameFilter = e.target.value;
    this.FilterFn();
  };
  changePasswordFilter = (e) => {
    this.state.PasswordFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch(variables.API_URL + "api/UserView/", {
      method: "GET",
      headers: {
        Authorization: "Bearer" + " " + (JSON.parse(localStorage.getItem("authTokens")))["access"], 
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userss: data, UserrWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeUsername = (e) => {
    this.setState({ Username: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ Password: e.target.value });
  };

  addClick() {
      this.setState({
        modalTitle: "Add User",
        UsersID: 0,
        Username: "",
        Password: "",
      });
  }
  editClick(dep) {
    this.setState({
      modalTitle: "Edit User",
      UsersID: dep.UsersID,
      Username: dep.Username,
      Password: dep.Password,
    });
  }

  createClick() {

      fetch(variables.API_URL + "api/UserView/", {
        method: "POST",
        headers: {
          Authorization: "Bearer" + " " + (JSON.parse(localStorage.getItem("authTokens")))["access"],
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: this.state.Username,
          Password: this.state.Password,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("\nOne or more fields may be incorrect refer to red text");
          }
        );
    
  }

  updateClick() {
    fetch(variables.API_URL + "api/UserView/", {
      method: "PUT",
      headers: {
        Authorization: "Bearer" + " " + (JSON.parse(localStorage.getItem("authTokens")))["access"],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UsersID: this.state.UsersID,
        Username: this.state.Username,
        Password: this.state.Password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("\nOne or more fields may be incorrect refer to red text");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch(variables.API_URL + "Users/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer" + " " + (JSON.parse(localStorage.getItem("authTokens")))["access"],
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("This field is already deleted");
          }
        );
    }
  }

  render() {
    const { userss, modalTitle, UsersID, Username, Password } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-light btn-outline-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
          
        >
          Add User
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeUsersIDFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("UsersID", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                      color="LightGreen"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("UsersID", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                      color="LightGreen"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                UsersID
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeUsernameFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Username", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                      color="LightGreen"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Username", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                      color="LightGreen"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Username
              </th>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeDepartmentNameFilter}
                    placeholder="Filter"
                  />

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Password", true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-down-square-fill"
                      viewBox="0 0 16 16"
                      color="LightGreen"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => this.sortResult("Password", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-square-fill"
                      viewBox="0 0 16 16"
                      color="LightGreen"
                    >
                      <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </button>
                </div>
                Password
              </th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {userss.map((dep) => (
              <tr key={dep.UsersID}>
                <td key={dep.UsersID}>{dep.UsersID}</td>
                <td key={dep.Username}>{dep.Username}</td>
                <td key={dep.Password}>{dep.Password}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(dep)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                      color="green"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(dep.UsersID)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                      color="red"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <fo
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Username</span>
                  <input
                    type="text"
                    required
                    id = 'TxtUser'
                    className="form-control"
                    value={Username}
                    onChange={this.changeUsername}
                  />
                </div>
                <header>

                  <p>
                    {Username.length >= 12
                      ? "Username cannot be longer than 12 characters"
                      : ""}
                  </p>
                  <p>
                    {Username.length === 0
                      ? "This field can not be left blank"
                      : ""}
                  </p>
                  <p>
                    {Username.includes("+") ||
                    Username.includes("-") ||
                    Username.includes("%") ||
                    Username.includes("/") ||
                    Username.includes("=")
                      ? "Cannont Contain Invalid Special Characters  '+ - % / ='"
                      : ""}
                  </p>
                </header>

                <div className="input-group mb-3">
                  <span className="input-group-text">Password</span>
                  <input
                    type="text"
                    className="form-control"
                    value={Password}
                    onChange={this.changePassword}
                    
                  />
                </div>
                <header>
                <p>
                    {Password.length === 0
                      ? "This field can not be left blank"
                      : ""}
                  </p>
                  <p>
                    {Password.length >= 15
                      ? "Password cannot be longer than 15 characters"
                      : ""}
                  </p>
                </header>

                {UsersID === 0 ? (
                  <button
                    type="button"
                    className="btn btn-light btn-outline-primary float-start"
                    onClick={() => 
                    Username.length >= 12 
                    || Username.includes("+") 
                    || Username.includes("-") 
                    || Username.includes("%") 
                    || Username.includes("/") 
                    || Username.includes("=")
                    || Password.length >= 15
                    || Password.length === 0
                    || Username.length === 0
                        ? alert('Please Refer to Red Text')
                        : this.createClick()}
                  >
                    Create
                  </button>
                ) : null}

                {UsersID !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-light btn-outline-primary float-start"
                    onClick={() => 
                        Username.length >= 12 
                        || Username.includes("+") 
                        || Username.includes("-") 
                        || Username.includes("%") 
                        || Username.includes("/") 
                        || Username.includes("=")
                        || Password.length >= 15
                        || Password.length === 0
                        || Username.length === 0
                            ? alert('Please Refer to Red Text')
                        : this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </fo>
      </div>
    );
  }
}
