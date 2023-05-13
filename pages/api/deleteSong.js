import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
  try {
    if (!req.body.userId || !req.body.favSongId) {
      return res.status(300).json({ error: "Something went wrong" });
    }
    const userId = new ObjectId(req.body.userId);
    const favSongId = req.body.favSongId;

    const client = await clientPromise;
    const db = client.db("users");
    const users = await db.collection("users").find({ _id: userId }).toArray();
    if (users.length == 0) return res.json({ error: "User not found" });
    else {
      console.log(users[0]);
      const data = await db
        .collection("users")
        .updateOne({ _id: userId }, { $pull: { favSongId: favSongId } });
      console.log(data);
      return res.json(data);
    }
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};
