import Style from "./userProfile.module.scss";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(async () => {
    setName(window.localStorage.getItem("name"));
    setEmail(window.localStorage.getItem("email"));
  }, []);
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
                <input
                  type="text"
                  className={Style.formControl + " " + "form-control"}
                  id="fullName"
                  placeholder={name}></input>
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
                  placeholder={email}></input>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              id="submit"
              name="submit"
              className={Style.updateBtn + " " + "btn"}>
              Update
            </button>
            <button
              type="button"
              id="submit"
              name="submit"
              className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
