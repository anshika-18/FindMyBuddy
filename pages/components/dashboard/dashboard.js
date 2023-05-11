import Style from "./dashboard.module.scss";
import axios from "axios";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import React, { useState } from "react";
import songs from "../../api/csv/data.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  // const { songs, setSongs } = useState([]);
  const [value, setValue] = useState("select");
  // var = "select";
  const logout = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("email");
    window.location.replace("/auth/login");
  };

  const addSong = async () => {
    // console.log(value);
    try {
      // console.log(value);
      if (value == "select") {
        // console.log("ig");
        toast.info("Please select a song name", {
          theme: "colored",
          closeButton: false,
        });
      } else {
        const input = {
          userId: window.localStorage.getItem("userId"),
          favSongId: value,
        };
        const data = axios.post("/api/addSong", input);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={Style.dashboard}>
      <div className={Style.containerDas}>
        <div className="row">
          <div className={Style.das1 + " " + "col-2"}>
            <div>FIND MY BUDDY</div>
            <button
              type="button"
              className={Style.btnSide + " " + "btn btn-outline-primary"}>
              Favourites
            </button>
            <button
              type="button"
              className={Style.btnSide + " " + "btn btn-primary"}>
              Find Buddy
            </button>
            <button
              type="button"
              className={Style.btnSide + " " + "btn btn-primary"}>
              Profile
            </button>
            <button
              type="button"
              class={Style.btnBottom + " " + "btn btn-outline-danger"}
              onClick={() => {
                logout();
              }}>
              LOGOUT
            </button>
          </div>
          <div className={Style.das2 + " " + "col-5 "}>
            <div>MY FAVOURITES</div>
            <div className={Style.addSong + " " + "row"}>
              <DropdownList
                dataKey="index"
                value={value}
                //sdefaultValue="Yellow"
                data={songs}
                textField="title"
                filter="contains"
                defaultValue="select"
                className={Style.dashboardDropDown + " " + ""}
                onSelect={(value) => setValue(value.index)}></DropdownList>
              <button
                className="btn btn-outline-success "
                onClick={() => {
                  addSong();
                }}>
                Add Song
              </button>
            </div>
            <ToastContainer></ToastContainer>
            <div className={Style.containerFav + " " + "container"}>
              <div className={Style.favRowHead + " " + "row"}>
                <div className="col-2">#</div>
                <div className="col-6">Title</div>
                <div className="col-4">Artist</div>
              </div>
              <div className={Style.myFavDiv}>
                <div className={Style.favRowMain + " " + "row"}>
                  <div className="col-2">1.</div>
                  <div className="col-6">Title</div>
                  <div className="col-4">Artist</div>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.das3 + " " + "col-5"}>
            <div>CHATS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
