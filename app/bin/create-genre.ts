#! /usr/bin/env node
import { generateSettingsJson } from "./utils/file";
import { getLatestGenreID } from "./utils/genre";
const main = () => {
  const dirName = process.argv[2];
  const dirNameJP = process.argv[3];
  createGenre(dirName, dirNameJP);
};

export const createGenre = (dirName: string, dirNameJP: string) => {
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

  if (!dirName && !dirNameJP) {
    throw Error(
      "Exit: Expected more than 2 arguments. dirName is first, dirNameJP is second"
    );
  }

  if (!dirNameJP) {
    throw Error(
      "Exit: Expected one more argument. Both dirName and dirNameJP is required"
    );
  }

  const baseBookDirPath = path.resolve(__dirname, "../../../data/genres/");
  const bookDirPath = `${baseBookDirPath}/${dirName}`;

  const baseNotesDirPath = path.resolve(__dirname, "../../../notes/");
  const notesDirPath = `${baseNotesDirPath}/${dirName}`;

  const isDirExist = fs.existsSync(bookDirPath);

  if (isDirExist) {
    throw Error("Exit: Duplication Error. This genre already exists");
  }

  try {
    fs.mkdirSync(bookDirPath);
    fs.mkdirSync(notesDirPath);
    const genreID = getLatestGenreID([dirName]);
    fs.writeFileSync(
      `${bookDirPath}/settings.json`,
      JSON.stringify(generateSettingsJson(genreID, dirName, dirNameJP), null, 2)
    );
    fs.writeFileSync(`${bookDirPath}/books.json`, JSON.stringify([], null, 2));
    console.log(`genre '${dirName}' is successfully created.`);
  } catch (e) {
    checkAndDeleteDir(bookDirPath, notesDirPath);
    throw Error(e);
  }
};

main();
