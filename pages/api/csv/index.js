var fs = require("fs");
const { parse } = require("csv-parse");

//import { parse } from "csv-parse";

var csvData = [];
fs.createReadStream(__dirname + "/top10s.csv")
  .pipe(parse({ delimiter: ",", columns: true }))
  .on("data", function (csvrow) {
    //console.log(csvrow);
    //do something with csvrow
    csvData.push(csvrow);
  })
  .on("end", function () {
    //do something with csvData
    console.log(csvData);
    const data = JSON.stringify(csvData);
    fs.writeFile("data.json", data, "utf-8", () => {});
  });
