import clientPromise from "../../lib/mongo/index";
import { ObjectId } from "mongodb";
import songs from './csv/data.json'

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
        const user_favourites = users
            .filter((user) => user.favSongId.length > 0)
            .map((user) => {
                const favSongName = user.favSongId.map((songId) => {
                    const song = songs.find((s) => s.iindex === songId);
                    return song ? song.name : "";
            });

                return {
                    id: user._id,
                    favourites: favSongName,
                };
            });
            console.log("1 ");
            console.log(user_favourites);

        const findBuddyResponse = await fetch('http://127.0.0.1:5000/findBuddy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentUserId, user_favourites }),
        });

        const findBuddy = await findBuddyResponse.json();
        console.log(findBuddy);
        return res.json(findBuddy);
    } catch (err) {
        console.log(err);
        return res.json(err);
    }

    //     return res.json({ currentUserId: currentUserId, user_favourites });
    // } catch (err) {
    //     console.log(err);
    //     return res.json(err);
    // }
};
