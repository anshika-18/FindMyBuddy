import { Server } from "socket.io";

export default async (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect", (socket) => {
      socket.emit("get:peerId");

      socket.on("send-message", (data) => {
        console.log("send message");
        socket.broadcast.emit("recieve-message", data);
      });

      socket.on("join-room", (roomId) => {
        console.log("ok");
        socket.join(roomId);
      });

      socket.on("disconnect", () => {});
    });
  }
  res.end();
};
