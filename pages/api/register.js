import clientPromise from "../../lib/mongo/index";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;

export default async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name)
      return res.status(200).json({ error: "Please enter all fields" });
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;
    const client = await clientPromise;
    const db = client.db("users");
    const user = await db.collection("users").find({ email: email }).toArray();
    if (user.length != 0)
      return res.status(200).json({ error: "User already exist" });

    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return next(err);
        password = hash;
        const data = await db.collection("users").insertOne({
          email: email,
          password: password,
          name: name,
          favSongId: [],
        });
        if (data.acknowledged == false)
          return res.status(200).json({ error: "User not found" });
        console.log(data);

        jwt.sign(
          { userId: data.insertedId },
          process.env.jwtSecret,
          (err, token) => {
            if (err) throw err;
            return res.json({
              insert: data.acknowledged,
              token,
              user: {
                userId: data.insertedId,
                email: email,
                name: name,
              },
            });
          }
        );
      });
    });

    //return res.status(200).json({ insert: data.acknowledged });
  } catch (err) {
    console.log(err);
  }
};
