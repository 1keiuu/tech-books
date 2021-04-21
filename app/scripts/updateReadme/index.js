#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { createCheckBoxText, createSubTitle } = require("./templateUtility");

const templatePath = path.resolve(__dirname, "./template.md");
const buffer = fs.readFileSync(templatePath);
const templateStr = buffer.toString();
// console.log(templateStr);

const baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
const baseNotesDirPath = path.resolve(__dirname, "../../../notes/");
const rootDirPath = path.resolve(__dirname, "../../../");

const genres = fs.readdirSync(baseBookDirPath);

// FIXME:かなり適当に書いてるのでリファクタ

let textData = "";
const booksGroupByYears = [
  { year: "2021", body: [] },
  { year: "2022", body: [] },
  //   { year: "2023", body: [] },
];

// by year
booksGroupByYears.forEach((booksGroupByYear) => {
  const targetYear = booksGroupByYear.year;
  const targetBooks = booksGroupByYear.body;

  textData += `## ${targetYear}\r`;
  // by genre
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    let booksText = "";
    if (genre == "README.md") continue;
    const bookJsonDirPath = `${baseBookDirPath}/${genre}/books.json`;
    const settingJsonDirPath = `${baseBookDirPath}/${genre}/settings.json`;
    const settings = JSON.parse(fs.readFileSync(settingJsonDirPath));
    const books = JSON.parse(fs.readFileSync(bookJsonDirPath));
    const dueYearBooks = books.filter((book) => {
      return book.dueYear == targetYear;
    });
    const dueYearDoneBooks = dueYearBooks.filter((book) => {
      return book.isDone == true;
    });
    if (dueYearBooks.length == 0) continue;
    targetBooks.push(dueYearBooks);
    booksText += `${createSubTitle(settings["name-jp"])}\r\r`;
    targetBooks.forEach((books) => {
      books.forEach((book) => {
        booksText += `${createCheckBoxText(book, genre)}\r\r`;
      });
    });
    const achievementRate = dueYearDoneBooks.length / dueYearBooks.length;
    textData += `**達成率: ${achievementRate}%**\r\r`;
    textData += booksText;
  }
});

console.log(booksGroupByYears[0].body);

fs.writeFileSync(`${rootDirPath}/README.md`, textData);
