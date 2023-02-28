import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { NavLink } from "react-router-dom"
import "../App.css";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div className="App container">
                    <header>
            <h1>Management Company Inc. </h1>
            </header>
          <h3 className="d-flex justify-content-center m-3">
          </h3>

          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item- m-1">
                <NavLink
                  onClick={logoutUser}
                  className="btn btn-light btn-outline-danger"
                  to="/login"
                >
                  LogOut
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div className="App container">
                            <header>
            <h1>Management Company Inc. </h1>
            </header>
          <h3 className="d-flex justify-content-center m-3">
          </h3>

          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item- m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item- m-1">
                <NavLink
                  onClick={logoutUser}
                  className="btn btn-light btn-outline-success"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item- m-1">
                <NavLink
                  className="btn btn-light btn-outline-primary"
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
      
      <header>{user && <h3>Hello {user.username}</h3>}</header>
    </div>
  );
};

export default Header;
