#!/usr/bin/env node

import { generateBooksJson, generateGenreReadme } from "./utils/file";
import { createGenre } from "./create-genre";

const main = () => {
  const genreName = process.argv[2];
  const bookSlug = process.argv[3];
  const bookTitle = process.argv[4];
  createBook(genreName, bookSlug, bookTitle);
};

export const createBook = (
  genreName: string,
  bookSlug: string,
  bookTitle: string
) => {
  if (!genreName && !bookTitle) {
    throw Error(
      "Exit: Expected more than 2 arguments. genreName is first, bookTitle is second"
    );
  }

  if (!bookTitle || !bookSlug) {
    throw Error(
      "Exit: Expected one or two more arguments. genreName, bookSlug, and bookTitle are required"
    );
  }

  const fs = require("fs");
  const path = require("path");

  const baseBookDirPath = path.resolve(__dirname, "../../../data/genres/");
  const bookDirPath = `${baseBookDirPath}/${genreName}`;
  const baseNoteDirPath = path.resolve(__dirname, "../../../notes/");
  const notesDirPath = `${baseNoteDirPath}/${genreName}`;

  const isDirExist = fs.existsSync(bookDirPath);

  if (!isDirExist) {
    // NOTE: if directory doesn't exist, it creates new directory.
    createGenre(genreName, "未設定");
  }

  // NOTE: read current books.json. and append new book to it.
  const books = fs.readFileSync(`${bookDirPath}/books.json`);
  const arr = JSON.parse(books);
  // const bookObj = generateBooksJson(genreID, bookTitle, bookSlug);
  // arr.push(bookObj);
  fs.writeFileSync(`${bookDirPath}/books.json`, JSON.stringify(arr, null, 2));
  fs.mkdirSync(`${notesDirPath}/${bookSlug}`);
  fs.writeFileSync(`${notesDirPath}/README.md`, generateGenreReadme(bookTitle));
  console.log(`book '${bookTitle}' is added.`);
};

main();
