import clientPromise from "../../../lib/mongo/index";
export default async (req, res) => {
  try {
    const { roomId } = req.body;
    const client = await clientPromise;
    const db = client.db("users");
    const data = await db.collection("messages").find({ roomId }).toArray();
    //console.log(data);
    if (data.length != 0) {
      return res.json(data[0]);
    } else {
      const insert = await db
        .collection("messages")
        .insertOne({ roomId, messages: [] });
      return res.json({ roomId, messages: [] });
    }
  } catch (err) {
    return res.json(err);
  }
};
