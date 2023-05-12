import Style from "./dashboard.module.scss";
import axios from "axios";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import React, { useState, useEffect } from "react";
import songs from "../../api/csv/data.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  // const { songs, setSongs } = useState([]);
  const [value, setValue] = useState("select");
  const [favSongs, setFavSongs] = useState([]);
  // var = "select";

  useEffect(async () => {
    try {
      const data = {
        userId: window.localStorage.getItem("userId"),
      };
      const res1 = await axios.post("/api/getUserSongs", data);
      //console.log(res1.data);
      const res2 = await axios.post("/api/getSongsById", {
        songIds: res1.data,
      });
      //console.log(res2.data);
      setFavSongs(res2.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const logout = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("email");
    window.location.replace("/auth/login");
  };

  const removeSong = async (index) => {
    try {
      const data = {
        userId: window.localStorage.getItem("userId"),
        favSongId: index,
      };
      const res = await axios.post("/api/deleteSong", data);
      window.location.reload();
      toast.error("Song added successfully..!!", {
        theme: "colored",
        closeButton: false,
      });
    } catch (err) {
      console.log(err);
    }
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
        toast.success("Song added successfully..!!", {
          theme: "colored",
          closeButton: false,
        });
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
            <div className={Style.dasHead}>MY FAVOURITES</div>
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
                <div className="col-7">Title</div>
                <div className="col-4">Artist</div>
                <div className="col-1"></div>
              </div>
              <div className={Style.myFavDiv}>
                {favSongs.map((song) => {
                  return (
                    <div className={Style.favRowMain + " " + "row"}>
                      <div className="col-7">{song.title}</div>
                      <div className="col-4">{song.artist}</div>
                      <div className="col-1">
                        <button
                          className={Style.trash + " " + "btn"}
                          onClick={() => {
                            removeSong(song.index);
                          }}>
                          {" "}
                          <i class="fa-sharp fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
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