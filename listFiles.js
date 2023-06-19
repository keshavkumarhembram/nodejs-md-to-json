const fs = require("fs");
const mdToJson = require("./mdToJson");
const pathName = "./data-md";
const listFiles = fs.readdirSync(pathName);
listFiles.forEach((file) => mdToJson(`${pathName}/${file}`));
