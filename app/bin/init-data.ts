#! /usr/bin/env node

import { listAllGenreSettings, listAllBooksByGenre } from "./utils/genre";
import { createBook } from "./controllers/books";

const path = require("path");
const fs = require("fs");
const basePath = path.resolve(__dirname, "../../../");

const main = () => {
  initData();
};
export const initData = () => {
  const genres = listAllGenreSettings();
  const booksByGenre = listAllBooksByGenre();
  booksByGenre.forEach((books) => {
    books.forEach((book) => {
      console.log(book);
      const genre = genres.find((genre) => {
        return genre.id == book.genreID;
      });
      if (!genre) throw Error("Exit: genre is not found.");
      cleanDataAndNotes(genre.slug);
      createDataAndNotes(book, genre);
    });
  });
};

const cleanDataAndNotes = (genreSlug: string) => {
  fs.rmdirSync(`${basePath}/data/genres/${genreSlug}`, { recursive: true });
  fs.rmdirSync(`${basePath}/notes/${genreSlug}`, { recursive: true });
  console.log(`genre name: '${genreSlug}' is successfully deleted`);
};

const createDataAndNotes = (book: Book, genre: GenreSettings) => {
  createBook(
    genre.slug,
    book.slug,
    book.title,
    genre.name,
    book.amazonLink,
    book.dueYear,
    book.isDone
  );
};
main();
