import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import io from "socket.io-client";
import { useParams, useRef } from "react-router-dom";

export default function Chat() {
  const { roomId } = useParams();
  const socketInstance = useRef();
  const { auth, setAuth } = useState(true);
  const [roomname, setroomName] = useState("");
  const [count, setCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const [showJoin, setShowJoin] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");

  const create = (e) => {
    e.preventDefault();
    const id = uuid();
    const data = {
      roomname,
      name,
      email,
      roomId: id,
    };
    //create chat room
    axios
      .post("http://localhost:3000/api/chat/createRoom", data)
      .then((res) => {
        const nw = {
          userId,
          roomId: id,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!socketInstance.current) {
      socketInstance.current = io("http://localhost:3000/api/socket");
      socketInstance.emit("join-room", roomId);
    }
    setName(localStorage.getItem)("name");
    create();
  }, []);

  return (
    <div>
      {login ? (
        <div className="root-chat">
          <div className="team-head">Teams</div>
          <div className="all-rooms">
            <div className="team-list">
              {room.map((r) => (
                <Link
                  key={r.roomId}
                  to={{
                    pathname: "/chat/" + r.roomId,
                    key: roomId,
                    socketInstance: socketInstance.current,
                    roomName: r.name,
                    login: login,
                    setCount: setCount,
                  }}>
                  <div>{r.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>igdfiuwguiv</div>
      )}
    </div>
  );
}
