#! /usr/bin/env node

import { listAllGenres } from "./utils/genre";
const path = require("path");

const main = () => {
  initData();
};
export const initData = () => {
  const genresDir = path.resolve(__dirname, "../../../data/genres");
  const fs = require("fs");
  const genres = listAllGenres();
  genres.forEach((genre: GenreSettings) => {});
};
main();
