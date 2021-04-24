#! /usr/bin/env node

import { listAllGenres } from "./utils/genre";
const path = require("path");

const main = () => {
  initData();
};
export const initData = () => {
  const genresDir = path.resolve(__dirname, "../../../data/genres");
  const fs = require("fs");
  console.log(listAllGenres());
  //   fs.readdirSync(genresDir).forEach((genreName: string) => {
  //     let ignorePaths: string[] = [];
  //     if (!ignorePaths.includes(genreName)) {
  //       const genre = JSON.parse(
  //         fs.readFileSync(`${genresDir}/${genreName}/settings.json`)
  //       );
  //     }
  //   });
};
main();
