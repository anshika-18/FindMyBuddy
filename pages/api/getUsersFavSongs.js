import clientPromise from "../../lib/mongo/index";
import { ObjectId } from "mongodb";
import songs from "./csv/data.json";
import axios from "axios";

export default async (req, res) => {
  try {
    const currentUserId = new ObjectId(req.body.currentUserId);

    const client = await clientPromise;
    const db = client.db("users");

    const users = await db.collection("users").find().toArray();
    // console.log(users.length);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // Map over the users array and create a new array with their favorite songs
    const user_favourites = await users
      .filter((user) => user.favSongId.length > 0)
      .map((user) => {
        const favSongName = user.favSongId.map((songId) => {
          const song = songs.find((s) => s.index === songId);
          return song ? song.title : "";
        });

        return {
          id: user._id,
          favourites: favSongName,
        };
      });

    const findBuddy = await axios.post(
      "https://model-for-finding-buddy-rashigupta01.vercel.app/findBuddy",
      {
        currentUserId,
        user_favourites,
      }
    );

    const data = [];
    for (var user = 0; user < findBuddy.data.length; user++) {
      const curr = await db
        .collection("users")
        .find({ _id: new ObjectId(findBuddy.data[user].username) })
        .toArray();
      // console.log(data);
      console.log(curr);
      data.push({
        userId: curr[0]._id,
        name: curr[0].name,
      });
    }
    return res.json({ data: data });
  } catch (err) {
    return res.json(err);
  }
};
