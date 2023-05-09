const nodemailer = require("nodemailer");
const { Server } = require("socket.io");
import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connect", (socket) => {
    socket.emit("get:peerId");
    console.log("Connected");

    socket.on("send:peerId", (peerId) => {});
  });

  console.log("Setting up socket");
  res.end();
}
