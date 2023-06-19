const fs = require("fs");
const path = require("path");

const mdToJson = (filePath) => {
  const value = fs.readFileSync(filePath, "utf-8");
  const rows = value.trim().split("\n");
  const headers = rows[0]
    .match(/(.+?)\|/g)
    .map((cell) => cell.slice(1, -1).trim());
  const dataRows = rows.slice(2);
  let count = 0;
  const jsonRowObjects = dataRows.map((row) => {
    const cells = row.match(/(.+?)\|/g).map((cell) => cell.slice(0, -1).trim());
    const rowObject = {};
    headers.forEach((head, idx) => {
      if (head === "#") {
        rowObject["id"] = "id_" + count;
        count++;
      } else {
        rowObject[head.toLowerCase()] = cells[idx];
      }
    });
    return rowObject;
  });
  const jsonString = JSON.stringify(jsonRowObjects, null, 2);
  let filename = path.basename(filePath);
  filename = filename.replace(/.md/, "");
  fs.writeFileSync(`./data-json/${filename}.json`, jsonString, "utf-8");
};

module.exports = mdToJson;
