import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
  try {
    if (!req.body.userId) {
      return res.status(300).json({ error: "Something went wrong" });
    }
    const userId = new ObjectId(req.body.userId);

    const client = await clientPromise;
    const db = client.db("users");
    const users = await db.collection("users").find({ _id: userId }).toArray();
    if (users.length == 0) return res.json({ error: "User not found" });
    else {
      return res.json(users[0].favSongId);
    }
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
