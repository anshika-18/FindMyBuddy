import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("users");
    const users = await db.collection("users").find({}).toArray();
    return res.json(users);
  } catch (err) {
    console.log(err);
  }
};
