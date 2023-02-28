import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../App.css";
import ParticlesBackground from "../components/ParticlesBackground";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBInput,
// } from "mdb-react-ui-kit";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="login">
      <ParticlesBackground />
      {/* <form onSubmit={loginUser} >
                <input type="text" name="username" placeholder="Enter Username" class="btn btn-outline-primary" id="floatingInputValue"/>
                <input type="password" name="password" placeholder="Enter Password" class="btn btn-outline-primary"/>
                <input type="submit" value='Log in' class="btn btn-outline-success" />
            </form> */}
      <form onSubmit={loginUser}>
        <header>
          <h2>Sign In</h2>
        </header>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="floatingInputValue"
            name="username"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="mb-3">
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-outline-success" value="Log in">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
