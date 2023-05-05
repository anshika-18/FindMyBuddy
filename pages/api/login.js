import clientPromise from "../../lib/mongo/index";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

export default async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res.json({ error: "Please enter all fields" });
    const email = req.body.email;
    let password = req.body.password;
    const client = await clientPromise;
    const db = client.db("users");
    const users = await db.collection("users").find({ email: email }).toArray();
    if (users.length == 0) return res.json({ error: "User not found" });
    else {
      console.log(users[0]);
      const isMatch = await bcrypt.compare(password, users[0].password);
      //console.log(isMatch);
      if (!isMatch) {
        return res.json({ error: "Invalid Credentials" });
      } else {
        await jwt.sign(
          { id: users[0]._id },
          process.env.jwtSecret,

          (err, token) => {
            if (err) throw err;
            return res.json({
              token,
              email: users[0].email,
              password: users[0].password,
            });
          }
        );
        // return res.status(200).json(users[0]);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
