#!/usr/bin/env node

const generateJsonFile = (fileName, dirNameJP, dirPath) => {
  const data = {
    name: fileName,
    "name-jp": dirNameJP,
  };
  try {
    fs.writeFileSync(`${dirPath}/settings.json`, JSON.stringify(data, null, 2));
  } catch (e) {
    throw Error(e);
  }
};

const checkAndDeleteDir = (dirPath) => {
  const isDirExist = fs.existsSync(dirPath);
  if (isDirExist) {
    fs.rmdirSync(dirPath);
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

const fs = require("fs");

const baseDirPath = "../data/books/";
const dirPath = `${baseDirPath}/${dirName}`;

const isDirExist = fs.existsSync(dirPath);

if (isDirExist) {
  throw Error("Exit: Duplication Error. This genre already exists");
}

try {
  fs.mkdirSync(dirPath);
  generateJsonFile(dirName, dirNameJP, dirPath);

  console.log(`genre '${dirName}' is successfully created.`);
} catch (e) {
  checkAndDeleteDir(dirPath);
  throw Error(e);
}