import clientPromise from "../../lib/mongo/index";
import { Pyodide } from "pyodide";

export default async (req, res) => {
  try {
    const pyodide = await Pyodide.load();
    const script = `
        def my_function(x, y):
          return x + y
      `;
    await pyodide.runPython(script);
    const result = await pyodide.globals.my_function(2, 3);
    console.log(result);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.json("error");
  }
};
