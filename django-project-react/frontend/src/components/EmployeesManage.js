import React, { Component } from "react";
import { variables } from "../Variables.js";
const data = JSON.parse(localStorage.getItem("authTokens"));
export class EmployeesManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skilllevels: [],
      employeess: [],
      userss: [],
      modalTitle: "",
      EmployeesID: 0,
      First_Name: "",
      Last_Name: "",
      Skill_Level: "",
      Active: "",
      Email: "",
      Age: "",
      DOB: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "api/EmployeeView/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer" +
          " " +
          JSON.parse(localStorage.getItem("authTokens"))["access"],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ employeess: data });
      });

    fetch(variables.API_URL + "api/SkillLevelView/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer" +
          " " +
          JSON.parse(localStorage.getItem("authTokens"))["access"],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ skilllevels: data });
      });
    fetch(variables.API_URL + "api/UserView/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer" +
          " " +
          JSON.parse(localStorage.getItem("authTokens"))["access"],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userss: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeEmployeesID = (e) => {
    this.setState({ EmployeesID: e.target.value });
  };

  changeFirst_Name = (e) => {
    this.setState({ First_Name: e.target.value });
  };
  changeLast_Name = (e) => {
    this.setState({ Last_Name: e.target.value });
  };
  changeDOB = (e) => {
    this.setState({ DOB: e.target.value });
  };
  changeEmail = (e) => {
    this.setState({ Email: e.target.value });
  };
  changeSkill_Level = (e) => {
    this.setState({ Skill_Level: e.target.value });
  };
  changeActive = (e) => {
    this.setState({ Active: e.target.value });
  };
  changeAge = (e) => {
    this.setState({ Age: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Employee",
      EmployeesID: 0,
      First_Name: "",
      Last_Name: "",
      Skill_Level: "",
      Active: "",
      Email: "",
      Age: "",
      DOB: "",
    });
  }
  editClick(emp) {
    this.setState({
      modalTitle: "Edit Employee",
      EmployeesID: emp.EmployeesID,
      First_Name: emp.First_Name,
      Last_Name: emp.Last_Name,
      DOB: emp.DOB,
      Email: emp.Email,
      Skill_Level: emp.Skill_Level,
      Active: emp.Active,
      Age: emp.Age,
    });
  }

  createClick() {
    fetch(variables.API_URL + "/api/EmployeeView/", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer" +
          " " +
          JSON.parse(localStorage.getItem("authTokens"))["access"],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeesID: this.state.EmployeesID,
        First_Name: this.state.First_Name,
        Last_Name: this.state.Last_Name,
        DOB: this.state.DOB,
        Email: this.state.Email,
        Skill_Level: this.state.Skill_Level,
        Active: this.state.Active,
        Age: this.state.Age,
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
    fetch(variables.API_URL + "api/EmployeeView/", {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer" +
          " " +
          JSON.parse(localStorage.getItem("authTokens"))["access"],
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        EmployeesID: this.state.EmployeesID,
        First_Name: this.state.First_Name,
        Last_Name: this.state.Last_Name,
        DOB: this.state.DOB,
        Email: this.state.Email,
        Skill_Level: this.state.Skill_Level,
        Active: this.state.Active,
        Age: this.state.Age,
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
      fetch(variables.API_URL + "/api/EmployeeView/" + id, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer" +
            " " +
            JSON.parse(localStorage.getItem("authTokens"))["access"],
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
    const {
      skilllevels,
      employeess,
      modalTitle,
      userss,
      EmployeesID,
      First_Name,
      Last_Name,
      DOB,
      Email,
      Skill_Level,
      Active,
      Age,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-light btn-outline-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#employeeModal"
          onClick={() => this.addClick()}
        >
          Add Employee
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>EmployeesID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Skill Level</th>
              <th>Active</th>
              <th>Age</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {employeess.map((emp) => (
              <tr key={emp.EmployeesID}>
                <td key={emp.EmployeesID}>{emp.EmployeesID}</td>
                <td key={emp.First_Name}>{emp.First_Name}</td>
                <td key={emp.Last_Name}>{emp.Last_Name}</td>
                <td key={emp.DOB}>{emp.DOB}</td>
                <td key={emp.Email}>{emp.Email}</td>
                <td key={emp.Skill_Level}>{emp.Skill_Level === 1
                              ? "Graduate"
                              : emp.Skill_Level === 2
                              ? "Junior"
                              : emp.Skill_Level === 3
                              ? "Mid"
                              : emp.Skill_Level === 4
                              ? "Senior"
                              : emp.Skill_Level === 5
                              ? "Manager"
                              : emp.Skill_Level === 6
                              ? "Executive"
                              : emp.Skill_Level}</td>
                <td key={emp.Active}>
                  {emp.Active.toString() === "true" ? (
                    <td>{"🟢"}</td>
                  ) : (
                    <td>{"🔴"}</td>
                  )}
                </td>
                <td key={emp.Age}>{emp.Age}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#employeeModal"
                    onClick={() => this.editClick(emp)}
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
                    onClick={() => this.deleteClick(emp.EmployeesID)}
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

        <div
          className="modal fade"
          id="employeeModal"
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
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">User/Employee ID</span>
                      <select
                        className="form-select"
                        onChange={this.changeEmployeesID}
                        value={EmployeesID}
                      >
                        {userss.map((dep) => (
                          <option key={dep.UsersID}>{dep.UsersID}</option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">First Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={First_Name}
                        onChange={this.changeFirst_Name}
                      />
                    </div>
                    <header>
                      <p>
                        {First_Name.length >= 12
                          ? "First Name cannot be longer than 12 characters"
                          : ""}
                      </p>
                      <p>
                        {First_Name.length === 0
                          ? "This field can not be left blank"
                          : ""}
                      </p>
                      <p>
                        {First_Name.includes("+") ||
                        First_Name.includes("-") ||
                        First_Name.includes("%") ||
                        First_Name.includes("/") ||
                        First_Name.includes("=")
                          ? "Cannont Contain Invalid Special Characters  '+ - % / ='"
                          : ""}
                      </p>
                    </header>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Last Name</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Last_Name}
                        onChange={this.changeLast_Name}
                      />
                    </div>
                    <header>
                      <p>
                        {Last_Name.length >= 15
                          ? "Last Name cannot be longer than 15 characters"
                          : ""}
                      </p>
                      <p>
                        {Last_Name.length === 0
                          ? "This field can not be left blank"
                          : ""}
                      </p>
                      <p>
                        {Last_Name.includes("+") ||
                        Last_Name.includes("-") ||
                        Last_Name.includes("%") ||
                        Last_Name.includes("/") ||
                        Last_Name.includes("=")
                          ? "Cannont Contain Invalid Special Characters  '+ - % / ='"
                          : ""}
                      </p>
                    </header>
                    <div className="input-group mb-3">
                      <span className="input-group-text">DOB</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DOB}
                        onChange={this.changeDOB}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Email}
                        onChange={this.changeEmail}
                      />
                    </div>
                    <header>
                      <p>
                        {Email.length === 0
                          ? "This field can not be left blank"
                          : ""}
                      </p>
                      <p>
                        {Email.includes("@") && Email.includes(".")
                          ? " "
                          : "Email must include an '@ and .' example : john123@gmail.com'"}
                      </p>
                    </header>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Skill Level</span>
                      <select
                        className="form-select"
                        onChange={this.changeSkill_Level}
                        value={Skill_Level}
                      >
                        {skilllevels.map((dep) => (
                          <option
                            key={dep.Skill_LevelId}
                            value={dep.Skill_Level_ID}
                          >
                            {dep.Skill_Level_ID === 1
                              ? "Graduate"
                              : dep.Skill_Level_ID === 2
                              ? "Junior"
                              : dep.Skill_Level_ID === 3
                              ? "Mid"
                              : dep.Skill_Level_ID === 4
                              ? "Senior"
                              : dep.Skill_Level_ID === 5
                              ? "Manager"
                              : dep.Skill_Level_ID === 6
                              ? "Executive"
                              : dep.Skill_Level_ID}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Active</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Active}
                        onChange={this.changeActive}
                        placeholder={"true/false"}
                      />
                    </div>
                    <header>
                      <p>
                        {Active.length === 0
                          ? "This field can not be left blank"
                          : ""}
                      </p>
                      <p>
                        {Active === "true" ||
                        Active === "True" ||
                        Active === "false" ||
                        Active === "False"
                          ? " "
                          : "Please type 'true' or 'false'"}
                      </p>
                    </header>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Age</span>
                      <input
                        type="number"
                        className="form-control"
                        value={Age}
                        onChange={this.changeAge}
                      />
                    </div>
                    <header>
                      <p>
                        {Age.length === 0
                          ? "This field can not be left blank"
                          : ""}
                      </p>
                      <p>
                        {Age <= 15
                          ? " Employees can not be under the age of 16"
                          : ""}
                      </p>
                    </header>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-light btn-outline-primary float-start"
                  onClick={() =>
                    Age <= 15 ||
                    First_Name.length >= 12 ||
                    First_Name.includes("+") ||
                    First_Name.includes("-") ||
                    First_Name.includes("%") ||
                    First_Name.includes("/") ||
                    First_Name.includes("=") ||
                    Last_Name.length >= 15 ||
                    (Active === "true" ||
                    Active === "True" ||
                    Active === "false" ||
                    Active === "False"
                      ? false
                      : true) ||
                    (Email.includes("@") && Email.includes(".")
                      ? false
                      : true) ||
                    Last_Name.includes("+") ||
                    Last_Name.includes("-") ||
                    Last_Name.includes("%") ||
                    Last_Name.includes("/") ||
                    Last_Name.includes("=") ||
                    Last_Name.length === 0 ||
                    First_Name.length === 0 ||
                    Age.length === 0 ||
                    Email.length === 0 ||
                    Active.length === 0
                      ? alert("Please Refer to Red Text")
                      : this.createClick()
                  }
                >
                  Create
                </button>

                <button
                  type="button"
                  className="btn btn-light btn-outline-primary float-start"
                  onClick={() =>
                    Age <= 15 ||
                    First_Name.length >= 12 ||
                    First_Name.includes("+") ||
                    First_Name.includes("-") ||
                    First_Name.includes("%") ||
                    First_Name.includes("/") ||
                    First_Name.includes("=") ||
                    Last_Name.length >= 15 ||
                    (Active === "true" ||
                    Active === "True" ||
                    Active === "false" ||
                    Active === "False"
                      ? false
                      : true) ||
                    (Email.includes("@") && Email.includes(".")
                      ? false
                      : true) ||
                    Last_Name.includes("+") ||
                    Last_Name.includes("-") ||
                    Last_Name.includes("%") ||
                    Last_Name.includes("/") ||
                    Last_Name.includes("=") ||
                    Last_Name.length === 0 ||
                    First_Name.length === 0 ||
                    Age.length === 0 ||
                    Email.length === 0 ||
                    Active.length === 0
                      ? alert("Please Refer to Red Text")
                      : this.updateClick()
                  }
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
