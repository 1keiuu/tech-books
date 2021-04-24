#! /usr/bin/env node

import { createGenre } from "./controllers/genres";

const main = () => {
  const genreSlug = process.argv[2];
  const genreName = process.argv[3];
  createGenre(genreSlug, genreName);
};

main();
