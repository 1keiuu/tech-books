import { generateSettingsJson } from "../utils/file";
import { getLatestGenreID } from "../utils/genre";

export const createGenre = (
  genreSlug: string,
  genreName: string,
  genreID?: number | null
) => {
  const fs = require("fs");
  const path = require("path");

  const checkAndDeleteDir = (bookDirPath: string, noteDirPath: string) => {
    const isBookDirExist = fs.existsSync(bookDirPath);
    if (isBookDirExist) {
      fs.rmdirSync(bookDirPath, { recursive: true });
    }
    const isNoteDirExist = fs.existsSync(noteDirPath);
    if (isNoteDirExist) {
      fs.rmdirSync(noteDirPath, { recursive: true });
    }
  };

  if (!genreSlug && !genreName) {
    throw Error(
      "Exit: Expected more than 2 arguments. genreSlug is first, genreName is second"
    );
  }

  if (!genreName) {
    throw Error(
      "Exit: Expected one more argument. Both genreSlug and genreName is required"
    );
  }

  const baseBookDirPath = path.resolve(__dirname, "../../../../data/genres/");
  const bookDirPath = `${baseBookDirPath}/${genreSlug}`;

  const baseNotesDirPath = path.resolve(__dirname, "../../../../notes/");
  const notesDirPath = `${baseNotesDirPath}/${genreSlug}`;

  const isDirExist = fs.existsSync(bookDirPath);

  if (isDirExist) {
    throw Error("Exit: Duplication Error. This genre already exists");
  }

  try {
    // fs.mkdirSync(notesDirPath);
    let GENRE_ID = genreID;
    if (!GENRE_ID) GENRE_ID = getLatestGenreID([genreSlug]);
    fs.mkdirSync(`${bookDirPath}`);
    fs.writeFileSync(
      `${bookDirPath}/settings.json`,
      JSON.stringify(
        generateSettingsJson(GENRE_ID, genreSlug, genreName),
        null,
        2
      ),
      { recursive: true }
    );
    fs.writeFileSync(`${bookDirPath}/books.json`, JSON.stringify([], null, 2), {
      recursive: true,
    });
    console.log(`genre '${genreSlug}' is successfully created.`);
  } catch (e) {
    checkAndDeleteDir(bookDirPath, notesDirPath);
    throw Error(e);
  }
};
