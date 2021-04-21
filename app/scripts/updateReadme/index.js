#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { createCheckBoxText, createSubTitle } = require("./templateUtility");

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
  const dirName = dirArray[i];
  if (dirName == "README.md") continue;
  const bookJsonDirPath = `${baseBookDirPath}/${dirName}/books.json`;
  const settingJsonDirPath = `${baseBookDirPath}/${dirName}/settings.json`;
  const settings = JSON.parse(fs.readFileSync(settingJsonDirPath));
  textData += `${createSubTitle(settings["name-jp"])}\r\r`;
  const books = JSON.parse(fs.readFileSync(bookJsonDirPath));
  books.forEach((obj) => {
    textData += `${createCheckBoxText(obj)}\r\r`;
  });
}

fs.writeFileSync(`${rootDirPath}/README.md`, textData);
