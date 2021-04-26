#!/usr/bin/env node

import { createBook } from "./controllers/books";

const main = () => {
  const genreName = process.argv[2];
  const bookSlug = process.argv[3];
  const bookTitle = process.argv[4];
  createBook(genreName, bookSlug, bookTitle);
};

main();
