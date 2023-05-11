import clientPromise from "../../lib/mongo/index";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        const currentUserId = new ObjectId(req.body.currentUserId);

        const client = await clientPromise;
        const db = client.db("users");

        const users = await db.collection("users").find().toArray();
        console.log(users.length);
        if (users.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        // Map over the users array and create a new array with their favorite songs
        const user_favourites = users.map((user) => {

            return {
                id: user._id,
                favourites: user.favSongId,
            };
        });

        return res.json({ currentUserId: currentUserId, user_favourites });
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
};
