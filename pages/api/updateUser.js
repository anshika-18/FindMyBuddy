import clientPromise from "../../lib/mongo/index";

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const salt = 10;

export default async (req, res) => {
    try {
        const userId = req.body.userId;
        const name = req.body.name;
        const email = req.body.email;
        // let password = req.body.password;

        if (!userId)
            return res.status(400).json({ error: "Please provide a valid userId" });

        const client = await clientPromise;
        const db = client.db("users");
        const user = await db.collection("users").findOne({ _id: ObjectId(userId) });
        if (!user)
            return res.status(404).json({ error: "User not found" });

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        // if (password) {
        //   bcrypt.genSalt(salt, function (err, salt) {
        //     if (err) return next(err);
        //     bcrypt.hash(password, salt, async (err, hash) => {
        //       if (err) return next(err);
        //       updateData.password = hash;
        //       await db.collection("users").updateOne({ _id: ObjectId(userId) }, { $set: updateData });
        //       return res.json({ success: true });
        //     });
        //   });
        // } else {
        //   await db.collection("users").updateOne({ _id: ObjectId(userId) }, { $set: updateData });
        //   return res.json({ success: true });
        // }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
