import clientPromise from "../../lib/mongo/index";

export default async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.json({ error: "Please enter all fields" });
    const email = req.body.email;
    const password = req.body.password;
    const client = await clientPromise;
    const db = client.db("users");

    const users = await db
      .collection("users")
      .find({ email: email, password: password })
      .toArray();

    if (users.length == 0) return res.json({ error: "User not found" });
    else return res.status(200).json(users[0]);
  } catch (err) {
    console.log(err);
  }
};
