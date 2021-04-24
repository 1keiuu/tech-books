const path = require("path");
const fs = require("fs");
import { ignoreGenreDirPath } from "../constants/genre";

// NOTE: return all genre's settings.
export const listAllGenres = (ignoreDirName?: string[]): GenreSettings[] => {
  const res: GenreSettings[] = [];
  const genresDir = path.resolve(__dirname, "../../../../data/genres");
  fs.readdirSync(genresDir).forEach((genreName: string) => {
    let ignorePaths: string[] = ignoreGenreDirPath;
    if (ignoreDirName) {
      ignorePaths = ignorePaths.concat(ignoreDirName);
    }
    if (!ignorePaths.includes(genreName)) {
      const genre = JSON.parse(
        fs.readFileSync(`${genresDir}/${genreName}/settings.json`)
      );
      res.push(genre);
    }
  });
  return res;
};

export const getLatestGenreID = (ignoreDirName?: string[]): number => {
  const genresDir = path.resolve(__dirname, "../../../../data/genres");
  const res: number[] = listAllGenres(ignoreDirName).map((genre) => {
    return genre.id;
  });
  return Math.max(...res) + 1;
};
