import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import axios from "axios";
import Style from "./chat.module.scss"
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
    // console.log(data);
    //create chat room
    axios
      .post("http://localhost:3000/api/chat/createRoom", data)
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
      //console.log(socketInstance);
      socketInstance.current.emit("join-room", roomId);
    }
  }, []);
  // fetch history of messages and room details
  useEffect(() => {
    //fetch details of all the messages of the room
    if (roomId != "") {
      console.log("room id all mess", roomId);
      axios
        .post("http://localhost:3000/api/chat/allMessage/", { roomId })
        .then((data) => {
          console.log(data.data.messages);
          if (data.data) {
            setStoredMessages(data.data.messages);
          }
        });
      //fetch details of all the participants of the room
      axios
        .post(`http://localhost:3000/api/chat/roomDetails`, { roomId })
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
            newDiv.className = Style.receiverMsg;
            const nameDiv = document.createElement("div");
            nameDiv.textContent = data.senderName;
            nameDiv.className = Style.name;
            const messDiv = document.createElement("div");
            messDiv.textContent = data.message;
            messDiv.className = Style.mess
            newDiv.appendChild(nameDiv);
            newDiv.appendChild(messDiv);
            outer.appendChild(newDiv);
          }
        }
      });
  });

  const [senderName, setSenderName] = useState();

  useEffect(() => {
    setSenderName(window.localStorage.getItem("name"))
  }, [])

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
      .post("http://localhost:3000/api/chat/newMessage", data)
      .then((user) => {
        //console.log("mess", message);
        const outer = document.getElementById(roomId);
        if (outer) {
          const newDiv = document.createElement("div");
          newDiv.className = Style.senderMsg;
          const nameDiv = document.createElement("div");
          nameDiv.textContent = data.senderName;
          nameDiv.className = Style.name;
          const messDiv = document.createElement("div");
          messDiv.textContent = message;
          messDiv.className = Style.mess;
          newDiv.appendChild(nameDiv);
          newDiv.appendChild(messDiv);
          outer.appendChild(newDiv);
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
      .put("http://localhost:3000/rooms/leave", data)
      .then((success) => {
        console.log("success");
        alert("room Left sucessfully. Reload the page..!");
        //props.setCount(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className={Style.room1Outer}>
      <div className={Style.chatHeader}>
        <span className={Style.recieverName}>Username</span>
        {/* <div className={Style.buttonsChat}>
          <button
            variant="danger"
            onClick={() => block()}
            className={Style.leaveGroup}>
            Block
          </button>
        </div> */}
      </div>
      <div id={roomId} className={Style.room1Mess}>
        {storedMessages &&
          storedMessages.map((x) => {
            return (x.senderName === senderName ?
              <div className={Style.senderMSg}>
                <div className={Style.name}>me</div>
                <div className={Style.mess}>{x.message}</div>
              </div> :
              <div className={Style.receiverMsg}>
                <div className={Style.name}>{x.senderName}</div>
                <div className={Style.mess}>{x.message}</div>
              </div>)

          })
        }
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
          }} />
      </form>
    </div>
  );
}
