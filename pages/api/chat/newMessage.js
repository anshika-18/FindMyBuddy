import { ObjectId } from "mongodb";
import { abort } from "process";
import clientPromise from "../../../lib/mongo/index";

export default async (req, res) => {
  try {
    //console.log(req.body);
    console.log("roomId", req.body.roomId);
    if (!req.body.senderId || !req.body.roomId || !req.body.message) {
      return res.status(300).json({ error: "Something went wrong" });
    }
    const senderId = new ObjectId(req.body.senderId);
    const roomId = req.body.roomId;
    const message = req.body.message;
    const senderName = req.body.senderName;

    const client = await clientPromise;
    const db = client.db("users");
    const rooms = await db.collection("messages").find({ roomId }).toArray();
    console.log("rooms", rooms);
    if (rooms.length == 0) {
      const data = await db.collection("messages").insertOne({
        roomId,
        messages: [
          {
            senderId,
            senderName,
            message,
            timeStamp: new Date(),
          },
        ],
      });
      return res.json({ data });
    } else {
      const data = await db.collection("messages").updateOne(
        { roomId: roomId },
        {
          $push: {
            messages: {
              senderId,
              senderName,
              message,
              timeStamp: new Date(),
            },
          },
        }
      );
      //console.log(data);
      return res.json(data);
    }
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
