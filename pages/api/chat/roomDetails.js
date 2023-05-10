import clientPromise from "../../../lib/mongo/index";
export default async (req, res) => {
  try {
    //console.log(req.body);
    const roomId = req.body.roomId;
    const client = await clientPromise;
    const db = client.db("users");
    const data = await db.collection("rooms").find({ roomId }).toArray();
    console.log(data);
    if (data.length != 0) {
      return res.json(data[0]);
    } else {
      return res.json({ error: "Something went wrong" });
    }
  } catch (err) {
    return res.json(err);
  }
};
