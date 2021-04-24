#! /usr/bin/env node

import { listAllGenres } from "./utils/genre";
import { createGenre } from "./create-genre";
import { createBook } from "./create-book";
const path = require("path");
const fs = require("fs");
const basePath = path.resolve(__dirname, "../../../");

const main = () => {
  initData();
};
export const initData = () => {
  const genres = listAllGenres();
  genres.forEach((genre: GenreSettings) => {
    cleanDataAndNotes(genre.slug);
  });
  genres.forEach((genre: GenreSettings) => {
    createDataAndNotes(genre);
  });
};

const cleanDataAndNotes = (genreSlug: string) => {
  fs.rmdir(`${basePath}/data/genres/${genreSlug}`, (err: string) => {
    throw Error(err);
  });
  fs.rmdir(`${basePath}/notes/${genreSlug}`, (err: string) => {
    throw Error(err);
  });
};

const createDataAndNotes = (genre: GenreSettings) => {
  createGenre(genre.slug, genre.name);
};
main();
