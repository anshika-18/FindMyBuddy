import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const userId = new ObjectId(req.body.userId);

        const client = await clientPromise;
        const db = client.db("users");
        const result = await db.collection("users").deleteOne({ _id: userId });

        console.log(result)

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
