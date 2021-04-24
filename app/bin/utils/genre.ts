const path = require("path");
const fs = require("fs");

export const getLatestGenreID = (ignoreDirName?: string[]): number => {
  const genresDir = path.resolve(__dirname, "../../../../data/genres");
  const arr: number[] = [];
  fs.readdirSync(genresDir).forEach((genreName: string) => {
    let ignorePaths = ["@types", "README.md"];
    if (ignoreDirName) {
      ignorePaths = ignorePaths.concat(ignoreDirName);
    }
    if (!ignorePaths.includes(genreName)) {
      const genre = JSON.parse(
        fs.readFileSync(`${genresDir}/${genreName}/settings.json`)
      );
      arr.push(genre.id);
    }
  });
  return Math.max(...arr) + 1;
};
