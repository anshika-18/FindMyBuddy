import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userId")) {
      window.location.replace("/dashboard");
    }
  }, []);

  const register = async () => {
    const req = {
      email,
      password,
      name,
    };
    console.log(req);
    const data = await axios.post("/api/register", req);
    if (data.data.error)
      toast.error(data.data.error, { theme: "colored", closeButton: false });
    else {
      toast.success("Logged in successfully", {
        theme: "colored",
        closeButton: false,
      });
      console.log(data);
      window.localStorage.setItem("userId", data.data.user.userId);
      window.localStorage.setItem("name", data.data.user.name);
      window.localStorage.setItem("email", data.data.user.email);
      window.location.replace("/dashboard");
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
  const handleChangeName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  return (
    <div className="login-main">
      {auth ? (
        <></>
      ) : (
        <div className="login-container">
          <div className="signin">
            <h2>Register</h2>
            <div className="inputBox">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  handleChangeName(e);
                }}
                required="required"></input>
              <i class="fa-solid fa-user"></i>
              <span>Name</span>
            </div>
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
                  register();
                }}>
                Register
              </button>
            </div>
            <ToastContainer></ToastContainer>
            <p>
              Already a User ?{"  "}
              <Link href="/auth/login" className="link-A">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
