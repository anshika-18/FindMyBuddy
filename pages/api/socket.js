import { Server } from "socket.io";
import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
  console.log("hii");
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect", (socket) => {
      //console.log("hmmm");
      socket.emit("get:peerId");

      // socket.on("send:peerId", async (peerId) => {
      //   try {
      //     const client = await clientPromise;
      //     const db = client.db("users");
      //     const data = await db.collection("mapPeerWithSocket").insertOne({
      //       socketId: socket.id,
      //       peerId: peerId,
      //     });
      //   } catch (err) {
      //     return res.json(err);
      //   }
      // });

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
