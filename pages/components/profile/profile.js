import { useEffect, useState } from "react";
import Style from "./profile.module.scss";
import axios from "axios";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(async () => {
    setName(window.localStorage.getItem("name"));
    setEmail(window.localStorage.getItem("email"));
  }, []);
  return (
    <div className={Style.profileMain}>
      <div className={Style.profile1 + " " + "row"}>
        <div className={Style.profile11 + " " + "col-2"}>
          <img
            src="https://freesvg.org/img/abstract-user-flat-1.png"
            className={Style.user}></img>
        </div>
        <div className={Style.details + " " + "col-10"}>
          <div className={Style.name}>Hi, {name} </div>
        </div>
      </div>
      <div className={Style.profile2}>
        <div className={Style.profile2Head}>Details</div>
        <div className={Style.detail}>Name: {name} </div>
        <div className={Style.detail}>Email: {email} </div>
      </div>
    </div>
  );
}
