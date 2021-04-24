#!/usr/bin/env node

import { generateBooksJson } from "./utils/file";
import { createGenre } from "./create-genre";

const main = () => {
  const dirName = process.argv[2];
  const bookTitle = process.argv[3];
  createBook(dirName, bookTitle);
};

export const createBook = (dirName: string, bookTitle: string) => {
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
  const path = require("path");

  const baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
  const bookDirPath = `${baseBookDirPath}/${dirName}`;
  const baseNoteDirPath = path.resolve(__dirname, "../../../notes/");
  const notesDirPath = `${baseNoteDirPath}/${dirName}`;

  const isDirExist = fs.existsSync(bookDirPath);

  if (!isDirExist) {
    // id directory exists, it creates directory.
    createGenre(dirName, "未設定");
  }

  const books = fs.readFileSync(`${bookDirPath}/books.json`);
  const arr = JSON.parse(books);
  const bookObj = JSON.parse(generateBooksJson(bookTitle));
  arr.push(bookObj);
  fs.writeFileSync(`${bookDirPath}/books.json`, JSON.stringify(arr, null, 2));
  fs.mkdirSync(`${notesDirPath}/${bookTitle}`);
  console.log(`book '${bookTitle}' is added.`);
};

main();
