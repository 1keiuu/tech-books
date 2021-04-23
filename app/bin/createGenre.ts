#!/usr/bin/env node

const createGenre = () => {
  const { generateSettingsJson, generateBooksJson } = require("./utils/file");
  const fs = require("fs");
  const path = require("path");

  const checkAndDeleteDir = (bookDirPath: string) => {
    const isDirExist = fs.existsSync(bookDirPath);
    if (isDirExist) {
      fs.rmdirSync(bookDirPath, { recursive: true });
    }
  };

  const dirName = process.argv[2];
  const dirNameJP = process.argv[3];
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

  const baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
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

    fs.writeFileSync(
      `${bookDirPath}/settings.json`,
      generateSettingsJson(dirName, dirNameJP)
    );
    fs.writeFileSync(`${bookDirPath}/books.json`, JSON.stringify([], null, 2));

    console.log(`genre '${dirName}' is successfully created.`);
  } catch (e) {
    checkAndDeleteDir(bookDirPath);
    throw Error(e);
  }
};

createGenre();
