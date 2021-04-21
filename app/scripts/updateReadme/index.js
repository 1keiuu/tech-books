const fs = require("fs");

const buffer = fs.readFileSync("./template.md");
const templateStr = buffer.toString();
console.log(templateStr);
