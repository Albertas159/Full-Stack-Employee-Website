import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import ParticlesBackground from "../components/ParticlesBackground";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);
  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };
  

  return (
    <div className="registration">
      <ParticlesBackground/>
       <form onSubmit={handleSubmit}>
        <header>
          <h2>Register</h2>
        </header>
        <div className="mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <header>
          <p>{username.length >= 12 ? "Username cannot be longer than 12 characters" : ""}</p>
          <p>{username.includes('+') || username.includes('-') || username.includes('%') || username.includes('/') || username.includes('=')    ? "Cannont Contain Invalid Special Characters  '+ - % / ='" : ""}</p>
          </header>
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <header>
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
          <p>{password.length >= 15 ? "Password cannot be longer than 15 characters" : ""}</p>
          </header>
          {/* <p>{password2.length >= 15 ? "Password cannot be longer than 15 characters" : ""}</p> */}
          
        </div>
        <div className="mb-3">
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-outline-success" value="Log in">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

      // {/* <form onSubmit={handleSubmit}>
      //   <h1>Register</h1>
      //   <hr />
      //   <div>
      //     <label htmlFor="username">Username</label>
      //     <input
      //       type="text"
      //       id="username"
      //       onChange={e => setUsername(e.target.value)}
      //       placeholder="Username"
      //       required
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="password">Password</label>
      //     <input
      //       type="password"
      //       id="password"
      //       onChange={e => setPassword(e.target.value)}
      //       placeholder="Password"
      //       required
      //     />
      //   </div>
      //   <div>
      //     <label htmlFor="confirm-password">Confirm Password</label>
      //     <input
      //       type="password"
      //       id="confirm-password"
      //       onChange={e => setPassword2(e.target.value)}
      //       placeholder="Confirm Password"
      //       required
      //     />
      //     <p>{password2 !== password ? "Passwords do not match" : ""}</p>
      //   </div>
      //   <button>Register</button>
      // </form>
      //  */}