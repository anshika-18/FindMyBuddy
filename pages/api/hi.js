import clientPromise from "../../lib/mongo/index";
import { test } from "../ml/demo.py";
const { spawn } = require("child_process");

export default async (req, res) => {
  try {
    var pyPro = spawn("python", ["../ml/demo.py"]);
    pyPro.stdout.on("data", function (data) {
      res.send(data.toString());
    });
  } catch (err) {
    console.log(err);
  }
};
