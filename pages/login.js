import axios from "axios";
import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const req = {
      email,
      password,
    };
    console.log(req);
    const data = await axios.post("/api/login", req);
    console.log(data);
  };

  const handleChangeEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="signin">
          <h2>Login</h2>
          <div className="inputBox">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                handleChangeEmail(e);
              }}
              required="required"></input>
            <i class="fa-regular fa-envelope"></i>
            <span>Email</span>
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                handleChangePassword(e);
              }}
              required="required"></input>
            <i class="fa-solid fa-lock"></i>
            <span>password</span>
          </div>
          <div className="inputBox">
            <button
              className="submit"
              onClick={() => {
                login();
              }}>
              Login
            </button>
          </div>
          <p>Already a member ? </p>
        </div>
      </div>
    </div>
  );
}
