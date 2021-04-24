import { generateBooksJson, generateGenreReadme } from "../utils/file";
import { createGenre } from "./genres";

export const createBook = (
  genreSlug: string,
  bookSlug: string,
  bookTitle: string,
  genreName?: string,
  amazonLink?: string,
  dueYear?: string,
  isDone?: boolean
) => {
  if (!genreSlug && !bookTitle) {
    throw Error(
      "Exit: Expected more than 2 arguments. genreSlug is first, bookTitle is second"
    );
  }

  if (!bookTitle || !bookSlug) {
    throw Error(
      "Exit: Expected one or two more arguments. genreSlug, bookSlug, and bookTitle are required"
    );
  }

  const fs = require("fs");
  const path = require("path");

  const baseBookDirPath = path.resolve(__dirname, "../../../../data/genres/");
  const bookDirPath = `${baseBookDirPath}/${genreSlug}`;
  const baseNoteDirPath = path.resolve(__dirname, "../../../../notes/");
  const notesDirPath = `${baseNoteDirPath}/${genreSlug}`;

  const isDirExist = fs.existsSync(bookDirPath);

  if (!isDirExist) {
    // NOTE: if directory doesn't exist, it creates new directory.
    const GENRE_NAME = genreName ? genreName : "未設定";
    createGenre(genreSlug, GENRE_NAME);
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
