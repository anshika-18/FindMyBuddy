import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.status(300).json({ error: "Please enter all fields" });
    const email = req.body.email;
    const password = req.body.password;
    const client = await clientPromise;
    const db = client.db("users");
    const user = await db.collection("users").find({ email: email }).toArray();
    if (user.length != 0)
      return res.status(404).json({ error: "User already exist" });
    const data = await db
      .collection("users")
      .insertOne({ email: email, password: password });
    if (data.acknowledged == false)
      return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ insert: data.acknowledged });
  } catch (err) {
    console.log(err);
  }
};
