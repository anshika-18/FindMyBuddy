import clientPromise from "../../../lib/mongo/index";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

export default async (req, res) => {
  try {
    console.log("here create");
    const senderId = new ObjectId(req.body.senderId);
    const recieverId = new ObjectId(req.body.recieverId);
    const client = await clientPromise;
    const db = client.db("users");
    const check = await db
      .collection("rooms")
      .find({
        participants: [senderId, recieverId],
      })
      .toArray();
    const check1 = await db
      .collection("rooms")
      .find({
        participants: [recieverId, senderId],
      })
      .toArray();
    if (check.length != 0 || check1.length != 0) {
      if (check1.length != 0) {
        return res.json({ roomId: check1[0].roomId });
      }
      return res.json({ roomId: check[0].roomId });
    } else {
      const roomId = uuid();
      console.log("dfou", check[0]);
      const data = await db.collection("rooms").insertOne({
        roomId,
        participants: [senderId, recieverId],
      });

      return res.json({ roomId });
    }
  } catch (err) {
    return res.json(err);
  }
};
