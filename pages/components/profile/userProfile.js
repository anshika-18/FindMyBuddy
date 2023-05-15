import Style from "./userProfile.module.scss";
import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

export default function UserProfile() {
  // const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(async () => {
    setUserId(window.localStorage.getItem("userId"));
    setName(window.localStorage.getItem("name"));
    setEmail(window.localStorage.getItem("email"));
  }, []);

  // const update = async () => {
  //   const req = {
  //     userId,
  //     email,
  //     name,
  //   };
  //   console.log(req);
  //   const data = await axios.post("/api/updateUser", req);
  //   if (data.data.error)
  //     toast.error(data.data.error, { theme: "colored", closeButton: false });
  //   else {
  //     toast.success("Updated successfully", {
  //       theme: "colored",
  //       closeButton: false,
  //     });
  //     console.log(data);
  //     window.localStorage.setItem("userId", data.data.user.userId);
  //     window.localStorage.setItem("name", data.data.user.name);
  //     window.localStorage.setItem("email", data.data.user.email);
  //     window.location.replace("/profile");
  //   }
  //   console.log(data);
  // };


  // const handleChangeEmail = (e) => {
  //   console.log(e.target.value);
  //   setEmail(e.target.value);
  // };

  // const handleChangeName = (e) => {
  //   console.log(e.target.value);
  //   setName(e.target.value);
  // };

  const handleBackToDashboard = () => {
    window.location.replace("/dashboard");
  }

  return (
    <div className={Style.body}>
      <div
        className={
          Style.mainCard + " " + "col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12"
        }>
        <div className={Style.cardBody + " " + "card h-100"}>
          <div className="card-body">
            <div className={Style.userProfile}>
              <div className={Style.userAvatar}>
                <div className={Style.avtar}>
                  {name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h5 className={Style.userName}>{name}</h5>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 className={Style.heading + " " + "mb-2"}>Personal Details</h6>
            </div>
            <div
              className={
                Style.formBox +
                " " +
                "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-12"
              }>
              <div className="form-group">
                <label for="fullName">Full Name</label>
                <div className={Style.formControl + " " + "form-control"}>
                  {name}
                </div>
              </div>
            </div>
            <div
              className={
                Style.formBox +
                " " +
                "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-12"
              }>
              <div className="form-group">
                <label for="eMail">Email</label>
                <div className={Style.formControl + " " + "form-control"}>
                  {email}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              id="submit"
              name="submit"
              onClick={handleBackToDashboard}
              className="btn btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      {/* <div
        className={
          Style.mainCard +
          " " +
          "col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 update"
        }>
        <div className={Style.cardBody + " " + "card h-100"}>
          <div className="card-body">
            <div className={Style.userProfile}>
              <h5 className={Style.userName}>Update profile</h5>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 className={Style.heading + " " + "mb-2"}>Personal Details</h6>
            </div>
            <div
              className={
                Style.formBox +
                " " +
                "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-12"
              }>
              <div className="form-group">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  className={Style.formControl + " " + "form-control"}
                  id="fullName"
                  placeholder="Enter name" onChange={(e) => {
                    handleChangeName(e);
                  }}></input>
              </div>
            </div>
            <div
              className={
                Style.formBox +
                " " +
                "col-xl-12 col-lg-12 col-md-6 col-sm-6 col-12"
              }>
              <div className="form-group">
                <label for="eMail">Email</label>
                <input
                  type="email"
                  className={Style.formControl + " " + "form-control"}
                  id="eMail"
                  onChange={(e) => {
                    handleChangeEmail(e);
                  }}
                  placeholder="Enter email"></input>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              id="submit"
              name="submit"
              onClick={() => {
                update();
              }}
              className={Style.updateBtn + " " + "btn"}>
              Update
            </button>
          </div>
        </div>
      </div> */}
    </div >
  );
}
