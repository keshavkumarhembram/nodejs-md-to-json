const fs = require("fs");
const data = fs.readFileSync("./data-md/table1.md", "utf-8");
let rows = data.trim().split("\n");
rows = rows.map((row) => row.slice(1));
const head = rows[0].match(/(.+?)\|/g).map((el) => el.slice(0, -1).trim());
const dataRows = rows.slice(2);
const dataRowArrays = dataRows.map((dataRow) =>
  dataRow.match(/(.+?)\|/g).map((el) => el.slice(0, -1).trim())
);
console.log(dataRows);
const dataObj = dataRowArrays.map((row) => {
  let obj = {};
  row.forEach((value, index) => {
    obj[head[index].toLowerCase()] = value;
  });
  return obj;
});

const dataObjString = JSON.stringify(dataObj, null, 2);
console.log(dataObjString);
fs.writeFileSync("./data-json/table1.json", dataObjString, "utf-8");
