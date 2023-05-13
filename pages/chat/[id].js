import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Style from "./chat.module.scss";
import io from "socket.io-client";

import { useRouter } from "next/router";

export default function ParticularRoom(props) {
  const [storedMessages, setStoredMessages] = useState([]);
  const router = useRouter();
  const socketInstance = useRef(router.socketInstance);
  const [message, setMessage] = useState();
  const [participants, setParticipants] = useState([]);
  const [senderId, setSenderId] = useState("");
  //  const recieverId = props.recieverId;
  const recieverId = props.recieverId;
  const recieverName = props.recieverName;
  const [roomId, setRoomId] = useState("");
  console.log(props);

  useEffect(() => {
    setSenderId(window.localStorage.getItem("userId"));
  }, []);
  const create = () => {
    const data = {
      senderId: window.localStorage.getItem("userId"),
      recieverId,
    };
    console.log("data of receiver id and sender id ", data);
    //create chat room
    axios
      .post("/api/chat/createRoom", data)
      .then((res) => {
        console.log("create room", res.data);
        //console.log()
        //console.log("oiegfioge", res);
        setRoomId(res.data.roomId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const initialise = async () => {
    await fetch("/api/socket");
  };
  useEffect(() => {
    // setSenderId(localStorage.getItem("userId"));

    initialise();
    create();
    if (!socketInstance.current) {
      socketInstance.current = io();
      console.log(socketInstance);
      socketInstance.current.emit("join-room", roomId);
    }
  }, [props]);
  // fetch history of messages and room details
  useEffect(() => {
    //fetch details of all the messages of the room
    if (roomId != "") {
      console.log("room id all mess", roomId);
      axios.post("/api/chat/allMessage/", { roomId }).then((data) => {
        console.log(data.data.messages);
        if (data.data) {
          setStoredMessages(data.data.messages);
        }
      });
      //fetch details of all the participants of the room
      axios
        .post(`/api/chat/roomDetails`, { roomId })
        .then((data) => {
          setParticipants(data.data.participants);
          //console.log(data.data.participants);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [roomId]);

  //recieve message
  useEffect(() => {
    socketInstance.current
      ?.off("recieve-message")
      .on("recieve-message", (data) => {
        console.log("recieve");
        console.log(roomId);
        console.log(data.roomId);
        if (roomId === data.roomId) {
          const outer = document.getElementById(roomId);
          if (outer) {
            const newDiv = document.createElement("div");
            newDiv.className = Style.newMsg;
            const msgBox = document.createElement("div");
            msgBox.className = Style.receiverMsg;
            const messDiv = document.createElement("div");
            messDiv.textContent = data.message;
            messDiv.className = Style.mess;
            newDiv.appendChild(msgBox);
            msgBox.appendChild(messDiv);
            outer.appendChild(newDiv);
          }
          const shouldScroll =
            outer.scrollTop + outer.clientHeight === outer.scrollHeight;
          if (!shouldScroll) {
            outer.scrollTop = outer.scrollHeight;
          }
        }
      });
  });

  const [senderName, setSenderName] = useState();

  useEffect(() => {
    setSenderName(window.localStorage.getItem("name"));
  }, []);

  //send messsage
  const sendMess = (e) => {
    e.preventDefault();
    //socket emit
    const data = {
      roomId,
      message,
      senderId,
      senderName: senderName,
    };
    //console.log(data);
    //console.log("before");
    socketInstance.current.emit("send-message", data);
    //console.log("after");
    //post req
    axios
      .post("/api/chat/newMessage", data)
      .then((user) => {
        //console.log("mess", message);
        const outer = document.getElementById(roomId);
        if (outer) {
          const newDiv = document.createElement("div");
          newDiv.className = Style.newMsg;
          const senderBox = document.createElement("div");
          senderBox.className = Style.senderMsg;
          const msgBox = document.createElement("div");
          msgBox.className = Style.msgBubble;
          const messDiv = document.createElement("div");
          messDiv.textContent = message;
          messDiv.className = Style.mess;
          const msgAction = document.createElement("div");
          msgAction.className = Style.msgAction;
          const msgSpacer = document.createElement("div");
          msgSpacer.className = Style.msgSpacer;
          newDiv.appendChild(senderBox);
          senderBox.appendChild(msgBox);
          msgBox.appendChild(messDiv);
          senderBox.appendChild(msgAction);
          senderBox.appendChild(msgSpacer);
          outer.appendChild(newDiv);
        }
        const shouldScroll =
          outer.scrollTop + outer.clientHeight === outer.scrollHeight;
        if (!shouldScroll) {
          outer.scrollTop = outer.scrollHeight;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //display
    setMessage("");
  };

  const block = () => {
    console.log("leave");
    const data = {
      roomId,
      email,
    };
    console.log(data);
    axios
      .put("/rooms/leave", data)
      .then((success) => {
        console.log("success");
        alert("room Left sucessfully. Reload the page..!");
        //props.setCount(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const msgAreaRef = useRef(null);
  useEffect(() => {
    const scrollElement = msgAreaRef.current;
    scrollElement.scrollTop = scrollElement.scrollHeight;
  }, []);

  return (
    <div className={Style.room1Outer}>
      <div className={Style.chatHeader}>
        <div className={Style.userAvatar}>
          <div className={Style.avtar}>
            {recieverName && recieverName.charAt(0).toUpperCase()}
          </div>
        </div>
        <span className={Style.recieverName}>{recieverName}</span>
        {/* <div className={Style.buttonsChat}>
          <button
            variant="danger"
            onClick={() => block()}
            className={Style.leaveGroup}>
            Block
          </button>
        </div> */}
      </div>
      <div id={roomId} ref={msgAreaRef} className={Style.room1Mess}>
        {storedMessages &&
          storedMessages.map((x) => {
            return x.senderName === senderName ? (
              <div className={Style.newMsg}>
                <div className={Style.senderMsg}>
                  <div className={Style.msgBubble}>
                    <div className={Style.mess}>{x.message}</div>
                  </div>
                  <div className={Style.msgAction}></div>
                  <div className={Style.msgSpacer}></div>
                </div>
              </div>
            ) : (
              <div className={Style.newMsg}>
                <div className={Style.receiverMsg}>
                  <div className={Style.mess}>{x.message}</div>
                </div>
              </div>
            );
          })}
      </div>
      <form className={Style.room1Form}>
        <input
          className={Style.textInput}
          type="text"
          placeholder="Type message ..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}></input>
        <input
          className={Style.formButtonChat}
          type="submit"
          value="send"
          onClick={(e) => {
            sendMess(e);
          }}
        />
      </form>
    </div>
  );
}
