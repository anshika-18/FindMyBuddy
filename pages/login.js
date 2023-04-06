import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (data.data.error)
      toast.error(data.data.error, { theme: "colored", closeButton: false });
    else
      toast.success("Logged in successfully", {
        theme: "colored",
        closeButton: false,
      });
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
          <ToastContainer></ToastContainer>
          <p>
            New User ?{"  "}
            <Link href="/register" className="link-A">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
