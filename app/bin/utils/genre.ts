const path = require("path");
const fs = require("fs");

export const getLatestGenreID = (): number => {
  const genresDir = path.resolve(__dirname, "../../../data/genres");
  const arr: number[] = [];
  fs.readdirSync(genresDir).forEach((genreName: any) => {
    const ignorePaths = ["@types", "README.md"];
    if (!ignorePaths.includes(genreName)) {
      const genre = JSON.parse(
        fs.readFileSync(`${genresDir}/${genreName}/settings.json`)
      );
      arr.push(genre.id);
    }
  });
  return Math.max(...arr);
};
