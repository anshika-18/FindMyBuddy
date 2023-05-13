import Style from "./dashboard.module.scss";
import axios from "axios";
import "react-widgets/styles.css";
import DropdownList from "react-widgets/DropdownList";
import React, { useState, useEffect } from "react";
import songs from "../../api/csv/data.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParticularRoom from "../../chat/[id]";
import { RotatingLines } from "react-loader-spinner";

export default function Dashboard() {
  // const { songs, setSongs } = useState([]);
  const [value, setValue] = useState("select");
  const [favSongs, setFavSongs] = useState([]);
  const [currentWindow, setCurrentWindow] = useState("favourites");
  const [buddy, setBuddy] = useState([]);
  // var = "select";
  const [auth, setAuth] = useState(false);
  const [recieverId, setRecieverId] = useState("");
  const [recieverName, setRecieverName] = useState("");

  useEffect(() => {
    if (!window.localStorage.getItem("userId")) {
      window.location.replace("/auth/login");
    }
    // setUserId(window.localStorage.getItem("userId"));
  }, []);

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
      const res3 = await axios.post("/api/getUsersFavSongs", {
        currentUserId: window.localStorage.getItem("userId"),
      });
      console.log(res3.data);
      setBuddy(res3.data.data);
      console.log(res2.data);
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

  const chat = (buddyId, buddyName) => {
    console.log(buddyId, buddyName);
    setRecieverId(buddyId);
    setRecieverName(buddyName);
  };

  const [senderName, setSenderName] = useState();

  useEffect(() => {
    setSenderName(window.localStorage.getItem("name"));
  }, []);

  const handleProfileCLick = () => {
    window.location.replace("/profile");
  }

  return (
    <div className={Style.dashboard}>
      {auth ? (
        <></>
      ) : (
        <div className={Style.containerDas}>
          <div className="row">
            <div className={Style.das1 + " " + "col-2"}>
              <div className={Style.brand}>FIND MY BUDDY</div>
              <button
                type="button"
                onClick={() => {
                  setCurrentWindow("favourites");
                }}
                className={Style.btnSide + " " + "btn"}>
                Favourites
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentWindow("buddy");
                }}
                className={Style.btnSide + " " + "btn"}>
                Find Buddy
              </button>
              <button
                type="button"
                className={Style.btnSide + " " + "btn"} onClick={handleProfileCLick}>
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
            {currentWindow == "favourites" ? (
              <div className={Style.das2 + " " + "col-5 "}>
                <h3>Hey, {senderName}</h3><br />
                <div className={Style.dasHead}>Select your Favourite songs</div>

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
                    className={Style.addBtn + " " + "btn"}
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
                    {favSongs.length == 0 ? (
                      <div className={Style.loader}>
                        <RotatingLines
                          strokeColor="grey"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="70"
                          visible={true}
                        />
                      </div>
                    ) : (
                      favSongs.map((song) => {
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
                      })
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className={Style.das2 + " " + "col-5 "}>
                <h3>Hey, {senderName}</h3><br />
                <div className={Style.dasHead}>Choose a friend to chat with</div>
                <ToastContainer></ToastContainer>
                <div className={Style.containerFav + " " + "container"}>
                  <div className={Style.favRowHead + " " + "row"}>
                    <div className="col-9">Buddy</div>

                    <div className="col-3">Chat</div>
                  </div>
                  <div className={Style.myFavDiv}>
                    {buddy.length == 0 ? (
                      <div className={Style.loader}>
                        <RotatingLines
                          strokeColor="grey"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="70"
                          visible={true}
                        />
                      </div>
                    ) : (
                      buddy.map((buddy) => {
                        return (
                          <div className={Style.favRowMain + " " + "row"}>
                            <div className="col-9">{buddy.name}</div>

                            <div className="col-3">
                              <button
                                className={Style.message + " " + "btn"}
                                onClick={() => {
                                  chat(buddy.userId, buddy.name);
                                }}>
                                {" "}
                                <i class="fa-solid fa-message"></i>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className={Style.das3 + " " + "col-5"}>

              {recieverId == "" ? (
                <>
                  <div className={Style.emptyChats}>
                    {/* <img src="/images/icons/chat_icon.png" /> */}
                    Select your buddy to chat</div>
                </>
              ) : (
                <div className="chat">
                  <ParticularRoom recieverId={recieverId} recieverName={recieverName}></ParticularRoom>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
