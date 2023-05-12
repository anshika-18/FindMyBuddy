import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userId")) {
      window.location.replace("/components/dashboard/dashboard");
    }
  }, []);
  const login = async () => {
    const req = {
      email,
      password,
    };
    // console.log(req);
    const data = await axios.post("/api/login", req);
    if (data.data.error)
      toast.error(data.data.error, { theme: "colored", closeButton: false });
    else {
      console.log(data);
      toast.success("Logged in successfully", {
        theme: "colored",
        closeButton: false,
      });
      window.localStorage.setItem("userId", data.data.userId);
      window.localStorage.setItem("name", data.data.name);
      window.localStorage.setItem("email", data.data.email);
      window.location.replace("/components/dashboard/dashboard");
    }
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
      {auth ? (
        <></>
      ) : (
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
              <Link href="/auth/register" className="link-A">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
