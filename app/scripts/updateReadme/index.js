#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { createCheckBoxText } = require("./templateUtility");

const templatePath = path.resolve(__dirname, "./template.md");
const buffer = fs.readFileSync(templatePath);
const templateStr = buffer.toString();
// console.log(templateStr);

const baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
const baseNotesDirPath = path.resolve(__dirname, "../../../notes/");
const rootDirPath = path.resolve(__dirname, "../../../");

const dirArray = fs.readdirSync(baseBookDirPath);
let textData = "";
for (let i = 0; i < dirArray.length; i++) {
  const dir = dirArray[i];
  if (dir == "README.md") continue;
  const bookJsonDirPath = `${baseBookDirPath}/${dir}/books.json`;
  const json = JSON.parse(fs.readFileSync(bookJsonDirPath));
  json.forEach((obj) => {
    textData += `${createCheckBoxText(obj)}\r`;
  });
}

fs.writeFileSync(`${rootDirPath}/README.md`, textData);
