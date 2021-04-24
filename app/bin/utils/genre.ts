const path = require("path");
const fs = require("fs");
import { ignoreGenreDirPath } from "../constants/genre";
import { genreFixtures } from "../../fixtures/genres";

// NOTE: return all genre's settings.
export const listAllGenreSettings = (
  ignoreDirName?: string[]
): GenreSettings[] => {
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

// NOTE: return all genre's books.
export const listAllBooksByGenre = (ignoreDirName?: string[]): Book[][] => {
  const res: Book[][] = [];
  const genresDir = path.resolve(__dirname, `../../../../data/genres`);
  fs.readdirSync(genresDir).forEach((genreName: string) => {
    let ignorePaths: string[] = ignoreGenreDirPath;
    if (ignoreDirName) {
      ignorePaths = ignorePaths.concat(ignoreDirName);
    }
    if (!ignorePaths.includes(genreName)) {
      const genre = JSON.parse(
        fs.readFileSync(`${genresDir}/${genreName}/books.json`)
      );
      res.push(genre);
    }
  });
  return res;
};

export const getGenre = ([key, value]: [
  keyof GenreSettings,
  string
]): GenreSettings | null => {
  const res = genreFixtures.find((genre: GenreSettings) => {
    return genre[key] == value;
  });
  if (res) return res;
  return null;
};

export const getLatestGenreID = (ignoreDirName?: string[]): number => {
  const res: number[] = listAllGenreSettings(ignoreDirName).map((genre) => {
    return genre.id;
  });
  if (res.length < 1) return 1;
  return Math.max(...res) + 1;
};
