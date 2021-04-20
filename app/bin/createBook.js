#!/usr/bin/env node

const { generateBooksJson } = require("./utils/file");

const dirName = process.argv[2];
const bookTitle = process.argv[3];

if (!dirName && !bookTitle) {
  throw Error(
    "Exit: Expected more than 2 arguments. dirName is first, bookTitle is second"
  );
}

if (!bookTitle) {
  throw Error(
    "Exit: Expected one more argument. Both dirName and bookTitle is required"
  );
}

const fs = require("fs");

const baseDirPath = "data/books/";
const dirPath = `${baseDirPath}${dirName}`;
const isDirExist = fs.existsSync(dirPath);

if (!isDirExist) {
  // create directory
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(
    `${dirPath}/settings.json`,
    JSON.stringify({ name: dirName, "name-en": "未設定" }, null, 2)
  );
  fs.writeFileSync(`${dirPath}/books.json`, JSON.stringify([]));
  console.log(`genre '${dirName}' is successfully created`);
}

const books = fs.readFileSync(`${dirPath}/books.json`);
const arr = JSON.parse(books);
const bookObj = JSON.parse(generateBooksJson(bookTitle));
arr.push(bookObj);
fs.writeFileSync(`${dirPath}/books.json`, JSON.stringify(arr, null, 2));
console.log(`book '${bookTitle}' is added.`);
